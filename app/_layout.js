import { Stack } from "expo-router";
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
export default function HomeLayout() {
  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </SafeAreaView>
  );
}
