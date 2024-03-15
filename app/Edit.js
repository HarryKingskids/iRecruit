import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firbaseconfig";
import { getUserData } from "../components/service/users";

const defaultImg =
  "https://s3-alpha-sig.figma.com/img/b6fa/411b/3b2f5c0e3d92323bbc7bc4b84fbf7664?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C-g6uWda~xi9CguneCEFsC5EXxKARYXrdcMIeOYpB9UmPLK-eaPPJxOf3G2xNkJjoymwtUxzxe0otRJxWIMm-9fQ5IuHYx3M80NqUgtCZzdiuy1P8KD~-ZLdH23h4NLk1aGHPc5OoejOFsX8cBEoUS~j~ujJn3GhgNux1aS~Y3jtyj1ScHmRC0VDhBcafxOg4ozUcLi0UwbhezSvmc1cn1NnxsGl7-TT0mIcX~u8P1dX18hP0~OPpLVVREMHn5gHkpJsdW1NpsVigD3okgXfKHG1jg9TusjhBObKEX6CzF4vMyn3~j585UmXn-IzExwc1zAckqxM3tU7LAC5ox3IiA__";
export default function Edit() {
  const isPresented = router.canGoBack();

  const [user, setUser] = useState({
    userId: getAuth().currentUser.email,
    name: "",
    bio1: "",
    bio2: "",
  });
  const email = getAuth().currentUser.email;

  useEffect(() => {
    console.log("email", email);
    getUser(email);
  }, []);

  const getUser = async (email) => {
    const user = await getUserData(email);
    console.log("USER", user);
    if (user) setUser(user);
  };

  const save = async () => {
    try {
      const userRef = doc(db, "users", email);
      await setDoc(userRef, user);

      console.log("SAVED");
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Layout>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />

      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: defaultImg }} />
        <TextInput
          value={user.userId}
          placeholder="userId"
          style={styles.input}
          editable={false}
        />
        <TextInput
          onChangeText={(text) => setUser({ ...user, name: text })}
          value={user.name}
          placeholder="name"
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => setUser({ ...user, bio1: text })}
          value={user.bio1}
          placeholder="bio1"
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => setUser({ ...user, bio2: text })}
          value={user.bio2}
          placeholder="bio2"
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn} onPress={save}>
          <Text style={styles.btnText}>Хадгалах</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    backgroundColor: "#1877F2",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  btnText: {
    color: "white",
  },
  container: {
    padding: 8,
    gap: 8,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,

    alignSelf: "center",
  },
  input: {
    borderBottomColor: "#B3B3B3",
    borderBottomWidth: 1,
    padding: 8,
  },
});
