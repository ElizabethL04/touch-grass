import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

const BACKEND_URL = "https://touch-grass-iota.vercel.app/backend/api/nearby";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setLoading(false);
    })();
  }, []);

  const fetchNearbyGrass = async () => {
    if (!location) return;
    setFetching(true);
    try {
      const res = await axios.get(`${BACKEND_URL}?lat=${location.latitude}&lng=${location.longitude}`);
      setPlaces(res.data);
      if (res.data.length === 0) alert("No nearby parks found. Try expanding your search radius.");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch nearby grass spots.");
    }
    setFetching(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{ ...location, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
      >
        <Marker coordinate={location} title="You are here!" />
        {places.map(p => (
          <Marker
            key={p.place_id}
            coordinate={{ latitude: p.geometry.location.lat, longitude: p.geometry.location.lng }}
            title={p.name}
            description={p.vicinity}
          />
        ))}
      </MapView>

      <Button
        title={fetching ? "Finding Grass..." : "Find Nearby Grass 🌿"}
        onPress={fetchNearbyGrass}
        disabled={fetching || !location}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F5E9" },
  map: { flex: 1, margin: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
