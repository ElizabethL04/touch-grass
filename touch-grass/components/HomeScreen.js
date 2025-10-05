import React, { useState, useEffect} from "react";
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { logOut } from "../auth/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";


export default function HomeScreen({ navigation }) {
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getRandomFact = async () => {
      try {
        const getFacts = await getDocs(collection(db, "facts"));
        const factsList = getFacts.docs.map(doc => doc.data().fact);

        if (factsList.length > 0) {
          const fact = factsList[Math.floor(Math.random() * factsList.length)];
          setFact(fact);
        }
      } catch (error) {
        console.error("Error fetching facts:", error);
        setFact("Failed to load fact.");
      } finally {
        setLoading(false);
      }
    };
    getRandomFact();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Touch Grass 🌱</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate("Map")} />
      <Button title="Streaks" onPress={() => navigation.navigate("Streaks")} />
      <Button title="Leaderboard" onPress={() => navigation.navigate("Leaderboard")} />

      {loading? (
        <ActivityIndicator size="small" color="#000" />
      ): (
        <Text style={styles.fact}>{fact}</Text>
      )}

      <Button title="Logout" onPress={() => {logOut(); navigation.navigate("Login");}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  fact: { fontSize: 16, fontStyle:"italic", marginVertical: 20, textAlign: "center", color: "#000000"}
});
