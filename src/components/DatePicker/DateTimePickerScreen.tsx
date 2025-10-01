import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const times = Array.from({ length: 24 }, (_, i) => `${i}:00`); // 24-hour times

export default function DateTimePickerScreen() {
  const navigation = useNavigation<any>();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState('');

  const handleConfirm = () => {
    alert("New Job")
    navigation.navigate('createnewjob', {
      selectedDate,
      selectedTime,
    });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Calendar Section */}
      {/* <View style={styles.calendarContainer}>
        <DatePicker
          mode="calendar"
          onDateChange={(date: string) => setSelectedDate(date)}
          selected={selectedDate}
          options={{
            backgroundColor: '#fff',
            textHeaderColor: '#000',
            textDefaultColor: '#000',
            selectedTextColor: '#fff',
            mainColor: '#000', // selected date background
            textSecondaryColor: '#999',
            borderColor: '#fff',
          }}
        />
      </View> */}

      {/* Scrollable Horizontal Time Buttons */}
      {/* <View style={styles.timeContainer}>
        <FlatList
          data={times}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeButton,
                selectedTime === item && styles.timeButtonSelected,
              ]}
              onPress={() => setSelectedTime(item)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === item && styles.timeTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View> */}

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  calendarContainer: {
    height: height * 0.55,
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  timeContainer: {
    height: 80,
    borderTopWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  timeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#000',
  },
  timeText: {
    color: '#000',
    fontSize: 16,
  },
  timeTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#000',
    margin: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
