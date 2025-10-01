import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {ongoingJobs} from '../data';
import {SIZES, COLORS, scaleFont, scaleByWidth} from '../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useTheme} from '../theme/ThemeProvider';
import Button from '../components/Button';
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
} from '../helper/customMethods';
import {GetData} from '../helper/CommonHelper';
import Settings from '../config/settings';
import moment from 'moment';
const OngoingJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const refRBSheet = useRef<any>(null);
  const {dark} = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  const fetchJobs = async () => {
    let jobs = await GetData(`${Settings.endpoints.get_jobs_list}`);
    if (jobs?.data.length > 0) {
      console.log('jobs', jobs?.data);
      setJobs(jobs?.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, []),
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
        },
      ]}>
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.cardContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              },
            ]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('productreviews')}
              style={styles.detailsContainer}>
              {/* <View>
                 <ProfileAvatorView
                  name={getInitials(item.name)}
                 />
                 
              </View> */}
              <View>
                <View
                  style={[
                    styles.productImageContainer,
                    {
                      backgroundColor: dark ? COLORS.dark3 : COLORS.silver,
                    },
                  ]}>
                  <View
                    style={[
                      styles.productImage,
                      {backgroundColor: dark ? COLORS.white : COLORS.black},
                    ]}>
                    <Text
                      style={[
                        {
                          justifyContent: 'center',
                          fontSize: 25,
                          fontWeight: '700',
                          alignItems: 'center',
                        },
                        {color: dark ? COLORS.black : COLORS.white},
                      ]}>
                      {getInitials(item?.customer?.full_name)}
                    </Text>
                  </View>
                  {/* < Image
                    source={item.image}
                    resizeMode='cover'
                    style={styles.productImage}
                  /> */}
                </View>
                {/* <View style={styles.reviewContainer}>
                  <FontAwesome name="star" size={12} color="orange" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View> */}
              </View>
              <View style={styles.detailsRightContainer}>
                <Text
                  style={[
                    styles.name,
                    {
                      color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    },
                  ]}>
                  {item?.customer?.full_name}
                </Text>
                <Text
                  style={[
                    styles.address,
                    {
                      color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                    },
                  ]}>
                  {item?.customer?.address_line_1
                    ? `${capitalizeWords(item?.customer?.address_line_1)}${
                        item?.customer?.address_line_2
                          ? ', ' +
                            capitalizeWords(item?.customer?.address_line_2)
                          : ''
                      }${
                        item?.customer?.city
                          ? ', ' + capitalizeWords(item?.customer?.city)
                          : ''
                      }${
                        item?.customer?.postal_code
                          ? ', ' + item?.customer?.postal_code
                          : ''
                      }`
                    : 'N/A'}
                </Text>
                <Text
                  style={[
                    styles.name,
                    {
                      color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    },
                  ]}>
                  {item?.description}
                </Text>
                <View style={styles.priceContainer}>
                  <View style={styles.priceItemContainer}>
                    <Text
                      style={[
                        styles.totalPrice,
                        {
                          color: dark ? COLORS.white : COLORS.primary,
                        },
                      ]}>
                      £
                      {item?.estimated_amount
                        ? item.estimated_amount.toFixed(2)
                        : '0.00'}
                    </Text>
                  </View>
                  {item?.calendar?.date ? (
                    <View
                      style={[
                        styles.dataViewContainer,
                        {
                          borderColor: dark ? COLORS.dark3 : COLORS.primary,
                          backgroundColor: dark ? COLORS.dark3 : 'transparent',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.dateText,
                          {
                            color: dark ? COLORS.white : COLORS.primary,
                          },
                        ]}>
                        {moment(item?.calendar?.date, 'DD-MM-YYYY').format(
                          'Do MMMM YYYY',
                        )}
                      </Text>
                    </View>
                  ) : null}
                  {item?.calendar?.slot?.start ? (
                    <View
                      style={[
                        styles.statusContainer,
                        {
                          borderColor: dark ? COLORS.dark3 : COLORS.primary,
                          backgroundColor: dark ? COLORS.dark3 : 'transparent',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color: dark ? COLORS.white : COLORS.primary,
                          },
                        ]}>
                        {convertTimetoTimeHour(item?.calendar?.slot?.start)}
                      </Text>
                    </View>
                  ) : null}
                </View>
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
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
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
                  Cancel Job
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('trackorder')}
                style={[
                  styles.receiptBtn,
                  {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.primary,
                    borderColor: dark ? COLORS.dark3 : COLORS.primary,
                  },
                ]}>
                <Text style={styles.receiptBtnText}>Mark as Completed</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={332}
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
            height: 332,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            alignItems: 'center',
            width: '100%',
          },
        }}>
        <Text
          style={[
            styles.bottomSubtitle,
            {
              color: dark ? COLORS.red : COLORS.red,
            },
          ]}>
          Cancel Job
        </Text>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
            },
          ]}
        />

        <View style={styles.selectedCancelContainer}>
          <Text
            style={[
              styles.cancelTitle,
              {
                color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
              },
            ]}>
            Are you sure you want to cancel your job?
          </Text>
          <Text
            style={[
              styles.cancelSubtitle,
              {
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
              },
            ]}>
            Cusomer Name:XYZ
          </Text>
          <Text
            style={[
              styles.cancelSubtitle,
              {
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
              },
            ]}>
            Job Address:XYZ
          </Text>
          <Text
            style={[
              styles.cancelSubtitle,
              {
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
              },
            ]}>
            Job Name:XYZ
          </Text>
        </View>

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
          <ButtonFilled
            title="Yes, Cancel"
            style={styles.removeButton}
            onPress={() => {
              refRBSheet.current.close();
              navigation.navigate('cancelorder');
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiaryWhite,
    marginVertical: 22,
  },
  cardContainer: {
    width: SIZES.width - 32,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
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
});

export default OngoingJobs;
