
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "./firebase";

// 🔹 Signup with Email
export const signUpWithEmail = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Optional: Add name to Firebase user profile
        await updateProfile(userCredential.user, { displayName: name });
        return { user: userCredential.user };
    } catch (error) {
        throw new Error(error.message);
    }
};

// 🔹 Login with Email
export const loginWithEmail = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return user; // ✅ direct user return
    } catch (error) {
        throw new Error(error.message);
    }
};

// 🔹 Google Login/Signup
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { user: result.user };
    } catch (error) {
        throw new Error(error.message);
    }
};

// 🔹 Facebook Login/Signup
export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        return { user: result.user };
    } catch (error) {
        throw new Error(error.message);
    }
};

