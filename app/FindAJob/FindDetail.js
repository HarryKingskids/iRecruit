import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const FindDetail = ({ doc }) => {
  if (!doc) {
    return null;
  }

  return (
    <View>
      <Link
        style={[styles.row, styles.container, { paddingVertical: 5 }]}
        href={"/profile/" + doc.userId}
        asChild
      >
        <TouchableOpacity>
          <Text style={styles.userId}> {doc.userId}</Text>
        </TouchableOpacity>
      </Link>

      <Image
        source={{ uri: doc.img }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
      <View style={styles.container}>
        {/* Like, comment, send buttons */}
        <View style={styles.btnsContainer}>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn}>
              <AntDesign name="hearto" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <AntDesign name="message1" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Feather name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn}>
            <MaterialIcons name="save-alt" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* Post description */}
        <Text style={styles.desc}>{doc.desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImg: { width: 29, height: 29, borderRadius: 29 / 2 },
  boldText: {
    fontWeight: "bold",
  },
  likedText: {
    fontSize: 15,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 18,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 13,
    paddingVertical: 12,
  },
  userId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 18,
  },
});

export default FindDetail;
