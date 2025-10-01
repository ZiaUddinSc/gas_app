import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  SectionList,
  Linking,
} from 'react-native';
import {
  Plus,
  ArrowLeft,
  Search,
  User,
  Building,
  MapPin,
  PhoneCall,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Avatar from '../../components/Avatar/Avatar';
import Color from '../../theme/Colors';
import {GetCustomers} from '../../helper/GetApiHelper';
import LottieLoader from '../../components/LottieLoader';
import {useFocusEffect} from '@react-navigation/native';
import CallNumberModal from '../../components/CallNumberModal';

const Customers = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isCallModalVisible, setCallModalVisible] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState<string[]>([]);

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

      setCustomers(prev =>
        pageNumber === 1
          ? newItems
          : [
              ...prev,
              ...newItems.filter(item => !prev.some(p => p.id === item.id)),
            ],
      );

      setPage(pageNumber);
      setHasMore(response.meta ? pageNumber < response.meta.last_page : false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    fetchCustomers(page + 1, false, search);
  };
  const onRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchCustomers(1, true, search);
  };

  // ⏳ Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1);
      fetchCustomers(1, true, search);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useFocusEffect(
    useCallback(() => {
      setCustomers([]);
      setPage(1);
      setHasMore(true);
      fetchCustomers(1, true);
    }, []),
  );

  // const groupedCustomers = customers.reduce((acc, item) => {
  //   const firstLetter = item.full_name?.[0]?.toUpperCase() || '#';
  //   if (!acc[firstLetter]) acc[firstLetter] = [];
  //   acc[firstLetter].push(item);
  //   return acc;
  // }, {});

  const groupedCustomers = customers.reduce((acc, item) => {
    const firstLetter = item.full_name?.[0]?.toUpperCase() || '#';
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(item);
    return acc;
  }, {});

  const sectionOrder = Object.keys(groupedCustomers).sort();
  const allCustomers = Object.values(groupedCustomers).flat();

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('CustomerDetailsScreen', {customerId: item.id})
      }>
      <Avatar
        name={item.full_name}
        colors={[Color.primaryBGColor, '#008080']}
        size={50}
      />
      <View style={{marginLeft: 10}}>
        <View style={styles.card_content}>
          <Text style={styles.card_name_text}>{item?.full_name}</Text>
        </View>
        {!!item.company_name && (
          <View style={[styles.card_content, {marginTop: 4}]}>
            <Text style={styles.card_text}>{item.company_name}</Text>
          </View>
        )}
        <View style={[styles.card_content, {marginTop: 4}]}>
          <Text style={[styles.card_text, {width: wp(65)}]}>
            {(() => {
              const lastIndex = item.full_address.lastIndexOf(',');
              if (lastIndex === -1) return item.full_address;
              return (
                item.full_address.slice(0, lastIndex).trim() +
                '\n' +
                item.full_address.slice(lastIndex + 1).trim()
              );
            })()}
          </Text>
        </View>
      </View>

      {item.contact && (item.contact.phone || item.contact.mobile) ? (
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => {
            const numbers = [item.contact.mobile, item.contact.phone].filter(
              Boolean,
            );
            if (numbers.length === 1) {
              Linking.openURL(`tel:${numbers[0]}`);
            } else if (numbers.length > 1) {
              setAvailableNumbers(numbers);
              setCallModalVisible(true);
            }
          }}>
          <PhoneCall size={wp(6)} color={'#FFF'} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({section: {title}}: any) => (
    <View style={styles.header}>
      <Text style={styles.header1Text}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Customers"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#ddd7d6',
            padding: wp(2),
            borderBottomWidth: 1,
            borderColor: '#FFF',
          }}>
          <View style={styles.filterRow}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Search size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={customers}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={
            <>
              <LottieLoader visible={loadingMore} />
            </>
          }
        />
        {/* <SectionList
          sections={sectionOrder.map(title => ({
            title,
            data: groupedCustomers[title],
          }))}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={<LottieLoader visible={loadingMore} />}
        /> */}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            navigation.navigate('CustomersCreate');
          }}>
          <Text style={styles.saveButtonText}>Add Customer</Text>
        </TouchableOpacity>
      </View>

      <CallNumberModal
        visible={isCallModalVisible}
        numbers={availableNumbers}
        onClose={() => setCallModalVisible(false)}
        onSelect={num => {
          Linking.openURL(`tel:${num}`);
          setCallModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};
export default Customers;
