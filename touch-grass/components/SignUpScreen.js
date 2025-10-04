import React, { useEffect, useState } from "react";    
import {View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signUp, onStateChange } from "../auth/auth";

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const changed = onStateChange(user => {
            if (user) {
                navigation.replace("Home");
            }
        });
        return changed;
    }, []);

    const handleSignup = async () => {
        setLoading(true);
        try {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Please enter a valid email address");
            }
            await signUp(email, password);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account </Text>

            <TextInput 
                style={styles.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput 
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button 
                title={loading? "Signing Up...": "Sign Up"} 
                onPress={handleSignup} 
                disabled={loading}
            />

            <Button 
                title="Back" 
                onPress={() => navigation.navigate("Login")} 
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 28, marginBottom: 20, textAlign: "center" },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: 15,
      padding: 10,
      borderRadius: 5,
    },
    error: { color: "red", marginBottom: 10 },
});