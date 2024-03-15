import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { chats } from "../../data";

const Dm = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [inputText, setInputText] = useState(""); // State to store input text
  const [userId, setUserId] = useState(""); // State to store the user ID of the current user
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  useEffect(() => {
    const chatsId = params.id;
    const chatData = chats.find((chat) => chat.id === chatsId);
    if (chatData) {
      setUserId(chatData.userId);
      setMessages(chatData.messageHistory);
      navigation.setOptions({
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: chatData.userId,
      });
    }
  }, [params, navigation]);

  // Function to handle sending a message
  const sendMessage = () => {
    // Simulating sending the message (updating the state)
    const newMessage = {
      text: inputText,
      sender: userId,
      date: new Date().toLocaleTimeString(), // Example date format, you can adjust as needed
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      {/* Messages */}
      <ScrollView contentContainerStyle={styles.messageContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.sender === userId
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageDate}>{message.date}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          onChangeText={(text) => setInputText(text)}
          value={inputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageContainer: {
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "80%", // Limiting message width
  },
  messageText: {
    fontSize: 16,
  },
  messageDate: {
    fontSize: 12,
    color: "#888",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea", // Gray background for received messages
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0084ff", // Blue background for sent messages
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0084ff", // Instagram blue color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Dm;
