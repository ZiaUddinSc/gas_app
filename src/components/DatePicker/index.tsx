import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform,StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
 Calendar
  } from 'lucide-react-native';
const DatePicker = ({ label, date, onDateChange }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <View style={{ flex: 1, }}>
      <Text style={{ fontSize: hp(1.8), marginBottom: 5,color:'#7f8c8d' }}>{label}</Text>
      <TouchableOpacity 
        style={styles.input}
        onPress={() => setShow(true)}
      >
        <Text style={{fontSize: hp(1.8), marginBottom: 5}}>{formatDate(date)}</Text>
        <Calendar/>
      </TouchableOpacity>
      
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
    input: {
        borderRadius: wp('1%'),
        // padding: wp('2%'),
        flexDirection:'row',justifyContent:'space-between',
    alignItems:'center'      },
})