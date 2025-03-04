import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

type Event = {
  id: string;
  name: string;
  date: string;
  isRSVP: boolean;
};

type Club = {
  id: string;
  name: string;
  description: string;
};

export function Club({ route }: { route: { params: { user: string } } }) {
  const [events, setEvents] = useState<Event[]>([
    { id: '1', name: 'Tech Talk', date: 'March 10, 2025', isRSVP: false },
    { id: '2', name: 'Sports Fest', date: 'March 15, 2025', isRSVP: false },
  ]);

  const clubs: Club[] = [
    { id: '1', name: 'Coding Club', description: 'Work on cool projects!' },
    { id: '2', name: 'Music Club', description: 'Join jam sessions every week.' },
  ];

  const handleRSVP = (id: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, isRSVP: !event.isRSVP } : event
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{route.params.user}'s Club</Text>

      <Text style={styles.subHeader}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name} - {item.date}</Text>
            <Button title={item.isRSVP ? 'Cancel RSVP' : 'RSVP'} onPress={() => handleRSVP(item.id)} />
          </View>
        )}
      />

      <Text style={styles.subHeader}>Student Clubs</Text>
      <FlatList
        data={clubs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.clubName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

