import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

const CompanyDetail = ({
  img,
  name,
  bio1,
  bio2,
  workers,
  projects,
  postNum,
}) => {
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: img }} style={styles.profileImage} />
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailCount}>{postNum}</Text>
            <Text style={styles.detailLabel}>Posts</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailCount}>{workers}</Text>
            <Text style={styles.detailLabel}>Workers</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailCount}>{projects}</Text>
            <Text style={styles.detailLabel}>Projects</Text>
          </View>
        </View>
      </View>
      {/* Bio */}
      <View style={styles.bio}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bioText}>{bio1}</Text>
        <Text style={styles.bioText}>{bio2}</Text>
      </View>
      {/* Edit Profile and Saved Buttons */}
      <View style={styles.buttonContainer}>
        <Link href={"Edit"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Saved</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  detailsContainer: {
    flexDirection: "row",
  },
  detailItem: {
    alignItems: "center",
    marginRight: 20,
  },
  detailCount: {
    fontWeight: "bold",
    fontSize: 18,
  },
  detailLabel: {
    fontSize: 14,
    color: "gray",
  },
  bio: {
    marginBottom: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  bioText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    backgroundColor: "#3498db",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CompanyDetail;
