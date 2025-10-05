import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { logOut } from "../auth/auth";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Touch Grass 🌱</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate("Map")} />
      <Button title="Streaks" onPress={() => navigation.navigate("Streaks")} />
      <Button title="Leaderboard" onPress={() => navigation.navigate("Leaderboard")} />
      <Button title="Logout" onPress={() => {logOut(); navigation.navigate("Login");}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
