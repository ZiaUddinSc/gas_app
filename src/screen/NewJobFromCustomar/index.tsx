import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-element-dropdown';
import {
  Home,
  Save,
  X,
  ArrowLeft,
  PlusCircle,
  Edit,
  Edit2,
  Edit2Icon,
  Edit3,
  NotebookPen,
  NotebookText,
  BadgeEuro,
  Hash,
  Calendar,
  User,
  Building2,
  MapPin,
  Mail,
  Smartphone,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './styles'; // Assuming you have a styles.ts file
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  GetAddress,
  GetAddressList,
  GetCustomers,
  GetJob,
  GetJobStatus,
  GetPriorities,
  GetSignleCustomer,
  GetTimeSlots,
} from '../../helper/GetApiHelper';
import {CreateJob, CreateJobClander} from '../../helper/JobHelper';
import LottieLoader from '../../components/LottieLoader';

const validationSchema = Yup.object().shape({
  customer: Yup.string().required('Customer is required'),
  jobAddress: Yup.string().required('Job Address is required'),
  jobDescriptionShort: Yup.string(),
  jobDetails: Yup.string(),
  estimatedJobValue: Yup.number().notRequired(),
  priority: Yup.string().notRequired(),
  jobStatus: Yup.string().notRequired(),
  jobRefNo: Yup.string().notRequired(),
  appointmentDate: Yup.string().nullable(),
  calendar_time_slot_id: Yup.number()
    .nullable()
    .when('appointmentDate', {
      is: appointmentDate => appointmentDate && appointmentDate.length > 0,
      then: schema =>
        schema.required('Time slot is required if appointment date is set'),
      otherwise: schema => schema.notRequired(),
    }),
});

const InfoRow = ({icon, label}) => (
  <>
    <View style={styles.infoRow}>
      {icon}
      <Text style={styles.infoText}>{label}</Text>
    </View>
  </>
);

const NewJobFromCustomar = ({handleFormSubmit}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const [addressList, setAddressList] = useState<any[]>([]);
  const [filteredAddress, setFilteredAddress] = useState<any[]>([]);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [noAddressResults, setNoAddressResults] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [priorities, setPriorities] = useState<any[]>([]);
  const [jobStatus, setJobStatus] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [formattedTimeSlots, setFormattedTimeSlots] = useState([]);
  const [date, setDate] = useState(new Date()); // Holds the actual Date object
  const [showDatePicker, setShowDatePicker] = useState(false); // Controls DatePicker visibility

  const {customerId} = route.params;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAddresses();
    fetchPriorities();
    fetchJobStatus();
    fetchTimeSlots();
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    const res = await GetSignleCustomer(customerId);

    if (res?.data) {
      setCustomer(res.data);
      console.log('sdfjksdfj', res.data);
    }
    setLoading(false);
  };

  const getFullAddress = () => {
    const {address_line_1, address_line_2, city, postal_code, state, country} =
      customer.data || {};
    return [address_line_1, address_line_2, city, postal_code, state, country]
      .filter(part => part && part.trim())
      .join(', ');
  };

  const fetchTimeSlots = async () => {
    try {
      const res = await GetTimeSlots();
      if (res?.data && Array.isArray(res.data)) {
        setTimeSlots(res.data);

        const mappedSlots = res.data.map(slot => ({
          ...slot,
          displayLabel: `${slot.title} (${slot.start} - ${slot.end})`,
        }));
        setFormattedTimeSlots(mappedSlots);
      }
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  };

  const fetchPriorities = async () => {
    try {
      const res = await GetPriorities();
      if (res) {
        setPriorities(res.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  const fetchJobStatus = async () => {
    try {
      const res = await GetJobStatus();
      if (res) {
        setJobStatus(res.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSearch = text => {
    const filtered = customers.filter(customer =>
      (customer.customer_full_name || '')
        .toLowerCase()
        .includes(text.toLowerCase()),
    );
    setFilteredCustomers(filtered);
    setShowDropdown(true);
    setNoResults(filtered.length === 0 && text.length > 0);
  };

  const handleAddressSearch = (text: string) => {
    const filtered = addressList.filter(addr =>
      (addr.address_line_1 || '').toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredAddress(filtered);
    setNoAddressResults(filtered.length === 0 && text.length > 0);
    setShowAddressDropdown(true);
  };

  const fetchAllAddresses = async () => {
    try {
      let allAddresses: any[] = [];

      const res = await GetAddressList(customerId);

      if (res !== false) {
        //  console.log('Address,',res.data)
        if (res.data.data) {
          const fetchedAddress = res.data.data;

          allAddresses = fetchedAddress;

          // setAddressList(fetchedAddress);
          // setFilteredAddress(fetchedAddress);
        }
      } else {
        console.error(
          'API call returned false, likely an error in the helper.',
        );
      }

      setAddressList(allAddresses);
      setFilteredAddress(allAddresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setAddressList([]);
      setFilteredAddress([]);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
    Keyboard.dismiss();
  };

  const handleSubmit = async (values: any) => {
    try {
      const jobData = {
        customer_id: customerId,
        customer_property_id: values.customer_property_id,
        description: values.jobDescriptionShort,
        details: values.jobDetails,
        customer_job_priority_id: values.customer_job_priority_id,
        due_date: values.appointmentDate || null,
        customer_job_status_id: values.customer_job_status_id,
        reference_no: values.jobRefNo,
        estimated_amount: values.estimatedJobValue
          ? parseFloat(values.estimatedJobValue)
          : null,
        job_calender_date: values.appointmentDate || null,
      };

      console.log('Job Data to send:', jobData);

      const jobsRes = await CreateJob(jobData);
      console.log('jobsRes==>>>>', jobsRes);

      if (jobsRes?.data) {
        const createdJobId = jobsRes.data.id;

        if (values.appointmentDate && values.calendar_time_slot_id) {
          const calendarData = {
            customer_id: selectedCustomer?.id,
            customer_job_id: createdJobId,
            date: values.appointmentDate,
            calendar_time_slot_id: values.calendar_time_slot_id,
          };

          console.log('Calendar Data to send:', calendarData);

          const clanderRes = await CreateJobClander(calendarData);
          console.log('clanderRes==>>>>', clanderRes);

          if (clanderRes?.data) {
            Alert.alert('✅ Success', 'Job created with full details!');
            navigation.navigate('JobsScreen');
          } else {
            Alert.alert(
              '⚠️ Partial Success',
              'Job created, but appointment scheduling failed.',
            );
            navigation.navigate('JobsScreen');
          }
        } else {
          Alert.alert(
            '✅ Success',
            'Job created successfully (no appointment scheduled).',
          );
        }
        navigation.navigate('JobsScreen');
      } else {
        // Handle job creation failure
        Alert.alert('❌ Error', 'Job creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during job submission:', error);
      Alert.alert(
        '❌ Error',
        'An unexpected error occurred. Please try again.',
      );
    }
  };

  const getPriorityName = id => priorities.find(p => p.id === id)?.name;
  const getJobStatusName = id => jobStatus.find(s => s.id === id)?.name;

  if (loading || !customer) {
    return <LottieLoader visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="New Job"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView>
         <KeyboardAwareScrollView
       
        enableOnAndroid={true}
        extraScrollHeight={hp(22)}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Formik
            initialValues={{
              customer: '',
              jobAddress: '',
              jobDescriptionShort: '',
              jobDetails: '',
              estimatedJobValue: '',
              priority: '',
              jobStatus: '',
              jobRefNo: '',
              appointmentDate: '',
              customer_job_priority_id: '',
              calendar_time_slot_id: '',
              customer_job_status_id: '',
            }}
            onSubmit={values => handleSubmit(values)}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.sectionTitle}>Customer Information</Text>

                  <View style={styles.section}>
                    <View style={styles.card}>
                      <InfoRow
                        icon={<User size={18} color="#008080" />}
                        label={customer.data.full_name}
                      />
                      <InfoRow
                        icon={<MapPin size={18} color="#008080" />}
                        label={getFullAddress()}
                      />
                      {customer.data.contact ? (
                        <InfoRow
                          icon={<Mail size={18} color="#008080" />}
                          label={customer.data.contact.email || 'N/A'}
                        />
                      ) : (
                        <InfoRow
                          icon={<Mail size={18} color="#008080" />}
                          label={'N/A'}
                        />
                      )}
                      {customer.data.contact ? (
                        <InfoRow
                          icon={<Smartphone size={18} color="#008080" />}
                          label={customer.data.contact.phone || 'N/A'}
                        />
                      ) : (
                        <InfoRow
                          icon={<Smartphone size={18} color="#008080" />}
                          label={'N/A'}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <Text style={styles.sectionTitle}>Job Details</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Job Address <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    editable={customerId ? true : false}
                    placeholder="Search Address..."
                    value={values.jobAddress}
                    onChangeText={text => {
                      setFieldValue('jobAddress', text);
                      handleAddressSearch(text);
                    }}
                    onFocus={() => {
                      setNoAddressResults(false);
                      setShowAddressDropdown(true);
                    }}
                  />

                 {showAddressDropdown && (
                        <View
                          style={{
                            backgroundColor: '#eee',
                            borderRadius: 5,
                          }}>
                          {filteredAddress.length > 0 ? (
                            <>
                              <Text
                                style={{
                                  fontWeight: '500',
                                  color: '#000',
                                  backgroundColor: '#f1f5f9',
                                }}>
                                {filteredAddress.length} results found
                              </Text>
                              <FlatList
                                data={filteredAddress}
                                keyExtractor={item => item.id.toString()}
                                scrollEnabled={false}
                                renderItem={({item: addr}) => (
                                  <TouchableOpacity
                                    onPress={() => {
                                      setFieldValue(
                                        'jobAddress',
                                        addr.full_address,
                                      );
                                      setFieldValue(
                                        'customer_property_id',
                                        addr.id,
                                      );
                                      setShowAddressDropdown(false);
                                    }}
                                    style={styles.dropdownItem}>
                                    <View style={styles.round}>
                                      <MapPin color={'#000'} size={hp(2.5)} />
                                    </View>
                                    <Text style={styles.dropdownItem}>
                                      {addr.full_address}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              />
                              {/* <TouchableOpacity style={[styles.addressButton]}>
                                <Text style={styles.addressButtonText}>
                                  Add Address
                                </Text>
                              </TouchableOpacity> */}
                            </>
                          ) : (
                            <View>
                              <Text style={styles.noResultText}>
                                No address found
                              </Text>
                              {/* <TouchableOpacity style={[styles.addressButton]}>
                                <Text style={styles.addressButtonText}>
                                  Add Address
                                </Text>
                              </TouchableOpacity> */}
                            </View>
                          )}
                        </View>
                      )}

                  {errors.jobAddress && touched.jobAddress && (
                    <Text style={styles.errorText}>{errors.jobAddress}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Job description</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Short Description"
                    value={values.jobDescriptionShort}
                    onChangeText={handleChange('jobDescriptionShort')}
                    onBlur={handleBlur('jobDescriptionShort')}
                  />
                  <NotebookPen
                    size={20}
                    color="green"
                    style={{position: 'absolute', right: wp(3), bottom: hp(2)}}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Job Details</Text>
                  <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Details..."
                    multiline
                    numberOfLines={4}
                    value={values.jobDetails}
                    onChangeText={handleChange('jobDetails')}
                    onBlur={handleBlur('jobDetails')}
                  />
                  <NotebookText
                    size={20}
                    color="green"
                    style={{position: 'absolute', right: wp(3), bottom: hp(2)}}
                  />
                </View>

                <View style={[styles.inputGroup, {marginTop: hp(4)}]}>
                  <Text style={styles.label}>
                    Estimated Job Value (Excluding VAT)
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Value"
                    value={values.estimatedJobValue}
                    onChangeText={handleChange('estimatedJobValue')}
                    onBlur={handleBlur('estimatedJobValue')}
                    keyboardType="number-pad"
                  />
                  <BadgeEuro
                    size={20}
                    color="green"
                    style={{position: 'absolute', right: wp(3), bottom: hp(2)}}
                  />
                </View>

               <View style={styles.inputGroup}>
                      <Text style={styles.label}>Priority</Text>
                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() =>
                          navigation.navigate('PrioritySelector', {
                            selectedId: values.customer_job_priority_id,
                            onSelect: item =>
                              setFieldValue(
                                'customer_job_priority_id',
                                item.id,
                              ),
                            options: priorities,
                          })
                        }>
                        <Text>
                          {getPriorityName(values.customer_job_priority_id) ||
                            'Please Select'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Job Status</Text>
                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() =>
                          navigation.navigate('JobStatusSelector', {
                            selectedId: values.customer_job_status_id,
                            onSelect: item =>
                              setFieldValue('customer_job_status_id', item.id),
                            options: jobStatus,
                          })
                        }>
                        <Text>
                          {getJobStatusName(values.customer_job_status_id) ||
                            'Please Select'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Job Ref No</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Reference No"
                    value={values.jobRefNo}
                    onChangeText={handleChange('jobRefNo')}
                    onBlur={handleBlur('jobRefNo')}
                  />
                  <Hash
                    size={20}
                    color="green"
                    style={{position: 'absolute', right: wp(3), bottom: hp(2)}}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Appointment Date</Text>
                  <TouchableOpacity onPress={showDatepicker}>
                    <TextInput
                      style={[
                        styles.input,
                        {color: values.appointmentDate ? '#000' : '#888'},
                      ]} // Style to make it look like a text input
                      placeholder="Select Date"
                      value={values.appointmentDate}
                      editable={false} // Make it non-editable as picker handles input
                      pointerEvents="none" // Ensures touch event goes to TouchableOpacity
                    />
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedDate) => {
                        if (
                          Platform.OS === 'android' &&
                          event.type === 'dismissed'
                        ) {
                          setShowDatePicker(false);
                          return;
                        }

                        const currentDate = selectedDate || date;
                        setShowDatePicker(Platform.OS === 'ios');

                        if (selectedDate) {
                          setDate(currentDate);

                          const formattedDate = currentDate
                            .toISOString()
                            .split('T')[0]; // "YYYY-MM-DD"
                          setFieldValue('appointmentDate', formattedDate);
                        }
                      }}
                    />
                  )}

                  {errors.appointmentDate && touched.appointmentDate && (
                    <Text style={styles.errorText}>
                      {String(errors.appointmentDate)}
                    </Text>
                  )}
                  <Calendar
                    size={20}
                    color="green"
                    style={{position: 'absolute', right: wp(3), bottom: hp(2)}}
                  />
                </View>

                {values.appointmentDate ? (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Slot</Text>
                    <Dropdown
                      style={styles.dropdown}
                      data={formattedTimeSlots}
                      labelField="displayLabel"
                      valueField="id"
                      placeholder="Please Select"
                      value={values.calendar_time_slot_id}
                      onChange={item => {
                        setFieldValue('calendar_time_slot_id', item.id);
                      }}
                    />
                  </View>
                ) : null}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.saveButtonText}>Save Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewJobFromCustomar;
