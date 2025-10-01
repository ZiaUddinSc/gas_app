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
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../../theme/Colors';
import styles from './styles';
import {
  AddCustomerContactInfo,
  CustomerContactInfoUpdate,
} from '../../../helper/CustomerHelper';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import { ArrowLeft } from 'lucide-react-native';

const EditCustomerContactScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {initialValues, customerId, fetchCustomer} = route.params;

  const [form, setForm] = useState(initialValues);

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleContactUpdate = async () => {
    try {
      if (!form.id || form.id === 0) {
        const payload = {...form, customer_id: customerId};
        const res = await AddCustomerContactInfo(payload);
        if (res.data) {
          fetchCustomer?.();
          Toast.show({
            type: 'success',
            text1: 'Contact Info Added',
            text2: 'Customer contact added successfully.',
            position: 'top',
          });
          navigation.goBack();
        }
      } else {
        const res = await CustomerContactInfoUpdate(customerId, form);
        if (res?.success) {
          fetchCustomer?.();
          Toast.show({
            type: 'success',
            text1: 'Contact Info Updated',
            text2: res?.message || 'Customer contact updated successfully.',
            position: 'top',
          });
          navigation.goBack();
        } else if (res?.errors) {
          const firstKey = Object.keys(res.errors)[0];
          const firstMessage = res.errors[firstKey]?.[0] || 'Validation error';
          Toast.show({
            type: 'error',
            text1: 'Update Failed',
            text2: firstMessage,
            position: 'top',
          });
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Unexpected Error',
        text2: 'Please try again later.',
        position: 'top',
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={hp(22)}
      keyboardShouldPersistTaps="handled">
       <CustomHeader
        title="Edit Contact Info"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Contact Info</Text>

          {[
            {key: 'mobile', label: 'Mobile', keyboardType: 'phone-pad'},
            {key: 'phone', label: 'Phone', keyboardType: 'phone-pad'},
            {key: 'email', label: 'Email', keyboardType: 'email-address'}
            // {
            //   key: 'other_email',
            //   label: 'Other Email',
            //   keyboardType: 'email-address',
            // },
          ].map(field => (
            <View style={styles.inputGroup} key={field.key}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                value={form[field.key]}
                keyboardType={field.keyboardType}
                onChangeText={val => handleChange(field.key, val)}
              />
            </View>
          ))}

          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleContactUpdate}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default EditCustomerContactScreen;
