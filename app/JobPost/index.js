import React, { useState } from "react";
import { Button, Image, View, TextInput, StyleSheet } from "react-native";
import { db } from "../../firbaseconfig";
import * as ImagePicker from "expo-image-picker";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook from React Navigation
import { router } from "expo-router";

const JobPost = ({ onPost }) => {
  const [desc, setDesc] = useState("");
  const [companyid, setCompanyid] = useState("");
  const [id, setid] = useState("");
  const [like, setLike] = useState("");
  const [Job, setJob] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation(); // Initialize the navigation hook

  const onProgress = (data) => {
    console.log("onProgress", data);
  };
  const handlePost = async () => {
    console.log("desc:", desc);
    console.log("companyid:", companyid);
    console.log("id:", id);
    console.log("like:", like);
    console.log("Job:", Job);

    // Check if all fields are filled before posting
    // Check if all fields are filled before posting
    if (
      desc !== "" &&
      companyid !== "" &&
      id !== "" &&
      Job !== "" &&
      image !== null // Check if the image state variable is not null
    ) {
      try {
        // Save the job post data to Firestore
        const postsRef = collection(db, "posts");
        const params = {
          companyid,
          desc,
          id,
          Job,
          createdAt: new Date(),
        };
        console.log("before addDoc");
        const result = await addDoc(postsRef, params);

        console.log("before uploadToFirebase");
        const imgRes = await uploadToFirebase(image, result.id, onProgress);
        console.log("imgRes", imgRes);

        try {
          const docRef = doc(postsRef, result.id);
          await updateDoc(docRef, { img: imgRes.downloadUrl });
          console.log("Document updated successfully.");
        } catch (error) {
          console.error("Error updating document:", error);
        }

        // Navigate to home after posting
        router.push("home/home"); // Use navigation.navigate to navigate
        // Clear input fields after posting
        setDesc("");
        setCompanyid("");
        setid("");
        setJob("");
      } catch (error) {
        console.log("ERROR", error);
      }
    } else {
      // Display an alert or message prompting the user to fill all fields
      alert("Please fill in all fields before posting.");
    }
  };

  const pickImage = async () => {
    console.log("1");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("2", !result.canceled);

    if (!result.canceled) {
      console.log("3", result);
      setImage(result.assets[0].uri);
    }
  };
  const uploadToFirebase = async (uri, name, onProgress) => {
    console.log("0", uri);

    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
    console.log("1");

    const imageRef = ref(getStorage(), `post_images/${name}`);

    console.log("2");
    const uploadTask = uploadBytesResumable(imageRef, theBlob);
    console.log("3");
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("--------err", error);
          reject(error);
        },
        async () => {
          console.log("FINISHED");
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          console.log("FINISHED downloadUrl", downloadUrl);

          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        multiline={true}
        value={desc}
        onChangeText={setDesc}
      />
      <TextInput
        style={styles.input}
        placeholder="companyid"
        value={companyid}
        onChangeText={setCompanyid}
      />
      <TextInput
        style={styles.input}
        placeholder="id"
        value={id}
        onChangeText={setid}
      />
      <TextInput
        style={styles.input}
        placeholder="What kind of worker"
        value={Job}
        onChangeText={setJob}
      />

      <View style={styles.buttonContainer}>
        <Button title="Pick an image" onPress={pickImage} color="#007bff" />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Post" onPress={handlePost} color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  descriptionInput: {
    height: 100,
  },
  buttonContainer: {
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});

export default JobPost;
