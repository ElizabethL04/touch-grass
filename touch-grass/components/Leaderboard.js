import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function LeaderboardScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
        setLoading(true);
      try {
        const usersRef = collection(db, "users");
        const leaderboard = query(usersRef, orderBy("streak", "desc"), limit(10));
        const snapshot = await getDocs(leaderboard);

        const userList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        userList.sort((a, b) => b.streak - a.streak);
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const getRanking = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const rank = users.findIndex(user => user.id === currentUser.uid) + 1;
        setUserRank(rank);
      }
    }
    getRanking();
  }, [users]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.userRank}>Your place: #{userRank}</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.streak}>{item.streak} 🌱</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 28, marginBottom: 20, textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  rank: { width: 30, fontWeight: "bold" },
  email: { flex: 1 },
  streak: { fontWeight: "bold" },
});
