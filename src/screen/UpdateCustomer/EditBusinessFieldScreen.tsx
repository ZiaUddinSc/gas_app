import React, { useState, useEffect } from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
const fieldLabels = {
  company_name: 'Company Name',
  vat_no: 'VAT Number',
};

const EditBusinessFieldScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { field, initialValue, customerId, fetchCustomer } = route.params;

  const [value, setValue] = useState(initialValue || '');

  const handleFieldUpdate = async () => {
    const payload = { [field]: value };
    const res = await CustomerUpdate(customerId, payload);
    if (res.message === 'Customer successfully updated.') {
      fetchCustomer?.();
      navigation.goBack();
    } else {
      Alert.alert('Update Failed', 'Please try again later.');
    }
  };

  return (
     <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          extraScrollHeight={hp(22)}
          keyboardShouldPersistTaps="handled">
            <CustomHeader
        title="Edit Customer"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{fieldLabels[field]}</Text>

          <TextInput
            style={styles.input}
            value={value}
            placeholder={`Enter ${fieldLabels[field]}`}
            onChangeText={setValue}
            placeholderTextColor="black"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleFieldUpdate}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
        </KeyboardAwareScrollView>
  );
};

export default EditBusinessFieldScreen;
