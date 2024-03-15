import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

const Layout = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,

    flex: 1,
  },
});
