import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {doc, setDoc } from "firebase/firestore";


export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {email});
    console.log("Registered email: ", email)
    return email;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
}

export async function logIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in: ", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in: ", error.message);
        throw error;
    }
}

export async function logOut(){
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch {error} {
        console.error("Error loggin out: ", error.message);
        throw error;
    }
}

export function onStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}