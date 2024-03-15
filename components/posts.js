import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
const ProfileImage = ({ data }) => {
  return (
    <Link href={"/post/" + data.id} asChild>
      <TouchableOpacity style={styles.button}>
        <Image source={{ uri: data.img }} style={styles.image} />
      </TouchableOpacity>
    </Link>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  button: {
    width: "32%",
    aspectRatio: 1,
    height: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
