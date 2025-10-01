import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors';

import styles from './styles';
import { CustomerUpdate } from '../../helper/CustomerHelper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { ArrowLeft } from 'lucide-react-native';

const EditCustomerNoteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialNote, customerId, fetchCustomer } = route.params;

  const [note, setNote] = useState(initialNote || '');

  const handleNoteUpdate = async () => {
    const res = await CustomerUpdate(customerId, { note });
    if (res.message === 'Customer successfully updated.') {
      fetchCustomer?.();
      navigation.goBack();
    } else {
      Alert.alert('Update Failed', 'Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <CustomHeader
        title="Edit Customer"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Customer Note</Text>

          <TextInput
            style={styles.largeInput}
            placeholder="Enter customer note"
            multiline
            numberOfLines={6}
            value={note}
            onChangeText={setNote}
            placeholderTextColor="black"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleNoteUpdate}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditCustomerNoteScreen;
