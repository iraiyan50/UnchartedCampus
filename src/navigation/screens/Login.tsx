import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Your Firebase project's web API key
const FIREBASE_API_KEY = "YAIzaSyAhksYpSltohpBT13pbYzkz6oqMP4Tk9v8"; // Replace with your Web API key

export function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Using Firebase REST API instead of the native module
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${"AIzaSyAhksYpSltohpBT13pbYzkz6oqMP4Tk9v8"}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
        // Handle Firebase REST API errors
        switch (data.error.message) {
          case 'EMAIL_NOT_FOUND':
          case 'INVALID_PASSWORD':
            setError('Invalid email or password');
            break;
          case 'USER_DISABLED':
            setError('This user account has been disabled');
            break;
          case 'INVALID_EMAIL':
            setError('Invalid email address format');
            break;
          default:
            setError('Failed to login. Please try again.');
            console.error('Login error:', data.error);
        }
        setLoading(false);
      } else {
        // Successfully authenticated
        console.log('User authenticated:', data.localId);
        // You can store the token and user info in secure storage
        // await SecureStore.setItemAsync('userToken', data.idToken);
        
        setLoading(false);
        navigation.navigate('HomeTabs');
      }
    } catch (err) {
      setLoading(false);
      setError('Network error. Please check your connection.');
      console.error('Login network error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>
      
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    maxWidth: 300,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    width: '100%',
    maxWidth: 300,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
    maxWidth: 300,
  },
});