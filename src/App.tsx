import React, { useEffect } from 'react';
import { Navigation } from './navigation';
import { auth } from './firebaseConfig';
import * as SplashScreen from 'expo-splash-screen';
import '@react-native-firebase/app';
SplashScreen.preventAutoHideAsync();

export function App() {
  useEffect(() => {
    async function checkFirebase() {
      console.log("Firebase Auth Initialized:", auth);
      SplashScreen.hideAsync();
    }
    checkFirebase();
  }, []);

  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: ['helloworld://'],
      }}
    />
  );
}
