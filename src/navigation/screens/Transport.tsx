import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { StaticScreenProps } from '@react-navigation/native';

type Seat = {
  busNumber: number;
  seatNumber: number;
};

type Props = StaticScreenProps<{
  user: string;
}>;

export function Transport({ route }: Props) {
  const [selectedSeat, setSelectedSeat] = useState<{busNumber: number, seatNumber: number} | null>(null);
  const [bookedSeat, setBookedSeat] = useState<Seat | null>(null);

  const toggleSeat = (busNumber: number, seatNumber: number) => {
    // If the same seat is selected, deselect it
    if (selectedSeat?.busNumber === busNumber && selectedSeat?.seatNumber === seatNumber) {
      setSelectedSeat(null);
    } else {
      // If a different seat is selected, replace the previous selection
      setSelectedSeat({ busNumber, seatNumber });
    }
  };

  const confirmSeat = () => {
    if (!selectedSeat) {
      Alert.alert('Please Select a Seat', 'You must select a seat before confirming.');
      return;
    }

    // Check if a seat is already booked
    if (bookedSeat) {
      Alert.alert('Seat Already Booked', 'You can only book one seat.');
      return;
    }

    // Confirm booking
    Alert.alert(
      'Confirm Seat',
      `Are you sure you want to book Seat ${selectedSeat.seatNumber} on Bus ${selectedSeat.busNumber}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            setBookedSeat(selectedSeat);
            setSelectedSeat(null);
          },
        },
      ]
    );
  };

  const renderBus = (busNumber: number) => {
    const seats = [];
    for (let row = 0; row < 7; row++) {
      const rowSeats = [];
      const seatsInRow = row === 6 ? 6 : 5;
      
      for (let col = 0; col < seatsInRow; col++) {
        const seatNumber = row < 6 
          ? row * 5 + col + 1 
          : col + 31;
        
        // Check if seat is booked
        const isBooked = bookedSeat?.busNumber === busNumber && 
                         bookedSeat?.seatNumber === seatNumber;
        
        const isSelected = 
          selectedSeat?.busNumber === busNumber && 
          selectedSeat?.seatNumber === seatNumber;
        
        // Add walking space after 3rd seat in rows with 5 seats
        const isWalkingSpace = 
          row < 6 && (col === 3);
        
        if (isWalkingSpace) {
          rowSeats.push(
            <View key={`walking-space-${row}`} style={styles.walkingSpace}>
              <Text style={styles.walkingSpaceText}>🚶</Text>
            </View>
          );
        }
        
        rowSeats.push(
          <TouchableOpacity
            key={`bus${busNumber}-seat${seatNumber}`}
            style={[
              styles.seat,
              isSelected && styles.selectedSeat,
              isBooked && styles.bookedSeat
            ]}
            onPress={() => !isBooked && toggleSeat(busNumber, seatNumber)}
            disabled={isBooked}
          >
            <Text style={[
              styles.seatText,
              isBooked && styles.bookedSeatText
            ]}>{seatNumber}</Text>
          </TouchableOpacity>
        );
      }
      
      seats.push(
        <View key={`bus${busNumber}-row${row}`} style={styles.seatRow}>
          {rowSeats}
        </View>
      );
    }
    
    return (
      <View style={styles.busContainer}>
        <Text style={styles.busTitle}>Bus {busNumber}</Text>
        <View style={styles.busLayout}>
          {seats}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.user}'s Bus Seat Selection</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {[1, 2, 3, 4].map(busNumber => renderBus(busNumber))}
      </ScrollView>
      
      <View style={styles.actionContainer}>
        <View style={styles.selectedSeatContainer}>
          <Text style={styles.selectedSeatText}>
            {bookedSeat 
              ? `Booked: Bus ${bookedSeat.busNumber}, Seat ${bookedSeat.seatNumber}` 
              : selectedSeat 
                ? `Selected: Bus ${selectedSeat.busNumber}, Seat ${selectedSeat.seatNumber}` 
                : 'No seat selected'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.confirmButton, 
            !selectedSeat && styles.confirmButtonDisabled
          ]}
          onPress={confirmSeat}
          disabled={!selectedSeat}
        >
          <Text style={styles.confirmButtonText}>Confirm Seat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  busContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  busTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  busLayout: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  seatRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
  },
  walkingSpace: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#888',
  },
  walkingSpaceText: {
    fontSize: 20,
    color: '#888',
  },
  selectedSeat: {
    backgroundColor: '#4CAF50',
  },
  bookedSeat: {
    backgroundColor: '#FF6347',
  },
  seatText: {
    color: 'black',
    fontWeight: 'bold',
  },
  bookedSeatText: {
    color: 'white',
  },
  actionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
  },
  selectedSeatContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedSeatText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Transport;