// Import the necessary Firebase functions from the modular SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// 🔥 Your Firebase config from `google-services.json`
const firebaseConfig = {
  apiKey: "AIzaSyD3ejGTTW0jCa5CfxKXrxbu0JqW-5nOrqA",
  authDomain: "unchartedcampus.firebaseapp.com",
  projectId: "unchartedcampus",
  storageBucket: "unchartedcampus.firebasestorage.app",
  messagingSenderId: "691061499333",
  appId: "1:691061499333:android:d519a3e24fb0b3886757ac"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth, app };
