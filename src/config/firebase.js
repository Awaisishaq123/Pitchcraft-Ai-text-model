// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,

  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCvQau6loZOSoWBp9cNlIG4exs3eqM74LE",
  authDomain: "pitch-craft-a368b.firebaseapp.com",
  projectId: "pitch-craft-a368b",
  storageBucket: "pitch-craft-a368b.firebasestorage.app",
  messagingSenderId: "771533300739",
  appId: "1:771533300739:web:74af52628518f37d1a5a36",
  measurementId: "G-762M4FRH3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth and Providers
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();



