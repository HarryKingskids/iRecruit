import { Tabs, TabView } from "expo-router/tabs";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          headerRight: () => (
            <TouchableOpacity style={styles.icon}>
              <Link href={"/Dm/"}>
                <Feather name="send" size={24} color="black" />
              </Link>
            </TouchableOpacity>
          ),
          title: "Нүүр хуудас",
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профайл",
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />
      <Tabs.Screen name="FindDetail" options={{ href: null }} />
      <Tabs.Screen name="Dm" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icons: {
    paddingRight: 20,
    margin: 10,
  },
});
