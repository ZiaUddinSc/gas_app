import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  RefreshControl,
  SectionList,
  Linking,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect,useCallback} from 'react';
import Input from '../components/Input';
import {COLORS, SIZES, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import ButtonFilled from '../components/ButtonFilled';
import Button from '../components/Button';
// import {callData} from '../data';
import {useTheme} from '../theme/ThemeProvider';
import {NavigationProp, useNavigation,useFocusEffect} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GetCustomers} from '../helper/GetApiHelper';
import {getInitials,capitalizeWords,removeZeroAndBracket,phoneNumberWithZero} from '../helper/customMethods';

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

type CallSection = {title: string; data: Customer[]};

// Inbox tabs
const Customers = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const refRBSheet = useRef<any>(null);
  const [searchView, setSearchView] = useState<boolean>(false);
  const layout = useWindowDimensions();
  const {colors, dark} = useTheme();
  const sectionListRef = useRef<SectionList<Customer>>(null);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [groupedSections, setGroupedSections] = useState<CallSection[]>([]);
  const [search, setSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [index, setIndex] = React.useState(0);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [customerCallInfo, setCustomerCallInfo] = useState<Customer>();
  const [showNotFound, setShowNotFound] = useState(false);

  const navigateCustomerDetails = (data: any) => {
    navigation.navigate('customerdetails', {
      customerId: data?.id, // passing phone number
    });
  };

  const [routes] = React.useState([
    // { key: 'first', title: 'Chats' },
    {key: 'second', title: 'Calls'},
  ]);

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
  const fetchCustomers = async (
    pageNumber = 1,
    isRefresh = false,
    searchQuery = '',
  ) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await GetCustomers(pageNumber, searchQuery);
      const newItems = response?.jobs ?? [];

      if (newItems && newItems.length > 0) {
        const data: Customer[] = newItems;

        if (isRefresh || pageNumber === 1) {
          setAllCustomers(data);
          setGroupedSections(groupCustomers(data));
           console.log(groupCustomers(data))
        } else {
          const updatedCustomers = [...allCustomers, ...data];
          setAllCustomers(updatedCustomers);
          console.log(groupCustomers(updatedCustomers))
          setGroupedSections(groupCustomers(updatedCustomers));
        }

        setPage(pageNumber);
        setHasMore(
          response.meta ? pageNumber < response.meta.last_page : false,
        );
        setShowNotFound(false);
      } else {
        if (isRefresh || pageNumber === 1) {
          setAllCustomers([]);
          setGroupedSections([]);
          setShowNotFound(true);
        }
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (isRefresh || pageNumber === 1) {
        setShowNotFound(true);
      }
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  function searchCustomersByFullName(dataset: any[], name: string) {
    console.log("dataset",dataset)
    // return dataset.flatMap(group =>
    //   console.log(group)
    //   // group.data.filter(customer =>
    //   //   customer.full_name.toLowerCase().includes(name.toLowerCase())
    //   // )
    // );
  }

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    fetchCustomers(page + 1, false, search);
  };
  const onRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchCustomers(1, true, search);
  };

  const groupCustomers = (data: Customer[]): CallSection[] => {
    const grouped: Record<string, Customer[]> = {};
    data.forEach(item => {
      const letter = item.full_name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(item);
    });

    return Object.keys(grouped)
      .sort()
      .map(letter => ({
        title: letter,
        data: grouped[letter],
      }));
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      fetchCustomers(1, true);
    }, []),
  );

  useEffect(() => {
    setPage(1);
    fetchCustomers(1, true);
  }, []);

  //Search
  const onclickCustomerDialedNumber = callItem => {
    setCustomerCallInfo(callItem);
    refRBSheet.current?.open();
  };

  const handleSearch = (text: string) => {
      setSearch(text);
    
      if (text.trim() === '') {
        // If search is empty, reload all customers
        setGroupedSections(groupCustomers(allCustomers));
      } else {
        const filtered = allCustomers.filter(customer =>
          customer.full_name.toLowerCase().includes(text.toLowerCase())
        );
        setGroupedSections(groupCustomers(filtered));
      }
    
  };

  const renderCustomerItem = ({
    item,
    index,
  }: {
    item: Customer;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigateCustomerDetails(item)}
        style={styles.callContainer}
        key={index}>
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
              {getInitials(item?.full_name)}
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
              {item?.full_name}
            </Text>
            <View style={styles.statusContainer}>
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
                {capitalizeWords(item.address_line_1)} {capitalizeWords(item.address_line_2)},{' '}
                {capitalizeWords(item.city)}
                {', '}
                {item.postal_code}{' '}
              </Text>
              {/* <Text style={styles.status}> </Text> */}
            </View>
          </View>
        </View>
        <View style={styles.callRightContainer}>
          {item.contact && (item.contact.phone || item.contact.mobile) ? (
            <TouchableOpacity
              onPress={() => {
                const numbers = [
                  item.contact.mobile,
                  item.contact.phone,
                ].filter(Boolean);
                // if (numbers.length === 1) {
                //   Linking.openURL(`tel:${numbers[0]}`);
                // } else if (numbers.length > 1) {
                onclickCustomerDialedNumber(item);
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
      </TouchableOpacity>
    );
  };

  const onClickSearchView = () => {
    setSearchView(!searchView);
  };

  const RenderSearchBar = () => {
    const inputRef = useRef<TextInput>(null);

    const handleInputFocus = () => {
      // blur first so it never stays focused when you come back
      inputRef.current?.blur();
      //   navigation.navigate('search');
    };

    return (
      <>
        <View
          style={[
            styles.searchBarContainer,
            {
              backgroundColor: dark ? COLORS.dark2 : '#F5F5F5',
            },
          ]}>
          <TouchableOpacity>
            <Image
              source={icons.search2}
              resizeMode="contain"
              style={styles.searchIcon}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity>
            <Image
              source={icons.filter}
              resizeMode="contain"
              style={[
                styles.filterIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.primary,
                },
              ]}
            />
          </TouchableOpacity> */}
        </View>
      </>
    );
  };

  /**
   * render header
   */
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
            Customers
          </Text>
        </View>
        {/* <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => onClickSearchView()}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={[
                styles.searchIcon,
                {
                  tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                },
              ]}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {renderHeader()}
        {/* {searchView ? (
          <> */}
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                },
              ]}>
              <TouchableOpacity>
                <Image
                  source={icons.search2}
                  resizeMode="contain"
                  style={styles.searchIcon}
                />
              </TouchableOpacity>

              <TextInput
                placeholder="Search"
                placeholderTextColor="#999"
                style={styles.input}
                onChangeText={handleSearch}
                value={search}
              />
            </View>
          {/* </>
        ) : null} */}

        <View style={{marginTop: 10}}>
          <SectionList<Customer, CallSection>
            ref={sectionListRef}
            sections={groupedSections}
            keyExtractor={item => item.id}
            renderItem={renderCustomerItem}
            renderSectionHeader={({section: {title}}) => (
              <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
              </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            stickySectionHeadersEnabled
            ListEmptyComponent={
              !refreshing && showNotFound ? ( 
                <View style={styles.notFoundContainer}>
                  <Image
                    source={icons.search}
                    resizeMode="contain"
                    style={styles.notFoundIcon}
                  />
                  <Text
                    style={[
                      styles.notFoundText,
                      {color: dark ? COLORS.white : COLORS.black},
                    ]}>
                    {search
                      ? `No results found for "${search}"`
                      : 'No customers found'}
                  </Text>
                  <Text
                    style={[
                      styles.notFoundSubText,
                      {color: dark ? COLORS.grayTie : COLORS.grayscale400},
                    ]}>
                    {search
                      ? 'Try searching with different keywords'
                      : 'Add a new customer to get started'}
                  </Text>
                </View>
              ) : null
            }
          />
         
            {groupedSections.length > 0 && (
              <View style={styles.indexContainer}>
                {groupedSections.map((section, i) => (
                  <TouchableOpacity
                    key={section.title}
                    onPress={() => {
                      sectionListRef.current?.scrollToLocation({
                        sectionIndex: i,
                        itemIndex: 0,
                        viewPosition: 0,
                        animated: true,
                      });
                    }}>
                    <Text style={styles.indexLetter}>{section.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
         
        </View>
        {/* <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        /> */}
        {/* Implementing adding post */}
        {/* <TouchableOpacity style={[styles.addPostBtn, {
          backgroundColor: dark ? COLORS.white : COLORS.primary,
        }]}>
          <Feather name="plus" size={24} color={dark ? COLORS.primary : COLORS.white} />
        </TouchableOpacity> */}
        <ButtonFilled
          title="Add New Customer"
          onPress={() => navigation.navigate('add-new-customer')}
          style={styles.button}
        />
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
          Call {customerCallInfo?.full_name}
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
          <Text>{customerCallInfo?.full_address}</Text>
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
          {customerCallInfo?.contact?.phone ? (
            <View>
              <Button
                title={phoneNumberWithZero(customerCallInfo?.contact?.phone)}
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
                  Linking.openURL(`tel:${removeZeroAndBracket(customerCallInfo?.contact?.phone)}`)
                }
              />
              <View style={styles.smsIconStyle}>
                <TouchableOpacity
                  onPress={() =>
                    shareToWhatsApp(removeZeroAndBracket(customerCallInfo?.contact?.phone), '')
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
                  onPress={() => sendSMS(removeZeroAndBracket(customerCallInfo?.contact?.phone), '')}>
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
          {customerCallInfo?.contact?.mobile ? (
            <View>
              <ButtonFilled
                title={phoneNumberWithZero(customerCallInfo?.contact?.mobile)}
                style={styles.removeButton}
                onPress={() =>
                  Linking.openURL(`tel:${removeZeroAndBracket(customerCallInfo?.contact?.mobile)}`)
                }
              />
              <View style={styles.smsIconStyle}>
                <TouchableOpacity
                  onPress={() =>
                    shareToWhatsApp(removeZeroAndBracket(customerCallInfo?.contact?.mobile), '')
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
                    sendSMS(removeZeroAndBracket(customerCallInfo?.contact?.mobile), '')
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
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  moreCircleIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
    marginLeft: 12,
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
  addPostBtn: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    bottom: 72,
    right: 16,
    zIndex: 999,
    shadowRadius: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 10},
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    // backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
    marginHorizontal: 8,
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },

  callContainer: {
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
    marginEnd: 40,
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
  date: {
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
  smsIcon: {
    width: 50,
    height: 50,
    tintColor: COLORS.primary,
    marginRight: 6,
  },
  telephoneIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },

  //Rb SHeet Style

  bottomSubtitle: {
    fontSize: 22,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    textAlign: 'center',
    marginVertical: 12,
  },

  selectedBookmarkContainer: {
    marginVertical: 16,
    backgroundColor: COLORS.tertiaryWhite,
  },
  separateLine: {
    width: '100%',
    height: 0.2,
    backgroundColor: COLORS.greyscale300,
    marginHorizontal: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  removeButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  userInfoContainer: {
    marginLeft: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
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
  indexContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center', // center vertically
    padding: 5,
  },
  indexLetter: {fontSize: 12, paddingVertical: 2, color: '#007aff'},
  header: {backgroundColor: '#eee', paddingVertical: 5, paddingHorizontal: 10},
  headerText: {fontWeight: 'bold', fontSize: 16},
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: '#111',
  },
  smsIconStyle: {
    flexDirection: 'row',
    marginVertical: 10,
    // padding:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  notFoundIcon: {
    width: 80,
    height: 80,
    tintColor: COLORS.gray,
    marginBottom: 16,
  },
  notFoundText: {
    fontSize: 18,
    // fontFamily: FONTS.medium,
    textAlign: 'center',
    marginBottom: 8,
  },
  notFoundSubText: {
    fontSize: 14,
    // fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});

export default Customers;
