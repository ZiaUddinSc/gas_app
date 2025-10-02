import {View, StyleSheet, FlatList, Text} from 'react-native';
import React, {useState, useCallback} from 'react';
import {COLORS, SIZES} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../theme/ThemeProvider';
import Header from '../components/Header';
import ButtonFilled from '../components/ButtonFilled';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import AddressItem from '../components/AddressItem';
import {GetAddressList} from '../helper/GetApiHelper';
import {capitalizeWords} from '../helper/customMethods';

const SelectShippingAddress = ({route}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {colors, dark} = useTheme();
  const customerId = route?.params?.customerId;
  const job = route?.params?.job || false;
  const navigateScreen = route?.params?.navigateScreen || '';
  const selectedCustomer = route?.params?.selectedCustomer || false;
  const [address, setAddress] = useState([]);
  const [filteredAddress, setFilteredAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const renderItem = ({item}: any) => (
    <AddressItem
      onPress={() =>
        navigation.navigate(navigateScreen ? navigateScreen :{}, {
          ...route.params,
          address: item,
          customerId: customerId,
          job:job,
          selectedCustomer:selectedCustomer
        })
      }
      address={`${
        item?.address_line_1 !== null
          ? capitalizeWords(item?.address_line_1) + ', '
          : ''
      }${
        item?.address_line_2 !== null
          ? capitalizeWords(item?.address_line_2) + ', '
          : ''
      }`}
      others={`${capitalizeWords(item?.city)}, ${item?.postal_code ?? 'N/A'}`}
      icon={job ? false :true}
    />
  );

  // Fetch address list
  const fetchJobAddress = async () => {
    try {
      setLoading(true);
      const res: any = await GetAddressList(customerId);
      if (res?.success) {
        setAddress([]);
        setFilteredAddress(res.data.data); // Initialize filtered list with all addresses
      }
    } catch (error) {
      console.error('Failed to fetch job addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter addresses based on search text
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredAddress(address);
    } else {
      const filtered = address.filter(item => {
        const addressMatch = item?.full_address
          ?.toLowerCase()
          .includes(text.toLowerCase());
        return addressMatch;
      });
      setFilteredAddress(filtered);
    }
  };

  // Refresh data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchJobAddress();
    }, []),
  );

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Customer Address" />
        {/* <ScrollView
          contentContainerStyle={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
            marginVertical: 12
          }}
          showsVerticalScrollIndicator={false}>
          <AddressItem
            checked={selectedItem === 'Home'}
            onPress={() => {}}
            name="Home"
            address="Times Square NYC, Manhattan 27"
          />
         
        </ScrollView> */}
        <FlatList
          data={filteredAddress}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
            marginVertical: 12,
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchText
                  ? 'No matching addresses found'
                  : 'No addresses available'}
              </Text>
            </View>
          }
        />
        <ButtonFilled
          title="Add New Address"
          onPress={() =>
            navigation.navigate('createnewaddress', {customerId: customerId,job:job,...route.params})
          }
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
    backgroundColor: COLORS.white,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  addBtn: {
    backgroundColor: COLORS.tansparentPrimary,
    borderColor: COLORS.tansparentPrimary,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  emptyText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default SelectShippingAddress;
