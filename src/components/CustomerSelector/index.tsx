import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import {X, Search, ArrowLeft} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../CustomHeader/CustomHeader';
import {GetCustomers} from '../../helper/GetApiHelper';
import {useFormData} from '../../contexts/FormContext';;

const CustomerSelector = ({onSelectCustomer}) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
 const {formData, setFormData} = useFormData();
  const handleCustomerSelect = useCallback(
    (customerId: number) => {
      const customerName =
        customers.find(c => c.id === customerId)?.full_name || '';

      setSelectedCustomer({
        id: customerId,
        name: customerName,
      });
      onSelectCustomer({
        id: customerId,
        name: customerName,
      });
      setIsModalVisible(false);
      setSearchTerm('');
    },
    [onSelectCustomer],
  );

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer =>
        (customer.full_name || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  const fetchAllCustomers = async () => {
    try {
      let allCustomers: any[] = [];
      let pageNo = 1;
      let lastPageReached = false;

      while (!lastPageReached) {
        const res = await GetCustomers(pageNo);
        if (Array.isArray(res?.jobs)) {
          allCustomers = [...allCustomers, ...res.jobs];

          if (res.meta?.last_page && pageNo < res.meta.last_page) {
            pageNo++;
          } else {
            lastPageReached = true;
          }
        } else {
          lastPageReached = true;
        }
      }

      setCustomers(allCustomers);
      setFilteredCustomers(allCustomers); // default suggestion
    } catch (error) {
      console.error('Error fetching all customers:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Details</Text>
      <Text style={styles.input} onPress={() => setIsModalVisible(true)}>
        {formData.selectedCustomer?.name || 'Click here to select a customer'}
      </Text>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <CustomHeader
            title="Search Customers"
            leftIcon={<ArrowLeft size={24} color="white" />}
            onLeftPress={() => {
              setIsModalVisible(false);
              setSearchTerm('');
            }}
          />
          <View style={styles.modalContent}>
            <View style={styles.searchContainer}>
              <Search size={wp(6)} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Customers..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholderTextColor="#888"
              />
            </View>
            <FlatList
              data={filteredCustomers}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleCustomerSelect(item.id)}>
                  <Text style={styles.itemText}>{item.full_name}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No customers found</Text>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: wp(3),
    marginBottom: hp(1),
  },
  title: {
    color: '#2c3e50',
    fontSize: hp(1.8),
    fontWeight: '700',
    marginBottom: hp(1),
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: wp(2.2),
    fontSize: hp(1.7),
    color: '#2c3e50',
    borderColor: '#bdc3c7',
    borderWidth: 1,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    height: hp(100),
    width: wp(100),
    paddingBottom: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    maxHeight: '70%',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.5),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: hp(0.5),
    marginBottom: hp(1),
  },
  searchInput: {
    flex: 1,
    paddingVertical: hp(1),
    fontSize: hp(2),
    color: '#222',
  },
  searchIcon: {
    marginRight: wp(2.5),
  },
  closeButton: {
    padding: wp(1.2),
    marginRight: -wp(1.2),
  },
  item: {
    backgroundColor: '#FFF',
  },
  itemText: {
    padding: wp(4),
    fontSize: hp(2),
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  emptyText: {
    padding: wp(4),
    fontSize: hp(2),
    color: '#888',
    textAlign: 'center',
  },
});

export default CustomerSelector;
