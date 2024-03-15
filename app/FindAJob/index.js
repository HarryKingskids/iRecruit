import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firbaseconfig";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from react-navigation/native
import FindDetail from "./FindDetail";

const FindAJob = () => {
  const [list, setList] = useState([]);
  const navigation = useNavigation(); // Get navigation object using useNavigation

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const posts = collection(db, "posts");
      const q = query(posts, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      let data = [];
      querySnapshot.forEach((doc) => {
        console.log("GET JOBS", doc.id, " => ", doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });
      setList(data);
    } catch (error) {
      console.log("GET JOBS ERROR ", error);
    }
  };

  const handleLinkPress = () => {
    navigation.navigate("Dm");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLinkPress}>
        <FontAwesome6
          name="users-viewfinder"
          size={24}
          color="black"
          style={styles.logo}
        />
      </TouchableOpacity>
      <Text style={styles.logo}>Welcome to iRecruit</Text>
      <ScrollView>
        {list.map((data, index) => (
          <FindDetail key={index} doc={data} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "sans-serif",
  },
});

export default FindAJob;
