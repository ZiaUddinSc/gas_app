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
import MessageModal from '../components/MessageModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getInitials,phoneNumberWithZero,removeZeroAndBracket} from '../helper/customMethods';
import {CustomerUpdateReducer} from '../utils/reducers/formReducers';
import {validateInput} from '../utils/actions/formActions';
import ProfileAvatorView from '../components/ProfileAvatorView';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Input from '../components/Input';
import TouchableTextInput from '../components/TouchableTextInput';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import {GetSignleCustomer} from '../helper/GetApiHelper';
import {CustomerUpdate,CustomerContactInfoUpdate} from '../helper/CustomerHelper';
import RNPickerSelect from 'react-native-picker-select';
import { getISO2FromCallingCode } from '../utils/mapCountryCodeToISO2';
import { capitalizeWords,parseFullNumber,removeZeroFromFirstBracket } from '../helper/customMethods';

const isTestMode = true;

const initialState = {
  inputValues: {
    fullName: '',
    email: '',
    nickname: '',
    phoneNumber: '',
  },
  inputValidities: {
    fullName: false,
    email: false,
    nickname: false,
    phoneNumber: false,
  },
  formIsValid: false,
};
interface PhoneParts {
  countryCode: string;
  localNumber: string;
}
interface Item {
  flag: string;
  item: string;
  code: string;
}

interface RenderItemProps {
  item: Item;
}

const EditCustomer = ({route}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(
    CustomerUpdateReducer,
    initialState,
  );
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerCreateModal, setCustomerCreateModal] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [autoReminder, setAutoReminder] = useState<number>(1);
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [formattedValue, setFormattedValue] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('NC');
  const {dark} = useTheme();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>(''); // default code
  const [mobileCountryCode, setMobileCountryCode] = useState<string>(''); // default code
  const [phoneFormattedValue, setPhoneFormattedValue] = useState<string>('');
  const [mobileNo, setMobileNo] = useState<string>('');
  const mobilePhoneInput = useRef<PhoneInput>(null);
  const phoneInputRef = useRef<PhoneInput>(null);
  const [message, setMessage] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
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
    id:'',
    address_line_1: '',
    address_line_2: '',
    city: '',
    country: '',
    state: '',
    postal_code: '',
    latitude: null,
    longitude: null,
  });
  const customerId = route?.params?.customerId;
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

  
const handlePhoneChange = (text) =>{
  let phoneNo = phoneNumberWithZero(text)
  alert(phoneNo)
  setPhoneNo(phoneNo)
  setPhoneFormattedValue(phoneNo)
}
  useFocusEffect(
    useCallback(() => {
      // fetchTitle();
      fetchCustomer();
    }, []),
  );

  const parsePhoneNumber = (fullNumber: string): PhoneParts => {
    const match = fullNumber.match(/^\+(\d{1,3})(\d+)/);
    if (match) {
      return {
        countryCode: match[1], // e.g., "44"
        localNumber: match[2], // e.g., "4242424242"
      };
    }
    return {
      countryCode: '',
      localNumber: fullNumber, // fallback if format is invalid
    };
  };



  const fetchCustomer = async () => {
    const res: any = await GetSignleCustomer(customerId);
    if (res?.success && res?.data) {
      let customerData: any = res?.data?.data;
      setCustomer(res?.data?.data);
      setCustomerName(getInitials(customerData?.full_name));
      setNote(customer?.note);
      getFullAddress(customerData);
      setAutoReminder(customerData?.auto_reminder);
      dispatchFormState({
        type: 'SET_FORM', // you may need to handle this in your reducer
        inputValues: {
          fullName: customerData?.full_name || '',
          email: customerData?.contact?.email || '',
          company_name: customerData?.company_name || '',
        },
        inputValidities: {
          fullName: !!customerData?.full_name,
          email: !!customerData?.email,
          company_name: !!customerData?.company_name,
        },
        formIsValid: true, // optional, compute based on validities
      });
      if (customerData?.contact?.phone) {
        let {iso2,localNumber} = parseFullNumber(customerData?.contact?.phone)
        setCountryCode(iso2)

        let phoneNo = phoneNumberWithZero(localNumber)
        setPhoneNo(phoneNo)
        // alert(getISO2FromFullNumber(customerData?.contact?.phone))
      }
      if (customerData?.contact?.mobile) {
       
        let {iso2,localNumber} = parseFullNumber(customerData?.contact?.mobile)
        setMobileCountryCode(iso2)

        let mobileNo = phoneNumberWithZero(localNumber)
        setMobileNo(mobileNo)
      }
    }
    setLoading(false);
  };

  const getFullAddress = customerAddress => {
    const {
      address_line_1,
      address_line_2,
      city,
      postal_code,
      state,
      lat,
      long,
      country,
    } = customerAddress;

    let newAddress = '';
    if (address_line_1 && address_line_2) {
      newAddress = `${address_line_1.trim()}, ${address_line_2.trim()}, ${city}, ${postal_code}`;
    }
    setLookupAddress({
      address_line_1: address_line_1,
      address_line_2: address_line_2,
      city: city,
      country: country,
      state: state,
      postal_code: postal_code,
      latitude: lat,
      longitude: long,
    });
  };

  const handleUpdateCustomer = async () => {
   
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
      company_name: formState.inputValues.company_name,
      address_line_1: lookupAddress?.address_line_1,
      address_line_2: lookupAddress.address_line_2,
      postal_code: lookupAddress?.postal_code,
      state: lookupAddress?.state,
      city: lookupAddress?.city,
      country: lookupAddress?.country,
      latitude: lookupAddress?.latitude,
      longitude: lookupAddress?.longitude,
      note: note,
      auto_reminder: autoReminder,
      // mobile: formattedValue,
      // phone: phoneFormattedValue,
      // email: formState.inputValues.email,
    };
    const res = await CustomerUpdate(customerId, customerPayload);

    if (res.success) {
      
      if(formattedValue || phoneFormattedValue || formState.inputValues.email){
        let contactInfo ={
          "mobile": removeZeroFromFirstBracket(formattedValue),
          "phone": removeZeroFromFirstBracket(phoneFormattedValue),
          "email":  formState.inputValues.email,
       }
        const result = await CustomerContactInfoUpdate(customer?.contact?.id, contactInfo);
      }
      setModelOpen(true)
      setTimeout(()=>{
        setModelOpen(false)
        navigation.goBack()
      },1500)
    } else {
      // Alert.alert('Update Failed', 'Please try again later.');
    }
  };

  const onHandleBellIcon = async () => {
    if (autoReminder === 1) {
      setAutoReminder(2);
    } else {
      setAutoReminder(1);
    }

    // let data ={
    //   auto_reminder: autoReminder ? 1 : 2,
    // }
    // const res = await CustomerUpdate(customerId, data);
    // if (res.success) {
    //   Alert.alert('Success', res?.data?.message || 'Customer data updated successfully');

    // }else{
    //   Alert.alert('Update Failed', 'Please try again later.');
    // }
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);

      if (inputId === 'fullName') {
        if (inputValue) {
          setCustomerName(getInitials(inputValue));
        } else {
          setCustomerName('NC');
        }
      }
      dispatchFormState({
        type: 'INPUT_CHANGE', // you may need to handle this in your reducer
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
            Edit Customer
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => onHandleBellIcon()}>
            <Image
              source={icons.bell}
              resizeMode="contain"
              style={[
                styles.searchIcon,
                {
                  tintColor: autoReminder === 1 ? 'green' : 'red',
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={{fontSize: 10, color: dark ? COLORS.white : COLORS.black}}>
            {autoReminder === 1 ? 'On' : 'Off'}
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
          </View>

          <View>
            <Input
              id="fullName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['fullName']}
              placeholder="Full Name*"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={formState.inputValues.fullName}
            />
            <Input
              id="company_name"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['compnay_name']}
              placeholder="Company Name"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={formState.inputValues.company_name}
            />
            <Input
              id="email"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['email']}
              placeholder="Email"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              keyboardType="email-address"
              value={formState.inputValues.email}
            />
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                },
              ]}>
              <PhoneInput
                key={mobileCountryCode}
                ref={mobilePhoneInput}
                value={mobileNo} // just number
                defaultCode={mobileCountryCode  ? mobileCountryCode :"GB" as  any} // set country code
                layout="first"
                onChangeText={text => {
                  setMobileNo(text);
                }}
                textInputProps={{
                  placeholder: 'Enter Mobile Number',
                  placeholderTextColor: dark ? COLORS.grayTie : COLORS.black,
                  style: {color: dark ? COLORS.white : COLORS.black}, // text color
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
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
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                },
              ]}>
              <PhoneInput
                key={countryCode}
                defaultValue={phoneNo}   // ✅ use defaultValue instead of value
                ref={phoneInputRef}
                value={phoneNo} // just number
                defaultCode={countryCode  ? countryCode :"GB" as  any} // set country code
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
          <TouchableTextInput
              id="address"
              value={
                lookupAddress.address_line_1
                  ? `${capitalizeWords(lookupAddress.address_line_1)}${
                      lookupAddress.address_line_2
                        ? ', ' + capitalizeWords(lookupAddress.address_line_2)
                        : ''
                    }${lookupAddress.city ? ', ' + capitalizeWords(lookupAddress.city) : ''}${
                      lookupAddress.postal_code
                        ? ', ' + lookupAddress.postal_code
                        : ''
                    }`
                  : 'Address Lookup*'
              }
              onPress={() => {
                navigation.navigate('updateaddressscreen', {
                  initialValues: lookupAddress,
                  customerId: customerId,
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
                onChangeText={text => setNote(text)}
                placeholder="Note"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                multiline={true} // makes it like textarea
                numberOfLines={6} // initial visible lines
                style={styles.textArea}
                value={note}
              />
            </View>
          </View>
        </ScrollView>
        <ButtonFilled
          title="Update"
          onPress={() => handleUpdateCustomer()}
          style={styles.button}
        />
      </View>
      <MessageModal
       open={modelOpen}
       icon={icons.user}
       heading='Success !'
       title='Customer Updated Sucessfully.'
      />
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

export default EditCustomer;
