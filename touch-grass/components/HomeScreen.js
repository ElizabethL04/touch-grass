import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Touch Grass 🌱</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate("Map")} />
      <Button title="Streaks" onPress={() => navigation.navigate("Streaks")} />
      {/* Add buttons to other screens like Community, Streaks, etc */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
