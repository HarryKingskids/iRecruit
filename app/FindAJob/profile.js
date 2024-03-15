import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import About from "../home/about";
import Posts from "../../components/posts";
import { about, FindData } from "../../data";
import { getAuth } from "firebase/auth";
const Profile = () => {
  const currentUser = getAuth().currentUser;
  const myPost = FindData.filter((post) => FindData.userId === about.userId);
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await getUserData(currentUser.email);
    console.log("USER", user);
    if (user) setUser(user);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <About
        img={user.img}
        name={user.name}
        bio1={user.bio1}
        bio2={user.bio2}
        followers={user.followers}
        following={user.following}
        postNum={myPost.length}
      />
      {/* Үндсэн пост хэсэг */}
      <Posts data={myPost} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
});
