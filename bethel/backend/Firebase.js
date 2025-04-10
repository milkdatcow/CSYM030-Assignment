// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth' 
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGLLzIYQyEHKagrOenfQ1J2lA6RavgPZk",
  authDomain: "csym030-assignment.firebaseapp.com",
  projectId: "csym030-assignment",
  storageBucket: "csym030-assignment.firebasestorage.app",
  messagingSenderId: "8063172576",
  appId: "1:8063172576:web:e67d4a83a1fdb1fe933585",
  measurementId: "G-Y4LZL0KD6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)});
export const db = getFirestore(app)
const analytics = getAnalytics(app);