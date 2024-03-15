import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useNavigation } from "expo-router";

const DmItem = ({ data }) => {
  return (
    <Link href={"/Dm/" + data.id} style={styles.chatContainer} asChild>
      <TouchableOpacity style={styles.container}>
        <Image source={{ uri: data.img }} style={styles.profileImage} />
        <View style={styles.messageContainer}>
          <Text style={styles.userId}>{data.userId}</Text>
          <Text style={styles.lastMessage}>{data.lastMsg.text}</Text>
        </View>
        <Text style={styles.date}>{data.lastMsg.date}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default DmItem;

const styles = StyleSheet.create({
  chatContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
    marginRight: 12,
  },
  userId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});
