import React, {useState, useRef, useCallback, useReducer} from 'react';
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
  Image,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {reducer} from '../../utils/reducers/formReducers';
import Feather from 'react-native-vector-icons/Feather';
import PhoneInput from 'react-native-phone-number-input';
import moment from 'moment';
import {commonStyles} from '../../styles/CommonStyles';
import ButtonFilled from '../../components/ButtonFilled';

// import {ArrowLeft, MapPin} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../../theme/ThemeProvider';
import {COLORS, SIZES, FONTS, icons} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import {Dropdown} from 'react-native-element-dropdown';
import Input from '../../components/Input';
import {CustomerJobAddressStore} from '../../helper/CustomerHelper';
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

interface KeywordItemProps {
  item: {
    id: string;
    name: string;
  };
  onPress: (id: string) => void;
  selected: boolean;
}

const CP12LandLord = ({route}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [isCheckOccupiedDetails, setIsCheckOccupiedDetails] = useState(false);
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [formattedPhoneNo, setFormattedPhoneNo] = useState<string>('');
  const [formState, dispatchFormState] = useReducer(reducer, initialFormState);
  const customerId = route?.params?.customerId;
  const job = route?.params?.job || false;
  const {colors, dark} = useTheme();
  const [relationValue, setRelationValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [signatureImage, setSignatureImage] = useState(null);
  const KeywordItem: React.FC<KeywordItemProps> = ({
    item,
    onPress,
    selected,
  }) => {
    return (
      <TouchableOpacity
        style={[
          {
            paddingHorizontal: 14,
            marginHorizontal: 5,
            borderRadius: 21,
            height: 39,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: COLORS.primary,
            borderWidth: 1,
            backgroundColor: selected
              ? COLORS.primary
              : dark
              ? COLORS.dark3
              : 'transparent',
          },
        ]}
        onPress={() => onPress(item.id)}>
        <Text
          style={{
            fontWeight: '700',
            color: selected
              ? COLORS.white
              : dark
              ? COLORS.white
              : COLORS.primary,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const toggleOccupiedEnabled = () => {
    setIsCheckOccupiedDetails(!isCheckOccupiedDetails);
  };
  const defaultAddressValues = {
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    latitude: '',
    longitude: '',
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      // alert(inputValue);
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
  const navigateNewScreen = address => {
    navigation.navigate('createnewjob', {
      ...route.params,
      address: address,
      customerId: customerId,
      job: job,
      // selectedCustomer:selectedCustomer
    });
  };
  const onSaveAddress = async values => {
    try {
      const payload = {
        customer_id: customerId,
        address_line_1: values?.address_line_1,
        address_line_2: values?.address_line_2,
        postal_code: values?.postal_code,
        city: values?.city,
        state: values?.state,
        country: values?.country,
        latitude: values?.latitude,
        longitude: values?.longitude,
        note: values?.note,
        occupant_name: values?.occupant_name,
        occupant_email: values?.occupant_email,
        occupant_phone: formattedPhoneNo,
        due_date: values?.due_date,
      };
      // console.log('Submitting payload:', payload);
      const res = await CustomerJobAddressStore(customerId, payload);

      if (res.success) {
        Alert.alert('Success', 'Address saved successfully');
        if (job) {
          navigateNewScreen(res?.data);
        } else {
          navigation.goBack();
        } // or wherever you want to go
      } else {
        Alert.alert('Error', res.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Address submit error:', err);
      Alert.alert('Error', 'Failed to save address');
    }
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={{paddingLeft: 16}}>
          <Header title="CP12 Landlord" />
        </View>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
            marginTop: 12,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{margin: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={styles.selectedDateView}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>
                  {moment(selectedDate).format('ddd D  MMM YYYY')}
                </Text>
              </View>
              <View style={{width: 120}}>
                <KeywordItem
                  item={{
                    id: '1',
                    name: 'Linked Job',
                  }}
                  onPress={() => {}}
                  selected={true}
                />
              </View>
            </View>

            <View
              style={[
                styles.separateLine,
                {
                  backgroundColor: dark
                    ? COLORS.grayscale700
                    : COLORS.grayscale200,
                },
              ]}
            />
            <Text
              style={[
                styles.summaryTitle,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Customer Details
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('chooseshippingmethods')}
              style={[
                styles.addressContainer,
                styles.shippingMethods,
                {
                  backgroundColor: dark ? COLORS.dark3 : COLORS.white,
                  borderRadius: 12,
                },
              ]}>
              <View style={styles.addressLeftContainer}>
                <Image
                  source={icons.user}
                  resizeMode="contain"
                  style={[
                    styles.locationIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                      marginLeft: 8,
                    },
                  ]}
                />
                <View style={styles.viewAddress}>
                  <View style={styles.viewView}>
                    <Text
                      style={[
                        styles.homeTitle,
                        {
                          color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                      ]}>
                      Choose Customer
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginRight: 5}}>
                <Image
                  source={icons.arrowRight}
                  resizeMode="contain"
                  style={[
                    styles.arrowRightIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('chooseshippingmethods')}
              style={[
                styles.addressContainer,
                styles.shippingMethods,
                {
                  backgroundColor: dark ? COLORS.dark3 : COLORS.white,
                  borderRadius: 12,
                },
              ]}>
              <View style={styles.addressLeftContainer}>
                <Image
                  source={icons.location}
                  resizeMode="contain"
                  style={[
                    styles.locationIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                      marginLeft: 8,
                    },
                  ]}
                />
                <View style={styles.viewAddress}>
                  <View style={styles.viewView}>
                    <Text
                      style={[
                        styles.homeTitle,
                        {
                          color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                      ]}>
                      Customer Address
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginRight: 5}}>
                <Image
                  source={icons.arrowRight}
                  resizeMode="contain"
                  style={[
                    styles.arrowRightIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('chooseshippingmethods')}
              style={[
                styles.addressContainer,
                styles.shippingMethods,
                {
                  backgroundColor: dark ? COLORS.dark3 : COLORS.white,
                  borderRadius: 12,
                },
              ]}>
              <View style={styles.addressLeftContainer}>
                <Image
                  source={icons.location}
                  resizeMode="contain"
                  style={[
                    styles.locationIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                      marginLeft: 8,
                    },
                  ]}
                />
                <View style={styles.viewAddress}>
                  <View style={styles.viewView}>
                    <Text
                      style={[
                        styles.homeTitle,
                        {
                          color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                      ]}>
                      Job Address
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginRight: 5}}>
                <Image
                  source={icons.arrowRight}
                  resizeMode="contain"
                  style={[
                    styles.arrowRightIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <View
              style={[
                styles.separateLine,
                {
                  backgroundColor: dark
                    ? COLORS.grayscale700
                    : COLORS.grayscale200,
                  marginTop: 4,
                  marginBottom: 16,
                },
              ]}
            />

            <Text
              style={[
                styles.summaryTitle,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Appliance & Inspections
            </Text>
            <View
              style={[
                styles.promoCodeContainer,
                {
                  backgroundColor: 'transparent',
                },
              ]}>
              <TextInput
                placeholder="No Appliance Added"
                placeholderTextColor={dark ? COLORS.white : COLORS.grayscale700}
                style={[
                  styles.codeInput,
                  {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('addpromo')}
                style={[
                  styles.addPromoBtn,
                  {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.primary,
                  },
                ]}>
                {/* <Image
                source={icons.plus}
                resizeMode='contain'
                style={[styles.locationIcon, {
                  tintColor: COLORS.white,
                  marginLeft: 8
                }]}/> */}
                <Feather name="plus" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('chooseshippingmethods')}
              style={[
                styles.addressContainer,
                styles.shippingMethods,
                {
                  backgroundColor: dark ? COLORS.dark3 : COLORS.white,
                  borderRadius: 12,
                },
              ]}>
              <View style={styles.addressLeftContainer}>
                <Image
                  source={icons.appliance}
                  resizeMode="contain"
                  style={[
                    styles.locationIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                      marginLeft: 8,
                    },
                  ]}
                />
                <View style={styles.viewAddress}>
                  <View style={styles.viewView}>
                    <Text
                      style={[
                        styles.homeTitle,
                        {
                          color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                      ]}>
                      Appliance 1
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginRight: 5}}>
                <Image
                  source={icons.arrowRight}
                  resizeMode="contain"
                  style={[
                    styles.arrowRightIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('chooseshippingmethods')}
              style={[
                styles.addressContainer,
                styles.shippingMethods,
                {
                  backgroundColor: dark ? COLORS.dark3 : COLORS.white,
                  borderRadius: 12,
                },
              ]}>
              <View style={styles.addressLeftContainer}>
                <Image
                  source={icons.appliance}
                  resizeMode="contain"
                  style={[
                    styles.locationIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                      marginLeft: 8,
                    },
                  ]}
                />
                <View style={styles.viewAddress}>
                  <View style={styles.viewView}>
                    <Text
                      style={[
                        styles.homeTitle,
                        {
                          color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                      ]}>
                      Appliance 2
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginRight: 5}}>
                <Image
                  source={icons.arrowRight}
                  resizeMode="contain"
                  style={[
                    styles.arrowRightIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('chooseshippingmethods')}
              style={[
                styles.addressContainer,
                styles.shippingMethods,
                {
                  backgroundColor: dark ? COLORS.dark3 : COLORS.white,
                  borderRadius: 12,
                },
              ]}>
              <View style={styles.addressLeftContainer}>
                <Image
                  source={icons.appliance}
                  resizeMode="contain"
                  style={[
                    styles.locationIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                      marginLeft: 8,
                    },
                  ]}
                />
                <View style={styles.viewAddress}>
                  <View style={styles.viewView}>
                    <Text
                      style={[
                        styles.homeTitle,
                        {
                          color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                      ]}>
                      Appliance 3
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginRight: 5}}>
                <Image
                  source={icons.arrowRight}
                  resizeMode="contain"
                  style={[
                    styles.arrowRightIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('chooseshippingmethods')}
              style={[
                styles.addressContainer,
                styles.shippingMethods,
                {
                  backgroundColor: dark ? COLORS.dark3 : COLORS.white,
                  borderRadius: 12,
                },
              ]}>
              <View style={styles.addressLeftContainer}>
                <Image
                  source={icons.appliance}
                  resizeMode="contain"
                  style={[
                    styles.locationIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                      marginLeft: 8,
                    },
                  ]}
                />
                <View style={styles.viewAddress}>
                  <View style={styles.viewView}>
                    <Text
                      style={[
                        styles.homeTitle,
                        {
                          color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                      ]}>
                      Appliance 4
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginRight: 5}}>
                <Image
                  source={icons.arrowRight}
                  resizeMode="contain"
                  style={[
                    styles.arrowRightIcon,
                    {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>

            {/* Safe Check */}
            <View
              style={[
                styles.separateLine,
                {
                  backgroundColor: dark
                    ? COLORS.grayscale700
                    : COLORS.grayscale200,
                  marginTop: 4,
                  marginBottom: 16,
                },
              ]}
            />
            <Text
              style={[
                styles.summaryTitle,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Safety Checks
            </Text>
            <View
              style={[
                styles.promoCodeContainer,
                {
                  backgroundColor: 'transparent',
                },
              ]}>
              <TextInput
                placeholder="Questions Answered 0/8"
                placeholderTextColor={dark ? COLORS.white : COLORS.grayscale700}
                style={[
                  styles.codeInput,
                  {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('addpromo')}
                style={[
                  styles.addPromoBtn,
                  {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.primary,
                  },
                ]}>
                {/* <Image
                source={icons.plus}
                resizeMode='contain'
                style={[styles.locationIcon, {
                  tintColor: COLORS.white,
                  marginLeft: 8
                }]}/> */}
                <Feather name="plus" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.separateLine,
                {
                  backgroundColor: dark
                    ? COLORS.grayscale700
                    : COLORS.grayscale200,
                  marginTop: 4,
                  marginBottom: 16,
                },
              ]}
            />
            <Text
              style={[
                styles.summaryTitle,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Comments
            </Text>
            <View
              style={[
                styles.promoCodeContainer,
                {
                  backgroundColor: 'transparent',
                },
              ]}>
              <TextInput
                placeholder="Comments 0/4"
                placeholderTextColor={dark ? COLORS.white : COLORS.grayscale700}
                style={[
                  styles.codeInput,
                  {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('addpromo')}
                style={[
                  styles.addPromoBtn,
                  {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.primary,
                  },
                ]}>
                <Feather name="plus" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* Signature */}

            <View
              style={[
                styles.separateLine,
                {
                  backgroundColor: dark
                    ? COLORS.grayscale700
                    : COLORS.grayscale200,
                  marginTop: 4,
                  marginBottom: 16,
                },
              ]}
            />
            <Text
              style={[
                styles.summaryTitle,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Signature{' '}
            </Text>
            <View
              style={[
                styles.promoCodeContainer,
                {
                  backgroundColor: 'transparent',
                },
              ]}></View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
              <View style={{width: (SIZES.width - 32) / 2 - 10}}>
                <Text
                  style={[
                    commonStyles.inputHeader,
                    {
                      color: dark ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  Todays Date
                </Text>
                <TextInput
                  placeholder="03 Oct 2025"
                  placeholderTextColor={
                    dark ? COLORS.white : COLORS.grayscale700
                  }
                  style={[
                    styles.codeDateInput,
                    {
                      color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                      backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                    },
                  ]}
                />
                {/* <Input
                  id="creditCardExpiryDate"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['creditCardExpiryDate']}
                  placeholder="03 Oct 2025"
                  placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                /> */}
              </View>
              <View style={{width: (SIZES.width - 32) / 2 - 10}}>
                <Text
                  style={[
                    commonStyles.inputHeader,
                    {
                      color: dark ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  Next Inspection Date
                </Text>
                <TextInput
                  placeholder="03 Oct 2026"
                  placeholderTextColor={
                    dark ? COLORS.white : COLORS.grayscale700
                  }
                  style={[
                    styles.codeDateInput,
                    {
                      color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                      backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                    },
                  ]}
                />
                {/* <Input
                  id="cvv"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['cvv']}
                  placeholder="03 Oct 2026"
                  placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                /> */}
              </View>
            </View>
            <View style={{marginTop: 12}}>
              <Text
                style={[
                  commonStyles.inputHeader,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                Received By
              </Text>
              <TextInput
                placeholder="Mr. John Doe"
                placeholderTextColor={dark ? COLORS.white : COLORS.grayscale700}
                style={[
                  styles.codeFullInput,
                  {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}
              />
              {/* <Input
                style={[
                  {
                    // color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    backgroundColor:  COLORS.white,
                  },
                ]}
                id="creditCardNumber"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['creditCardNumber']}
                placeholder="Mr. John Doe"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              /> */}
            </View>
            <View style={{marginTop: 12,backgroundColor:COLORS.white}}>
              {/* <Text style={[commonStyles.inputHeader, {
                      color: dark ? COLORS.white : COLORS.black
                  }]}>Relation</Text> */}
              <RNPickerSelect
                onValueChange={val => setRelationValue(val)}
                value={relationValue}
                items={[
                  {label: 'Agent', value: 'apple'},
                  {label: 'Lanlord', value: 'banana'},
                  {label: 'Other', value: 'orange'},
                  {label: 'Tenant', value: 'tenant'},
                ]}
                placeholder={{label: 'Relation', value: null}}
                // useNativeAndroidPickerStyle={false} // important for custom styling
                style={{
                  inputAndroid: {
                    
                    paddingVertical: 0, // reduce vertical padding
                    paddingHorizontal: 8,
                    fontSize: 16,
                    height:52,
                    backgroundColor:COLORS.white,
                  },
                  modalViewMiddle: {
                    margin: 0,
                    padding: 0,
                    // backgroundColor:'gr'
                  },
                  modalViewTop: {
                    margin: 0,
                    padding: 0,
                  },
                  done: { color: 'blue' },
                  placeholder: { color: '#999' },
                }}
              />
            </View>
            <View>
              {signatureImage && (
                <Image
                  source={{uri: signatureImage}}
                  style={styles.previewImage}
                />
              )}
              {/* Signature */}
              <View style={styles.signatureContainer}>
                <ButtonFilled
                  style={{width: '96%'}}
                  onPress={() => {
                    navigation.navigate('SignatureScreen', {
                      onSelect: (signature: any) => {
                        setSignatureImage(signature);
                      },
                      titleData: 'Company Information',
                    });
                  }}
                  title={signatureImage ? 'Update Signature' : 'Add Signature'}
                />
                {/* <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('SignatureScreen', {
                    onSelect: (signature: any) => {
                      setSignatureImage(signature);
                    },
                    titleData: 'Company Information',
                  });
                }}>
                <Text style={styles.buttonText}>Add Signature</Text>
              </TouchableOpacity> */}
              </View>
            </View>
            {/* <Formik
                initialValues={{
                  ...defaultAddressValues,
                }}
                onSubmit={values => {
                  const fullPayload = {
                    ...values,
                    occupant_name: formState.inputValues.fullName,
                    occupant_phone: formState.inputValues.companyName,
                    occupant_email: formState.inputValues.email,

                    due_date: formState.inputValues.due_date,
                  };
                  onSaveAddress(fullPayload);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => (
                  <>
                    
                    {[
                      {key: 'address_line_1', label: 'Linked Job'},
                      {key: 'address_line_2', label: 'Address Line 2'},
                      {key: 'city', label: 'Town/City'},
                      {key: 'state', label: 'Region/County'},
                      {key: 'postal_code', label: 'Post Code'},
                    ].map(field => (
                      <View style={styles.inputGroup} key={field.key}>
                        <Input
                          value={values[field.key] ?? ''}
                          onBlur={handleBlur(field.key)}
                          placeholder={field.label}
                          placeholderTextColor="#A0A0A0"
                          style={styles.input}
                          id={field.key} // ✅ use key, not value
                          onInputChanged={(id, text) => setFieldValue(id, text)}
                        />
                      </View>
                    ))}
                    <View
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
                    </View>
                    {isCheckOccupiedDetails ? (
                      <View style={{marginTop: 5}}>
                        <Input
                          id="fullName"
                          onInputChanged={inputChangedHandler}
                          errorText={formState.inputValidities['Name']}
                          placeholder="Name*"
                          value={formState.inputValues.fullName}
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
                            // defaultValue={"07"}
                            defaultCode="GB"
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
                          id="email"
                          onInputChanged={inputChangedHandler}
                          errorText={formState.inputValidities['email']}
                          placeholder="Email"
                          placeholderTextColor={
                            dark ? COLORS.grayTie : COLORS.black
                          }
                          value={formState.inputValues.email}
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
                    ) : null}
                    {/* Save */}
            {/* <ButtonFilled
                      title="Save Address"
                      onPress={handleSubmit}
                      style={styles.button}
                    />
                  </> */}
            {/* )}
              </Formik>  */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingHorizontal: 16,
    paddingTop: 16,
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
  selectedDateView: {
    borderBottomColor: '#CBCBCB',
    borderBottomWidth: 1,
    padding: 10,
    // marginLeft:10,
  },
  button: {
    // marginVertical: 6,
    // width: SIZES.width - 70,
    // borderRadius: 30,
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
  separateLine: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginVertical: 12,
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingMethods: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    marginVertical: 10,
  },
  promoCodeContainer: {
    width: SIZES.width - 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginVertical: 12,
  },
  viewAddress: {
    marginHorizontal: 16,
  },
  viewView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  arrowRightIcon: {
    height: 16,
    width: 16,
    tintColor: COLORS.greyscale900,
  },
  codeInput: {
    width: SIZES.width - 112,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  codeDateInput: {
    width: SIZES.width - 500,
    height: 52,
    // borderRadius: 16,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  codeFullInput: {
    width: SIZES.width - 500,
    height: 52,
    // borderRadius: 16,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  addPromoBtn: {
    marginTop: 2,
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  locationIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
  icon: {
    marginRight: 5,
  },
  DropDownlabel: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  signatureContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CP12LandLord;
