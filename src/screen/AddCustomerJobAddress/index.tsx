import React from 'react';
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
import {Formik} from 'formik';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomPlacesSearch from '../../components/CustomPlacesSearch';
import {ArrowLeft, MapPin} from 'lucide-react-native';
import Toast from 'react-native-toast-message';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors';
import styles from './styles';
import {CreateCustomerProperty} from '../../helper/CustomerHelper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const Index = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {customerId} = route.params;

  const handleAddCustomerJobAddAddress = async (values: any) => {
    const payload = {
      customer_id: customerId,
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      city: values.city,
      state: values.state,
      country: values.country,
      latitude: values.latitude,
      longitude: values.longitude,
      postal_code: values.postal_code,
    };
    const res = await CreateCustomerProperty(payload);
    if (res?.data.hasOwnProperty('id')) {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.message|| `Customer Address Created`,
            position: 'top',
          });
      navigation.goBack();
    } else {
    //   Alert.alert('Error', 'Failed to create address');
    }
  };

  return (
    <KeyboardAvoidingView
    style={{flex: 1, backgroundColor: Color.primaryBGColor}}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <CustomHeader
      title="Create Customer Job Address"
      fontSize={hp(2.2)}
      leftIcon={<ArrowLeft size={24} color="white" />}
      onLeftPress={() => navigation.goBack()}
    />
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={hp(22)}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Formik
            initialValues={{}}
            onSubmit={handleAddCustomerJobAddAddress}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <>
                <View style={styles.inputGroup}>
                  <CustomPlacesSearch
                    onSelect={data => {
                      setFieldValue('address_line_1', data.address_line_1);
                      setFieldValue('address_line_2', data.address_line_2);
                      setFieldValue('city', data.city);
                      setFieldValue('country', data.country);
                      setFieldValue('state', data.county);
                      setFieldValue('postal_code', data.postcode);
                      setFieldValue('latitude', data.lat);
                      setFieldValue('longitude', data.lng);
                    }}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{
                      position: 'absolute',
                      right: wp(2),
                      bottom: wp(3),
                    }}
                  />
                </View>

                {[
                  {key: 'address_line_1', label: 'Address Line 1'},
                  {key: 'address_line_2', label: 'Address Line 2'},
                  {key: 'city', label: 'Town/City'},
                  {key: 'state', label: 'Region/County'},
                  {key: 'postal_code', label: 'Post Code'},
                ].map(field => (
                  <View style={styles.inputGroup} key={field.key}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TextInput
                      value={values[field.key]}
                      onChangeText={handleChange(field.key)}
                      onBlur={handleBlur(field.key)}
                      placeholder={field.label}
                      placeholderTextColor="black"
                      style={styles.input}
                    />
                    <MapPin
                      color="green"
                      size={20}
                      style={{
                        position: 'absolute',
                        right: wp(2),
                        bottom: wp(3),
                      }}
                    />
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  </KeyboardAvoidingView>
  );
};

export default Index;
