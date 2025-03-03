import React, { useState, useEffect, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Sample campus data
const campusLocations = [
  { id: 1, name: 'Main Library', type: 'library', latitude: 37.785834, longitude: -122.406417 },
  { id: 2, name: 'Science Building', type: 'academic', latitude: 37.787034, longitude: -122.408617 },
];

const CampusNavigationAR = () => {
  const [isARMode, setIsARMode] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const mapRef = useRef<MapView | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let userLocation = await Location.getCurrentPositionAsync({});
        setMapRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    })();
  }, []);

  // Toggle AR Mode
  const toggleARMode = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setIsARMode(!isARMode);
  };

  return (
    <View style={styles.container}>
      {isARMode ? (
        permission?.granted ? (
          <CameraView style={styles.camera}>
            <TouchableOpacity style={styles.arButton} onPress={toggleARMode}>
              <Text style={styles.buttonText}>Switch to Map</Text>
            </TouchableOpacity>
          </CameraView>
        ) : (
          <Text>No camera permission granted</Text>
        )
      ) : (
        <>
          <TextInput style={styles.searchBar} placeholder="Search for locations" />
          <MapView ref={mapRef} style={styles.map} provider={PROVIDER_GOOGLE} region={mapRegion}>
            {campusLocations.map((location) => (
              <Marker key={location.id} coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
                <MaterialIcons name="place" size={24} color="blue" />
                <Callout>
                  <Text>{location.name}</Text>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <TouchableOpacity style={styles.arButton} onPress={toggleARMode}>
            <Text style={styles.buttonText}>Switch to AR</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBar: { height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, margin: 10, borderRadius: 5 },
  map: { flex: 1 },
  camera: { flex: 1 },
  arButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: 'white', padding: 10, borderRadius: 5 },
  buttonText: { fontSize: 16 },
});

export default CampusNavigationAR;
