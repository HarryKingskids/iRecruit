import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to iRecruit!</Text>
      <Link href={"/JobPost/"} asChild>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Navigate to JobPost")}
        >
          <Text style={styles.buttonText}>Post a Job</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/FindAJob/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Find a Job</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
