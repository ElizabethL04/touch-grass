import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current && cameraReady) {
      const photoData = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setPhoto(photoData);
    }
  };

  if (hasPermission === null)
    return (
      <SafeAreaView style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  if (hasPermission === false)
    return (
      <SafeAreaView style={styles.center}>
        <Text>No access to camera.</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      {!photo ? (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
          onCameraReady={() => setCameraReady(true)}
        >
          <View style={styles.cameraButtonContainer}>
            <Button title="Take Photo 📷" onPress={takePhoto} disabled={!cameraReady} />
          </View>
        </Camera>
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photo.uri }} style={styles.photo} />
          <Button title="Retake" onPress={() => setPhoto(null)} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F5E9" },
  camera: { flex: 1 },
  cameraButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "transparent",
  },
  preview: { flex: 1, justifyContent: "center", alignItems: "center" },
  photo: { width: "90%", height: "70%", borderRadius: 10, marginBottom: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
