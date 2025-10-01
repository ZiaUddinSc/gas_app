
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import {
  Plus,
  MapPin,
  ArrowLeft,
  User,
  PlusCircle,
  Search,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {GetAddressList} from '../../helper/GetApiHelper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import LottieLoader from '../../components/LottieLoader';

const JobAddressList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {customerId} = route.params;
  const [address, setAddress] = useState([]);
  const [filteredAddress, setFilteredAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  // Fetch address list
  const fetchJobAddress = async () => {
    try {
      setLoading(true);
      const res = await GetAddressList(customerId);
      if (res?.data?.data) {
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
        return  addressMatch;
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

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('JobAddressScreen', {
          customerId: customerId,
          jobId: item.id,
        });
      }}>
      {/* <View style={styles.row}>
        <User color="#008080" size={wp('4%')} />
        <Text style={styles.name}>
          {item?.customer?.customer_full_name || 'No name'}
        </Text>
      </View> */}

      {/* <View style={styles.row}>
        <PhoneCall color="#008080" size={wp('4%')} />
        <Text style={styles.address}>{item?.contact?.mobile || 'N/A'}</Text>
      </View> */}

      <View style={styles.row}>
        <MapPin color="#008080" size={wp('4%')} />
        <Text style={styles.address}>{item?.full_address || 'No address'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <LottieLoader visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Job Address List"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.filterRow}>
          <TextInput
            style={styles.input}
            placeholder="Search  address..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Search size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredAddress}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
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
         <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            navigation.navigate('AddCustomerJobAddress', {
              customerId: customerId,
            })
          }}
          >
          <Text style={styles.saveButtonText}>
            Add Job Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JobAddressList;
