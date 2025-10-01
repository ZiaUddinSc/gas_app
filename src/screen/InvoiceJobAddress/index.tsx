import React, {useCallback, useEffect, useState} from 'react';
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
import {Plus, MapPin, ArrowLeft, User, PhoneCall} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {GetAddressList} from '../../helper/GetApiHelper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import LottieLoader from '../../components/LottieLoader';

const InvoiceJobAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {customerId} = route.params;
  const onSelect = route.params?.onSelect;

  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);

   // Refresh data when screen comes into focus
   useFocusEffect(
    useCallback(() => {
      fetchJobAddress();
    }, []),
  );

  const handleJobAddress = address => {
    if (onSelect) onSelect(address);
    navigation.goBack();
  };

  const fetchJobAddress = async () => {
    try {
      setLoading(true);
      const res = await GetAddressList(customerId);

      if (res?.data) {
        setAddress(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch job addresses:', error);
    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleJobAddress(item)}>
      {/* <View style={styles.row}>
        <User color="#008080" size={wp('4%')} />
        <Text style={styles.name}>
          {item?.customer?.customer_full_name || 'No name'}
        </Text>
      </View>

      <View style={styles.row}>
        <PhoneCall color="#008080" size={wp('4%')} />
        <Text style={styles.address}>{item?.contact?.phone || 'No phone'}</Text>
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
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor="#999"
        />

        <FlatList
          data={address}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
         <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            navigation.navigate('AddCustomerJobAddress', {
              customerId: customerId,
            })
          }}
          >
          <Text style={styles.saveButtonText}>Add Job Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceJobAddress;
