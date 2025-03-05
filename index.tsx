
import './gesture-handler';
import '@react-native-firebase/app';
import '@expo/metro-runtime'; // Necessary for Fast Refresh on Web
import { registerRootComponent } from 'expo';

import { App } from './src/App';

registerRootComponent(App); // This is correctly registering your App component
