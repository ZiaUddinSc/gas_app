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

const Comments = ({route}) => {
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
          <Header title="Add Comments" />
        </View>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
            marginTop: 12,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{margin: 20}}>
            <View style={{marginTop: 12}}>
              <Text
                style={[
                  commonStyles.inputHeader,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                Give Any Details of Any Faults
              </Text>
              <TextInput
                placeholder="Give Any Details of Any Faults"
                placeholderTextColor={dark ? COLORS.white : COLORS.grayscale700}
                multiline={true} // makes it like textarea
                numberOfLines={6} // initial visible lines
                style={[
                  styles.codeFullInput,
                  {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}
              />
            </View>
            <View style={{marginTop: 12}}>
              <Text
                style={[
                  commonStyles.inputHeader,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                Rectification Work Carried Out
              </Text>
              <TextInput
                placeholder="Rectification Work Carried Out"
                placeholderTextColor={dark ? COLORS.white : COLORS.grayscale700}
                style={[
                  styles.codeFullInput,
                  {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}
              />
            </View>
            <View style={{marginTop: 12}}>
              <Text
                style={[
                  commonStyles.inputHeader,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                Details of Works Carried Out
              </Text>
              <TextInput
                placeholder="Details of Works Carried Out"
                placeholderTextColor={dark ? COLORS.white : COLORS.grayscale700}
                style={[
                  styles.codeFullInput,
                  {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}
              />
            </View>
            <View style={{marginTop: 12}}>
              <Text
                style={[
                  commonStyles.inputHeader,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                Has Flue Cap Been Put Back?
              </Text>
              <RNPickerSelect
                onValueChange={val => setRelationValue(val)}
                value={relationValue}
                items={[
                  {label: 'Yes', value: 'apple'},
                  {label: 'No', value: 'banana'},
                  {label: 'N/A', value: 'orange'},
                ]}
                placeholder={{label: 'Has Flue Cap Been Put Back?', value: null}}
                textInputProps={{
                  
                 
                }}
                style={{
                  inputAndroid: {
                    width:"100%",
                    // alignSelf: 'center', 
                    // textAlign:'center',
                    // alignSelf: 'center', 
                    paddingVertical: 0, // reduce vertical padding
                    paddingHorizontal: 8,
                    fontSize: 16,
                    height: 52,
                    borderRadius:100,
                    alignSelf: 'stretch', 
                    alignItems:'center', 
                    justifyContent:'center',
                    backgroundColor: COLORS.white,
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
                  done: {color: 'blue'},
                  placeholder: {color: '#999'},
                }}
              />
            </View>
          
          </View>
        </ScrollView>
        <ButtonFilled
          title="Add Comments"
          onPress={() => {}}
          style={styles.saveButton}
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
  saveButton: {
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
    height: 75,
    borderRadius:16,
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

export default Comments;
