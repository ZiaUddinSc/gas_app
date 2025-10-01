import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Keyboard,
  Image,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useRef,
} from 'react';
import {COLORS, SIZES, FONTS, icons, images, illustrations} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getInitials} from '../helper/customMethods';
import {reducer} from '../utils/reducers/formReducers';
import {validateInput} from '../utils/actions/formActions';
import ProfileAvatorView from '../components/ProfileAvatorView';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Input from '../components/Input';
import TouchableTextInput from '../components/TouchableTextInput';
import {getFormatedDate} from 'react-native-modern-datepicker';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import {CreateCustomer} from '../helper/CustomerHelper';
import {capitalizeWords} from '../helper/customMethods';

const isTestMode = true;

const initialState = {
  inputValues: {
    fullName: '',
  },
  inputValidities: {
    fullName: false,
    email: false,
    nickname: false,
    phoneNumber: false,
  },
  formIsValid: false,
};

interface Item {
  flag: string;
  item: string;
  code: string;
}

interface RenderItemProps {
  item: Item;
}

const CreateNewCustomer = ({route}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerCreateModal, setCustomerCreateModal] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [autoReminder, setAutoReminder] = useState<boolean>(true);
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [mobileNo, setMobile] = useState<string>('');
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
  const [formattedValue, setFormattedValue] = useState<string>('');
  const [phoneFormattedValue, setPhoneFormattedValue] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('NC');
  const phoneInput = useRef<PhoneInput>(null);
  const {dark} = useTheme();
  const selectCutomer = route?.params?.selectCutomer;
  const getPageConstraints = () => {
    const constraints: any = {};

    constraints.fullName = {
      presence: {
        allowEmpty: false,
        message: 'Full Name is required',
      },
    };

    // Optional email — only validate format if user enters something
    constraints.email = {
      email: {
        message: 'Email is not valid', // triggers only if value exists
      },
    };

    if (!lookupAddress || !lookupAddress.state) {
      constraints.addressLookup = {
        presence: {allowEmpty: false, message: 'Address Lookup is required'},
      };
    }

    return constraints;
  };

  const handleCreateCustomer = async () => {
    const constraints = getPageConstraints();
    const currentPageInputs = {
      fullName: formState.inputValues.fullName,
      email: formState.inputValues.email, // 👈 add this
      addressLookup: lookupAddress ? lookupAddress.state : '',
    };

    // Validate
    const errors: any = {};
    Object.keys(constraints).forEach(key => {
      const rule = constraints[key];
      const value = currentPageInputs[key];

      // Required field
      if (rule.presence && !rule.email && (!value || value.trim() === '')) {
        errors[key] = rule.presence.message;
      }

      // Optional email: only validate if not empty
      if (rule.email && value && value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          errors[key] = rule.email.message;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      Alert.alert('Validation Error', Object.values(errors)[0]);
      return;
    }

    const customerPayload = {
      full_name: formState.inputValues.fullName,
      company_name: formState.inputValues.companyName,
      address_line_1: lookupAddress?.address_line_1,
      address_line_2: lookupAddress.address_line_2,
      postal_code: lookupAddress?.postal_code,
      state: lookupAddress?.state,
      city: lookupAddress?.city,
      country: lookupAddress?.country,
      latitude: lookupAddress?.latitude,
      longitude: lookupAddress?.longitude,
      note: note,
      auto_reminder: autoReminder ? 1 : 0,
      mobile: formattedValue,
      phone: phoneFormattedValue,
      email: formState.inputValues.email,
    };
    const customerRes = await CreateCustomer(customerPayload);
    alert(customerRes?.data?.customer?.id)
    if (customerRes && customerRes?.data?.customer?.id) {
      if (selectCutomer) {
        Keyboard.dismiss();
        Alert.alert('Sucess', 'Customer has been created successfully.');
        navigation.navigate('createnewjob', {
          ...route.params,
          selectedCustomer: customerRes?.data?.customer,
        });
      } else {
        setCustomerCreateModal(true);
        setTimeout(() => {
          setCustomerCreateModal(false);
          navigation.navigate('customerdetails', {
            customerId: customerRes?.data?.customer?.id,
          });
        }, 2000);
      }
    } else {
      Alert.alert('❌ Error', 'Customer creation failed.');
    }
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      // const result = validateInput(inputId, inputValue);
      if (inputId === 'fullName') {
        if (inputValue) {
          setCustomerName(getInitials(inputValue));
        } else {
          setCustomerName('NC');
        }
      }
      dispatchFormState({
        inputId,
        validationResult: false,
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

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={customerCreateModal}>
        <TouchableWithoutFeedback onPress={() => setCustomerCreateModal(false)}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalSubContainer,
                {backgroundColor: dark ? COLORS.dark2 : COLORS.white},
              ]}>
              <Image
                source={
                  dark
                    ? illustrations.passwordSuccessResetDark
                    : illustrations.passwordSuccess
                }
                resizeMode="contain"
                style={styles.modalIllustration}
              />
              <Text
                style={[
                  styles.modalTitle,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                Congratulations!
              </Text>
              <Text
                style={[
                  styles.modalSubtitle,
                  {
                    color: dark ? COLORS.grayscale200 : COLORS.greyscale600,
                  },
                ]}>
                Customer created successfully.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

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

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.arrowLeft}
              resizeMode="contain"
              style={[
                styles.arrowLeftIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.primary,
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            Add New Customer
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setAutoReminder(!autoReminder)}>
            <Image
              source={icons.bell}
              resizeMode="contain"
              style={[
                styles.searchIcon,
                {
                  tintColor: autoReminder ? 'green' : 'red',
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={{fontSize: 10, color: dark ? COLORS.white : COLORS.black}}>
            {autoReminder ? 'On' : 'Off'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.area,
        {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
      ]}>
      <View
        style={[
          styles.container,
          {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
        ]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center', marginVertical: 12}}>
            <ProfileAvatorView name={customerName} />
            {/* <View style={styles.avatarContainer}>
                <View  style={[styles.avatar,{backgroundColor: dark ? COLORS.white : COLORS.black}]}>
                    <Text style={[{justifyContent:'center',fontSize:25,fontWeight:'700',alignItems:'center'},
                    {color: dark ? COLORS.black : COLORS.white}]}>{customerName}</Text>
                </View>
            </View> */}
          </View>

          <View>
            <Input
              id="fullName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['fullName']}
              placeholder="Full Name*"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            />
            <Input
              id="compnayName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['compnayName']}
              placeholder="Company Name"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            />
            <Input
              id="email"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['email']}
              placeholder="Email"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              keyboardType="email-address"
            />
            <View
              style={{
                width: SIZES.width - 32,
              }}>
              {/* <TouchableOpacity
                style={[styles.inputBtn, {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                }]}
                onPress={handleOnPressStartDate}>
                <Text style={{ ...FONTS.body4, color: COLORS.grayscale400 }}>{startedDate}</Text>
                <Feather name="calendar" size={24} color={COLORS.grayscale400} />
              </TouchableOpacity> */}
            </View>
            <View>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  },
                ]}>
                <PhoneInput
                  ref={phoneInput}
                  // defaultValue={"07"}
                  defaultCode="GB"
                  layout="first"
                  onChangeText={text => {
                    setMobile(text);
                  }}
                  textInputProps={{
                    placeholder: 'Enter Mobile Number',
                    placeholderTextColor: dark ? COLORS.grayTie : COLORS.black,
                    style: {color: dark ? COLORS.white : COLORS.black}, // text color
                  }}
                  textInputStyle={{color: 'black'}} // 👈 Text color here
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
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
                    {color: dark ? COLORS.greyscale500 : COLORS.dark2},
                  ]} // style the country code
                  containerStyle={[
                    styles.containerPhoneStyle,
                    {
                      borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
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
            </View>
            <View
              style={[
                styles.inputContainer,
                {
                  // backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
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
                  placeholder: 'Enter Phone Number',
                  placeholderTextColor: dark ? COLORS.grayTie : COLORS.black,
                  style: {color: dark ? COLORS.white : COLORS.black}, // text color
                }}
                onChangeFormattedText={text => {
                  setPhoneFormattedValue(text);
                }}
                withDarkTheme={false} // disable built-in dark theme if customizing
                withShadow={false}
                autoFocus={false}
                textContainerStyle={[
                  styles.textPhoneInput,
                  {backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500},
                ]} // style the input field
                codeTextStyle={[
                  styles.codeText,
                  {color: dark ? COLORS.greyscale500 : COLORS.dark2},
                ]} // style the country code
                containerStyle={[
                  styles.containerPhoneStyle,
                  {
                    borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
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
            {/* <View   style={[
                styles.inputContainer,
                {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                },
              ]}>
            <TextInput
                keyboardType="phone-pad"  
                placeholder="Enter Your Phone Number"
                placeholderTextColor="#999"
                style={styles.input}
            />
            </View> */}
            <View>
              {/* <RNPickerSelect
                placeholder={{ label: 'Select', value: '' }}
                items={genderOptions}
                onValueChange={(value) => handleGenderChange(value)}
                value={selectedGender}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                }}
              /> */}
            </View>
            <TouchableTextInput
              id="address"
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
                  : 'Address Lookup*'
              }
              onPress={() => {
                navigation.navigate('AddressAdd', {
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
              placeholder="Address"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            />
            <View
              style={[
                styles.inputTextContainer,
                {
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                },
              ]}>
              <TextInput
                placeholder="Note"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                multiline={true} // makes it like textarea
                numberOfLines={6} // initial visible lines
                style={styles.textArea}
                onChangeText={text => setNote(text)}
                value={note}
              />
            </View>
          </View>

          {renderModal()}
        </ScrollView>
        <ButtonFilled
          title="Save"
          onPress={() => handleCreateCustomer()}
          style={styles.button}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    // marginVertical: 10,
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
    height: 50,
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
    bottom: 32,
    right: 16,
    left: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SIZES.width - 32,
    alignItems: 'center',
  },
  continueButton: {
    width: SIZES.width - 32,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 0.4,
    borderRadius: 6,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: COLORS.greyscale500,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLeftIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.primary,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
    marginLeft: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30,
    position: 'absolute',
    bottom: 0, // distance from bottom
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
  },
  inputTextContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 12,
    height: 75,
    width: SIZES.width - 32,
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
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 12,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalSubContainer: {
    height: 460,
    width: SIZES.width * 0.85,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16,
  },
  bellIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 8,
  },
});

export default CreateNewCustomer;
