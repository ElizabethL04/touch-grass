import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import MapScreen from "./components/MapScreen";
import LoginScreen from "./components/LoginScreen";
import SignUp from "./components/SignUpScreen";
import StreakScreen from "./components/StreakScreen";
import { enableScreens } from 'react-native-screens';
enableScreens(false);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Streaks" component={StreakScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
