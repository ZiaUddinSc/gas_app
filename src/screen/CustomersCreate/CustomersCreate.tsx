import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import Color from '../../theme/Colors';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-element-dropdown';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Home,
  Save,
  X,
  ArrowLeft,
  PlusCircle,
  CheckCircle,
  XCircle,
  User,
  Building,
  Hash,
  MapPin,
  Smartphone,
  Phone,
  Mail,
  Mails,
  NotebookPen,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles'; // Assuming you have a styles.ts file
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {GetTitle} from '../../helper/GetApiHelper';
import {
  CreateCustomer,
  CreateCustomerContactInfo,
  CreateCustomerProperty,
} from '../../helper/CustomerHelper';

import Settings from '../../config/settings.js';

import CustomPlacesSearch from '../../components/CustomPlacesSearch';

const CustomersCreate = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const formikRef = useRef(null);
  const titleRef = useRef(null);

  const scrollRef = useRef(null);
  const fullNameRef = useRef(null);
  const addressLine1Ref = useRef(null);
  const addressLine2Ref = useRef(null);
  const townCityRef = useRef(null);
  const postCodeRef = useRef(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    fullName: Yup.string().required('Full Name is required'),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    // addressLine2: Yup.string().required('Address Line 2 is required'),
    // townCity: Yup.string().required('Town/City is required'),
    // postCode: Yup.string().required('Post Code  is required'),
  });
  const [title, setTitle] = useState<any[]>([]);
  const googlePlacesRef = React.useRef(null);
  useFocusEffect(
    useCallback(() => {
      fetchTitle();
      if (googlePlacesRef.current) {
        googlePlacesRef.current.setAddressText('');
      }
    }, []),
  );

  const fetchTitle = async () => {
    try {
      const res = await GetTitle();
      if (res) {
        setTitle(res.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSubmit = async (values: any) => {
    const customerPayload = {
      title_id: values?.title,
      full_name: values?.fullName,
      company_name: values?.companyName,
      vat_no: values?.vatNo,
      address_line_1: values?.addressLine1,
      address_line_2: values.addressLine2,
      postal_code: values?.postCode,
      state: values?.state,
      city: values?.townCity,
      country: values?.country,
      latitude: values?.latitude,
      longitude: values?.longitude,
      note: values?.note,
      auto_reminder: values?.automaticRevenue ? 1 : 0,
      mobile: values?.mobile,
      phone: values?.phone,
      email: values?.email,
      // other_email: values?.other_email,
    };
    const customerRes = await CreateCustomer(customerPayload);
    if (customerRes && customerRes?.data?.customer?.id) {
      Alert.alert(
        '✅ Success',
        customerRes?.message || 'Customer successfully created.',
      );
      navigation.goBack();
    } else {
      Alert.alert('❌ Error', 'Customer creation failed.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={Color.primaryBGColor}
        barStyle="light-content"
      />
      <CustomHeader
        title="New Customer"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareContentContainer}
        enableOnAndroid={true}
        extraScrollHeight={hp(20)}
        keyboardShouldPersistTaps="handled">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled">
          <Formik
            innerRef={formikRef}
            initialValues={{
              title: '',
              fullName: '',
              companyName: '',
              vatNo: '',
              addressLine1: '',
              addressLine2: '',
              townCity: '',
              countyState: '',
              country: '',
              postCode: '',
              latitude: '',
              longitude: '',
              mobile: '',
              phone: '',
              email: '',
              // other_email: '',
              note: '',
              automaticRevenue: true,
            }}
            handleSubmit
            onSubmit={values => handleSubmit(values)}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              validateForm,
              setTouched,
              setFieldTouched,
            }) => (
              <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={[styles.inputGroup]}>
                  <Text style={styles.label}>
                    Title <Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TitlePicker', {
                        data: title, // your title list
                        onSelect: item => setFieldValue('title', item.id),
                      });
                    }}>
                    {/* <Text>
                      {title.find(t => t.id === values.title)?.name ||
                        'Please Select Title'}
                    </Text> */}
                    <TextInput
                      style={styles.input}
                      placeholder="Select Title"
                      placeholderTextColor="#000"
                      value={title.find(t => t.id === values.title)?.name}
                      editable={false}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      ref={titleRef}
                    />
                  </TouchableOpacity>
                  {touched.title && errors.title && (
                    <Text style={{color: 'red', fontSize: 12}}>
                      {errors.title}
                    </Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Full Name <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Full Name"
                    placeholderTextColor="#A0A0A0"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    ref={fullNameRef}
                  />
                  <User
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                  {errors.fullName && touched.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Company Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Company Name"
                    placeholderTextColor="#A0A0A0"
                    value={values.companyName}
                    onChangeText={handleChange('companyName')}
                    onBlur={handleBlur('companyName')}
                  />
                  <Building
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>VAT No</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter VAT No"
                    placeholderTextColor="#A0A0A0"
                    value={values.vatNo}
                    onChangeText={handleChange('vatNo')}
                    onBlur={handleBlur('vatNo')}
                  />
                  <Hash
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                </View>

                <Text style={styles.sectionTitle}>Address</Text>

                <View>
                  <View style={styles.inputGroup}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('AddressAdd', {
                          initialValues: values,
                          onSelectAddress: data => {
                            setFieldValue('addressLine1', data.address_line_1);
                            setFieldValue('addressLine2', data.address_line_2);
                            setFieldValue('townCity', data.city);
                            setFieldValue('country', data.country);
                            setFieldValue('postCode', data.postal_code);
                            setFieldValue('countyState', data.state);
                            setFieldValue('latitude', data.latitude);
                            setFieldValue('longitude', data.longitude);

                            setFieldValue('state', data.state);
                            validateForm();
                            setTouched({});
                          },
                        });
                      }}
                      style={{flex: 1}}>
                      <TextInput
                        style={[styles.input, {fontSize: hp(1.6)}]}
                        placeholder="Select Address Lookup"
                        placeholderTextColor="#A0A0A0"
                        // value={values.add}
                        editable={false}
                        value={
                          values.addressLine1
                            ? `${values.addressLine1}${
                                values.addressLine2
                                  ? ', ' + values.addressLine2
                                  : ''
                              }${
                                values.townCity ? ', ' + values.townCity : ''
                              }${values.country ? ', ' + values.country : ''}`
                            : ''
                        }
                      />
                    </TouchableOpacity>

                    <MapPin
                      color="green"
                      size={20}
                      style={{position: 'absolute', right: wp(2), top: wp(3)}}
                    />
                    {errors.addressLine1 && touched.addressLine1 && (
                      <Text style={styles.errorText}>
                        Please Select Address
                      </Text>
                    )}
                  </View>
                </View>
                {values.addressLine1 ? (
                  <View style={{marginBottom: 5}}>
                    <Text style={styles.addressText}>
                      {values.addressLine1
                        ? `${values.addressLine1}${
                            values.addressLine2
                              ? ', ' + values.addressLine2
                              : ''
                          }${values.townCity ? ', ' + values.townCity : ''}${
                            values.countyState ? ', ' + values.countyState : ''
                          }${values.postCode ? ', ' + values.postCode : ''}`
                        : ''}
                    </Text>
                  </View>
                ) : null}

                {/* <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Address Line 1<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    ref={addressLine1Ref}
                    placeholder="Enter Address Line 1"
                    placeholderTextColor="#A0A0A0"
                    value={values.addressLine1}
                    onChangeText={handleChange('addressLine1')}
                    onBlur={handleBlur('addressLine1')}
                  />
                  {errors.addressLine1 && touched.addressLine1 && (
                    <Text style={styles.errorText}>{errors.addressLine1}</Text>
                  )}
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Address Line 2<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    ref={addressLine2Ref}
                    style={styles.input}
                    placeholder="Enter Address Line 2 "
                    placeholderTextColor="#A0A0A0"
                    value={values.addressLine2}
                    onChangeText={handleChange('addressLine2')}
                    onBlur={handleBlur('addressLine2')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                  {errors.addressLine2 && touched.addressLine2 && (
                    <Text style={styles.errorText}>{errors.addressLine2}</Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Town/City<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    ref={townCityRef}
                    placeholder="Enter Town/City"
                    placeholderTextColor="#A0A0A0"
                    value={values.townCity}
                    onChangeText={handleChange('townCity')}
                    onBlur={handleBlur('townCity')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                  {errors.townCity && touched.townCity && (
                    <Text style={styles.errorText}>{errors.townCity}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Region/Country</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Region/Country"
                    placeholderTextColor="#A0A0A0"
                    value={values.countyState}
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Post Code<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    ref={postCodeRef}
                    style={styles.input}
                    placeholder="Enter Post Code"
                    placeholderTextColor="#A0A0A0"
                    value={values.postCode}
                    onChangeText={handleChange('postCode')}
                    onBlur={handleBlur('postCode')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                  {errors.postCode && touched.postCode && (
                    <Text style={styles.errorText}>{errors.postCode}</Text>
                  )}
                </View> */}

                <Text style={styles.sectionTitle}>Contact Information</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mobile</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Mobile No."
                    placeholderTextColor="#A0A0A0"
                    value={values.mobile}
                    onChangeText={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    keyboardType="phone-pad"
                  />
                  <Smartphone
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Phone No."
                    placeholderTextColor="#A0A0A0"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType="phone-pad"
                  />
                  <Phone
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Email Address"
                    placeholderTextColor="#A0A0A0"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                  />
                  <Mail
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
                {/* <View style={styles.inputGroup}>
                  <Text style={styles.label}>Other Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Other Email Address"
                    placeholderTextColor="#A0A0A0"
                    value={values.other_email}
                    onChangeText={handleChange('other_email')}
                    onBlur={handleBlur('other_email')}
                    keyboardType="email-address"
                  />
                  <Mails
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), top: wp(9)}}
                  />
                  {errors.other_email && touched.other_email && (
                    <Text style={styles.errorText}>{errors.other_email}</Text>
                  )}
                </View> */}

                <Text style={styles.sectionTitle}>Note</Text>
                <View style={styles.inputGroup}>
                  <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Enter Note (Optional)"
                    placeholderTextColor="#A0A0A0"
                    multiline
                    numberOfLines={4}
                    value={values.note}
                    onChangeText={handleChange('note')}
                    onBlur={handleBlur('note')}
                  />
                  <NotebookPen
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), bottom: wp(3)}}
                  />
                </View>

                {/* Automatic Revenue? Switch */}
                {/* <Text style={[styles.sectionTitle, {marginTop: hp(4)}]}>
                  Automatic Remainder?
                </Text> */}
                {/* <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: '#F2F0EF',
                        paddingBottom: 10,
                      },
                    ]}
                    onPress={() => setFieldValue('automaticRevenue', true)}>
                    <Text style={styles.radioLabel}>Yes</Text>
                    <View
                      style={[
                        styles.radioOuter,
                        values.automaticRevenue && styles.radioOuterActive,
                      ]}>
                      {values.automaticRevenue && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => setFieldValue('automaticRevenue', false)}>
                    <Text style={styles.radioLabel}>No</Text>
                    <View
                      style={[
                        styles.radioOuter,
                        !values.automaticRevenue && styles.radioOuterActive,
                      ]}>
                      {!values.automaticRevenue && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View> */}

                <View style={styles.switchContainer}>
                  <Text style={styles.label}>Automatic Remainder?</Text>
                  <Switch
                    value={values.automaticRevenue}
                    onValueChange={newValue =>
                      setFieldValue('automaticRevenue', newValue)
                    }
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={values.automaticRevenue ? '#ffffff' : '#f4f3f4'}
                  />
                </View>

                {/* <View style={styles.switchContainer}>
                  <Text style={styles.label}>Automatic Revenue?</Text>
                  <Switch
                    value={values.automaticRevenue}
                    onValueChange={newValue =>
                      setFieldValue('automaticRevenue', newValue)
                    }
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={values.automaticRevenue ? '#f4f3f4' : '#f4f3f4'}
                  />
                </View> */}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={async () => {
                      // formikRef.current.handleSubmit(); // If no errors, submit
                      handleSubmit();
                      if (!values.fullName) {
                        fullNameRef.current.focus();
                        return;
                      } else if (!values.addressLine1) {
                        addressLine1Ref.current.focus();
                        return;
                      } else if (!values.addressLine2) {
                        addressLine2Ref.current.focus();
                        return;
                      } else if (!values.townCity) {
                        townCityRef.current.focus();
                        return;
                      } else if (!values.postCode) {
                        postCodeRef.current.focus();
                        return;
                      }

                      // if (validationErrors.addressLine1 === '') {
                      //          addressLine1Ref.current.focus();
                      //          return;
                      //   }

                      // if (validationErrors) {
                      //   if (validationErrors.title) {
                      //     titleRef.current.measureLayout(
                      //       scrollRef.current,
                      //       (x, y) => {
                      //         scrollRef.current.scrollTo({y, animated: true});
                      //       },
                      //     );
                      //     return;
                      //   } else if (validationErrors.addressLine1 === '') {
                      //     addressLine1Ref.current.focus();
                      //     return;
                      //   } else if (validationErrors.addressLine2 === '') {
                      //     addressLine2Ref.current.focus();
                      //     return;
                      //   } else if (validationErrors.townCity === '') {
                      //     townCityRef.current.focus();
                      //     return;
                      //   } else if (validationErrors.postCode === '') {
                      //     postCodeRef.current.focus();
                      //     return;
                      //   }
                      // }
                    }}>
                    <Text style={styles.saveButtonText}>Save Customer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CustomersCreate;
