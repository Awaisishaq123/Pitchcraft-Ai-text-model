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
  apiKey: "AIzaSyCIdnfEiTGxGcu_yCQmbcHm3jIKbTF75A8",
  authDomain: "ai-hackathon-f1f8b.firebaseapp.com",
  projectId: "ai-hackathon-f1f8b",
  storageBucket: "ai-hackathon-f1f8b.firebasestorage.app",
  messagingSenderId: "357888290605",
  appId: "1:357888290605:web:caf6126148a902130deda4",
  measurementId: "G-JESKJDLY52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Auth and Providers
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
