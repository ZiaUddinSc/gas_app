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

const InvoiceCustomerSelect = ({route}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isCallModalVisible, setCallModalVisible] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState<string[]>([]);
  const onSelect = route.params?.onSelect;
  useEffect(() => {
    fetchCustomers(page);
  }, [page]);

  const fetchCustomers = async (pageNo: number) => {
    if (loading || pageNo > lastPage) return;

    setLoading(true);

    try {
      const res = await GetCustomers(pageNo);

      if (Array.isArray(res?.jobs)) {
        if (pageNo === 1) {
          setCustomers(res.jobs); // reset for first page
        } else {
          setCustomers(prev => [...prev, ...res.jobs]); // append for next pages
        }
      }

      if (res?.meta?.last_page) {
        setLastPage(res.meta.last_page);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }

    setLoading(false);
  };

  const handleLoadMore = () => {
    if (page < lastPage && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const filteredCustomers = customers.filter(
    customer =>
      (customer.customer_full_name || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (customer.company_name || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (customer.full_address || '')
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const groupedCustomers = filteredCustomers.reduce((acc, item) => {
    const firstLetter = item.customer_full_name?.[0]?.toUpperCase() || '#';
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(item);
    return acc;
  }, {});

  const sectionOrder = Object.keys(groupedCustomers).sort();

  const handleCustomerSelect = customer => {
    if (onSelect) onSelect(customer);
    navigation.goBack();
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCustomerSelect(item)}>
      <Avatar
        name={item?.full_name}
        colors={[Color.primaryBGColor, '#008080']}
        size={50}
      />
      <View style={{marginLeft: 10}}>
        <View style={styles.card_content}>
          <Text style={styles.card_name_text}>
            {item.customer_full_name || item.full_name}
          </Text>
        </View>
        {!!item.company_name && (
          <View style={[styles.card_content, {marginTop: 4}]}>
            <Text style={styles.card_text}>{item.company_name}</Text>
          </View>
        )}
        <View style={[styles.card_content, {marginTop: 4}]}>
          <Text style={[styles.card_text, {width: wp(65)}]}>
            {item.full_address}
          </Text>
        </View>
      </View>
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
        title="Customers Select"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{backgroundColor: '#ddd7d6', padding: wp(2)}}>
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
        {/* <View style={styles.addJobBtn}>
          <Text style={styles.addJobText}>Add Customer</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CustomersCreate');
            }}>
            <Plus size={24} color={Color.textPrimaryColor} />
          </TouchableOpacity>
        </View> */}

        <SectionList
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
          ListFooterComponent={<LottieLoader visible={loading} />}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            navigation.navigate('CustomersCreate');
          }}>
          <Text style={styles.saveButtonText}>Add Customer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceCustomerSelect;
