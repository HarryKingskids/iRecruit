import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const About = ({ img, name, bio1, bio2, followers, following, postNum }) => {
  return (
    <View>
      {/* Толгой хэсэг: Зураг, дагагч */}
      <View style={styles.proHeader}>
        <Image source={{ uri: img }} style={styles.proImg} />
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
        <Text style={styles.bioName}>{name}</Text>
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
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Saved</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
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
