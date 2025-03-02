import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export function Home() {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome!
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Explore the campus:
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Cafeteria', { user: 'jane' })} // Navigate to Cafeteria
          icon={() => <Icon name="coffee" size={24} color="white" />}
        >
          Cafeteria
        </Button>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Classroom', { user: 'jane' })} // Navigate to Classroom
          icon={() => <Icon name="school" size={24} color="white" />}
        >
          Classroom
        </Button>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Club', { user: 'jane' })} // Navigate to Club
          icon={() => <Icon name="account-group" size={24} color="white" />}
        >
          Club
        </Button>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Transport', { user: 'jane' })} // Navigate to Transport
          icon={() => <Icon name="bus" size={24} color="white" />}
        >
          Transport
        </Button>

        <Button
          mode="outlined"
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')} // Navigate to Settings
          icon={() => <Icon name="cog" size={24} color="black" />}
        >
          Settings
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Light background
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginBottom: 10,
  },
  settingsButton: {
    marginTop: 20,
    borderColor: 'black',
  },
});