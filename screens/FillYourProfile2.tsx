import {
  View,
  Switch,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Image,
  findNodeHandle
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useRef,
} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {reducer} from '../utils/reducers/formReducers';
import {validateSignupInput} from '../utils/actions/formActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Input from '../components/Input';
import {getFormatedDate} from 'react-native-modern-datepicker';
import DatePickerModal from '../components/DatePickerModal';
import Button from '../components/Button';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';
import {UserSignUp} from '../helper/AuthHelper';

import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import TouchableTextInput from '../components/TouchableTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { removeZeroFromFirstBracket } from '../helper/customMethods';
const isTestMode = true;

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

type Nav = {
  navigate: (value: string) => void;
};

const FillYourProfile = ({route}) => {
  const {navigate} = useNavigation<Nav>();
  // const {phone, data} = route.params; // receive phone number  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const phone = route?.params?.phone || '';
  const data = route?.params?.data || null;
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialFormState);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const {colors, dark} = useTheme();
  const [isVatRegisterEnabled, setIsVatRegisterEnabled] = useState(false);
  const [bussinessValue, setBussinessValue] = useState(null);
  const [signatureSvg, setSignatureSvg] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [lookupAddress, setLookupAddress] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    country: '',
    state: '',
    postal_code: '',
    latitude: null,
    longitude: null,
  });
  const [page, setPage] = useState(1);
  const [initialValues, setInitialValues] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    country: '',
    state: '',
    postal_code: '',
    latitude: null,
    longitude: null,
  });
  //Demo Create

  const getConstraints = () => {
    return {
      fullName: {
        presence: {allowEmpty: false, message: 'Full Name is required'},
      },
      companyName: {
        presence: {allowEmpty: false, message: 'Business Name is required'},
      },
      email: {
        presence: {allowEmpty: false, message: 'Email is required'},
        email: {message: '^Email is not valid'},
      },
      password: {
        presence: {allowEmpty: false, message: 'Password is required'},
        length: {
          minimum: 6,
          message: '^Password must be at least 6 characters',
        },
      },
      confirmPassword: {
        presence: {allowEmpty: false, message: 'Confirm Password is required'},
        equality: {
          attribute: 'password',
          message: 'Passwords do not match',
        },
      },
      // Conditional fields
      ...(bussinessValue === 'Company' && {
        companyRegistration: {
          presence: {
            allowEmpty: false,
            message: 'Registration Number is required',
          },
        },
      }),
      ...(isVatRegisterEnabled && {
        vat_number: {
          presence: {allowEmpty: false, message: '^VAT Number is required'},
        },
      }),
    };
  };

  const getPage2Constraints = () => {
    const constraints: any = {};
    if (!lookupAddress || !lookupAddress.state) {
      constraints.addressLookup = {
        presence: {allowEmpty: false, message: 'Address Lookup is required'},
      };
    }
    // 2️⃣ Other fields
    constraints.gas_safe_registration_no = {
      presence: {
        allowEmpty: false,
        message: 'Gas Safe Registration Number is required',
      },
    };

    constraints.gas_safe_id_card = {
      presence: {
        allowEmpty: false,
        message: 'Gas Safe ID Card Number is required',
      },
    };

    return constraints;
  };

  const mobile = '07494949916';

  useFocusEffect(
    useCallback(() => {
      if (route.params?.signature) {
        setSignatureImage(route.params.signature);
      }
    }, [route.params?.signature]),
  );

  const today = new Date();
  const startDate = getFormatedDate(
    new Date(today.setDate(today.getDate() + 1)),
    'YYYY/MM/DD',
  );

  const [startedDate, setStartedDate] = useState('12/12/2023');

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const toggleVatEnabled = () => {
    setIsVatRegisterEnabled(!isVatRegisterEnabled);
  };
  const pageContinue = () => {
    const constraints = getConstraints();

    const currentPageInputs =
      page === 1
        ? {
            fullName: formState.inputValues.fullName,
            companyName: formState.inputValues.companyName,
            companyRegistration: formState.inputValues.companyRegistration,
            email: formState.inputValues.email,
            password: formState.inputValues.password,
            confirmPassword: formState.inputValues.confirmPassword,
          }
        : {};

    // Validate
    const errors: any = {};
    Object.keys(constraints).forEach(key => {
      const rule = constraints[key];
      const value = currentPageInputs[key];
      if (rule.presence && (!value || value.trim() === '')) {
        errors[key] = rule.presence.message;
      }
      if (rule.length && value && value.length < rule.length.minimum) {
        errors[key] = rule.length.message;
      }
      if (
        rule.equality &&
        value !== currentPageInputs[rule.equality.attribute]
      ) {
        errors[key] = rule.equality.message;
      }
      if (rule.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[key] = rule.email.message;
        }
      }
    });

    // Update form state errors
    Object.keys(errors).forEach(key => {
      dispatchFormState({
        inputId: key,
        validationResult: false,
        inputValue: formState.inputValues[key],
      });
    });

    if (Object.keys(errors).length > 0) {
      // Show first error as alert
      Alert.alert('Validation Error', Object.values(errors)[0]);
      return;
    }
    setPage(2);
  };
  const prevPage = () => {
    setPage(1);
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateSignupInput(inputId, inputValue, {
        password: formState.inputValues.password,
        bussinessValue,
      });
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error);
    }
  }, [error]);

  // Image Profile handler
  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        let imageUri = response.assets[0].uri;
        setImage({uri: imageUri});
      }
    });
  };

  //User Creation
  const createNewUser = () => {
    const constraints = getPage2Constraints();

    const currentPageInputs =
      page === 2
        ? {
            gas_safe_registration_no:
              formState.inputValues.gas_safe_registration_no,
            gas_safe_id_card: formState.inputValues.gas_safe_id_card,
            addressLookup: lookupAddress ? lookupAddress.state : '',
          }
        : {};

    // Validate
    const errors: any = {};
    Object.keys(constraints).forEach(key => {
      const rule = constraints[key];
      const value = currentPageInputs[key];
      if (rule.presence && (!value || value.trim() === '')) {
        errors[key] = rule.presence.message;
      }
    });

    // Update form state errors
    Object.keys(errors).forEach(key => {
      dispatchFormState({
        inputId: key,
        validationResult: false,
        inputValue: formState.inputValues[key],
      });
    });

    if (Object.keys(errors).length > 0) {
      // Show first error as alert
      Alert.alert('Validation Error', Object.values(errors)[0]);
      return;
    }
    // alert(phone)
    // if (formState.formIsValid) {

    let userPayLoad = {
      name: formState.inputValues.fullName,
      email: formState.inputValues.email,
      // mobile: '0724762746',
      mobile: removeZeroFromFirstBracket(phone),
      password: formState.inputValues.password,
      password_confirmation: formState.inputValues.confirmPassword,
      company_name: formState.inputValues.companyName,
      business_type: bussinessValue?.toLowerCase() || '',
      company_registration: formState.inputValues.companyRegistration,
      vat_number_check: isVatRegisterEnabled,
      vat_number: formState.inputValues.vat_number,
      company_address_line_1: lookupAddress.address_line_1,
      company_address_line_2: lookupAddress.address_line_2,
      company_city: lookupAddress.city,
      company_state: lookupAddress.state,
      company_postal_code: lookupAddress.postal_code,
      company_country: lookupAddress.country,
      gas_safe_id_card: formState.inputValues.gas_safe_id_card,
      gas_safe_registration_no: formState.inputValues.gas_safe_registration_no,
      referral_code: formState.inputValues.referral_code,
      sign: signatureImage,
    };
    console.log(userPayLoad);
    UserSignUp(userPayLoad).then(async data => {
      if (data.success) {
        Toast.show({
          type: 'success',
          text2: data?.message || 'Registration successful!',
          position: 'top',
          visibilityTime: 3000,
        });
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
        navigate('(tabs)');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data?.message || 'Invalid credentials',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    });
  };

  // Render countries codes modal
  function RenderAreasCodesModal() {
    const renderItem = ({item}: {item: any}) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            setSelectedArea(item), setModalVisible(false);
          }}>
          <Image
            source={{uri: item.flag}}
            resizeMode="contain"
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
            }}
          />
          <Text style={{fontSize: 16, color: '#fff'}}>{item.item}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: SIZES.height,
                width: SIZES.width,
                backgroundColor: COLORS.primary,
                borderRadius: 12,
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}>
                <Ionicons
                  name="close-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <FlatList
                data={areas}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={item => item.code}
                style={{
                  padding: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header
          title={page === 1 ? 'Fill your Profle' : 'Continue Your Profile'}
        />

        <KeyboardAwareScrollView
          innerRef={ref => {
            scrollViewRef.current = ref;
          }}
          enableOnAndroid={true}
          extraScrollHeight={30} // This keeps input 20px above keyboard
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
          }}>
          {page === 1 ? (
            <View style={{marginTop: 50}}>
              <Input
                id="fullName"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['fullName']}
                placeholder="Full Name*"
                value={formState.inputValues.fullName}
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              />
              <Input
                id="companyName"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['companyName']}
                placeholder="Business Name*"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                value={formState.inputValues.companyName}
              />
              <View>
                <TouchableTextInput
                  id={''}
                  value={
                    bussinessValue ? bussinessValue : 'Select Business Type'
                  }
                  placeholder="Select Business Type"
                  placeholderTextColor={
                    bussinessValue ? COLORS.black : COLORS.gray
                  }
                  onPress={() => {
                    navigate('BusinessTypeSelectScreen', {
                      selectedValue: bussinessValue,
                      onSelectBusinessType: item => {
                        setBussinessValue(item.value); // or full item if needed
                      },
                    });
                  }}
                />
                {/* <Dropdown
                style={styles.dropdown}
                data={business_type}
                search
                // labelField="displayLabel"
                // valueField="id"
                placeholder="Business Type*"
                labelField="label" // ✅ Corrected
                valueField="value" // ✅ Corrected
                value={bussinessValue}
                onChange={item => {
                  onChangeBusinessType(item);
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{backgroundColor: colors.background}} // ✅ Light blue background
              /> */}
              </View>
              {/* <Input
              id="businessName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Business Type DropDown*"
              placeholderTextColor={COLORS.gray}
            /> */}
              {bussinessValue === 'Company' ? (
                <Input
                  id="companyRegistration"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['Registration Number']}
                  placeholder="Registration Number"
                  placeholderTextColor={COLORS.gray}
                  value={formState.inputValues.companyRegistration}
                />
              ) : null}
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
                  VAT Registered
                </Text>
                <Switch
                  value={isVatRegisterEnabled}
                  thumbColor={isVatRegisterEnabled ? 'green' : 'red'}
                  trackColor={{
                    false: '#EEEEEE',
                    true: dark ? COLORS.white : COLORS.grayscale700,
                  }}
                  ios_backgroundColor={
                    dark ? COLORS.white : COLORS.grayscale700
                  }
                  onValueChange={toggleVatEnabled}
                />
              </View>
              {isVatRegisterEnabled ? (
                <Input
                  id="vat_number"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['VAT Number']}
                  placeholder="VAT Number*"
                  placeholderTextColor={COLORS.gray}
                  value={formState.inputValues.vat_number}
                />
              ) : null}
              <Input
                id="email"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['email']}
                placeholder="Email"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                value={formState.inputValues.email}
                keyboardType="email-address"
              />
              <Input
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['password']}
                autoCapitalize="none"
                id="password"
                placeholder="Password*"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                // icon={icons.padlock}
                value={formState.inputValues.password}
                secureTextEntry={true}
              />
              <Input
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['confirmPassword']}
                autoCapitalize="none"
                id="confirmPassword"
                placeholder="Confirm Password"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                value={formState.inputValues.confirmPassword}
                secureTextEntry={true}
                
              />
              {/* <View style={{
              width: SIZES.width - 32
            }}>
              <TouchableOpacity
                style={[styles.inputBtn, {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                }]}
                onPress={handleOnPressStartDate}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.grayscale400 }}>{startedDate}</Text>
                <Feather name="calendar" size={24} color={COLORS.grayscale400} />
              </TouchableOpacity>
            </View> */}
              {/* <View style={[styles.inputContainer, {
              backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
              borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            }]}>
              <TouchableOpacity
                style={styles.selectFlagContainer}
                onPress={() => setModalVisible(true)}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={icons.down}
                    resizeMode='contain'
                    style={styles.downIcon}
                  />
                </View>
                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                  <Image
                    source={{ uri: selectedArea?.flag }}
                    resizeMode="contain"
                    style={styles.flagIcon}
                  />
                </View>
                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                  <Text style={{ color: dark ? COLORS.white : "#111", fontSize: 12 }}>{selectedArea?.callingCode}</Text>
                </View>
              </TouchableOpacity>
             
            </View> */}
            </View>
          ) : null}
          {page === 2 ? (
            <View style={{marginTop: 50}}>
              <TouchableTextInput
                id={''}
                placeholderStyle={{
                  fontSize: 14,
                  color: COLORS.gray,
                  textTransform: 'normal',
                }}
                value={
                  lookupAddress.address_line_1
                    ? `${lookupAddress.address_line_1}${
                        lookupAddress.address_line_2
                          ? ', ' + lookupAddress.address_line_2
                          : ''
                      }${lookupAddress.city ? ', ' + lookupAddress.city : ''}${
                        lookupAddress.postal_code
                          ? ', ' + lookupAddress.postal_code
                          : ''
                      }`
                    : 'Address Lookup'
                }
                placeholder="Address Lookup*"
                placeholderTextColor={
                  lookupAddress.address_line_1 ? COLORS.black : COLORS.gray
                }
                onPress={() => {
                  navigate('AddressAdd', {
                    initialValues: initialValues,
                    onSelectAddress: data => {
                      const updated = {
                        address_line_1: data.address_line_1,
                        address_line_2: data.address_line_2,
                        city: data.city,
                        country: data.country,
                        state: data.state,
                        postal_code: data.postal_code,
                        latitude: data.lat,
                        longitude: data.lng,
                      };

                      setLookupAddress(updated);
                      setInitialValues(prev => ({...prev, ...updated}));
                    },
                  });
                }}
              />
              <Input
                id="gas_safe_registration_no"
                onInputChanged={inputChangedHandler}
                errorText={
                  formState.inputValidities['Gas Safe Registration Number']
                }
                placeholder="Gas Safe Registration Number*"
                placeholderTextColor={COLORS.gray}
                value={formState.inputValues.gas_safe_registration_no}
              />
              <Input
                id="gas_safe_id_card"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['Gas Safe ID Card Number']}
                placeholder="Gas Safe ID Card Number*"
                placeholderTextColor={COLORS.gray}
                value={formState.inputValues.gas_safe_id_card}
              />
              <Input
                id="referral_code"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['Refferal Code']}
                placeholder="Refferal Code"
                placeholderTextColor={COLORS.gray}
                value={formState.inputValues.referral_code}
              />
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
                      navigate('SignatureScreen', {
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

              {/* <View style={{
            width: SIZES.width - 32
          }}>
            <TouchableOpacity
              style={[styles.inputBtn, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
              }]}
              onPress={handleOnPressStartDate}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.grayscale400 }}>{startedDate}</Text>
              <Feather name="calendar" size={24} color={COLORS.grayscale400} />
            </TouchableOpacity>
          </View> */}
              {/* <View style={[styles.inputContainer, {
            backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
          }]}>
            <TouchableOpacity
              style={styles.selectFlagContainer}
              onPress={() => setModalVisible(true)}>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={icons.down}
                  resizeMode='contain'
                  style={styles.downIcon}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={{ uri: selectedArea?.flag }}
                  resizeMode="contain"
                  style={styles.flagIcon}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text style={{ color: dark ? COLORS.white : "#111", fontSize: 12 }}>{selectedArea?.callingCode}</Text>
              </View>
            </TouchableOpacity>
            
          </View> */}
            </View>
          ) : null}
          {page === 1 ? (
            <View style={styles.firstPageContainer}>
              <ButtonFilled
                title="Continue"
                style={styles.continueButton}
                onPress={() => pageContinue()}
              />
            </View>
          ) : null}

          {page === 2 ? (
            <View style={styles.bottomContainer}>
              <Button
                title="Previous"
                style={{
                  width: (SIZES.width - 32) / 2 - 15,
                  borderRadius: 32,
                  backgroundColor: dark
                    ? COLORS.dark3
                    : COLORS.tansparentPrimary,
                  borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
                }}
                textColor={dark ? COLORS.white : COLORS.primary}
                onPress={() => prevPage()}
              />
              <ButtonFilled
                title="Create"
                style={styles.continueButton}
                onPress={() => createNewUser()}
              />
            </View>
          ) : null}
        </KeyboardAwareScrollView>
      </View>
      <DatePickerModal
        open={openStartDatePicker}
        startDate={startDate}
        selectedDate={startedDate}
        onClose={() => setOpenStartDatePicker(false)}
        onChangeStartDate={date => setStartedDate(date)}
      />
      {RenderAreasCodesModal()}
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
    padding: 16,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    marginVertical: 12,
    alignItems: 'center',
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 0.4,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: '#111',
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  flagIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: '#111',
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 52,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: 'space-between',
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 32, // distance from the bottom of the screen
    left: 16,
    right: 16,
    flexDirection: 'row', // align buttons horizontally
    justifyContent: 'space-between', // space between the two buttons
    alignItems: 'center', // vertically center the buttons
    width: SIZES.width - 50, // total width minus horizontal padding
    zIndex: 10, // make sure it's above other content
  },
  continueButton: {
    width: (SIZES.width - 32) / 2 - 15,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    position: 'absolute',
    right: 16,
    top: 32,
    justifyContent: 'center',
    alignItems: 'center', 
    zIndex: 9999,
  },
  switch: {
    marginLeft: 8,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Adjust the size of the switch
  },
  signatureContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#222',
    fontSize: 17,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#bdc3c7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  firstPageContainer: {
    // position: 'absolute',
    // bottom: 32,
    // right: 16,
    // left: 16,
    paddingBottom: 20,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end', // aligns button to the right
    zIndex: 10, // ensures it stays above ScrollView content
  },
});

export default FillYourProfile;
