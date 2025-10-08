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
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import moment from 'moment';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {reducer} from '../utils/reducers/formReducers';
import {validateInput} from '../utils/actions/formActions';
import Feather from 'react-native-vector-icons/Feather';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {getFormatedDate} from 'react-native-modern-datepicker';
import {useTheme} from '../theme/ThemeProvider';
import {GetData} from '../helper/CommonHelper';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetSignature} from '../helper/GetApiHelper';
import Settings from '../config/settings';
import {getInitials} from '../helper/customMethods';

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

interface UserInfo {
  id: any;
  name: string;
  email: string;
  installer_ref_no?: string;
  oil_registration_number?: string;
  gas_safe_id_card?: string;
  photo_url?: string;
  mobile: string;
  max_job_per_slot: string;
}
interface PackageInfo {
  user?: any;
}

const MyProfile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const {dark} = useTheme();
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState(); // for popup modal
  const [packageInfo, setPackageInfo] = useState<PackageInfo>(
    {} as PackageInfo,
  );
  const [signatureImage, setSignatureImage] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const loadUserData = async () => {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (userInfoString) {
      const parsedInfo: UserInfo = JSON.parse(userInfoString);
      const res = await GetData(
        `${Settings.endpoints.user_plan_details(parsedInfo?.id)}`,
      );
      if (res?.data) {
        setPackageInfo(res?.data);
      }
      setUserInfo(parsedInfo);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSignature();
      loadUserData();
      if (route?.params?.signature) {
        setSignatureImage(route.params.signature);
      }
    }, [route?.params?.signature]),
  );

  useEffect(() => {}, []);

  const fetchSignature = async () => {
    setLoading(true);
    try {
      const res = await GetSignature(userInfo.id);
      if (res) {
        console.log('signature====>', res.data);
        setSignature(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
    setLoading(false);
  };

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
  const renderProfile = () => {
    const [image, setImage] = useState(images.user1);

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

    return (
      <View style={styles.profileContainer}>
        <View>
          {userInfo.photo_url ? (
            <Image
              source={{uri: userInfo.photo_url}}
              resizeMode="cover"
              style={styles.avatar}
            />
          ) : (
            <View
              style={[styles.avatarContainer, {backgroundColor: COLORS.gray2}]}>
              <Text style={{fontSize: 60}}>{getInitials(userInfo.name)}</Text>
            </View>
          )}

          <TouchableOpacity onPress={pickImage} style={styles.picContainer}>
            <Image
              source={icons.camera}
              resizeMode="cover"
              tintColor={COLORS.white}
              style={{height: 20, width: 20}}
            />
            {/* <MaterialIcons name="edit" size={16} color={COLORS.white} /> */}
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.title,
            {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
          ]}>
          {userInfo.name}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
          ]}>
          {userInfo.mobile}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
          ]}>
          {userInfo.email}
        </Text>
      </View>
    );
  };
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
              My Profile
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

                navigation.navigate('profileupdate', {
                  titelData: 'Personal Information',
                });
              }}>
              <Text style={styles.dropdownText}>Personal Information</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('profileupdate', {
                  titelData: 'Account Details',
                });
              }}>
              <Text style={styles.dropdownText}>Account Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('SignatureScreen', {
                  onSelect: signature => {
                    setSignatureImage(signature); // Receive selected job
                  },
                });
              }}>
              <Text style={styles.dropdownText}>Signature</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                // navigation.navigate('editregistereddetails', {
                //   company: companyDetails.company,
                // });
              }}>
              <Text style={styles.dropdownText}>Subscriptions</Text>
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
        {/* <Header title="My Profile" /> */}
        {renderHeader()}
        <ScrollView
          style={[
            styles.scrollView,
            {backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite},
          ]}
          showsVerticalScrollIndicator={false}>
          {renderProfile()}
          <View
            style={[
              styles.summaryContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                borderRadius: 6,
              },
            ]}>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Gas Safe ID Card</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {userInfo.gas_safe_id_card}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Oil Registration Number</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {userInfo.oil_registration_number
                  ? userInfo.oil_registration_number
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Installer Ref Number</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {userInfo.installer_ref_no ? userInfo.installer_ref_no : 'N/A'}
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.viewLeft}>Max Job Per Slot</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {userInfo.max_job_per_slot ? userInfo.max_job_per_slot : 'N/A'}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.summarySignatureContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                borderRadius: 6,
              },
            ]}>
            <View style={styles.viewSignatureContainer}>
              <Text style={styles.viewLeft}>Signature</Text>
              {signatureImage ? (
                <Image
                  source={{uri: signatureImage}}
                  resizeMode="contain"
                  style={styles.signatureImage}
                />
              ) : (
                <>
                  {signature ? (
                    <Image
                      source={{uri: signature.path}}
                      style={styles.signatureImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.addSignature}>
                      <Text style={styles.addSignatureText}>Add Signature</Text>
                    </View>
                  )}
                </>
              )}
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
              <Text style={styles.viewLeft}>Subscription</Text>
              <Text
                style={[
                  styles.viewRight,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                Monthly (£
                {packageInfo?.user?.userpackage
                  ? packageInfo?.user?.userpackage?.price.toFixed(2)
                  : '0.00'}
                )
              </Text>
            </View>
            <View style={styles.viewContainer}>
              <View>
                <Text style={styles.viewLeft}>Payment Method</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Image
                    source={{
                      uri: 'https://app.gascertificate.app/build/assets/mastercard-a1edb8f2.png',
                    }}
                    resizeMode="cover"
                    style={{width: 30, height: 20, marginRight: 5}}
                  />
                  <Text style={styles.viewLeft}>Mastercard ....4444</Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.viewRight,
                    {
                      color: dark ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  Credit Card
                </Text>
                <Text
                  style={[
                    styles.viewRight,
                    {
                      color: dark ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  {/* Exp. : 12/2026 */}
                  Exp. :
                  {packageInfo?.user?.userpackage?.end
                    ? moment(packageInfo?.user?.userpackage?.end, 'DD-MM-YYYY')
                        .add(1, 'year')
                        .format('MM/YYYY')
                    : 'N/A'}
                </Text>
              </View>
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
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginTop: 12,
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
  summarySignatureContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    marginVertical: 8,
  },
  viewContainer: {
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
  signatureImage: {
    height: 100,
    width: 100,
    alignItems: 'center', // borderRadius: 65,
  },
  addSignature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addSignatureText: {
    marginLeft: 10,
    color: '#555',
  },
  profileContainer: {
    alignItems: 'center',
    borderBottomColor: COLORS.grayscale400,
    borderBottomWidth: 0.4,
    paddingVertical: 20,
  },
  picContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.greyscale900,
    fontFamily: 'Urbanist Medium',
    marginTop: 4,
  },
  viewSignatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // marginVertical: 12,
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
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
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

export default MyProfile;
