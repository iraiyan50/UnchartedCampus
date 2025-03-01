import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
      <ActivityIndicator animating={true} />
      <Button screen="Cafeteria" params={{ user: 'jane' }}>
        Go to Cafeteria
      </Button>
      <Button screen="Classroom" params={{ user: 'jane' }}>
        Go to Classrom
      </Button>
      <Button screen="Club" params={{ user: 'jane' }}>
        Go to Club
      </Button>
      <Button screen="Transport" params={{ user: 'jane' }}>
        Go to Transport
      </Button>
      <Button screen="Settings">Go to Settings</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
