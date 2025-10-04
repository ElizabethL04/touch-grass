import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDE7S-11Fq6RZ2cWRMIuuajKETdikH4P4o",
  authDomain: "touch-grass-59e7b.firebaseapp.com",
  projectId: "touch-grass-59e7b",
  storageBucket: "touch-grass-59e7b.firebasestorage.app",
  messagingSenderId: "365928659741",
  appId: "1:365928659741:web:d6277b565d99bc70e97ff4",
  measurementId: "G-F0JHWK13V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);