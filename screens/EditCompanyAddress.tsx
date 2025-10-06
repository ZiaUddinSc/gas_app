import React, {
  useState,
  useCallback,
  useReducer,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomPlacesSearch from '../components/CustomPlacesSearch';
import {reducer} from '../utils/reducers/formReducers';
import PhoneInput from 'react-native-phone-number-input';

// import {ArrowLeft, MapPin} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../theme/ThemeProvider';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {validateSignupInput} from '../utils/actions/formActions';

import ButtonFilled from '../components/ButtonFilled';
import {parseFullNumber} from '../helper/customMethods';
import Input from '../components/Input';
import {CustomerJobAddressUpdate} from '../helper/CustomerHelper';
import { UpdateCompanySettings } from '../helper/UserHelper';

const initialFormState = {
  inputValues: {
    name: '',
    company_registration: '',
    vat_number: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  inputValidities: {
    name: false,
    company_registration: false,
    vat_number: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  formIsValid: false,
};

const EditCompanyAddress = ({route}) => {
  const navigation = useNavigation();
  const [isCheckOccupiedDetails, setIsCheckOccupiedDetails] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialFormState);
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [formattedPhoneNo, setFormattedPhoneNo] = useState<string>('');
  const phoneInput = useRef<PhoneInput>(null);
  const [countryCode, setCountryCode] = useState<string>('GB'); // default code

  const company = route?.params?.company;

  console.log('company',company)

  const {colors, dark} = useTheme();

  useEffect(() => {
   
  }, []);

  const toggleOccupiedEnabled = () => {
    setIsCheckOccupiedDetails(!isCheckOccupiedDetails);
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      //   const result = validateSignupInput(inputId, inputValue, {
      //     password: formState.inputValues.password,
      //     bussinessValue,
      //   });
      dispatchFormState({
        inputId,
        validationResult: false,
        inputValue,
      });
    },
    [dispatchFormState],
  );

  const onUpdateAddress = async values => {
    values['occupant_phone'] = formattedPhoneNo;
    const data = values;
    console.log(data)

    const payload = {
          company_name: company.company_name,
          business_type: company.business_type,
          display_company_name: company.display_company_name,
          vat_registered: company.vat_registered,
          vat_number: company.vat_number,
    
          gas_safe_registration_no: company.gas_safe_registration_no,
          registration_no: company.registration_no,
          register_body_id: company.register_body_id,
          registration_body_for_legionella:
            company.registration_body_for_legionella,
          registration_body_no_for_legionella:
            company.registration_body_no_for_legionella,
    
           company_phone: company.company_phone,
          company_web_site: company.company_web_site,
          company_tagline: company.company_tagline,
          company_email: company.company_email,
    
          company_address_line_1: data.address_line_1,
          company_address_line_2: data.address_line_2,
          company_city: data.city,
          company_state: data.state,
          company_postal_code: data.postal_code,
          company_country: data.country,
    
    
          bank_name: company.company_bank_details.bank_name,
          name_on_account: company.company_bank_details.bank_name,
          account_number: company.company_bank_details.account_number,
          sort_code: company.company_bank_details.sort_code,
          payment_term: company.company_bank_details.payment_term,
        };
    
        const res = await UpdateCompanySettings(company.id, payload);
        console.log('res=>>>', res);
    
        if (res && res.message === 'Company Settings updated successfully') {
          navigation.goBack();
        } else {
          let errorMsg = 'Please try again later.';
          if (res && res.message) {
            errorMsg = res.message;
          }
          Alert.alert('Update Failed', errorMsg);
        }
    
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, padding: 16, backgroundColor: colors.background}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="Edit Company Address" />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{flexGrow: 1}} // ✅ important
          keyboardShouldPersistTaps="handled">
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
              <Formik
                initialValues={{
                  // Address fields
                  address_line_1: company?.company_address_line_1 || '',
                  address_line_2: company?.company_address_line_2 || '',
                  city: company?.company_city || '',
                  state: company?.company_state || '',
                  postal_code: company?.company_postal_code || '',
                  country: company?.company_country || '',
                  latitude: company?.latitude || null,
                  longitude: company?.longitude || null,

                  // Occupant fields
                  
                }}
                onSubmit={values => {
                  onUpdateAddress(values);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => (
                  <>
                    {/* Location Search */}
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
                    </View>

                    {/* Manual Inputs */}
                    {[
                      {key: 'address_line_1', label: 'Address Line 1'},
                      {key: 'address_line_2', label: 'Address Line 2'},
                      {key: 'city', label: 'Town/City'},
                      {key: 'state', label: 'Region/County'},
                      {key: 'postal_code', label: 'Post Code'},
                    ].map(field => (
                      <View style={styles.inputGroup} key={field.key}>
                        <Input
                          value={values[field.key]}
                          onBlur={handleBlur(field.key)}
                          placeholder={field.label}
                          placeholderTextColor="#A0A0A0"
                          style={styles.input}
                          id={field.key} // ✅ use key, not value
                          onInputChanged={(id, text) => setFieldValue(id, text)}
                        />
                      </View>
                    ))}
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        margin: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginRight: 10,
                          color: dark ? COLORS.white : COLORS.grayscale700,
                        }}>
                        Add Occupier Details
                      </Text>
                      <Switch
                        value={isCheckOccupiedDetails}
                        thumbColor={isCheckOccupiedDetails ? 'green' : 'red'}
                        trackColor={{
                          false: '#EEEEEE',
                          true: dark ? COLORS.white : COLORS.grayscale700,
                        }}
                        ios_backgroundColor={
                          dark ? COLORS.white : COLORS.grayscale700
                        }
                        onValueChange={toggleOccupiedEnabled}
                      />
                    </View> */}
                    {/* {isCheckOccupiedDetails ? (
                      <View style={{marginTop: 5}}>
                        <Input
                          id="occupant_name"
                          onInputChanged={(id, text) => {
                            setFieldValue(id, text);
                          }}
                          errorText={formState.inputValidities['Name']}
                          placeholder="Name*"
                          value={values.occupant_name}
                          placeholderTextColor={
                            dark ? COLORS.grayTie : COLORS.black
                          }
                        />
                        <View
                          style={[
                            styles.inputContainer,
                            {
                              backgroundColor: dark
                                ? COLORS.dark2
                                : COLORS.greyscale500,
                              borderColor: dark
                                ? COLORS.dark2
                                : COLORS.greyscale500,
                            },
                          ]}>
                          <PhoneInput
                            ref={phoneInput}
                            value={phoneNo} // just number
                            defaultCode={countryCode as any} // set country code
                            layout="first"
                            onChangeText={text => {
                              setPhoneNo(text);
                            }}
                            textInputProps={{
                              placeholder: 'Phone Number',
                              placeholderTextColor: dark
                                ? COLORS.white
                                : COLORS.grayTie,
                              style: {
                                color: dark ? COLORS.white : COLORS.black,
                              }, // text color
                            }}
                            textInputStyle={{color: 'black'}} // 👈 Text color here
                            onChangeFormattedText={text => {
                              setFormattedPhoneNo(text);
                            }}
                            withDarkTheme={false} // disable built-in dark theme if customizing
                            withShadow={false}
                            autoFocus={false}
                            textContainerStyle={[
                              styles.textPhoneInput,
                              {
                                backgroundColor: dark
                                  ? COLORS.dark2
                                  : COLORS.greyscale500,
                              },
                            ]} // style the input field
                            codeTextStyle={[
                              styles.codeText,
                              {
                                color: dark
                                  ? COLORS.greyscale500
                                  : COLORS.dark2,
                              },
                            ]} // style the country code
                            containerStyle={[
                              styles.containerPhoneStyle,
                              {
                                borderColor: dark
                                  ? COLORS.dark2
                                  : COLORS.greyscale500,
                                backgroundColor: dark
                                  ? COLORS.dark2
                                  : COLORS.greyscale500,
                              },
                            ]} // outer wrapper
                            flagButtonStyle={{
                              backgroundColor: 'transparent',
                            }}
                            countryPickerProps={{
                              theme: 'dark', // "dark" or "light"
                              modalProps: {
                                animationType: 'slide',
                              },
                              withAlphaFilter: true,
                              withCallingCode: true,
                              // optionally customize text style
                              renderFlagButton: undefined, // optional
                            }}
                          />
                        </View>

                        <Input
                          id="occupant_email"
                          onInputChanged={(id, text) => setFieldValue(id, text)}
                          errorText={formState.inputValidities['email']}
                          placeholder="Email"
                          placeholderTextColor={
                            dark ? COLORS.grayTie : COLORS.black
                          }
                          value={values.occupant_email}
                          keyboardType="email-address"
                        />
                        <View
                          style={[
                            styles.inputTextContainer,
                            {
                              borderColor: dark
                                ? COLORS.dark2
                                : COLORS.greyscale500,
                              backgroundColor: dark
                                ? COLORS.dark2
                                : COLORS.greyscale500,
                            },
                          ]}>
                          <TextInput
                            placeholder="Note"
                            placeholderTextColor={
                              dark ? COLORS.grayTie : COLORS.black
                            }
                            multiline={true} // makes it like textarea
                            numberOfLines={6} // initial visible lines
                            style={styles.textArea}
                            value={values.note}
                            onChangeText={text => setFieldValue('note', text)}
                          />
                        </View>
                      </View>
                    ) : null} */}
                    {/* Save */}
                    <ButtonFilled
                      title="Save Address"
                      onPress={handleSubmit}
                      style={styles.button}
                    />
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flexGrow: 1,
    // paddingHorizontal: wp(4),
    // paddingTop: hp(2),
    // paddingBottom: hp(3),
    // backgroundColor:Color.white,
    // marginBottom:hp(6)
  },

  formContainer: {
    backgroundColor: COLORS.white,
    padding: wp(4),
    borderRadius: wp(1),
    flex: 1,
    // borderWidth: 1,
    // borderColor: borderColor,
    // height: hp(100),
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
    paddingBottom: hp(0.5),
  },
  inputGroup: {
    marginTop: hp(2),
    // marginBottom: hp(2),
    justifyContent: 'center',
  },
  label: {
    fontSize: hp(1.8),
    color: COLORS.black,
    marginBottom: hp(0.5),
  },
  required: {
    color: 'red',
  },
  input: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    fontSize: hp(1.8),
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  multilineInput: {
    minHeight: hp(10),
    textAlignVertical: 'top',
  },
  dropdown: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: hp(2),
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: hp(6),
    borderRadius: wp(10),
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    height: hp(6),
    borderRadius: wp(10),
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  cancelButtonText: {
    color: COLORS.black,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  errorText: {
    fontSize: hp(1.4),
    color: COLORS.error,
    marginTop: hp(0.3),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  switchPlaceholder: {
    width: wp(10),
    height: hp(4),
    backgroundColor: '#ccc', // Placeholder for Switch
    borderRadius: wp(2),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  radioGroup: {
    // flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: '#F2F0EF',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    // borderWidth:1
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioOuterActive: {
    borderColor: '#008080',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#008080',
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  inputTextContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 12,
    height: 75,
    width: SIZES.width - 65,
    alignItems: 'center',
    // marginVertical: 10,
    backgroundColor: COLORS.greyscale500,
  },
  textArea: {
    height: 75, // control height
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top', // important for Android
    fontSize: 16,

    color: COLORS.black,
    flex: 1,
    fontFamily: 'Urbanist Regular',
    paddingTop: 0,
    width: '90%',
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 70,
    borderRadius: 30,
    // position: 'absolute',
    // bottom: 0, // distance from bottom
    // left: 20,
    // right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '10%',
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 16,
    height: 52,
    width: SIZES.width - 65,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
  },
  containerPhoneStyle: {
    // borderWidth: 1,
    width: '98%',
    borderColor: '#ccc',
    borderRadius: 16,
    backgroundColor: '#fff',
    height: 50,
  },
  textPhoneInput: {
    paddingVertical: 0,
    fontSize: 14,
    // color: "#000",
    height: '100%',
  },
  codeText: {
    fontSize: 14,
    // color: "#000",
  },
});

export default EditCompanyAddress;