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
  Switch,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {reducer} from '../utils/reducers/formReducers';
import {validateInput} from '../utils/actions/formActions';
import {capitalizeWords, parseFullNumber} from '../helper/customMethods';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Input from '../components/Input';
import {getFormatedDate} from 'react-native-modern-datepicker';
import DatePickerModal from '../components/DatePickerModal';
import RNPickerSelect from 'react-native-picker-select';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import AddressViewItem from '../components/AddressViewItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetCompanyDetails, GetSingleUser} from '../helper/GetApiHelper';
import LottieLoader from '../components/LottieLoader';

const isTestMode = true;

const initialState = {
  inputValues: {
    fullName: isTestMode ? 'John Doe' : '',
    email: isTestMode ? 'example@gmail.com' : '',
    nickname: isTestMode ? '' : '',
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

interface Item {
  flag: string;
  item: string;
  code: string;
}

interface RenderItemProps {
  item: Item;
}

const CompanySettings = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVatRegisterEnabled, setIsVatRegisterEnabled] =
    useState<boolean>(false);
  const [isDisplayCertificaterEnabled, setIsDisplayCertificaterEnabled] =
    useState<boolean>(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const {dark} = useTheme();

  const [userInfo, setUserInfo] = useState();
  const [companyDetails, setCompanyDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];

  const handleGenderChange = (value: any) => {
    setSelectedGender(value);
  };

  const today = new Date();
  const startDate = getFormatedDate(
    new Date(today.setDate(today.getDate() + 1)),
    'YYYY/MM/DD',
  );

  const [startedDate, setStartedDate] = useState('12/12/2023');
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      setUserInfo(JSON.parse(userInfoString));
    };
    fetchUserInfo();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (userInfo?.id) {
        fetchCompanyDetails();
      }
    }, [userInfo]),
  );

  const fetchCompanyDetails = async () => {
    if (!userInfo?.id) return;
    setLoading(true);
    try {
      const res = await GetSingleUser(userInfo?.id); // Replace with actual user ID

      if (res.success) {
        const resCompanyDetails = await GetCompanyDetails(
          res.data.companies[0].id,
        );
        console.log('setCompanyDetails', resCompanyDetails.data.company);
        setCompanyDetails(resCompanyDetails.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
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

  // fectch codes from rescountries api
  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let areaData = data.map((item: any) => {
          return {
            code: item.alpha2Code,
            item: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`,
          };
        });

        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a: any) => a.code == 'US');

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  if (loading || !companyDetails) {
    return <LottieLoader visible={loading} />;
  }
  // render countries codes modal
  function RenderAreasCodesModal() {
    const renderItem = ({item}: RenderItemProps) => {
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
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.primary,
                borderRadius: 12,
              }}>
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

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          {/* Left side: Back button + Title */}
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.arrowLeft}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text
              style={[
                styles.headerTitle,
                {color: dark ? COLORS.white : COLORS.greyscale900},
              ]}>
              Customer Details
            </Text>
          </TouchableOpacity>

          {/* Right side: 3-dot menu */}
          <TouchableOpacity onPress={() => setShowDropdown(prev => !prev)}>
            <Image
              source={showDropdown ? icons.editPencil : icons.moreHorizontal}
              resizeMode="contain"
              style={[
                styles.headerIcon,
                {tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
              ]}
            />
          </TouchableOpacity>
        </View>

        {/* Dropdown */}
        {showDropdown && (
          <View style={styles.topdropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                // navigation.navigate('editcustomer', {customerId: customerId});

                navigation.navigate('editcompanyinfo', {
                  company: companyDetails.company,
                });
              }}>
              <Text style={styles.dropdownText}>Company Information</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('editcompanyaddress', {
                  company: companyDetails.company,
                });
              }}>
              <Text style={styles.dropdownText}>Compnay Address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('editcontactdetails', {
                  company: companyDetails.company,
                });
              }}>
              <Text style={styles.dropdownText}>Contact Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('editbankdetails', {
                  company: companyDetails.company,
                });
              }}>
              <Text style={styles.dropdownText}>Bank Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('editregistereddetails', {
                  company: companyDetails.company,
                });
              }}>
              <Text style={styles.dropdownText}>Registered Details</Text>
            </TouchableOpacity>
          </View>
        )}
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
        {/* <Header title="Company Settings" /> */}
        {renderHeader()}

        <ScrollView
          style={[
            styles.scrollView,
            {backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite},
          ]}
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.summaryFirstContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                borderRadius: 6,
              },
            ]}>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Name</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails?.company?.company_name}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Business Type</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails?.company?.business_type}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Company Registration Number</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails?.company?.company_registration
                  ? companyDetails?.company?.company_registration
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Vat Registered</Text>
              <Switch
                value={isVatRegisterEnabled}
                thumbColor={isVatRegisterEnabled ? 'green' : 'red'}
                trackColor={{
                  false: '#EEEEEE',
                  true: dark ? COLORS.white : COLORS.grayscale700,
                }}
                ios_backgroundColor={dark ? COLORS.white : COLORS.grayscale700}
                onValueChange={() =>
                  setIsVatRegisterEnabled(!isVatRegisterEnabled)
                }
              />
              {/* <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                625462
              </Text> */}
            </View>
            {isVatRegisterEnabled ? (
              <View style={styles.viewContainer}>
                <Text style={styles.viewLeft}>Vat Registration Number</Text>
                <Text
                  style={[
                    styles.viewRight,
                    {
                      color: dark ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  {companyDetails?.company?.vat_number
                    ? companyDetails?.company?.vat_number
                    : 'N/A'}
                </Text>
              </View>
            ) : null}
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>
                Show company name on certificates?
              </Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                <Switch
                  value={isDisplayCertificaterEnabled}
                  thumbColor={isDisplayCertificaterEnabled ? 'green' : 'red'}
                  trackColor={{
                    false: '#EEEEEE',
                    true: dark ? COLORS.white : COLORS.grayscale700,
                  }}
                  ios_backgroundColor={
                    dark ? COLORS.white : COLORS.grayscale700
                  }
                  onValueChange={() =>
                    setIsDisplayCertificaterEnabled(
                      !isDisplayCertificaterEnabled,
                    )
                  }
                />
              </Text>
            </View>

            {isDisplayCertificaterEnabled ? (
              <View style={styles.viewContainer}>
                <Text style={styles.viewLeft}>
                  Show company name on certificates?
                </Text>
                <Text
                  style={[
                    styles.viewRight,
                    {
                      color: dark ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  {companyDetails?.company?.display_company_name
                    ? companyDetails?.company?.display_company_name
                    : 'N/A'}
                </Text>
              </View>
            ) : null}
          </View>

          <View
            style={[
              styles.summaryAddressContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                borderRadius: 6,
              },
            ]}>
            <View style={styles.viewAddreesContainer}>
              <View>
                <View>
                  <AddressViewItem
                    onPress={
                      () => {}
                      // navigation.navigate('updateoccupiedaddress', {
                      // address: item,
                      // customerId: customerId,
                      // })
                    }
                    address={companyDetails?.company?.full_address}
                    // others={` London, EC1V 2NX `}
                    icon={false}
                  />
                </View>
              </View>
              {/* <View
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}> */}
            </View>
          </View>
          <View
            style={[
              styles.summaryContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                borderRadius: 6,
              },
            ]}>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Phone Number</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.company_phone
                  ? companyDetails.company.company_phone
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Email</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.company_email
                  ? companyDetails.company.company_email
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Website</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.company_web_site
                  ? companyDetails.company.company_web_site
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Company Tagline</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.company_tagline
                  ? companyDetails.company.company_tagline
                  : 'N/A'}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.summaryContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                borderRadius: 6,
              },
            ]}>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Account Name</Text>

              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.company_bank_details.name_on_account
                  ? companyDetails.company.company_bank_details.name_on_account
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Short Code</Text>

              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.company_bank_details.sort_code
                  ? companyDetails.company.company_bank_details.sort_code
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Account Number</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.company_bank_details.account_number
                  ? companyDetails.company.company_bank_details.account_number
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Payment Terms</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.company_bank_details.payment_term
                  ? companyDetails.company.company_bank_details.payment_term
                  : 'N/A'}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.summaryContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                borderRadius: 6,
              },
            ]}>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Gas Safe Registration No</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.gas_safe_registration_no
                  ? companyDetails.company.gas_safe_registration_no
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Registration No</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.registration_no
                  ? companyDetails.company.registration_no
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Registration Body For</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.register_body_id
                  ? companyDetails.company.register_body_id
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>
                Registration Body For Legionella Risk Assessment
              </Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.registration_body_for_legionella
                  ? companyDetails.company.registration_body_for_legionella
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>
                Registration No For Legionella Risk Assessment
              </Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {companyDetails.company.registration_body_no_for_legionella
                  ? companyDetails.company.registration_body_no_for_legionella
                  : 'N/A'}
              </Text>
            </View>
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
  scrollView: {
    backgroundColor: COLORS.tertiaryWhite,
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
    borderRadius: 6,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: '#111',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 32,
    width: 32,
    tintColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginLeft: 12,
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
  summaryContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
  },
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  summaryAddressContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    padding: 2,
    marginVertical: 8,
  },
  summaryFirstContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    marginTop: 20,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  viewAddreesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  viewLeft: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: 'gray',
  },
  viewRight: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.black,
  },
  topdropdown: {
    position: 'absolute',
    top: 30, // just below header
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 5, // shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 100,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
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
});

export default CompanySettings;