import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Icons can be replaced with React Native Vector Icons or custom icon components
import Icon from 'react-native-vector-icons/Feather';

export function Cafeteria({ route }: { route: { params: { user: string } } }) {
  const [selectedDay, setSelectedDay] = useState('Today');

  const menuData = [
    {
      day: 'Today',
      meals: [
        {
          name: 'Classic Cheeseburger',
          description: 'Angus beef patty, cheddar cheese, lettuce, tomato',
          price: 8.99,
          calories: 650,
          image: 'https://via.placeholder.com/200x150'
        },
        {
          name: 'Vegetarian Quinoa Bowl',
          description: 'Mixed vegetables, quinoa, herb dressing',
          price: 7.50,
          calories: 450,
          image: 'https://via.placeholder.com/200x150'
        }
      ]
    },
    {
      day: 'Tomorrow',
      meals: [
        {
          name: 'Grilled Chicken Salad',
          description: 'Grilled chicken, mixed greens, vinaigrette',
          price: 9.25,
          calories: 400,
          image: 'https://via.placeholder.com/200x150'
        },
        {
          name: 'Margherita Pizza',
          description: 'Fresh mozzarella, basil, tomato sauce',
          price: 7.99,
          calories: 550,
          image: 'https://via.placeholder.com/200x150'
        }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {route.params.user}!</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="calendar" size={24} color="#4A4A4A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="shopping-cart" size={24} color="#4A4A4A" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.daySelector}>
        {menuData.map((menu) => (
          <TouchableOpacity 
            key={menu.day}
            style={[
              styles.daySelectorButton, 
              selectedDay === menu.day && styles.activeDayButton
            ]}
            onPress={() => setSelectedDay(menu.day)}
          >
            <Text style={[
              styles.daySelectorText, 
              selectedDay === menu.day && styles.activeDayText
            ]}>
              {menu.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {menuData
          .find(menu => menu.day === selectedDay)?.meals.map((meal, index) => (
            <View key={index} style={styles.mealCard}>
              <View style={styles.mealCardContent}>
                <Image 
                  source={{ uri: meal.image }} 
                  style={styles.mealImage} 
                />
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealDescription}>{meal.description}</Text>
                  <View style={styles.mealMetadata}>
                    <View style={styles.metadataItem}>
                      <Text style={styles.metadataLabel}>Price</Text>
                      <Text style={styles.metadataValue}>${meal.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.metadataItem}>
                      <Text style={styles.metadataLabel}>Calories</Text>
                      <Text style={styles.metadataValue}>{meal.calories}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.preorderButton}>
                    <Text style={styles.preorderButtonText}>Pre-Order Meal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderRadius: 50,
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#E8E8E8',
    borderRadius: 25,
    padding: 5,
  },
  daySelectorButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeDayButton: {
    backgroundColor: '#007BFF',
  },
  daySelectorText: {
    color: '#4A4A4A',
    fontWeight: '600',
  },
  activeDayText: {
    color: 'white',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mealCard: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealCardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  mealImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  mealDescription: {
    color: '#666',
    marginBottom: 10,
  },
  mealMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metadataItem: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  metadataLabel: {
    fontSize: 12,
    color: '#777',
  },
  metadataValue: {
    fontWeight: '700',
  },
  preorderButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  preorderButtonText: {
    color: 'white',
    fontWeight: '700',
  }
});

export default Cafeteria;