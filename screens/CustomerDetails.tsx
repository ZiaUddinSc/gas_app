import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Linking,
  TextInput,
} from 'react-native';
import React, {useState, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useTheme} from '../theme/ThemeProvider';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {COLORS, icons, images, SIZES} from '../constants';
import SettingsItem from '../components/SettingsItem';
import Button from '../components/Button';
import ButtonFilled from '../components/ButtonFilled';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {async} from 'validate.js';
import AddressItem from '../components/CustomerAddressCard';
// import Colors from '../src/theme/Colors';
import ProfileAvatorView from '../components/ProfileAvatorView';
import {getInitials} from '../helper/customMethods';
import {GetSignleCustomer} from '../helper/GetApiHelper';
import { capitalizeWords } from '../helper/customMethods';

type Nav = {
  navigate: (value: string) => void;
};

const CustomerDetails = ({route}) => {
  const refRBSheet = useRef<any>(null);
  const {dark, colors, setScheme} = useTheme();
  // const { navigate } = useNavigation<Nav>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [autoReminder, setAutoReminder] = useState<number>(1);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const customerId = route?.params?.customerId;

  const onHandleBellIcon = () => {
    if (autoReminder === 1) {
      setAutoReminder(2);
    } else {
      setAutoReminder(1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // fetchTitle();
      fetchCustomer();
    }, []),
  );

  const fetchCustomer = async () => {
    const res: any = await GetSignleCustomer(customerId);

    if (res?.success && res?.data) {
      setCustomer(res?.data?.data);
      setAutoReminder(res?.data?.data?.auto_reminder);
    }
    setLoading(false);
  };
  /**
   * Render header
   */
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
              source={icons.moreHorizontal}
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
                navigation.navigate('editcustomer', {customerId: customerId});
              }}>
              <Text style={styles.dropdownText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  /**
   * Render User Profile
   */
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
          <ProfileAvatorView name={getInitials(customer?.full_name)} />
        </View>
        <Text
          style={[
            styles.title,
            {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
          ]}>
          {capitalizeWords(customer?.customer_full_name)}{' '}
          {customer?.company_name ? `| ${customer?.company_name}` : ''}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
          ]}>
          {customer?.contact?.email ?? 'N/A'}
        </Text>
      </View>
    );
  };
  /**
   * Render Settings
   */
  const renderDetails = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setIsDarkMode(prev => !prev);
      dark ? setScheme('light') : setScheme('dark');
    };

    return (
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {
              backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            },
          ]}>
          <TouchableOpacity
            // onPress={() => navigation.navigate("productreviews")}
            style={styles.detailsContainer}>
            <View style={styles.detailsRightContainer}>
              <AddressItem
                onPress={() => {}}
                address={`${capitalizeWords(customer?.address_line_1)}, ${
                  customer?.address_line_2 !== null
                    ? capitalizeWords(customer?.address_line_2) + ', '
                    : ''
                }`}
                others={`${capitalizeWords(customer?.city)}, ${customer?.postal_code}`}
              />
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.separateLine,
              {
                marginVertical: 10,
                backgroundColor: dark
                  ? COLORS.greyScale800
                  : COLORS.grayscale200,
              },
            ]}
          />
          <View style={styles.buttonContainer}>
            {/* onPress={() => Linking.openURL(`tel:${customerCallInfo?.contact?.phone}`)} */}
            {customer?.contact?.mobile ? (
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${customer?.contact?.mobile}`)
                }
                style={[
                  styles.cancelBtn,
                  {
                    borderColor: dark ? COLORS.white : COLORS.primary,
                  },
                ]}>
                <Text
                  style={[
                    styles.cancelBtnText,
                    {
                      color: dark ? COLORS.white : COLORS.primary,
                    },
                  ]}>
                  {customer?.contact?.mobile}
                </Text>
              </TouchableOpacity>
            ) : null}
            {customer?.contact?.phone ? (
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${customer?.contact?.phone}`)
                }
                style={[
                  styles.receiptBtn,
                  {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.primary,
                    borderColor: dark ? COLORS.dark3 : COLORS.primary,
                  },
                ]}>
                <Text style={styles.receiptBtnText}>
                  {customer?.contact?.phone}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {
              backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            },
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('selectshippingaddress', {
                  customerId: customerId,
                })
              }>
              <Text
                style={[
                  styles.textColorCount,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {customer?.number_of_job_address ?? '0'}
              </Text>
              <Text
                style={[
                  styles.textCountTitle,
                  {
                    color: dark ? COLORS.white : COLORS.greyscale900,
                  },
                ]}>
                ADDRESS
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 15,
                width: 4,
                height: 30, // adjust size
                backgroundColor: dark ? COLORS.white : COLORS.grayscale400,
                marginHorizontal: 8, // spacing from left/right
              }}
            />
            <View>
              <Text
                style={[
                  styles.textColorCount,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}>
                {customer?.number_of_jobs ?? '0'}
              </Text>
              <Text
                style={[
                  styles.textCountTitle,
                  {
                    color: dark ? COLORS.white : COLORS.greyscale900,
                  },
                ]}>
                JOB
              </Text>
            </View>
            <View
              style={{
                marginTop: 15,
                width: 4,
                height: 30, // adjust size
                backgroundColor: dark ? COLORS.white : COLORS.grayscale400,
                marginHorizontal: 8, // spacing from left/right
              }}
            />
            <View style={{marginTop: 5}}>
              <TouchableOpacity
                onPress={() => onHandleBellIcon()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.bellOutline}
                  resizeMode="contain"
                  style={[
                    styles.bellIcon,
                    {
                      tintColor:
                        autoReminder === 1 ? COLORS.greeen : COLORS.red,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: autoReminder === 1 ? COLORS.greeen : COLORS.red,
                  }}>
                  {autoReminder === 1 ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.textCountTitle,
                  {
                    color: dark ? COLORS.white : COLORS.greyscale900,
                  },
                  {margin: 2},
                ]}>
                REMINDER
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {
              backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={[
                styles.inputTextContainer,
                {
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                },
              ]}>
              <TextInput
                readOnly
                placeholder="Note"
                value={customer?.note}
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                multiline={true} // makes it like textarea
                numberOfLines={6} // initial visible lines
                style={styles.textArea}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderProfile()}
          {renderDetails()}
        </ScrollView>
        <ButtonFilled
          title="Add New Job"
          onPress={() => navigation.navigate('createnewjob')}
          style={styles.button}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={SIZES.height * 0.8}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.gray2 : COLORS.grayscale200,
            height: 4,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 260,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          },
        }}>
        <Text style={styles.bottomTitle}>Logout</Text>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
            },
          ]}
        />
        <Text
          style={[
            styles.bottomSubtitle,
            {
              color: dark ? COLORS.white : COLORS.black,
            },
          ]}>
          Are you sure you want to log out?
        </Text>
        <View style={styles.bottomContainer}>
          <Button
            title="Cancel"
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => refRBSheet.current.close()}
          />
          {/* <ButtonFilled
            title="Yes, Logout"
            style={styles.logoutButton}
            onPress={() => 
            {
              refRBSheet.current.close();
              logout()
            }}
          /> */}
        </View>
      </RBSheet>
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
    padding: 16,
    marginBottom: 32,
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
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  profileContainer: {
    alignItems: 'center',
    borderBottomColor: COLORS.grayscale400,
    borderBottomWidth: 0.4,
    paddingVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
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
  title: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.greyscale900,
    fontFamily: 'Urbanist Medium',
    marginTop: 4,
  },
  settingsContainer: {
    marginVertical: 12,
  },
  settingsItemContainer: {
    width: SIZES.width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  settingsName: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  settingsArrowRight: {
    width: 24,
    height: 24,
    tintColor: COLORS.greyscale900,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightLanguage: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    marginRight: 8,
  },
  switch: {
    marginLeft: 8,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Adjust the size of the switch
  },
  logoutContainer: {
    width: SIZES.width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  logoutLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  logoutName: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32,
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist SemiBold',
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
  },
  bottomSubtitle: {
    fontSize: 20,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    textAlign: 'center',
    marginVertical: 28,
  },
  separateLine: {
    width: SIZES.width,
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginTop: 12,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
    marginRight: 6,
  },
  removeButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },

  bellIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },

  cardContainer: {
    width: SIZES.width - 32,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },

  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageContainer: {
    width: 88,
    height: 88,
    borderRadius: 16,
    marginHorizontal: 12,
    backgroundColor: COLORS.silver,
  },
  productImage: {
    width: 88,
    height: 88,
    borderRadius: 16,
  },
  detailsRightContainer: {
    flex: 1,
    // marginLeft: 12
  },
  reviewContainer: {
    position: 'absolute',
    top: 6,
    right: 16,
    width: 46,
    height: 20,
    borderRadius: 16,
    backgroundColor: COLORS.transparentWhite2,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.grayscale700,
    marginVertical: 6,
  },

  rating: {
    fontSize: 12,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
    marginLeft: 4,
  },

  statusContainer: {
    width: 54,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    color: COLORS.primary,
    fontFamily: 'Urbanist Medium',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    width: (SIZES.width - 32) / 2 - 16,
    height: 36,
    borderRadius: 24,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    margin: 10,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12,
  },
  cancelBtnText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
  },
  name: {
    fontSize: 17,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },

  textColorCount: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Urbanist Bold',
  },

  receiptBtn: {
    width: (SIZES.width - 32) / 2 - 16,
    height: 36,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12,
  },
  receiptBtnText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.white,
  },
  priceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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
  textCountTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
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
    margin: 10,
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
    // paddingTop: 0,
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

export default CustomerDetails;
