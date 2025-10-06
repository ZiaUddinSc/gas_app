import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {ongoingJobs} from '../data';
import Header from '../components/Header';
import {useTheme} from '../theme/ThemeProvider';
import Button from '../components/Button';
import {
  COLORS,
  icons,
  images,
  SIZES,
  scaleByWidth,
  scaleFont,
} from '../constants';
import BoilerManualList from '../components/BoilerManualList';
import LottieLoader from '../components/LottieLoader';
import RBSheet from 'react-native-raw-bottom-sheet';

import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import ButtonFilled from '../components/ButtonFilled';
import {
  getInitials,
  convertTimetoTimeHour,
  capitalizeWords,
  removeZeroAndBracket,
  phoneNumberWithZero,
} from '../helper/customMethods';
import Settings from '../config/settings';
import {GetSingleJob} from '../helper/GetApiHelper';
import moment from 'moment';
interface jobdata {
  id: string;
  name: string;
}
type Customer = {
  id: string;
  full_name: string;
  company_name: string;
  address_line_1: string;
  address_line_2: string;
  full_address: string;
  city: string;
  postal_code: string;
  contact: any;
};
const JobDetailsScreen = ({route}) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const refRBSheet = useRef<any>(null);
  const [jobData, setJobData] = useState<any>([]);
  const jobId = route?.params?.jobId;
  const {dark} = useTheme();
  const [loading, setLoading] = useState(false);
  const [customerCallInfo, setCustomerCallInfo] = useState<Customer>();
  const [invoice, setInvoice] = useState<number>(2);

  const navigation = useNavigation<NavigationProp<any>>();
  const fetchDetails = async () => {
    let response = await GetSingleJob(jobId);
    if (response?.success) {
      setLoading(false);
      setJobData(response?.data?.job);
    }
  };

  const onHandleBellIcon = () => {
    if (invoice === 1) {
      setInvoice(2);
    } else {
      setInvoice(1);
    }
  };

  const shareToWhatsApp = async (message, phoneNumber = '') => {
    let url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    if (phoneNumber) {
      // For specific number, include country code (e.g., '91' for India)
      url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message,
      )}`;
    }

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'WhatsApp is not installed on your device');
      }
    } catch (error) {
      console.error('Failed to open WhatsApp:', error);
    }
  };

  const sendSMS = async (phoneNumber, message) => {
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open SMS app:', error);
    }
  };
  const onclickCustomerDialedNumber = callItem => {
    setCustomerCallInfo(callItem);
    refRBSheet.current?.open();
  };
  useFocusEffect(
    useCallback(() => {
      fetchDetails();
    }, []),
  );

  const renderWalletCard = () => {
    return (
      <View style={styles.walletCardContainer}>
        <View style={styles.topCardContainer}>
          <View style={styles.topCardLeftContainer}></View>
          {/* <View>
                <Text style={styles.cardNumber}>Fix leaking faucet in kitchen</Text>
              </View> */}
          <View style={styles.topCardRightContainer}>
            {jobData?.calendar?.date ? (
              <View style={styles.topupBtn}>
                <Text style={styles.topupBtnText}>
                  {moment(jobData?.calendar?.date, 'DD-MM-YYYY').format(
                    'DD MMMM YYYY',
                  )}{' '}
                  {jobData?.calendar?.slot?.start
                    ? ' | ' +
                      convertTimetoTimeHour(jobData?.calendar?.slot?.start)
                    : ''}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        {/* Job Name  */}
        <Text style={styles.jobNameText}>{jobData?.description}</Text>

        <Text style={styles.balanceText}>
          {jobData?.property?.address_line_1
            ? `${capitalizeWords(jobData?.property?.address_line_1)}${
                jobData?.property?.address_line_2
                  ? ', ' + capitalizeWords(jobData?.property?.address_line_2)
                  : ''
              }${
                jobData?.property?.city
                  ? ', ' + capitalizeWords(jobData?.property?.city)
                  : ''
              }${
                jobData?.property?.postal_code
                  ? ', ' + jobData?.property?.postal_code
                  : ''
              }`
            : 'N/A'}
        </Text>
        <View style={styles.bottomCardContainer}>
          <Text style={styles.amountNumber}>
            £{(jobData?.estimated_amount ?? 0).toFixed(2)}
          </Text>
          {jobData?.thestatus?.name ? (
            <View style={styles.BottomRightBtn}>
              <Text style={styles.topupBtnText}>
                {jobData?.thestatus?.name}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };
  if (loading) {
    return <LottieLoader visible={loading} />;
  }
  return (
    <SafeAreaView style={styles.area}>
      <View style={[styles.container]}>
        <Header title="Job Details" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderWalletCard()}
          {jobData?.details ? (
            <View style={{marginTop: 20}}>
              <BoilerManualList onPress={() => {}} title={jobData?.details} />
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('customerdetails', {
                customerId: jobData?.customer?.id,
              })
            }
            style={[
              styles.customerContainer,
              Platform.OS === 'android'
                ? styles.androidShadow
                : styles.iosShadow,
              {backgroundColor: dark ? COLORS.dark2 : COLORS.white},
            ]}>
            <View
              // onPress={() => {}}
              style={styles.callContainer}
              key={0}>
              <View style={styles.callLeftContainer}>
                <View
                  style={[
                    styles.userImg,
                    {
                      backgroundColor: dark ? COLORS.white : COLORS.black,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text style={{color: dark ? COLORS.black : COLORS.white}}>
                    {getInitials(jobData?.customer?.full_name)}
                  </Text>
                </View>
                {/* <Image
            source={item.userImg}
            resizeMode="contain"
            style={styles.userImg}
          /> */}
                <View style={styles.userInfoContainer}>
                  <Text
                    style={[
                      styles.fullName,
                      {
                        color: dark ? COLORS.white : COLORS.black,
                      },
                    ]}>
                    {jobData?.customer?.full_name}
                  </Text>
                  <View style={styles.customerStatusContainer}>
                    <Image
                      source={icons.location}
                      resizeMode="contain"
                      style={[
                        styles.arrowIcon,
                        {
                          tintColor: COLORS.greeen,
                        },
                      ]}
                    />
                    <Text style={styles.status}>
                      {jobData?.customer?.address_line_1
                        ? `${capitalizeWords(
                            jobData?.customer?.address_line_1,
                          )}${
                            jobData?.customer?.address_line_2
                              ? ', ' +
                                capitalizeWords(
                                  jobData?.customer?.address_line_2,
                                )
                              : ''
                          }${
                            jobData?.customer?.city
                              ? ', ' + capitalizeWords(jobData?.customer?.city)
                              : ''
                          }${
                            jobData?.customer?.postal_code
                              ? ', ' + jobData?.customer?.postal_code
                              : ''
                          }`
                        : 'N/A'}
                    </Text>
                    {/* <Text style={styles.status}> </Text> */}
                  </View>
                </View>
              </View>
              <View style={styles.callRightContainer}>
                {jobData?.customer?.contact &&
                (jobData?.customer?.contact?.phone ||
                  jobData?.customer?.contact?.mobile) ? (
                  <TouchableOpacity
                    onPress={() => {
                      const numbers = [
                        jobData?.customer?.contact?.mobile,
                        jobData?.customer?.contact?.phone,
                      ].filter(Boolean);
                      // if (numbers.length === 1) {
                      //   Linking.openURL(`tel:${numbers[0]}`);
                      // } else if (numbers.length > 1) {
                      onclickCustomerDialedNumber(jobData?.customer);
                      //   setAvailableNumbers(numbers);
                      //   setCallModalVisible(true);
                      // }
                    }}>
                    <Image
                      source={icons.telephoneOutline}
                      resizeMode="contain"
                      style={[
                        styles.telephoneIcon,
                        {
                          tintColor: dark ? COLORS.white : COLORS.primary,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                ) : null}
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
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                onPress={
                  () => {}
                  // navigation.navigate('selectshippingaddress', {
                  //   customerId: customerId,
                  // })
                }>
                <Text
                  style={[
                    styles.textColorCount,
                    {
                      color: dark ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  {'0'}
                </Text>
                <Text
                  style={[
                    styles.textCountTitle,
                    {
                      color: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}>
                  Document
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
              <TouchableOpacity
                onPress={
                  () => {}
                  // navigation.navigate('selectshippingaddress', {
                  //   customerId: customerId,
                  // })
                }>
                <Text
                  style={[
                    styles.textColorCount,
                    {
                      color: invoice === 2 ? COLORS.red : COLORS.greeen,
                    },
                  ]}>
                  {'NO'}
                </Text>
                <Text
                  style={[
                    styles.textCountTitle,
                    {
                      color: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}>
                  Invoice
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={310}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.greyscale300 : COLORS.greyscale300,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 310,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            alignItems: 'center',
            width: '100%',
            paddingVertical: 12,
          },
        }}>
        <Text
          style={[
            styles.bottomSubtitle,
            {color: dark ? COLORS.white : COLORS.black},
          ]}>
          Call {jobData?.customer?.full_name}
        </Text>
        <View style={styles.separateLine} />
        <View
          style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={[
              styles.arrowIcon,
              {
                tintColor: COLORS.greeen,
              },
            ]}
          />
          <Text>{jobData?.customer?.full_address}</Text>
        </View>
        <View
          style={[
            styles.selectedBookmarkContainer,
            {backgroundColor: dark ? COLORS.dark2 : COLORS.tertiaryWhite},
          ]}>
          {/* <CartCard
            name={selectedBookmarkItem?.name || ""}
            image={selectedBookmarkItem?.image}
            price={selectedBookmarkItem?.price || 0}
            rating={selectedBookmarkItem?.rating || 0}
            numReviews={selectedBookmarkItem?.numReviews || 0}
            size={selectedBookmarkItem?.size}
            color={selectedBookmarkItem?.color || ""}
            onPress={() => console.log(selectedBookmarkItem)}
          /> */}
        </View>

        <View
          style={[styles.bottomContainer, {justifyContent: 'center', gap: 15}]}>
          {jobData?.customer?.contact?.phone ? (
            <View>
              <Button
                title={phoneNumberWithZero(jobData?.customer?.contact?.phone)}
                style={{
                  width: (SIZES.width - 32) / 2 - 8,
                  backgroundColor: dark
                    ? COLORS.dark3
                    : COLORS.tansparentPrimary,
                  borderRadius: 32,
                  borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
                }}
                textColor={dark ? COLORS.white : COLORS.primary}
                onPress={() =>
                  Linking.openURL(
                    `tel:${removeZeroAndBracket(
                      jobData?.customer?.contact?.phone,
                    )}`,
                  )
                }
              />
              <View style={styles.smsIconStyle}>
                <TouchableOpacity
                  onPress={() =>
                    shareToWhatsApp(
                      removeZeroAndBracket(jobData?.customer?.contact?.phone),
                      '',
                    )
                  }>
                  <Image
                    source={icons.whatsapp}
                    resizeMode="contain"
                    style={[
                      styles.smsIcon,
                      {
                        tintColor: COLORS.greeen,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    sendSMS(
                      removeZeroAndBracket(jobData?.customer?.contact?.phone),
                      '',
                    )
                  }>
                  <Image
                    source={icons.sms_blue}
                    resizeMode="contain"
                    style={[
                      styles.smsIcon,
                      {
                        tintColor: COLORS.blue,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {jobData?.customer?.contact?.mobile ? (
            <View>
              <ButtonFilled
                title={phoneNumberWithZero(jobData?.customer?.contact?.mobile)}
                style={styles.removeButton}
                onPress={() =>
                  Linking.openURL(
                    `tel:${removeZeroAndBracket(
                      jobData?.customer?.contact?.mobile,
                    )}`,
                  )
                }
              />
              <View style={styles.smsIconStyle}>
                <TouchableOpacity
                  onPress={() =>
                    shareToWhatsApp(
                      removeZeroAndBracket(jobData?.customer?.contact?.mobile),
                      '',
                    )
                  }>
                  <Image
                    source={icons.whatsapp}
                    resizeMode="contain"
                    style={[
                      styles.smsIcon,
                      {
                        tintColor: COLORS.greeen,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    sendSMS(
                      removeZeroAndBracket(jobData?.customer?.contact?.mobile),
                      '',
                    )
                  }>
                  <Image
                    source={icons.sms_blue}
                    resizeMode="contain"
                    style={[
                      styles.smsIcon,
                      {
                        tintColor: COLORS.blue,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
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
  },
  customerContainer: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    height: 76,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContainer: {
    width: SIZES.width - 32,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    marginTop: 20,
    paddingVertical: 8,
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  statusContainer: {
    width: scaleByWidth(50),
    height: scaleByWidth(25),
    borderRadius: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  dataViewContainer: {
    width: scaleByWidth(115),
    height: scaleByWidth(25),
    marginRight: 3,
    borderRadius: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  statusText: {
    fontSize: scaleFont(10),
    color: COLORS.primary,
    fontFamily: 'Urbanist Medium',
  },
  dateText: {
    fontSize: scaleFont(10),
    color: COLORS.primary,
    fontFamily: 'Urbanist Medium',
  },
  separateLine: {
    width: '100%',
    height: 0.7,
    backgroundColor: COLORS.greyScale800,
    marginVertical: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImageContainer: {
    width: 88,
    height: 88,
    borderRadius: 65,
    marginHorizontal: 6,
    backgroundColor: COLORS.silver,
  },
  productImage: {
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 65,
  },
  detailsRightContainer: {
    flex: 1,
    marginLeft: 2,
  },
  name: {
    fontSize: 17,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  address: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.grayscale700,
    marginVertical: 6,
  },
  serviceTitle: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.grayscale700,
  },
  serviceText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: 'Urbanist Medium',
    marginTop: 6,
  },
  cancelBtn: {
    width: (SIZES.width - 32) / 2 - 16,
    height: 36,
    borderRadius: 24,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12,
  },
  cancelBtnText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remindMeText: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.grayscale700,
    marginVertical: 4,
  },
  switch: {
    marginLeft: 8,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Adjust the size of the switch
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32,
  },
  removeButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist SemiBold',
    color: 'red',
    textAlign: 'center',
  },
  bottomSubtitle: {
    fontSize: 22,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    textAlign: 'center',
    marginVertical: 12,
  },
  selectedCancelContainer: {
    marginVertical: 24,
    paddingHorizontal: 36,
    width: '100%',
  },
  cancelTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    textAlign: 'center',
  },
  cancelSubtitle: {
    fontSize: 14,
    fontFamily: 'Urbanist Regular',
    color: COLORS.grayscale700,
    textAlign: 'center',
    marginVertical: 8,
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  totalPrice: {
    fontSize: scaleFont(10),
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  duration: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.grayscale700,
    textAlign: 'center',
  },
  priceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
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
  rating: {
    fontSize: 12,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
    marginLeft: 4,
  },

  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  walletCardContainer: {
    width: SIZES.width - 32,
    borderRadius: 32,
    marginTop: 16,
    height: 230, //Height will be dynamic
    backgroundColor: COLORS.primary,
    padding: 16,
  },
  topCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  topCardLeftContainer: {
    marginTop: 6,
  },
  topCardRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  cardHolderName: {
    fontSize: 22,
    color: COLORS.white,
    fontFamily: 'Urbanist Bold',
  },
  cardNumber: {
    fontSize: 20,
    color: COLORS.white,
    fontFamily: 'Urbanist SemiBold',
  },
  cardType: {
    fontSize: 26,
    color: COLORS.white,
    fontFamily: 'extraBoldItalic',
  },
  cardLogo: {
    height: 52,
    width: 52,
    marginLeft: 6,
  },
  balanceText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: 'Urbanist Medium',
  },
  jobNameText: {
    fontSize: 25,
    color: COLORS.white,
    fontFamily: 'Urbanist Medium',
  },
  bottomCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
  },
  amountNumber: {
    fontSize: 30,
    color: COLORS.white,
    fontFamily: 'Urbanist Bold',
  },
  topupBtn: {
    width: 180,
    height: 42,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  BottomRightBtn: {
    width: 100,
    height: 42,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  arrowDown: {
    width: 16,
    height: 16,
    tintColor: COLORS.black,
  },
  topupBtnText: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: 'Urbanist SemiBold',
    textAlign: 'center',
    // marginLeft: 12
  },
  topupDateBtnText: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Urbanist SemiBold',
    // marginLeft: 12
  },
  androidShadow: {
    elevation: 1,
  },
  iosShadow: {
    shadowColor: 'rgba(4, 6, 15, 0.05)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  callContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  callLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'flex-end',
    marginEnd: 10,
  },
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  fullName: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: 'Urbanist Bold',
  },
  customerdate: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: 'gray',
  },
  status: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: 'gray',
  },
  arrowIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.primary,
    marginRight: 6,
  },
  telephoneIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
  userInfoContainer: {
    marginLeft: 12,
  },
  customerStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  smsIcon: {
    width: 50,
    height: 50,
    tintColor: COLORS.primary,
    marginRight: 6,
  },
  selectedBookmarkContainer: {
    marginVertical: 16,
    backgroundColor: COLORS.tertiaryWhite,
  },
  smsIconStyle: {
    flexDirection: 'row',
    marginVertical: 10,
    // padding:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCountTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
  },
  textColorCount: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Urbanist Bold',
  },
  bellIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
});

export default JobDetailsScreen;
