import React from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";

export default function Page() {
  return (
    <View>
      <Redirect href="/signup" />
    </View>
  );
}
