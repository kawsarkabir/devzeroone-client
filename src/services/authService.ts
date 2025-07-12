import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import api from './api';
import { jwtDecode } from 'jwt-decode';

const googleProvider = new GoogleAuthProvider();

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

export const loginWithEmail = async (data: LoginData) => {
  try {
    const result = await signInWithEmailAndPassword(auth, data.email, data.password);
    const token = await result.user.getIdToken();
    localStorage.setItem('token', token);
    
    // Send token to backend for JWT generation
    const response = await api.post('/auth/login', {
      firebaseToken: token,
      email: data.email
    });
    
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerWithEmail = async (data: RegisterData) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    await updateProfile(result.user, {
      displayName: data.name,
      photoURL: data.photoURL || ''
    });

    const token = await result.user.getIdToken();
    
    // Send user data to backend
    const response = await api.post('/auth/register', {
      firebaseToken: token,
      name: data.name,
      email: data.email,
      photoURL: data.photoURL || '',
      role: 'student'
    });

    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    
    const response = await api.post('/auth/google-login', {
      firebaseToken: token,
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      role: 'student'
    });

    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('token');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};