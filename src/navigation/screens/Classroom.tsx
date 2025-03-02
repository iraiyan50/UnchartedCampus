import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StaticScreenProps } from '@react-navigation/native';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Classroom({ route }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>{route.params.user}'s Classroom</Title>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Icon name="bullhorn" size={24} color="#3f51b5" />
            <Title style={styles.cardTitle}>Announcements</Title>
          </View>
          <Paragraph>Welcome to the class!</Paragraph>
          <Paragraph>Reminder: Midterm next week.</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Icon name="file" size={24} color="#4caf50" />
            <Title style={styles.cardTitle}>Assignments</Title>
          </View>
          <Paragraph>Assignment 1: Due Friday.</Paragraph>
          <Paragraph>Assignment 2: Project proposal.</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Icon name="folder-open" size={24} color="#ff9800" />
            <Title style={styles.cardTitle}>Class Materials</Title>
          </View>
          <Paragraph>Lecture slides: Week 1.</Paragraph>
          <Paragraph>Reading material: Chapter 2.</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});