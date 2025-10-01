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
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  getInitials,
  formatDate,
  capitalizeWords,
} from '../helper/customMethods';
import {reducer} from '../utils/reducers/formReducers';
import {validateInput} from '../utils/actions/formActions';
import moment from 'moment';
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
import {CreateJob} from '../helper/JobHelper';
import {convertTimetoTimeHour} from '../helper/customMethods';
import Toast from 'react-native-toast-message';

const isTestMode = true;

const initialState = {
  inputValues: {
    job_name: '',
    amount: '',
    job_refference: '',
  },
  inputValidities: {
    job_name: false,
    amount: false,
    job_refference: false,
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

const CreateNewJob = ({route}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [areas, setAreas] = useState([]);
  const [customer, setCustomer] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerCreateModal, setCustomerCreateModal] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [autoReminder, setAutoReminder] = useState<boolean>(true);
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [mobileNo, setMobile] = useState<string>('');
  const [date, setDate] = useState(''); // min date
  const [selectedDateTime, setSelectedDateTime] = useState(''); // initial date
  const [note, setNote] = useState(''); // initial date
  const [jobName, setJobName] = useState(''); // initial date
  const [slotId, setSlotId] = useState<string>('');
  const [lookupAddress, setLookupAddress] = useState({
    id: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    country: '',
    state: '',
    postal_code: '',
    latitude: null,
    longitude: null,
  });
  const [customerName, setCustomerName] = useState<string>('NC');
  const phoneInput = useRef<PhoneInput>(null);

  const {dark} = useTheme();

  const handleCreateJob = async () => {
    let jobInfo = {
      customer_id: customer?.id, // customer id
      customer_property_id: lookupAddress?.id, // customer property id
      description: formState.inputValues.job_name, // Label Name = Job Name
      details: note,
      customer_job_status_id: 1, // default value is 1 (Ongoing) || 1 = Ongoing, 2 = Completed, 3 = Cancelled
      // "reference_no": formState.inputValues.job_refference,
      estimated_amount: formState.inputValues.amount, // Label Name = Amount
      job_calender_date: moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD'), // Label Name = Date
      calendar_time_slot_id: slotId,
    };
    const jobsRes = await CreateJob(jobInfo);
    if (jobsRes?.data) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Job created with full details!',
        position: 'top',
        visibilityTime: 3000,
      });
      navigation.navigate('myjobs');
    } else {
      // ⚠️ Partial Success (Job created, but appointment failed)
      Toast.show({
        type: 'info',
        text1: 'Partial Success',
        text2: 'Job created, but appointment scheduling failed.',
        position: 'top',
        visibilityTime: 3000,
      });
      // navigation.navigate('JobsScreen');
    }
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

  const renderModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={false}>
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
              <ButtonFilled
                title="Continue"
                onPress={() => {
                  setCustomerCreateModal(false);
                  navigation.goBack();
                }}
                style={{
                  width: '100%',
                  marginTop: 12,
                }}
              />
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
  React.useEffect(() => {
    const updates: any = {};

    if (route.params?.selectedDate && route.params?.selectedSlot) {
      const parsedDate = moment(route.params.selectedDate, 'YYYY/MM/DD').format(
        'DD-MM-YYYY',
      );
      setDate(parsedDate);
      setSlotId(route?.params?.selectedSlot?.id);
      setSelectedDateTime(
        `${parsedDate} ${convertTimetoTimeHour(
          route?.params?.selectedSlot?.start,
        )}`,
      );

      navigation.setParams({
        selectedDate: undefined,
        selectedTime: undefined,
      });
    }

    if (route.params?.selectedCustomer) {
      setCustomer(route.params.selectedCustomer);
    }

    if (route.params?.note !== null && route.params?.note !== undefined) {
      setNote(route.params.note);
    }

    if (
      route.params?.job_name !== null &&
      route.params?.job_name !== undefined
    ) {
      inputChangedHandler('job_name', route.params.job_name);
    }

    if (route.params?.amount !== null && route.params?.amount !== undefined) {
      inputChangedHandler('amount', route.params.amount);
    }

    if (
      route.params?.job_refference !== null &&
      route.params?.job_refference !== undefined
    ) {
      inputChangedHandler('job_refference', route.params.job_refference);
    }

    if (
      route.params?.address?.address_line_1 !== '' ||
      route.params?.address?.address_line_2 !== ''
    ) {
      const updated = {
        id: route.params?.address?.id,
        address_line_1: capitalizeWords(route.params?.address?.address_line_1),
        address_line_2: capitalizeWords(route.params?.address?.address_line_2),
        city: capitalizeWords(route.params?.address?.city),
        country: capitalizeWords(route.params?.address?.country),
        state: capitalizeWords(route.params?.address?.state),
        postal_code: route.params?.address?.postal_code,
        latitude: route.params?.address?.lang,
        longitude: route.params?.address?.long,
      };
      setLookupAddress(updated);
    }
  }, [route.params]);
  // React.useEffect(() => {
  //   if (route.params?.selectedDate && route.params?.selectedTime) {
  //     const parsedDate = moment(route.params.selectedDate, 'YYYY/MM/DD').format(
  //       'DD-MM-YYYY',
  //     );
  //     setDate(parsedDate)
  //     setTime(route.params.selectedTime)
  //     setSelectedDateTime(`${parsedDate} ${route.params.selectedTime}`);
  //   }

  //   if (route.params?.selectedCustomer) {
  //     setCustomer(route.params.selectedCustomer);
  //   }
  //   if (route.params?.note) {
  //     setNote(route.params.note);
  //   }
  //   if (route.params?.job_name) {
  //     alert(route.params?.job_name)
  //     dispatchFormState({
  //       type: 'SET_FORM', // you may need to handle this in your reducer
  //       inputValues: {
  //         job_name: route.params.job_name || '',
  //       },
  //       inputValidities: {
  //         job_name: !!route.params.job_name
  //       },
  //       formIsValid: true, // optional, compute based on validities
  //     });
  //   }

  //   if (route.params?.address?.address_line_1!=="" || route.params?.address?.address_line_2!=="") {
  //     const updated = {
  //       id: route.params?.address?.id,
  //       address_line_1: capitalizeWords(route.params?.address?.address_line_1),
  //       address_line_2: capitalizeWords(route.params?.address?.address_line_2),
  //       city: capitalizeWords(route.params?.address?.city),
  //       country: capitalizeWords(route.params?.address?.country),
  //       state: capitalizeWords(route.params?.address?.state),
  //       postal_code: route.params?.address?.postal_code,
  //       latitude: route.params?.address?.lang,
  //       longitude: route.params?.address?.long,
  //     };
  //      setLookupAddress(updated);
  //   }
  // }, [route.params]);
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
            Add A New Job
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
          <View style={{alignItems: 'center', marginVertical: 50}}>
            <TouchableTextInput
              id="customer_name"
              onPress={() =>
                navigation.navigate('customerselectscreen', {
                  ...route.params,
                  job_name: formState.inputValues.job_name,
                  amount: formState.inputValues.amount,
                  job_refference: formState.inputValues.job_refference,
                  note: note,
                  previousScreen: 'createnewjob',
                })
              }
              placeholder="Customer*"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={customer?.full_name}
            />
            <TouchableTextInput
              id="address"
              onPress={() =>
                customer?.id
                  ? navigation.navigate('selectshippingaddress', {
                      customerId: customer?.id,
                      ...route.params,
                      job_name: formState.inputValues.job_name,
                      amount: formState.inputValues.amount,
                      job_refference: formState.inputValues.job_refference,
                      note: note,
                      navigateScreen: 'createnewjob',
                    })
                  : alert('Please Select Customer')
              }
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
              placeholder="Job Address*"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            />
            <Input
              id="job_name"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['job_name']}
              placeholder="Job Name*"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={formState.inputValues.job_name}
            />
            <Input
              id="amount"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['amount']}
              placeholder="Amount"
              numeric
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={formState.inputValues.amount}
            />
            <TouchableTextInput
              id="book"
              onPress={() =>
                navigation.navigate('datetimepickerscreen', {
                  ...route.params,
                  job_name: formState.inputValues.job_name,
                  amount: formState.inputValues.amount,
                  job_refference: formState.inputValues.job_refference,
                  note: note,
                })
              }
              placeholder="Book Appoinment"
              value={selectedDateTime}
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            />
            {/* <Input
              id="job_refference"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['job_refference']}
              placeholder="Job Refference"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={formState.inputValues.job_refference}
            /> */}
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
          onPress={() => handleCreateJob()}
          style={styles.button}
        />

        {/* <DatePickerModal 
            open={customerCreateModal}
            startDate={startDate}
            selectedDate={selectedDate}
            onClose={() => setCustomerCreateModal(false)}
            onChangeStartDate={(date: string) => setSelectedDate(date)}
          /> */}
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

export default CreateNewJob;
