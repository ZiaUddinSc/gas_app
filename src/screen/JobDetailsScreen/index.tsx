// 📱 React Native UI Screen: Job Details View
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  GetJobStatus,
  GetSingleJob,
  GetPriorities,
  GetSingleJobCalendar,
  GetTimeSlots,
} from '../../helper/GetApiHelper';
import styles from './styles';
import LottieLoader from '../../components/LottieLoader';
import {
  MapPin,
  Mail,
  Phone,
  User,
  ArrowLeft,
  Timer,
  Calendar,
  Hash,
  CircleCheckBig,
  BadgeEuro,
  NotebookPen,
} from 'lucide-react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AddToCalendarModal from '../../components/AddToCalendarModal/AddToCalendarModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const JobDetailsScreen = ({route, navigation}) => {
  const {jobId} = route.params;
  const [job, setJob] = useState(null);
  const [jobStatus, setJobStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  const [jobModalVisible, setJobModalVisible] = useState(false);
  const [editField, setEditField] = useState('');
  const [initialFieldValue, setInitialFieldValue] = useState('');
  const [priorities, setPriorities] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobForCalendar, setSelectedJobForCalendar] = useState<
    any | null
  >(null);
  const [jobCalendar, setJobCalendar] = useState<any | null>(null);
  const [timeSlot, setTimeSlot] = useState<any | null>(null);

  useEffect(() => {
    fetchJobDetails();
    fetchJobStatus();
    fetchPriorities();
    fetchCalendar();
    fetchTimeSlots();
  }, []);

  const openJobFieldModal = (field: string, value: any) => {
    setEditField(field);
    setInitialFieldValue(value ?? '');
    setJobModalVisible(true);
  };

  const fetchJobDetails = async () => {
    setLoading(true);
    const res = await GetSingleJob(jobId);
    if (res?.data) {
      setJob(res.data);
    }
    setLoading(false);
  };
  const fetchJobStatus = async () => {
    setLoading(true);
    const res = await GetJobStatus();
    if (res?.data) {
      setJobStatus(res.data);
    }
    setLoading(false);
  };

  const {
    customer,
    property,
    description,
    details,
    estimated_amount,
    customer_job_status_id,
    reference_no,
    created_at,
  } = job || {};
  const toTitleCase = str =>
    str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const getFullAddress = customer => {
    const {address_line_1, address_line_2, city, postal_code, state, country} =
      customer || {};

    const parts = [
      address_line_1,
      address_line_2,
      city,
      postal_code,
      state,
      country,
    ];

    return parts
      .filter(part => part && part.trim())
      .map(toTitleCase)
      .join(', ');
  };

  const matchedStatus = jobStatus.find(
    status => status.id === job?.customer_job_status_id,
  );

  const fetchPriorities = async () => {
    setLoading(true);
    try {
      const res = await GetPriorities();
      if (res) {
        setPriorities(res.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
    setLoading(false);
  };
  const fetchCalendar = async () => {
    setLoading(true);
    try {
      const res = await GetSingleJobCalendar(jobId);

      if (res) {
        setJobCalendar(res.data);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching customers:', error);
    }
    setLoading(false);
  };
  const fetchTimeSlots = async () => {
    setLoading(true);
    try {
      const res = await GetTimeSlots();

      if (res) {
        setTimeSlot(res.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleCalendarUpdateSuccess = useCallback(() => {
    navigation.replace('JobsScreen');
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
    setSelectedJobForCalendar(null);
  }, []);

  const AddDate = useCallback(
    (data: any) => {
      const updatedData = {
        ...data,
        calendar: jobCalendar,
      };
      setSelectedJobForCalendar(updatedData);
      setTimeout(() => {
        setIsModalVisible(true);
      }, 50);
    },
    [jobCalendar],
  );

  const matchedSlot =
    Array.isArray(timeSlot) && jobCalendar
      ? timeSlot.find(item => item.id === jobCalendar.calendar_time_slot_id)
      : null;
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Job Details"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={hp(22)}
        keyboardShouldPersistTaps="handled">
        {/* Customer Info */}
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.card}>
          <InfoRow
            icon={<User size={18} color="#008080" />}
            label={`${customer?.title?.name ?? ''} ${customer?.full_name}`}
            onPress={undefined}
          />
          <View style={styles.line} />
          <InfoRow
            icon={<MapPin size={18} color="#008080" />}
            label={getFullAddress(customer)}
            onPress={undefined}
          />
          <View style={styles.line} />
          <InfoRow
            icon={<Mail size={18} color="#008080" />}
            label={customer?.contact?.email ?? 'N/A'}
            onPress={undefined}
          />
          <View style={styles.line} />
          <InfoRow
            icon={<Phone size={18} color="#008080" />}
            label={customer?.contact?.phone ?? 'N/A'}
            onPress={undefined}
          />
        </View>

        {/* Job Address */}
        <Text style={styles.sectionTitle}>Job Address</Text>
        <View style={styles.card}>
          <InfoRow
            icon={<User size={18} color="#008080" />}
            label={property?.occupant_name || 'Test'}
            onPress={undefined}
          />
          <View style={styles.line} />
          <InfoRow
            icon={<MapPin size={18} color="#008080" />}
            label={getFullAddress(property)}
            onPress={undefined}
          />
        </View>

        {/* Job Details */}
        <Text style={styles.sectionTitle}>Job Details</Text>
        <View style={styles.card}>
          <InfoRow
            icon={<NotebookPen size={18} color="#008080" />}
            label={description || 'N/A'}
            onPress={() =>
              navigation.navigate('EditJobFieldScreen', {
                field: 'description', // or 'details', 'estimated_amount', etc.
                initialValue: description || '',
                inputType: 'multiline', // 'text' | 'multiline' | 'numeric'
                dropdownOptions: undefined, // optional
                jobId: jobId,
                fetchJobDetails: fetchJobDetails,
              })
            }
          />
          <View style={styles.line} />
          <InfoRow
            icon={<NotebookPen size={18} color="#008080" />}
            label={details || 'N/A'}
            onPress={() =>
              navigation.navigate('EditJobFieldScreen', {
                field: 'details', // or 'details', 'estimated_amount', etc.
                initialValue: details || '',
                inputType: 'multiline', // 'text' | 'multiline' | 'numeric'
                dropdownOptions: undefined, // optional
                jobId: jobId,
                fetchJobDetails: fetchJobDetails,
              })
            }
          />
          <View style={styles.line} />
          <InfoRow
            icon={<BadgeEuro size={18} color="#008080" />}
            label={`£${estimated_amount+'.00' || '0.00'  }`}
            onPress={() =>
              navigation.navigate('EditJobFieldScreen', {
                field: 'estimated_amount', // or 'details', 'estimated_amount', etc.
                initialValue: estimated_amount || '0.00',
                inputType: 'text', // 'text' | 'multiline' | 'numeric'
                dropdownOptions: undefined, // optional
                jobId: jobId,
                fetchJobDetails: fetchJobDetails,
              })
            }
          />
          <View style={styles.line} />
          {matchedStatus ? (
            <>
              <InfoRow
                icon={<CircleCheckBig size={18} color="#008080" />}
                label={matchedStatus?.name || 'N/A'}
                onPress={() =>
                  navigation.navigate('EditJobFieldScreen', {
                    field: 'customer_job_status_id',
                    initialValue: job?.customer_job_status_id,
                    inputType: 'text',
                    dropdownOptions: job?.customer_job_status_id, // [{ id: 1, name: 'Pending' }, ...]
                    jobId: jobId,
                    fetchJobDetails: fetchJobDetails,
                  })
                }
              />
              <View style={styles.line} />
            </>
          ) : null}

          {matchedStatus ? (
            <>
              <InfoRow
                icon={<CircleCheckBig size={18} color="#008080" />}
                label={matchedStatus?.name || 'N/A'}
                onPress={() =>
                  navigation.navigate('EditJobFieldScreen', {
                    field: 'customer_job_status_id',
                    initialValue: job?.customer_job_status_id,
                    inputType: 'text',
                    dropdownOptions: job?.customer_job_status_id, // [{ id: 1, name: 'Pending' }, ...]
                    jobId: jobId,
                    fetchJobDetails: fetchJobDetails,
                  })
                }
              />
              <View style={styles.line} />
            </>
          ) : null}

          <InfoRow
            icon={<Hash size={18} color="#008080" />}
            label={reference_no || 'No Reference Found'}
            onPress={() =>
              navigation.navigate('EditJobFieldScreen', {
                field: 'reference_no',
                initialValue: reference_no || '',
                inputType: 'text', // 'text'
                jobId: jobId,
                fetchJobDetails: fetchJobDetails,
              })
            }
          />

          <View style={styles.line} />
          {jobCalendar && (
            <InfoRow
              icon={<Calendar size={18} color="#008080" />}
              label={jobCalendar.date}
              onPress={() => AddDate(job)}
            />
          )}
          <View style={styles.line} />
          <InfoRow
            icon={<Timer size={18} color="#008080" />}
            label={matchedSlot?.slot_title || 'Add To Calendar'}
            onPress={() => AddDate(job)}
          />
        </View>

        <AddToCalendarModal
          isVisible={isModalVisible}
          onClose={handleModalClose}
          jobData={selectedJobForCalendar}
          onSuccess={handleCalendarUpdateSuccess}
        />
      </KeyboardAwareScrollView>
      <LottieLoader visible={loading} />
    </SafeAreaView>
  );
};

const InfoRow = ({icon, label, onPress}) => (
  <TouchableOpacity
    style={[styles.row, !onPress && {opacity: 0.6}]}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}>
    <View style={styles.icon}>{icon}</View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export default JobDetailsScreen;
