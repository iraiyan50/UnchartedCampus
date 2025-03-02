// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const firebaseConfig = {
  apiKey: "AIzaSyDZTyGxCDbWLCyuyVH2YHnm6_HsJxcivMg",
  authDomain: "unchartedcampus-69e82.firebaseapp.com",
  projectId: "unchartedcampus-69e82",
  storageBucket: "unchartedcampus-69e82.firebasestorage.app",
  messagingSenderId: "819802562966",
  appId: "1:819802562966:web:13831833b5144c3a4c7db7",
  measurementId: "G-3333B4WZJT"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_APP_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIREBASE_APP_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_APP_DB = getFirestore(FIREBASE_APP);