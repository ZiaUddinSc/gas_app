import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActionSheetIOS,
  Switch,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
} from 'react-native';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AlertCircle,
  CheckCircle,
  MapPin,
  Phone,
  FileText,
  Check,
  X,
  ArrowLeft,
} from 'lucide-react-native';
import Svg, {Path} from 'react-native-svg';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Color from '../../theme/Colors';
import CustomInput from '../../components/CustomInput1/CustomInput';
import RadioButton from '../../components/RadioButton/RadioButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  organizationName: Yup.string().required('Organization name is required'),
  // companyEmail: Yup.string()
  //   .email('Invalid email')
  //   .required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  addressLine1: Yup.string().required('Address Line 1 is required'),
  townCity: Yup.string().required('Town is required'),
  country: Yup.string().required('County is required'),
  postCode: Yup.string().required('Post Code is required'),
  gasSafeRegistrationNumber: Yup.string().required(
    'Gas Safe Registration Number is required',
  ),
  gasSafeIdCardNumber: Yup.string().required(
    'Gas Safe ID Card Number is required',
  ),
});

import styles from './styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import CustomPlacesSearch from '../../components/CustomPlacesSearch';
import Toast from 'react-native-toast-message';
import {CompanUserUpdate, CompanyStore} from '../../helper/AuthHelper';

const CompanyInformationForm = ({navigation}) => {
  const [isVatRegistered, setIsVatRegistered] = useState(false);
  const [businessType, setBusinessType] = useState(null);
  const [signatureSvg, setSignatureSvg] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.signature) {
        setSignatureImage(route.params.signature);
      }
    }, [route.params?.signature]),
  );

  const initialValues = {
    organizationName: '',
    phoneNumber: '',
    // companyEmail: '',
    RegistrationNumber: '',
    addresLookup: '',
    addressLine1: '',
    addressLine2: '',
    townCity: '',
    country: '',
    postCode: '',
    gasSafeRegistrationNumber: '',
    gasSafeIdCardNumber: '',
    countyState: '',
    vatRegistrationNumber: '',
  };

  const handleSubmit = async (values, {setSubmitting, resetForm}) => {
   
    let token = route.params?.token || null;
    let user = route.params?.user || null;
    await AsyncStorage.setItem('userToken', token);
    if (signatureImage === null) {
      Toast.show({
        type: 'error',
        text1: 'Required Signature',
        text2: 'Please Add your signature',
        position: 'top',
        visibilityTime: 3000,
      });
    } else {
      try {
        setSubmitting(true);

        const payload = {
          company_name: values.organizationName,
          company_registration: values.RegistrationNumber,
          // company_email: values.companyEmail,
          company_phone: values.phoneNumber,
          company_address_line_1: values.addressLine1,
          company_city: values.townCity,
          company_state: values.countyState,
          company_postal_code: values.postCode,
          company_country: values.country,
          business_type: businessType,
          gas_safe_registration_no: values.gasSafeRegistrationNumber,
          gas_safe_id_card: values.gasSafeIdCardNumber,
          sign: signatureImage,
          vat_number: values.vatRegistrationNumber,
        };

        let user_update = {
          id: user.id,
          name: user.name,
          email: user.email,
          first_login: 0,
        };
       
        const res = await CompanyStore(payload, token);
        console.log('Company Information Response:', res);
        if (res?.data?.data?.company_name) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.data?.message || 'Company information saved successfully!',
            position: 'top',
            visibilityTime: 3000,
          });

          const userRes = await CompanUserUpdate(user_update, token, user.id);

          if (userRes?.data.success === true) {
           
            resetForm();
            setIsVatRegistered(false);
            setBusinessType(null);
            setSignatureSvg(null);
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(user));
            navigation.navigate('Dashboard');
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              res.errors || 'Something went wrong while saving company info.',
            position: 'top',
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: error.message || 'Please check your internet connection.',
          position: 'top',
          visibilityTime: 3000,
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handlePermission = async type => {
    let permission;
    if (type === 'camera') {
      permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;
    } else {
      permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }

    const status = await check(permission);

    if (status === RESULTS.GRANTED) return true;

    const requestStatus = await request(permission);
    return requestStatus === RESULTS.GRANTED;
  };

  const showImagePickerOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        async buttonIndex => {
          if (buttonIndex === 1) await takePhoto();
          if (buttonIndex === 2) await pickImage();
        },
      );
    } else {
      Alert.alert('Upload Signature', 'Choose an option', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Take Photo', onPress: async () => await takePhoto()},
        {text: 'Choose from Library', onPress: async () => await pickImage()},
      ]);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await handlePermission('camera');
    if (!hasPermission) return;

    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    });

    handleImageResult(result);
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        console.log('User cancelled');
      } else if (result.errorCode) {
        console.log('Error code:', result.errorCode);
        console.log('Error message:', result.errorMessage);
      } else if (result.assets) {
        setSignatureImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Full error:', error);
    }
  };

  const handleImageResult = result => {
    if (result.didCancel) {
      console.log('User cancelled');
    } else if (result.errorCode) {
      Alert.alert('Error', 'Failed to get image');
    } else if (result.assets) {
      setSignatureImage(result.assets[0].uri);
      Alert.alert('Success', 'Signature added successfully');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Company Information"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.navigate('SignUp')}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContentContainer}
        enableOnAndroid={true}
        extraScrollHeight={hp(22)}
        keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({handleSubmit, isSubmitting, setFieldValue, values}) => (
            <>
              <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Company Information</Text>

                {/* Organization/Company Name */}
                <CustomInput
                  label="Organization/Company Name *"
                  name="organizationName"
                  placeholder="Organization/Company Name"
                  icon={FileText}
                />

                {/* Company Email */}
                {/* <CustomInput
                  label="Company Email *"
                  name="companyEmail"
                  placeholder="example@company.com"
                  keyboardType="email-address"
                  icon={FileText}
                /> */}
                {/* Phone Number */}
                <CustomInput
                  label="Phone Number *"
                  name="phoneNumber"
                  placeholder="+44 123 456 7890"
                  keyboardType="phone-pad"
                  icon={Phone}
                />

                {/* Business Type */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Business Type *</Text>
                  <View style={styles.radioGroup}>
                    <RadioButton
                      label="Sole trader"
                      value="soleTrader"
                      selectedValue={businessType || ''}
                      onSelect={setBusinessType}
                    />
                    <RadioButton
                      label="Company"
                      value="company"
                      selectedValue={businessType || ''}
                      onSelect={setBusinessType}
                    />
                    <RadioButton
                      label="Other"
                      value="other"
                      selectedValue={businessType || ''}
                      onSelect={setBusinessType}
                    />
                  </View>
                  {!businessType && (
                    <View style={styles.errorContainer}>
                      <AlertCircle
                        size={16}
                        color="red"
                        style={styles.errorIcon}
                      />
                      <Text style={styles.errorText}>
                        Business Type is required
                      </Text>
                    </View>
                  )}
                </View>
                {businessType === 'company' && (
                  <CustomInput
                    label="Registration Number *"
                    name="RegistrationNumber"
                    placeholder="Registration Number"
                    icon={FileText}
                  />
                )}
              </View>
              <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Contact Details</Text>

                {/* addresLookup */}
                {/* <CustomInput
                    label="Address Lookup"
                    name="addresLookup"
                    placeholder="123 Main Street"
                  /> */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Address Lookup</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddressAdd', {
                        initialValues: values,
                        onSelectAddress: data => {
                          setFieldValue('countyState', data.state);
                          setFieldValue('latitude', data.latitude);
                          setFieldValue('longitude', data.longitude);
                          setFieldValue('townCity', data.city);
                          setFieldValue('state', data.state);
                          setFieldValue('country', data.country);
                          setFieldValue('postCode', data.postal_code);
                          setFieldValue('addressLine2', data.address_line_2);
                          setFieldValue('addressLine1', data.address_line_1);
                        },
                      });
                    }}
                    style={{flex: 1}}>
                    <TextInput
                      style={styles.input}
                      placeholder="Select Address Lookup"
                      placeholderTextColor="#484848ff"
                      // value={values.add}
                      editable={false}
                      value={
                        values.addressLine1
                          ? `${values.addressLine1}${
                              values.addressLine2
                                ? ', ' + values.addressLine2
                                : ''
                            }${values.townCity ? ', ' + values.townCity : ''}${
                              values.country ? ', ' + values.country : ''
                            }`
                          : ''
                      }
                    />
                  </TouchableOpacity>
                </View>
                {/* <CustomPlacesSearch
                    onSelect={data => {
                      setFieldValue('countyState', data.address);
                      setFieldValue('latitude', data.lat);
                      setFieldValue('longitude', data.lng);
                      setFieldValue('townCity', data.city);
                      setFieldValue('country', data.county);
                      setFieldValue('postCode', data.postcode);
                      setFieldValue('addressLine2', data.addressLine2);
                      setFieldValue('addressLine1', data.addressLine1);
                    }}
                  /> */}
                {/* Address Line 1 */}
                <CustomInput
                  label="Address Line 1 *"
                  name="addressLine1"
                  placeholder="Address Line 1"
                  velue={values.addressLine1}
                />

                {/* Address Line 2 */}
                <CustomInput
                  label="Address Line 2"
                  name="addressLine2"
                  placeholder="Address Line 2"
                  icon={MapPin}
                  value={values.addressLine2}
                />

                {/* Town */}
                <CustomInput
                  label="Town *"
                  name="town"
                  placeholder="Town/City"
                  icon={MapPin}
                  value={values.townCity}
                />

                {/* County */}
                <CustomInput
                  label="County *"
                  name="county"
                  placeholder="County"
                  icon={MapPin}
                  value={values.country}
                />

                {/* Post Code */}
                <CustomInput
                  label="Post Code *"
                  name="postCode"
                  placeholder="Post Code"
                  icon={undefined}
                  value={values.postCode}
                />
              </View>
              <View style={[styles.formContainer, {marginBottom: hp(6)}]}>
                <Text style={styles.sectionTitle}>Other Information</Text>

                {/* Gas Safe Registration Number */}
                <CustomInput
                  label="Gas Safe Registration Number *"
                  name="gasSafeRegistrationNumber"
                  placeholder="Gas Safe Registration Number"
                  icon={undefined}
                />

                {/* Gas Safe ID Card Number */}
                <CustomInput
                  label="Gas Safe ID Card Number *"
                  name="gasSafeIdCardNumber"
                  placeholder="Gas Safe ID Card Number"
                  icon={undefined}
                />

                {/* VAT Registered */}
                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={
                      isVatRegistered ? Color.primaryBGColor : '#f4f3f4'
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setIsVatRegistered}
                    value={isVatRegistered}
                  />
                  <Text style={styles.switchLabel}>VAT Registered</Text>
                </View>

                {isVatRegistered ? (
                  <CustomInput
                    label="VAT Registration Number *"
                    name="vatRegistrationNumber"
                    placeholder="VAT Registration Number"
                    icon={FileText}
                  />
                ) : null}

                {signatureImage && (
                  <Image
                    source={{uri: signatureImage}}
                    style={styles.previewImage}
                  />
                )}
                {/* Signature */}
                <View style={styles.signatureContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('SignatureScreen', {
                        onSelect: signature => {
                          setSignatureImage(signature);
                        },
                        titleData: 'Company Information',
                      })
                    }>
                    <Text style={styles.buttonText}>Add Signature</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={styles.button}
                    onPress={showImagePickerOptions}>
                    <Text style={styles.buttonText}>Upload Signature</Text>
                  </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}>
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? 'Saving...' : 'Save and Exit'}
                  </Text>
                  {isSubmitting && (
                    <CheckCircle
                      style={styles.submitIcon}
                      color="#fff"
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CompanyInformationForm;
