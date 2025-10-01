import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors';

import Toast from 'react-native-toast-message';
import styles from './AddressModalStyles';
import {CustomerJobAddressUpdate} from '../../helper/CustomerHelper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { ArrowLeft } from 'lucide-react-native';

const fieldLabels: Record<string, string> = {
  note: 'Note',
  occupant_name: 'Occupant Name',
  occupant_email: 'Occupant Email',
  occupant_phone: 'Occupant Phone',
  due_date: 'Due Date',
};

const EditJobAddressFieldScreen = () => {
  const navigation = useNavigation();

const route = useRoute();
const {
  field,
  initialValue,
  jobId,
  customer,
  job,
  fetchAddress,
} = route.params;


 const [showDatePicker, setShowDatePicker] = useState(false);
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  const isDateField = field === 'due_date';
  const isMultiline = field === 'note';

  const buildPayload = () => {
    const payload = {
      address_line_1: customer?.address_line_1 || '',
      address_line_2: customer?.address_line_2 || '',
      postal_code: customer?.postal_code || '',
      city: customer?.city || '',
      state: customer?.state || '',
      country: customer?.country || '',
      latitude: customer?.latitude || '',
      longitude: customer?.longitude || '',
      note: job?.note || '',
      occupant_name: job?.occupant_name || '',
      occupant_email: job?.occupant_email || '',
      occupant_phone: job?.occupant_phone || '',
      due_date: job?.due_date || '',
    };

    payload[field] = value;
    return payload;
  };

  const handleSubmit = async () => {
    const payload = buildPayload();
    console.log('dddf',payload)
    const res = await CustomerJobAddressUpdate(jobId, payload);

    if (res?.success) {
      fetchAddress?.();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: res?.message || `${fieldLabels[field]} updated.`,
        position: 'top',
      });
      navigation.goBack();
    } else if (res?.errors) {
      const firstField = Object.keys(res.errors)[0];
      const firstMessage =
        res.errors[firstField]?.[0] || 'Validation error occurred';
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: firstMessage,
        position: 'top',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again later.',
        position: 'top',
      });
    }
  };


    const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0];
      setValue(isoDate);
    }
  };

  return (
     <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <CustomHeader
        title="Edit Job Address"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>
            {fieldLabels[field] || 'Edit Field'}
          </Text>

       {isDateField ? (
            <>
              <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateBox}>
                <Text style={styles.dateText}>{value || 'Select a date'}</Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </>
          ) : (
            <TextInput
              style={[styles.input, isMultiline && styles.multilineInput]}
              value={value}
              onChangeText={setValue}
              multiline={isMultiline}
              placeholder={`Enter ${fieldLabels[field]}`}
              keyboardType={
                field === 'occupant_email'
                  ? 'email-address'
                  : field === 'occupant_phone'
                  ? 'phone-pad'
                  : 'default'
              }
              placeholderTextColor="black"
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditJobAddressFieldScreen;
