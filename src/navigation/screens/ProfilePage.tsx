import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';

interface Post {
  id: number;
  content: string;
  image?: string;
}

interface Profile {
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  location: string;
  website?: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  posts: Post[];
}

const ProfilePage: React.FC = () => {
  const profile: Profile = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Software Developer | React Native Enthusiast | Coffee Lover',
    profileImage: 'https://avatar.iran.liara.run/39',
    location: 'New York, NY',
    website: 'https://www.example.com',
    social: {
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    posts: [
      { id: 1, content: 'Learning React Native today!', image: 'https://placebear.com/250/250' },
      { id: 2, content: 'Just finished a new project.', image: 'https://loremflickr.com/250/250/dog' },
    ],
  };

  const openLink = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.username}>{profile.username}</Text>
            <Text style={styles.bio}>{profile.bio}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.location}>{profile.location}</Text>
            </View>
            {profile.website && (
              <TouchableOpacity onPress={() => openLink(profile.website)}>
                <Text style={styles.website}>{profile.website}</Text>
              </TouchableOpacity>
            )}
            <View style={styles.socialIcons}>
              {profile.social.twitter && (
                <TouchableOpacity onPress={() => openLink(profile.social.twitter)}>
                  <Text style={styles.socialIcon}>🐦</Text>
                </TouchableOpacity>
              )}
              {profile.social.github && (
                <TouchableOpacity onPress={() => openLink(profile.social.github)}>
                  <Text style={styles.socialIcon}>🐱</Text>
                </TouchableOpacity>
              )}
              {profile.social.linkedin && (
                <TouchableOpacity onPress={() => openLink(profile.social.linkedin)}>
                  <Text style={styles.socialIcon}>💼</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
        </View>

        <View style={styles.postsContainer}>
          {profile.posts.map((post) => (
            <View key={post.id} style={styles.post}>
              <Text style={styles.postContent}>{post.content}</Text>
              {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileDetails: {
    flex:1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 0,
  },
  username: {
    fontSize: 16,
    color: 'gray',
  },
  bio: {
    marginTop: 10,
    textAlign: 'left',
    paddingRight: 20,
  },
  locationContainer: {
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  website: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialIcon: {
    fontSize: 30,
    marginHorizontal: 10,
  },
  postsContainer: {
    padding: 10,
  },
  post: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    padding: 10,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
});

export default ProfilePage;