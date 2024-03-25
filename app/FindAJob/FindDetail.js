import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const FindDetail = ({ doc, postId }) => {
  const handleSaveButtonClick = () => {
    console.log("Save button clicked" + doc.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{doc.email}</Text>

      <View style={styles.profileContainer}>
        {doc.profileImg ? (
          <Image style={styles.profileImg} source={{ uri: doc.profileImg }} />
        ) : (
          <Text>No Image</Text>
        )}
        <Text style={styles.userId}>{doc.userId}</Text>
      </View>

      <Image
        source={{ uri: doc.img }}
        style={{ width: "100%", aspectRatio: 1 }}
      />

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionBtn}>
          <AntDesign name="hearto" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <AntDesign name="message1" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.saveBtn]}
          onPress={handleSaveButtonClick}
        >
          <MaterialIcons name="save-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.desc}>{doc.desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  actionBtn: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  saveBtn: {
    backgroundColor: "black",
  },
  desc: {
    fontSize: 18,
  },
});

export default FindDetail;
