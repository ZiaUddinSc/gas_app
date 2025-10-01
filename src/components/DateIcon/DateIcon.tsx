import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {CalendarDays} from 'lucide-react-native'; // Lucide calendar icon

const DateIcon = ({slot, date}) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    if (date) {
     
      const parsedDate = moment(date, 'DD-MM-YYYY'); // Because your API date format is like "23-04-2025"
      setDay(parsedDate.format('DD'));
      setMonth(parsedDate.format('MMM').toUpperCase());
    }
  }, [date]);

  if (!date || date === 'null' || date.trim() === '') {
    return (
      <View
        style={[
          styles.defaultContainer,
          {backgroundColor: '#0d9487', borderRadius: 50},
        ]}>
        <CalendarDays size={28} color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.monthContainer,
          {
            backgroundColor:
              slot.title === 'Morning'
                ? '#ffec9c'
                : slot.title === 'Afternoon'
                ? '#e6bb66'
                : slot.title === 'Evening'
                ? '#6a70a4'
                : slot.title === 'Night'
                ? '#081f36'
                : '#8A98C7',
          },
        ]}>
        <Text style={styles.monthText}>{month}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={[styles.dateText, {color:  slot.title === 'Morning'
                ? '#ffec9c'
                : slot.title === 'Afternoon'
                ? '#e6bb66'
                : slot.title === 'Evening'
                ? '#6a70a4'
                : slot.title === 'Night'
                ? '#081f36'
                : '#8A98C7',}]}>{day}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#8A98C7',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  defaultContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#8A98C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: '#E0E8F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DateIcon;
