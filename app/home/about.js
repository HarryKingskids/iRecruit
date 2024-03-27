import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { pickImage } from "../../components/service/file";

const About = ({
  img,
  name,
  bio1,
  bio2,
  followers,
  following,
  postNum,
  doc,
  postId,
}) => {
  const currentUser = getAuth().currentUser;
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const uploadToFirebase = async (uri, name, onProgress) => {
    try {
      const storageRef = ref(
        getStorage(),
        `profile_images/${currentUser.uid}/${name}`
      );
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = uploadBytes(storageRef, blob);

      await uploadTask;
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl; // Return only the download URL
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
      throw error;
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updates = {};
      if (image) {
        // Upload image to Firebase Storage and get the download URL
        const imageUrl = await uploadToFirebase(image);
        console.log("imageUrl", imageUrl);

        // Update profile with the downloaded image URL
        updates.photoURL = imageUrl;
      }
      if (currentUser.displayName !== "Jane Q. User") {
        updates.displayName = "Jane Q. User";
      }

      // Check if photoURL is a valid string before updating the profile
      if (typeof updates.photoURL === "string") {
        await updateProfile(currentUser, updates);
        console.log("Profile updated successfully!");
      } else {
        console.error("Invalid photoURL value:", updates.photoURL);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const onSelectImg = async () => {
    const imgUrl = await pickImage();

    if (imgUrl) {
      setImage(imgUrl);
    }
  };

  return (
    <View>
      {/* Profile header */}
      <View style={styles.proHeader}>
        <Image source={{ uri: currentUser.photoURL }} style={styles.proImg} />
        <View style={styles.follower}>
          <View style={styles.followerItem}>
            <Text style={styles.followerText}>{postNum}</Text>
            <Text style={styles.followerText}>Post</Text>
          </View>
          <View style={styles.followerItem}>
            <Text style={styles.followerText}>{followers}</Text>
            <Text style={styles.followerText}>followers</Text>
          </View>
          <View style={styles.followerItem}>
            <Text style={styles.followerText}>{following}</Text>
            <Text style={styles.followerText}>Following</Text>
          </View>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.bio}>
        <Text style={styles.bioName}>
          {currentUser ? currentUser.email : "Unknown"}
        </Text>
        <Text style={styles.bioDesc}>
          {currentUser ? currentUser.bio1 : "Unknown"}
        </Text>
        <Text style={styles.bioDesc}>
          {currentUser ? currentUser.bio2 : "Unknown"}
        </Text>
        <Text style={styles.bioDesc}>{bio1}</Text>
        <Text style={styles.bioDesc}>{bio2}</Text>
      </View>
      {/* Edit section */}
      <View style={styles.edit}>
        <Link href={"Edit"} asChild>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={handleUpdateProfile}
          disabled={uploading}
        >
          <Text style={styles.editText}>
            {uploading ? "Uploading..." : "Update Profile"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={onSelectImg}
          disabled={uploading}
        >
          <Text style={styles.editText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      {/* Progress indicator */}
      {uploading && (
        <View style={styles.progress}>
          <Text>{progress.toFixed(2)}%</Text>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  // Your styles here
  progress: {
    flexDirection: "row",
    alignItems: "center",
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 12,
  },
  tabIcon: {
    width: 27,
    height: 27,
  },
  activeTab: {
    // borderBottomColor: 'rgba(154, 153, 153, 0.41)',
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "gray",
    padding: 12,
    paddingBottom: 1,
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },

  proHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  proImg: {
    width: 107,
    height: 107,
    borderRadius: 107 / 2,
    flex: 1,
  },
  follower: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  followerText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  followerItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  bio: {
    marginBottom: 8,
  },
  bioName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bioDesc: {
    fontSize: 20,
  },
  editBtn: {
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  editText: {
    fontSize: 18,
    fontWeight: "400",
  },
  edit: {
    flexDirection: "row",
  },
});
