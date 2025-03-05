import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const firestore = getFirestore(app);

// Get the weekday name (e.g., "Thursday")
const getWeekdayName = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('en-US', { weekday: 'long' }); // "Thursday"
};

// Define types for meal and menu data
interface Meal {
  name: string;
  description: string;
  price: number;
  image: string;
  status: 'Ordered' | 'Preordered' | 'None'; // Track the meal's status
}

interface MenuData {
  day: string;
  meals: Meal[];
}

export function Cafeteria({ route }: { route: { params: { user: string } } }) {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  useEffect(() => {
    const todayName = getWeekdayName(0);
    const tomorrowName = getWeekdayName(1);

    const unsubscribe = onSnapshot(collection(firestore, 'menu'), (querySnapshot) => {
      const menuItems: { [key: string]: Meal[] } = { Today: [], Tomorrow: [] };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const menuDay = data.day; // Example: "Thursday"

        const meal: Meal = {
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.imageUrl,
          status: 'None', // Default status is 'None'
        };

        if (menuDay === todayName) {
          menuItems.Today.push(meal);
        } else if (menuDay === tomorrowName) {
          menuItems.Tomorrow.push(meal);
        }
      });

      setMenuData([
        { day: 'Today', meals: menuItems.Today },
        { day: 'Tomorrow', meals: menuItems.Tomorrow },
      ]);
    });

    return () => unsubscribe();
  }, []);

  // Handle the order/preorder button click
  const handleOrder = (meal: Meal) => {
    meal.status = 'Ordered';
    Alert.alert('Order Successful', `You have ordered: ${meal.name}`);
  };

  const handlePreorder = (meal: Meal) => {
    meal.status = 'Preordered';
    Alert.alert('Preorder Successful', `You have preordered: ${meal.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {route.params.user}!</Text>
      </View>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        {menuData.map((menu) => (
          <TouchableOpacity
            key={menu.day}
            style={[styles.daySelectorButton, selectedDay === menu.day && styles.activeDayButton]}
            onPress={() => setSelectedDay(menu.day)}
          >
            <Text style={[styles.daySelectorText, selectedDay === menu.day && styles.activeDayText]}>
              {menu.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meal List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {menuData.find((menu) => menu.day === selectedDay)?.meals.length ? (
          menuData
            .find((menu) => menu.day === selectedDay)
            ?.meals.map((meal, index) => (
              <View key={index} style={styles.mealCard}>
                <View style={styles.mealCardContent}>
                  <Image source={{ uri: meal.image }} style={styles.mealImage} />
                  <View style={styles.mealDetails}>
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <Text style={styles.mealDescription}>{meal.description}</Text>
                    <Text style={styles.mealPrice}>৳{meal.price.toFixed(2)}</Text>
                    {/* Display Order/Preorder Buttons based on the day */}
                    {selectedDay === 'Today' && meal.status === 'None' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.orderButton]}
                        onPress={() => handleOrder(meal)}
                      >
                        <Text style={styles.actionButtonText}>Order</Text>
                      </TouchableOpacity>
                    )}
                    {selectedDay === 'Tomorrow' && meal.status === 'None' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.preorderButton]}
                        onPress={() => handlePreorder(meal)}
                      >
                        <Text style={styles.actionButtonText}>Preorder</Text>
                      </TouchableOpacity>
                    )}
                    {meal.status === 'Ordered' && (
                      <Text style={styles.statusText}>Ordered</Text>
                    )}
                    {meal.status === 'Preordered' && (
                      <Text style={styles.statusText}>Preordered</Text>
                    )}
                  </View>
                </View>
              </View>
            ))
        ) : (
          <Text style={styles.noMealsText}>No meals available for {selectedDay}.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', paddingHorizontal: 15 },
  header: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 20 },
  welcomeText: { fontSize: 24, fontWeight: '700', color: '#333' },
  daySelector: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, padding: 5 },
  daySelectorButton: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  activeDayButton: { backgroundColor: '#007BFF' },
  daySelectorText: { color: '#4A4A4A', fontWeight: '600' },
  activeDayText: { color: 'white' },
  scrollContent: { paddingBottom: 20 },
  mealCard: { marginBottom: 15, borderRadius: 15, backgroundColor: 'white', elevation: 3 },
  mealCardContent: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  mealImage: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
  mealDetails: { flex: 1 },
  mealName: { fontSize: 18, fontWeight: '700', marginBottom: 5 },
  mealDescription: { color: '#666', marginBottom: 5 },
  mealPrice: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 10 },
  noMealsText: { textAlign: 'center', color: '#777', fontSize: 16, marginTop: 20 },
  actionButton: { padding: 10, borderRadius: 5, marginRight: 10, width: 100 },
  orderButton: { backgroundColor: '#28a745' },
  preorderButton: { backgroundColor: '#ffc107' },
  actionButtonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
  statusText: { fontWeight: '600', color: '#333' },
});

export default Cafeteria;
