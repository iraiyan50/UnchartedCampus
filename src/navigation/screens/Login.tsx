import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export function Login() {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Ignoring authentication for now, directly navigate to Home
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      
      <Button mode="contained" style={styles.button} onPress={handleLogin}>
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
  },
});
