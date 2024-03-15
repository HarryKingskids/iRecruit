import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { signup } from "../aunthentication";
import { Link } from "expo-router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };
  const handleSignup = async () => {
    try {
      if (password.length < 6) {
        // Alert the user if the password length is less than 6 characters
        alert("Password must be at least 6 characters long");
        return; // Stop execution if the password length is less than 6 characters
      }

      const response = await signup(email, password);
      console.log("Successfully logged in", response);
      setError("");
      // Redirect to FYP page after successful login
      router.push("instagram/FYP");
    } catch (error) {
      const message = error.message;
      const code = error.code;
      if (code == "auth/invalid-credential") {
        setError("Нэвтрэх нэр эсвэл нууц үг олдсонгүй");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder="Phone number, email or username"
        />
        <View style={styles.input}>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={hidePassword}
            placeholder="Password"
          />
          <TouchableOpacity onPress={togglePassword}>
            <Entypo name="eye" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.btnText}>Бүртгүүлэх</Text>
        </TouchableOpacity>
        <Link style={{ alignSelf: "center" }} href={"login"} asChild>
          <TouchableOpacity>
            <Text>Нэвтрэх</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: { padding: 24, gap: 10, padding: 24 },
  btnText: {
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#1877F2",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  logo: {
    alignSelf: "center",
  },
  container: {
    justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EEEEEE",
    borderColor: "#C5C5C5",
    borderWidth: 1,
    color: "#848484",
    padding: 10,
    borderRadius: 8,
  },
});
