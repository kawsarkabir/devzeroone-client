import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import api from "./api";
import { jwtDecode } from "jwt-decode";

// Firebase provider
const googleProvider = new GoogleAuthProvider();

// Types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  photoURL?: string;
}

// Register with email and password
export const registerWithEmail = async (data: RegisterData) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await updateProfile(result.user, {
      displayName: data.name,
      photoURL: data.photoURL || "",
    });

    const token = await result.user.getIdToken();

    const response = await api.post("/auth/register", {
      firebaseToken: token,
      firebaseUid: result.user.uid,
      name: data.name,
      email: data.email,
      photoURL: data.photoURL || "",
      role: "student",
    });

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Login with email/password
export const loginWithEmail = async ({ email, password }: LoginData) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();

    const response = await api.post("/auth/login", {
      firebaseToken: token,
      email,
    });

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();

    const response = await api.post("/auth/google-login", {
      firebaseToken: token,
      firebaseUid: result.user.uid,
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      role: "student",
    });

    localStorage.setItem("token", response.data.token);
    console.log("frontend:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Logout
export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("token");
};

// Decode current user from token
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  console.log(token);

  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

// Token validity checker
export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};
