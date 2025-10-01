import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  User,
  MapPin,
  Mail,
  Phone,
  CalendarDays,
  NotebookPen,
  ArrowLeft,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';
import LottieLoader from '../../components/LottieLoader';
import {GetSignleJobAddress} from '../../helper/GetApiHelper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {CustomerJobAddressUpdate} from '../../helper/CustomerHelper';
import CostomarJobAddresSingleFieldEditModal from '../../components/CostomarJobAddresUpdate/CostomarJobAddresSingleFieldEditModal';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
const InfoRow = ({icon, label, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.infoRow}>
    {icon}
    <Text style={styles.infoText}>{label || 'N/A'}</Text>
  </TouchableOpacity>
);

const JobAddressScreen = ({route, navigation}) => {
  const {customerId, jobId} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const [fieldModalVisible, setFieldModalVisible] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  //Navigate page Reload

  useFocusEffect(
    useCallback(() => {
      fetchAddress();
    }, []),
  );

  const fetchAddress = async () => {
    setLoading(true);
    const res = await GetSignleJobAddress(jobId);

    const job = res?.data || {};

    if (job.success) {
      setData(job.data);
      setIsEmpty(false);
      setLoading(false);
    } else {
      setData(null);
      setIsEmpty(true);
      setLoading(false);
    }

    setLoading(false);
  };

  const getFullAddress = obj => {
    const {address_line_1, address_line_2, city, postal_code, state, country} =
      obj || {};
    return [address_line_1, address_line_2, city, postal_code, state, country]
      .filter(Boolean)
      .join(', ');
  };

  const openFieldModal = (field: string, value: string) => {
    setEditField(field);
    setEditValue(value || '');
    setFieldModalVisible(true);
  };

  const buildPayload = (field: string, value: any, customer: any, job: any) => {
    const payload = {
      address_line_1: customer?.address_line_1 || '',
      address_line_2: customer?.address_line_2 || '',
      postal_code: customer?.postal_code || '',
      city: customer?.city || '',
      state: customer?.state || '',
      country: customer?.country || '',
      latitude: customer?.latitude || '',
      longitude: customer?.longitude || '',
      note: job?.note || '',
      occupant_name: job?.occupant_name || '',
      occupant_email: job?.occupant_email || '',
      occupant_phone: job?.occupant_phone || '',
      due_date: job?.due_date || '',
    };

    payload[field] = value;

    return payload;
  };


  if (loading) {
    return <LottieLoader visible />;
  }
  const customer = data.customer;
  const job = data;

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Job Address"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {isEmpty ? (
          <View style={styles.noDataWrapper}>
            <Text style={styles.noDataText}>
              No job address found for this customer.
            </Text>
          </View>
        ) : (
          <>
            {/* Customer Info */}
            <Text style={styles.subHeader}>Customer Information</Text>
            <View style={styles.card}>
              <InfoRow
                icon={<User size={18} color="#008080" />}
                label={customer?.customer_full_name}
                onPress={undefined}
              />
              <InfoRow
                icon={<MapPin size={18} color="#008080" />}
                label={getFullAddress(customer)}
                onPress={undefined}
              />
              <InfoRow
                icon={<Mail size={18} color="#008080" />}
                label={customer?.email}
                onPress={undefined}
              />
              <InfoRow
                icon={<Phone size={18} color="#008080" />}
                label={customer?.phone}
                onPress={undefined}
              />
            </View>

            {/* Job Address */}
            <Text style={styles.subHeader}>Job Address</Text>
            <View style={styles.card}>
              <InfoRow
                onPress={() =>
                  navigation.navigate('EditAddressScreen', {
                    initialValues: {
                      address_line_1: customer?.address_line_1 || '',
                      address_line_2: customer?.address_line_2 || '',
                      city: customer?.city || '',
                      state: customer?.state || '',
                      country: customer?.country || '',
                      postal_code: customer?.postal_code || '',
                      latitude: customer?.latitude || '',
                      longitude: customer?.longitude || '',
                    },
                    customerId: customerId,
                    // fetchCustomer: fetchCustomer, // optional
                  })
                }
                icon={<MapPin size={18} color="#008080" />}
                label={job?.full_address}
              />
            </View>

            {/* Occupant Details */}
            <Text style={styles.subHeader}>Occupant’s Details</Text>
            <View style={styles.card}>
              <InfoRow
                icon={<User size={18} color="#008080" />}
                label={job?.occupant_name}
                onPress={() =>
                  navigation.navigate('EditJobAddressFieldScreen', {
                    field: 'occupant_name', // or 'note', 'due_date', etc.
                    initialValue: job?.occupant_name || '',
                    jobId: jobId,
                    customer: customer,
                    job: job,
                    fetchAddress: fetchAddress,
                  })
                }
              />
              <InfoRow
                icon={<Phone size={18} color="#008080" />}
                label={job?.occupant_phone}
                onPress={() =>
                  navigation.navigate('EditJobAddressFieldScreen', {
                    field: 'occupant_phone', // or 'note', 'due_date', etc.
                    initialValue: job?.occupant_phone || '',
                    jobId: jobId,
                    customer: customer,
                    job: job,
                    fetchAddress: fetchAddress,
                  })
                }
              />
              <InfoRow
                icon={<Mail size={18} color="#008080" />}
                label={job?.occupant_email}
                 onPress={() =>
                  navigation.navigate('EditJobAddressFieldScreen', {
                    field: 'occupant_email', // or 'note', 'due_date', etc.
                    initialValue: job?.occupant_email || '',
                    jobId: jobId,
                    customer: customer,
                    job: job,
                    fetchAddress: fetchAddress,
                  })
                }
               
              />
              <InfoRow
                icon={<CalendarDays size={18} color="#008080" />}
                label={
                  job?.due_date
                    ? moment(job?.due_date).format('Do MMMM, YYYY')
                    : 'N/A'
                }
                 onPress={() =>
                  navigation.navigate('EditJobAddressFieldScreen', {
                    field: 'due_date', // or 'note', 'due_date', etc.
                    initialValue: job?.due_date || '',
                    jobId: jobId,
                    customer: customer,
                    job: job,
                    fetchAddress: fetchAddress,
                  })
                }
                
              />
            </View>

            {/* Note */}
            <Text style={styles.subHeader}>Note</Text>
            <View style={styles.card}>
              <InfoRow
                icon={<NotebookPen size={18} color="#008080" />}
                label={job?.note}
                 onPress={() =>
                  navigation.navigate('EditJobAddressFieldScreen', {
                    field: 'note', // or 'note', 'due_date', etc.
                    initialValue: job?.note || '',
                    jobId: jobId,
                    customer: customer,
                    job: job,
                    fetchAddress: fetchAddress,
                  })
                }
             
              />
            </View>
          </>
        )}

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobAddressScreen;
