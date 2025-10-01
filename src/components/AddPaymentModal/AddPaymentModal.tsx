import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const paymentMethods = [
  
  { label: 'Bank', value: 1 },
  { label: 'Cash', value: 2 },
];

const AddPaymentModal = ({ visible, onClose, onSave, outstanding }) => {
  const [amount, setAmount] = useState(outstanding);
  const [method, setMethod] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    if (!amount.trim() || !method || !date) return;

    onSave({
      advance_amount: parseFloat(amount),
      payment_method_id:method,
      advance_pay_date: date.toISOString().split('T')[0]
    });

    setAmount('');
    setMethod('');
    setDate(new Date());
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Add Pre-Payment</Text>
          <Text style={styles.note}>
            This invoice has £{outstanding} outstanding.
          </Text>

          <Text style={styles.label}>Payment Amount</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder={outstanding}
          />

          <Text style={styles.label}>Payment Method</Text>
          <Dropdown
            style={styles.dropdown}
            data={paymentMethods}
            labelField="label"
            valueField="value"
            placeholder="Select method"
            value={method}
            onChange={(item) => setMethod(item.value)}
          />

          <Text style={styles.label}>Payment Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateText}>
              {date.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                }
                setShowPicker(false);
              }}
            />
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveText}>Save Advance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPaymentModal;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('5%')
  },
  header: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#1E2A38',
    marginBottom: hp('1%')
  },
  note: {
    fontSize: wp('4%'),
    color: '#555',
    marginBottom: hp('2%')
  },
  label: {
    fontSize: wp('4%'),
    marginTop: hp('2%'),
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.2%'),
    fontSize: wp('4%'),
    marginTop: hp('0.5%')
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.2%'),
    marginTop: hp('0.5%')
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    marginTop: hp('0.5%')
  },
  dateText: {
    fontSize: wp('4%'),
    color: '#333'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: hp('3%')
  },
  cancelButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: wp('2%')
  },
  cancelText: {
    fontSize: wp('4%'),
    color: '#333'
  },
  saveButton: {
    backgroundColor: '#0C5D73',
    borderRadius: 8,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%')
  },
  saveText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: '500'
  }
});
