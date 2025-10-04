import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logIn, onStateChange } from "../auth/auth";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const loadEmail = async () => {
          const savedEmail = await AsyncStorage.getItem("savedEmail");
          if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
          }
        };
        loadEmail();
      }, []);
    
    useEffect(() => {
        const loggedin = onStateChange(user => {
          if (user) navigation.replace("Home");
        });
        return () => loggedin();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            if (!email || !password) {
                throw new Error("Email and password required");
            }

            await logIn(email, password);

            if (rememberMe) {
                await AsyncStorage.setEmail("savedEmail", email);
            } else {
                await AsyncStorage.removeItem("savedEmail");
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="email"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                textContentType="password"
                autoComplete="password"
            />

            <View style={styles.rememberContainer}>
                <Text style={styles.rememberMe}>Remember Me:</Text>
                <Switch
                    value={rememberMe}
                    onValueChange={setRememberMe}
                />
            </View>

            <Button 
                title={loading? "Logging In...": "Log In"}
                onPress={handleLogin}
                disabled={loading} 
            />

            <Text style={styles.regulartext}>Don't have an account?</Text>
            <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 15, padding: 10, borderRadius: 5 },
  regulartext: { fontSize: 12 },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
});
