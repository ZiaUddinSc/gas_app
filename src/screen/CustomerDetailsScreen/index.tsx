import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  User,
  Building2,
  Hash,
  MapPin,
  Phone,
  Smartphone,
  Mail,
  StickyNote,
  BellOff,
  Bell,
  ArrowLeft,
  Briefcase,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {
  GetCustomers,
  GetSignleCustomer,
  GetTitle,
} from '../../helper/GetApiHelper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import LottieLoader from '../../components/LottieLoader';
import {CustomerUpdate} from '../../helper/CustomerHelper';
import NoteEditModal from '../../components/CustomarUpdate/NoteEditModal';

const InfoRow = ({icon, label, count, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.infoRow}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon}
        <Text style={styles.infoText}>{label}</Text>
      </View>
      {count ? <Text style={styles.infoText}>{count}</Text> : null}
    </View>
  </TouchableOpacity>
);

const CustomerDetailsScreen = ({navigation}) => {
  const route = useRoute();
  const {customerId} = route.params;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [titleOptions, setTitle] = useState([]);
  const [isNoteModalVisible, setNoteModalVisible] = useState(false);

  useEffect(() => {
    fetchCustomer();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTitle();
      fetchCustomer()
    }, []),
  );

  const fetchCustomer = async () => {
    const res = await GetSignleCustomer(customerId);
    if (res?.data) {
      setCustomer(res.data);
    }
    setLoading(false);
  };

  const fetchTitle = async () => {
    try {
      const res = await GetTitle();
      if (res) {
        setTitle(res.data);
      }
    } catch (error) {
      console.error('Error fetching titles:', error);
    }
  };

  const handleReminderUpdate = async (value: number) => {
    const res = await CustomerUpdate(customerId, {auto_reminder: value});
    if (res.message === 'Customer successfully updated.') {
      fetchCustomer();
      // setReminderModalVisible(false);
    }
  };

  const handleNoteUpdate = async (note: string) => {
    const res = await CustomerUpdate(customerId, {note});
    if (res.message === 'Customer successfully updated.') {
      fetchCustomer();
      setNoteModalVisible(false);
    }
  };

  const getFullAddress = () => {
    const {address_line_1, address_line_2, city, postal_code, state, country} =
      customer.data || {};

    let newAddress = '';
    if (address_line_1 && address_line_2) {
      newAddress = address_line_1 + ' ' + address_line_2.trim();
    }

    return [newAddress, city, postal_code, state, country]
      .filter(part => part && part.trim())
      .join(', ');
  };

  if (loading || !customer) {
    return <LottieLoader visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Customer Details"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          extraScrollHeight={hp(22)}
          keyboardShouldPersistTaps="handled">
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <View style={styles.card}>
              <InfoRow
                icon={<User size={18} color="#008080" />}
                label={customer?.data?.full_name}
                onPress={() =>
                  navigation.navigate('EditCustomaerName', {
                    initialValues: {
                      title_id: customer?.data?.title_id || '',
                      full_name: customer?.data?.full_name || '',
                    },
                    customerId: customerId,
                    fetchCustomer: fetchCustomer,
                    titleOptions: titleOptions, // dropdown list
                  })
                }
                count={undefined}
              />
              <InfoRow
                icon={<Building2 size={18} color="#008080" />}
                label={customer.data.company_name}
                count={undefined}
                onPress={() =>
                  navigation.navigate('EditBusinessFieldScreen', {
                    field: 'company_name', // or 'vat_no'
                    initialValue: customer.data.company_name || '',
                    customerId: customerId,
                    fetchCustomer: fetchCustomer,
                  })
                }
              />
              <InfoRow
                icon={<Hash size={18} color="#008080" />}
                label={customer.data.vat_no || 'N/A'}
                count={undefined}
                onPress={() =>
                  navigation.navigate('EditBusinessFieldScreen', {
                    field: 'vat_no', // or 'vat_no'
                    initialValue: customer.data.vat_no || '',
                    customerId: customerId,
                    fetchCustomer: fetchCustomer,
                  })
                }
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Address</Text>
            <View style={styles.card}>
              <InfoRow
                icon={<MapPin size={18} color="#008080" />}
                label={getFullAddress()}
                onPress={() =>
                  navigation.navigate('EditAddressScreen', {
                    initialValues: {
                      address_line_1: customer?.data?.address_line_1 || '',
                      address_line_2: customer?.data?.address_line_2 || '',
                      city: customer?.data?.city || '',
                      state: customer?.data?.state || '',
                      country: customer?.data?.country || '',
                      postal_code: customer?.data?.postal_code || '',
                      latitude: customer?.data?.latitude || '',
                      longitude: customer?.data?.longitude || '',
                    },
                    customerId: customerId,
                    fetchCustomer: fetchCustomer, // optional
                  })
                }
                count={undefined}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Info</Text>

            <View style={styles.card}>
              {customer?.data?.contact ? (
                <InfoRow
                  icon={<Smartphone size={18} color="#008080" />}
                  label={customer.data.contact.mobile || 'N/A'}
                  count={undefined}
                  onPress={() =>
                    navigation.navigate('EditCustomerContactScreen', {
                      initialValues: {
                        id: customer?.data?.contact?.id || 0,
                        mobile: customer?.data?.contact?.mobile || '',
                        phone: customer?.data?.contact?.phone || '',
                        email: customer?.data?.contact?.email || '',
                        other_email: customer?.data?.contact?.other_email || '',
                      },
                      customerId: customerId,
                      fetchCustomer: fetchCustomer,
                    })
                  }
                />
              ) : (
                <InfoRow
                  icon={<Smartphone size={18} color="#008080" />}
                  label={'N/A'}
                  count={undefined}
                  onPress={() =>
                    navigation.navigate('EditCustomerContactScreen', {
                      initialValues: {
                        id: customer?.data?.contact?.id || 0,
                        mobile: customer?.data?.contact?.mobile || '',
                        phone: customer?.data?.contact?.phone || '',
                        email: customer?.data?.contact?.email || '',
                        other_email: customer?.data?.contact?.other_email || '',
                      },
                      customerId: customerId,
                      fetchCustomer: fetchCustomer,
                    })
                  }
                />
              )}
              {customer?.data?.contact ? (
                <InfoRow
                  icon={<Phone size={18} color="#008080" />}
                  label={customer.data.contact.phone || 'N/A'}
                  count={undefined}
                  onPress={() =>
                    navigation.navigate('EditCustomerContactScreen', {
                      initialValues: {
                        id: customer?.data?.contact?.id || 0,
                        mobile: customer?.data?.contact?.mobile || '',
                        phone: customer?.data?.contact?.phone || '',
                        email: customer?.data?.contact?.email || '',
                        other_email: customer?.data?.contact?.other_email || '',
                      },
                      customerId: customerId,
                      fetchCustomer: fetchCustomer,
                    })
                  }
                />
              ) : (
                <InfoRow
                  icon={<Phone size={18} color="#008080" />}
                  label={'N/A'}
                  count={undefined}
                  onPress={() =>
                    navigation.navigate('EditCustomerContactScreen', {
                      initialValues: {
                        id: customer?.data?.contact?.id || 0,
                        mobile: customer?.data?.contact?.mobile || '',
                        phone: customer?.data?.contact?.phone || '',
                        email: customer?.data?.contact?.email || '',
                        other_email: customer?.data?.contact?.other_email || '',
                      },
                      customerId: customerId,
                      fetchCustomer: fetchCustomer,
                    })
                  }
                />
              )}
              {customer?.data?.contact ? (
                <InfoRow
                  icon={<Mail size={18} color="#008080" />}
                  label={customer.data.contact.email || 'N/A'}
                  count={undefined}
                  onPress={() =>
                    navigation.navigate('EditCustomerContactScreen', {
                      initialValues: {
                        id: customer?.data?.contact?.id || 0,
                        mobile: customer?.data?.contact?.mobile || '',
                        phone: customer?.data?.contact?.phone || '',
                        email: customer?.data?.contact?.email || '',
                        other_email: customer?.data?.contact?.other_email || '',
                      },
                      customerId: customerId,
                      fetchCustomer: fetchCustomer,
                    })
                  }
                />
              ) : (
                <InfoRow
                  icon={<Mail size={18} color="#008080" />}
                  label={'N/A'}
                  count={undefined}
                  onPress={() =>
                    navigation.navigate('EditCustomerContactScreen', {
                      initialValues: {
                        id: customer?.data?.contact?.id || 0,
                        mobile: customer?.data?.contact?.mobile || '',
                        phone: customer?.data?.contact?.phone || '',
                        email: customer?.data?.contact?.email || '',
                        other_email: customer?.data?.contact?.other_email || '',
                      },
                      customerId: customerId,
                      fetchCustomer: fetchCustomer,
                    })
                  }
                />
              )}
              {/* {customer?.data?.contact ? (
                <InfoRow
                  icon={<Mail size={18} color="#008080" />}
                  label={customer.data.contact.other_email || 'N/A'}
                  count={undefined}
                  onPress={() =>
                    navigation.navigate('EditCustomerContactScreen', {
                      initialValues: {
                        id: customer?.data?.contact?.id || 0,
                        mobile: customer?.data?.contact?.mobile || '',
                        phone: customer?.data?.contact?.phone || '',
                        email: customer?.data?.contact?.email || '',
                        other_email: customer?.data?.contact?.other_email || '',
                      },
                      customerId: customerId,
                      fetchCustomer: fetchCustomer,
                    })
                  }
                />
              ) : (
                <InfoRow
                  icon={<Mail size={18} color="#008080" />}
                  label={'N/A'}
                  count={undefined}
                  onPress={() =>
                    navigation.navigate('EditCustomerContactScreen', {
                      initialValues: {
                        id: customer?.data?.contact?.id || 0,
                        mobile: customer?.data?.contact?.mobile || '',
                        phone: customer?.data?.contact?.phone || '',
                        email: customer?.data?.contact?.email || '',
                        other_email: customer?.data?.contact?.other_email || '',
                      },
                      customerId: customerId,
                      fetchCustomer: fetchCustomer,
                    })
                  }
                />
              )} */}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Note</Text>
            <View style={styles.card}>
              <InfoRow
                icon={<StickyNote size={18} color="#008080" />}
                label={customer?.data.note || 'N/A'}
                count={undefined}
                onPress={() =>
                  navigation.navigate('EditCustomerNoteScreen', {
                    initialNote: customer?.data?.note || '',
                    customerId: customerId,
                    fetchCustomer: fetchCustomer,
                  })
                }
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Automatic Reminder</Text>
            <View
              style={[
                styles.card,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <InfoRow
                icon={
                  customer?.data.auto_reminder === 1 ? (
                    <Bell size={18} color="#008080" />
                  ) : (
                    <BellOff size={18} color="#008080" />
                  )
                }
                label={customer?.data.auto_reminder === 1 ? 'Yes' : 'No'}
                count={undefined}
                onPress={undefined}
              />
              <Switch
                value={customer?.data.auto_reminder === 1}
                onValueChange={async value => {
                  await handleReminderUpdate(value ? 1 : 2);
                }}
                trackColor={{false: '#ccc', true: '#008080'}}
                thumbColor={'#fff'}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Jobs Addresses</Text>
            <View style={styles.card}>
              <InfoRow
                icon={<MapPin size={18} color="#008080" />}
                label={'Number of Job Addresses'}
                count={customer.data.number_of_job_address || '0'}
                onPress={() => {
                  if (customer.data.number_of_job_address) {
                    navigation.navigate('JobAddressList', {
                      customerId: customerId,
                    });
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Jobs</Text>
            <View style={styles.card}>
              <InfoRow
                icon={<Briefcase size={18} color="#008080" />}
                label={'Number of Jobs'}
                count={customer?.data?.number_of_jobs || '0'}
                onPress={() =>
                  navigation.navigate('NumberOfJob', {customerId: customerId})
                }
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                navigation.navigate('NewJobFromCustomar', {
                  customerId: customerId,
                });
              }}>
              <Text style={styles.saveButtonText}>Add Jobs</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              navigation.navigate('JobAddressScreen', {customerId: customerId});
            }}>
            <Text style={styles.saveButtonText}>Job Address</Text>
          </TouchableOpacity> */}
          </View>

          <NoteEditModal
            visible={isNoteModalVisible}
            initialNote={customer?.data?.note || ''}
            onClose={() => setNoteModalVisible(false)}
            onSubmit={handleNoteUpdate}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
      {/* <LottieLoader visible={loading}/> */}
    </SafeAreaView>
  );
};

export default CustomerDetailsScreen;
