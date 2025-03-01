import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

interface Update {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  profileImage: string;
  actionImage?: string;
}

const Updates: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: '1',
      message: 'John Doe liked your photo.',
      timestamp: '10:00 AM',
      read: false,
      profileImage: 'https://avatar.iran.liara.run/public/35',
      actionImage: 'https://avatar.iran.liara.run/public/39',
    },
    {
      id: '2',
      message: 'Jane Smith commented on your post.',
      timestamp: '11:30 AM',
      read: true,
      profileImage: 'https://avatar.iran.liara.run/public/33',
    },
    {
      id: '3',
      message: 'Your friend request from Peter Jones was accepted.',
      timestamp: '12:45 PM',
      read: false,
      profileImage: 'https://avatar.iran.liara.run/public/22',
    },
    // ... more updates
  ]);

  const markAsRead = (id: string) => {
    setUpdates((prevUpdates) =>
      prevUpdates.map((update) =>
        update.id === id ? { ...update, read: true } : update
      )
    );
  };

  const deleteUpdate = (id: string) => {
    Alert.alert(
      'Delete Update',
      'Are you sure you want to delete this update?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setUpdates((prevUpdates) =>
              prevUpdates.filter((update) => update.id !== id)
            );
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Update }) => (
    <TouchableOpacity
      style={[styles.updateItem, item.read ? styles.readUpdate : styles.unreadUpdate]}
      onPress={() => markAsRead(item.id)}
      onLongPress={() => deleteUpdate(item.id)}
    >
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.updateContent}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      {item.actionImage && (
        <Image source={{ uri: item.actionImage }} style={styles.actionImage} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={updates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  updateItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  readUpdate: {
    backgroundColor: '#f9f9f9',
  },
  unreadUpdate: {
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  updateContent: {
    flex: 1,
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  actionImage: {
    width: 80,
    height: 80,
    marginLeft: 10,
    borderRadius: 5,
  },
});

export default Updates;