// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Keyboard,
//   FlatList,
//   Platform,
//   Alert,
// } from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import {Dropdown} from 'react-native-element-dropdown';
// import {
//   Home,
//   Save,
//   X,
//   ArrowLeft,
//   PlusCircle,
//   Edit,
//   Edit2,
//   Edit2Icon,
//   Edit3,
//   NotebookPen,
//   NotebookText,
//   BadgeEuro,
//   Hash,
//   Calendar,
//   MapPin,
// } from 'lucide-react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import styles from './styles'; // Assuming you have a styles.ts file
// import CustomHeader from '../../components/CustomHeader/CustomHeader';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useNavigation} from '@react-navigation/native';
// import CustomInput from '../../components/CustomInput/CustomInput';
// import {
//   GetAddress,
//   GetAddressList,
//   GetCustomers,
//   GetJob,
//   GetJobStatus,
//   GetPriorities,
//   GetTimeSlots,
// } from '../../helper/GetApiHelper';
// import {CreateJob, CreateJobClander} from '../../helper/JobHelper';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// const validationSchema = Yup.object().shape({
//   // customer: Yup.string().required('Customer is required'),
//   jobAddress: Yup.string().required('Job Address is required'),
//   jobDescriptionShort: Yup.string(),
//   jobDetails: Yup.string(),
//   estimatedJobValue: Yup.number().notRequired(),
//   priority: Yup.string().notRequired(),
//   jobStatus: Yup.string().notRequired(),
//   jobRefNo: Yup.string().notRequired(),
//   appointmentDate: Yup.string().nullable(),
//   calendar_time_slot_id: Yup.number()
//     .nullable()
//     .when('appointmentDate', {
//       is: appointmentDate => appointmentDate && appointmentDate.length > 0,
//       then: schema =>
//         schema.required('Time slot is required if appointment date is set'),
//       otherwise: schema => schema.notRequired(),
//     }),
// });

// const CreateJobs = ({handleFormSubmit}) => {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();

//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [noResults, setNoResults] = useState(false);

//   const [addressList, setAddressList] = useState<any[]>([]);
//   const [filteredAddress, setFilteredAddress] = useState<any[]>([]);
//   const [showAddressDropdown, setShowAddressDropdown] = useState(false);
//   const [noAddressResults, setNoAddressResults] = useState(false);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     null,
//   );
//   const [priorities, setPriorities] = useState<any[]>([]);
//   const [jobStatus, setJobStatus] = useState<any[]>([]);
//   const [timeSlots, setTimeSlots] = useState<any[]>([]);
//   const [formattedTimeSlots, setFormattedTimeSlots] = useState([]);
//   const [date, setDate] = useState(new Date()); // Holds the actual Date object
//   const [showDatePicker, setShowDatePicker] = useState(false); // Controls DatePicker visibility

//   useEffect(() => {
//     fetchAllCustomers();
//     fetchPriorities();
//     fetchJobStatus();
//     fetchTimeSlots();
//   }, []);

//   const fetchTimeSlots = async () => {
//     try {
//       const res = await GetTimeSlots();
//       if (res?.data && Array.isArray(res.data)) {
//         setTimeSlots(res.data);

//         const mappedSlots = res.data.map(slot => ({
//           ...slot,
//           displayLabel: `${slot.title} (${slot.start} - ${slot.end})`,
//         }));
//         setFormattedTimeSlots(mappedSlots);
//       }
//     } catch (error) {
//       console.error('Error fetching time slots:', error);
//     }
//   };

//   const fetchPriorities = async () => {
//     try {
//       const res = await GetPriorities();
//       console.log('setPriorities', res);
//       if (res) {
//         setPriorities(res.data);
//       }
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//     }
//   };
//   const fetchJobStatus = async () => {
//     try {
//       const res = await GetJobStatus();
//       if (res) {
//         setJobStatus(res.data);
//       }
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//     }
//   };

//   const fetchAllCustomers = async () => {
//     try {
//       let allCustomers: any[] = [];
//       let pageNo = 1;
//       let lastPageReached = false;

//       while (!lastPageReached) {
//         const res = await GetCustomers(pageNo);
//         if (Array.isArray(res?.jobs)) {
//           allCustomers = [...allCustomers, ...res.jobs];

//           if (res.meta?.last_page && pageNo < res.meta.last_page) {
//             pageNo++;
//           } else {
//             lastPageReached = true;
//           }
//         } else {
//           lastPageReached = true;
//         }
//       }

//       setCustomers(allCustomers);
//       setFilteredCustomers(allCustomers); // default suggestion
//     } catch (error) {
//       console.error('Error fetching all customers:', error);
//     }
//   };

//   const handleSearch = text => {
//     const filtered = customers.filter(customer =>
//       (customer.customer_full_name || '')
//         .toLowerCase()
//         .includes(text.toLowerCase()),
//     );
//     setFilteredCustomers(filtered);
//     setShowDropdown(true);
//     setNoResults(filtered.length === 0 && text.length > 0);
//   };

//   const handleAddressSearch = (text: string) => {
//     const filtered = addressList.filter(addr =>
//       (addr.address_line_1 || '').toLowerCase().includes(text.toLowerCase()),
//     );
//     setFilteredAddress(filtered);
//     setNoAddressResults(filtered.length === 0 && text.length > 0);
//     setShowAddressDropdown(true);
//   };

//   const fetchAllAddresses = async (id: number) => {
//     try {
//       let allAddresses: any[] = [];

//       const res = await GetAddressList(id);

//       if (res !== false) {
//         //  console.log('Address,',res.data)
//         if (res.data.data) {
//           const fetchedAddress = res.data.data;

//           allAddresses = fetchedAddress;

//           // setAddressList(fetchedAddress);
//           // setFilteredAddress(fetchedAddress);
//         }
//       } else {
//         console.error(
//           'API call returned false, likely an error in the helper.',
//         );
//       }

//       setAddressList(allAddresses);
//       setFilteredAddress(allAddresses);
//     } catch (error) {
//       console.error('Error fetching addresses:', error);
//       setAddressList([]);
//       setFilteredAddress([]);
//     }
//   };

//   const showDatepicker = () => {
//     setShowDatePicker(true);
//     Keyboard.dismiss();
//   };

//   const handleCreateJob = async (values: any) => {
//     try {
//       const jobData = {
//         customer_id: selectedCustomer?.id,
//         customer_property_id: values.customer_property_id,

//         description: values.jobDescriptionShort,
//         details: values.jobDetails,
//         customer_job_priority_id: values.customer_job_priority_id,
//         due_date: values.appointmentDate || null,
//         customer_job_status_id: values.customer_job_status_id,
//         reference_no: values.jobRefNo,
//         estimated_amount: values.estimatedJobValue
//           ? parseFloat(values.estimatedJobValue)
//           : null,
//         job_calender_date: values.appointmentDate || null,
//       };

//       const jobsRes = await CreateJob(jobData);

//       if (jobsRes?.data) {
//         const createdJobId = jobsRes.data.id;

//         if (values.appointmentDate && values.calendar_time_slot_id) {
//           const calendarData = {
//             customer_id: selectedCustomer?.id,
//             customer_job_id: createdJobId,
//             date: values.appointmentDate,
//             calendar_time_slot_id: values.calendar_time_slot_id,
//           };

//           const clanderRes = await CreateJobClander(calendarData);

//           if (clanderRes?.data) {
//             Alert.alert('✅ Success', 'Job created with full details!');
//             navigation.navigate('JobsScreen');
//           } else {
//             Alert.alert(
//               '⚠️ Partial Success',
//               'Job created, but appointment scheduling failed.',
//             );
//             navigation.navigate('JobsScreen');
//           }
//         } else {
//           Alert.alert(
//             '✅ Success',
//             'Job created successfully (no appointment scheduled).',
//           );
//         }
//         navigation.navigate('JobsScreen');
//       } else {
//         // Handle job creation failure
//         Alert.alert('❌ Error', 'Job creation failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during job submission:', error);

//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <CustomHeader
//         title="New Job"
//         fontSize={hp(2.2)}
//         leftIcon={<ArrowLeft size={24} color="white" />}
//         onLeftPress={() => navigation.goBack()}
//       />
//       <ScrollView>
//         <KeyboardAwareScrollView
//           enableOnAndroid={true}
//           extraScrollHeight={hp(22)}
//           keyboardShouldPersistTaps="handled">
//           <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>Job Details</Text>
//             <Formik
//               initialValues={{
//                 customer: '',
//                 jobAddress: '',
//                 jobDescriptionShort: '',
//                 jobDetails: '',
//                 estimatedJobValue: '',
//                 priority: '',
//                 jobStatus: '',
//                 jobRefNo: '',
//                 appointmentDate: '',
//                 customer_job_priority_id: '',
//                 calendar_time_slot_id: '',
//                 customer_job_status_id: '',
//               }}
//               validationSchema={validationSchema}
//               // onSubmit={values => handleCreateJob(values)}
//               >
//               {({
//                 handleChange,
//                 handleBlur,
//                 handleSubmit,
//                 values,
//                 errors,
//                 touched,
//                 setFieldValue,
//               }) => (
//                 <>
//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>
//                       Customer <Text style={styles.required}>*</Text>
//                     </Text>

//                     {/* Conditionally render this section based on customer search results. */}
//                     {/* {noResults && (
//                     <View style={styles.noResultContainer}>
//                       <Text style={styles.noResultText}>No Result</Text>
//                       <TouchableOpacity
//                         onPress={() => {
//                           navigation.navigate('CustomersCreate');
//                         }}
//                         style={styles.addCustomerButton}>
//                         <PlusCircle size={wp(5)} color="#fff" />
//                         <Text style={styles.addCustomerButtonText}>
//                           Add Customer
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   )} */}

//                     <TextInput
//                       style={styles.input}
//                       placeholder="Search Customer..."
//                       value={
//                         selectedCustomer?.customer_full_name || values.customer
//                       }
//                       onChangeText={text => {
//                         handleChange('customer')(text);
//                         handleSearch(text);
//                         setSelectedCustomer(null);
//                         setFieldValue('customer_id', '');
//                       }}
//                       onBlur={handleBlur('customer')}
//                       onFocus={() => setShowDropdown(true)}
//                     />

//                     {showDropdown && (
//                       <View
//                         style={{
//                           backgroundColor: '#eee',
//                           padding: 5,
//                           borderRadius: 5,
//                         }}>
//                         {filteredCustomers.length > 0 ? (
//                           <View
//                             style={{
//                               // maxHeight: hp(30),
//                               borderWidth: 1,
//                               borderColor: '#ccc',
//                               borderRadius: 6,
//                               // marginTop: 4,
//                               backgroundColor: '#fff',
//                             }}>
//                             <FlatList
//                               data={filteredCustomers}
//                               keyExtractor={item => item.id.toString()}
//                               scrollEnabled={false}
//                               // nestedScrollEnabled={true} // optional here
//                               ItemSeparatorComponent={() => (
//                                 <View style={styles.line} />
//                               )}
//                               renderItem={({item}) => (
//                                 <TouchableOpacity
//                                   onPress={() => {
//                                     setSelectedCustomer(item);
//                                     setFieldValue(
//                                       'customer',
//                                       item.customer_full_name,
//                                     );
//                                     setFieldValue('customer_id', item.id);
//                                     fetchAllAddresses(item.id);
//                                     setShowDropdown(false);
//                                     Keyboard.dismiss();
//                                   }}
//                                   style={{
//                                     paddingVertical: 8,
//                                     paddingHorizontal: 12,
//                                   }}>
//                                   <Text>{item.customer_full_name}</Text>
//                                 </TouchableOpacity>
//                               )}
//                             />
//                           </View>
//                         ) : (
//                           <>
//                             <Text style={{padding: 8, fontStyle: 'italic'}}>
//                               No Result
//                             </Text>
//                             <TouchableOpacity
//                               onPress={() => {
//                                 setShowDropdown(false);
//                                 navigation.navigate('CustomersCreate');
//                               }}
//                               style={styles.addCustomerButton}>
//                               <PlusCircle size={20} color="#fff" />
//                               <Text style={styles.addCustomerButtonText}>
//                                 Add Customer
//                               </Text>
//                             </TouchableOpacity>
//                           </>
//                         )}
//                       </View>
//                     )}

//                     {/* {errors.customer && touched.customer && (
//                       <Text style={styles.errorText}>
//                         {String(errors.customer)}
//                       </Text>
//                     )} */}
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>
//                       Job Address <Text style={styles.required}>*</Text>
//                     </Text>
//                     <TextInput
//                       style={styles.input}
//                       editable={values?.customer_id ? true : false}
//                       placeholder="Search Address..."
//                       value={values.jobAddress}
//                       onChangeText={text => {
//                         setFieldValue('jobAddress', text);
//                         handleAddressSearch(text);
//                       }}
//                       onFocus={() => {
//                         setNoAddressResults(false);
//                         setShowAddressDropdown(true);
//                       }}
//                     />

//                     {showAddressDropdown && (
//                       <View
//                         style={{
//                           backgroundColor: '#eee',
//                           borderRadius: 5,
//                         }}>
//                         {showAddressDropdown && (
//                           <View
//                             style={{
//                               backgroundColor: '#eee',
//                               borderRadius: 5,
//                               padding: 5,
//                             }}>
//                             {filteredAddress.length > 0 ? (
//                               <>
//                                     <Text
//                                   style={{
//                                     fontWeight: '500',
//                                     color: '#000',
//                                     padding:6,fontSize:16,
//                                   }}>
//                                   {filteredAddress.length} results found
//                                 </Text>
//                                 <View
//                                   style={{
//                                     // maxHeight: hp(30),
//                                     borderWidth: 1,
//                                     borderColor: '#ccc',
//                                     borderRadius: 6,
//                                     // marginTop: 4,
//                                     backgroundColor: '#fff',
//                                   }}>

//                                   <FlatList
//                                     data={filteredAddress}
//                                     keyExtractor={item => item.id.toString()}
//                                     scrollEnabled={false}
//                                     ItemSeparatorComponent={() => (
//                                       <View style={styles.line} />
//                                     )}
//                                     style={{
//                                       paddingVertical: 8,
//                                       paddingHorizontal: 7,
//                                     }}
//                                     renderItem={({item: addr}) => (
//                                       <TouchableOpacity
//                                         onPress={() => {
//                                           setFieldValue(
//                                             'jobAddress',
//                                             addr.full_address,
//                                           );
//                                           setFieldValue(
//                                             'customer_property_id',
//                                             addr.id,
//                                           );
//                                           setShowAddressDropdown(false);
//                                         }}
//                                         style={styles.dropdownItem}>
//                                         <View style={styles.round}>
//                                           <MapPin
//                                             color={'#000'}
//                                             size={hp(2.5)}
//                                           />
//                                         </View>
//                                         <Text
//                                           style={{
//                                             fontSize: 15,
//                                             paddingLeft: 7,
//                                             width: wp(76),
//                                           }}>
//                                           {addr.full_address}
//                                         </Text>
//                                       </TouchableOpacity>
//                                     )}
//                                   />
//                                 </View>
//                                 {/* <TouchableOpacity style={[styles.addressButton]}>
//                                 <Text style={styles.addressButtonText}>
//                                   Add Address
//                                 </Text>
//                               </TouchableOpacity> */}
//                               </>
//                             ) : (
//                               <View>
//                                 <Text style={styles.noResultText}>
//                                   No address found
//                                 </Text>
//                                 {/* <TouchableOpacity style={[styles.addressButton]}>
//                                 <Text style={styles.addressButtonText}>
//                                   Add Address
//                                 </Text>
//                               </TouchableOpacity> */}
//                               </View>
//                             )}
//                           </View>
//                         )}
//                       </View>
//                     )}

//                     {errors.jobAddress && touched.jobAddress && (
//                       <Text style={styles.errorText}>{errors.jobAddress}</Text>
//                     )}
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Job description</Text>
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Short Description"
//                       value={values.jobDescriptionShort}
//                       onChangeText={handleChange('jobDescriptionShort')}
//                       onBlur={handleBlur('jobDescriptionShort')}
//                     />
//                     <NotebookPen
//                       size={20}
//                       color="green"
//                       style={{
//                         position: 'absolute',
//                         right: wp(3),
//                         bottom: hp(2),
//                       }}
//                     />
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Job Details</Text>
//                     <TextInput
//                       style={[styles.input, styles.multilineInput]}
//                       placeholder="Details..."
//                       multiline
//                       numberOfLines={4}
//                       value={values.jobDetails}
//                       onChangeText={handleChange('jobDetails')}
//                       onBlur={handleBlur('jobDetails')}
//                     />
//                     <NotebookText
//                       size={20}
//                       color="green"
//                       style={{
//                         position: 'absolute',
//                         right: wp(3),
//                         bottom: hp(2),
//                       }}
//                     />
//                   </View>

//                   <View style={[styles.inputGroup, {marginTop: hp(4)}]}>
//                     <Text style={styles.label}>
//                       Estimated Job Value (Excluding VAT)
//                     </Text>
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Please Enter Value"
//                       value={values.estimatedJobValue}
//                       onChangeText={handleChange('estimatedJobValue')}
//                       onBlur={handleBlur('estimatedJobValue')}
//                       keyboardType="number-pad"
//                     />
//                     <BadgeEuro
//                       size={20}
//                       color="green"
//                       style={{
//                         position: 'absolute',
//                         right: wp(3),
//                         bottom: hp(2),
//                       }}
//                     />
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Priority</Text>
//                     <Dropdown
//                       style={styles.dropdown}
//                       data={priorities}
//                       labelField="name"
//                       valueField="id"
//                       placeholder="Please Select"
//                       value={values.customer_job_priority_id}
//                       onChange={item =>
//                         setFieldValue('customer_job_priority_id', item.id)
//                       }
//                     />
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Job Status</Text>
//                     <Dropdown
//                       style={styles.dropdown}
//                       data={jobStatus}
//                       labelField="name"
//                       valueField="id"
//                       placeholder="Please Select"
//                       value={values.customer_job_status_id}
//                       onChange={item =>
//                         setFieldValue('customer_job_status_id', item.id)
//                       }
//                     />
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Job Ref No</Text>
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Reference No"
//                       value={values.jobRefNo}
//                       onChangeText={handleChange('jobRefNo')}
//                       onBlur={handleBlur('jobRefNo')}
//                     />
//                     <Hash
//                       size={20}
//                       color="green"
//                       style={{
//                         position: 'absolute',
//                         right: wp(3),
//                         bottom: hp(2),
//                       }}
//                     />
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Appointment Date</Text>
//                     <TouchableOpacity onPress={showDatepicker}>
//                       <TextInput
//                         style={[
//                           styles.input,
//                           {color: values.appointmentDate ? '#000' : '#888'},
//                         ]} // Style to make it look like a text input
//                         placeholder="Select Date"
//                         value={values.appointmentDate}
//                         editable={false} // Make it non-editable as picker handles input
//                         pointerEvents="none" // Ensures touch event goes to TouchableOpacity
//                       />
//                     </TouchableOpacity>

//                     {showDatePicker && (
//                       <DateTimePicker
//                         testID="dateTimePicker"
//                         value={date}
//                         mode="date"
//                         is24Hour={true}
//                         display="default"
//                         onChange={(event, selectedDate) => {
//                           if (
//                             Platform.OS === 'android' &&
//                             event.type === 'dismissed'
//                           ) {
//                             setShowDatePicker(false);
//                             return;
//                           }

//                           const currentDate = selectedDate || date;
//                           setShowDatePicker(Platform.OS === 'ios');

//                           if (selectedDate) {
//                             setDate(currentDate);

//                             const formattedDate = currentDate
//                               .toISOString()
//                               .split('T')[0]; // "YYYY-MM-DD"
//                             setFieldValue('appointmentDate', formattedDate);
//                           }
//                         }}
//                       />
//                     )}

//                     {errors.appointmentDate && touched.appointmentDate && (
//                       <Text style={styles.errorText}>
//                         {String(errors.appointmentDate)}
//                       </Text>
//                     )}
//                     <Calendar
//                       size={20}
//                       color="green"
//                       style={{
//                         position: 'absolute',
//                         right: wp(3),
//                         bottom: hp(2),
//                       }}
//                     />
//                   </View>

//                   {values.appointmentDate ? (
//                     <View style={styles.inputGroup}>
//                       <Text style={styles.label}>Slot</Text>
//                       <Dropdown
//                         style={styles.dropdown}
//                         data={formattedTimeSlots}
//                         labelField="displayLabel"
//                         valueField="id"
//                         placeholder="Please Select"
//                         value={values.calendar_time_slot_id}
//                         onChange={item => {
//                           setFieldValue('calendar_time_slot_id', item.id);
//                         }}
//                       />
//                     </View>
//                   ) : null}

//                   <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                       style={styles.saveButton}
//                       onPress={() => {
//                         handleSubmit();
//                         handleCreateJob(values);
//                       }}>
//                       <Text style={styles.saveButtonText}>Save Job</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.cancelButton}
//                       onPress={() => {
//                         navigation.goBack();
//                       }}>
//                       <Text style={styles.cancelButtonText}>Cancel</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </>
//               )}
//             </Formik>
//           </View>
//         </KeyboardAwareScrollView>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateJobs;

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
  ArrowLeft,
  NotebookPen,
  NotebookText,
  BadgeEuro,
  Hash,
  Calendar,
  MapPin,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './styles'; // Assuming you have a styles.ts file
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native'; // useRoute
import Toast from 'react-native-toast-message';
import {
  GetAddress,
  GetAddressList,
  GetCustomers,
  GetJob,
  GetJobStatus,
  GetPriorities,
  GetTimeSlots,
} from '../../helper/GetApiHelper';
import {CreateJob, CreateJobClander} from '../../helper/JobHelper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const validationSchema = Yup.object().shape({
  // customer: Yup.string().required('Customer is required'),
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

const CreateJobs = ({handleFormSubmit}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [addressList, setAddressList] = useState<any[]>([]);
  const [filteredAddress, setFilteredAddress] = useState<any[]>([]);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [noAddressResults, setNoAddressResults] = useState(false); // Address no results
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [priorities, setPriorities] = useState<any[]>([]);
  const [jobStatus, setJobStatus] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [formattedTimeSlots, setFormattedTimeSlots] = useState([]);
  const [date, setDate] = useState(new Date()); // Holds the actual Date object
  const [showDatePicker, setShowDatePicker] = useState(false); // Controls DatePicker visibility

  const formikPropsRef = React.useRef(null);

  useEffect(() => {
    fetchAllCustomers();
    fetchPriorities();
    fetchJobStatus();
    fetchTimeSlots();
  }, []);

  useEffect(() => {
    if (route.params?.selectedCustomer) {
      const customer = route.params.selectedCustomer;
      setSelectedCustomer(customer);
      if (formikPropsRef.current) {
        formikPropsRef.current.setFieldValue(
          'customer',
          customer.customer_full_name,
        );
        formikPropsRef.current.setFieldValue('customer_id', customer.id);
        fetchAllAddresses(customer.id);
      } else {
        console.warn('Formik props not available yet in ref.');
      }
      navigation.setParams({selectedCustomer: undefined});
      setShowDropdown(false);
      Keyboard.dismiss();
    }
  }, [route.params?.selectedCustomer]);

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
      console.log('setPriorities', res);
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

  const handleAddressSearch = (text: string) => {
    const filtered = addressList.filter(addr =>
      (addr.address_line_1 || '').toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredAddress(filtered);
    setNoAddressResults(filtered.length === 0 && text.length > 0);
    setShowAddressDropdown(true);
  };

  const fetchAllAddresses = async (id: number) => {
    try {
      let allAddresses: any[] = [];

      const res = await GetAddressList(id);

      if (res !== false) {
        if (res.data.data) {
          const fetchedAddress = res.data.data;
          allAddresses = fetchedAddress;
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

  const handleCreateJob = async (values: any) => {
    try {
      const jobData = {
        customer_id: selectedCustomer?.id,
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

      const jobsRes = await CreateJob(jobData);

      if (jobsRes?.data) {
        const createdJobId = jobsRes.data.id;

        if (values.appointmentDate && values.calendar_time_slot_id) {
          const calendarData = {
            customer_id: selectedCustomer?.id,
            customer_job_id: createdJobId,
            date: values.appointmentDate,
            calendar_time_slot_id: values.calendar_time_slot_id,
          };

          const clanderRes = await CreateJobClander(calendarData);

          if (clanderRes?.data) {
            // ✅ Success (Job with appointment)
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Job created with full details!',
              position: 'top',
              visibilityTime: 3000,
            });
            navigation.navigate('JobsScreen');
          } else {
            // ⚠️ Partial Success (Job created, but appointment failed)
            Toast.show({
              type: 'info',
              text1: 'Partial Success',
              text2: 'Job created, but appointment scheduling failed.',
              position: 'top',
              visibilityTime: 3000,
            });
            navigation.navigate('JobsScreen');
          }
        } else {
          // ✅ Success (Job without appointment)
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Job created successfully (no appointment scheduled).',
            position: 'top',
            visibilityTime: 3000,
          });
        }
        navigation.navigate('JobsScreen');
      } else {
        // ❌ Job creation failure
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Job creation failed. Please try again.',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error: any) {
      console.error('Error during job submission:', error);
      // ❌ Unexpected error
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error.message || 'An unexpected error occurred. Please try again.',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  const getPriorityName = id => priorities.find(p => p.id === id)?.name;
  
  const getJobStatusName = id => jobStatus.find(s => s.id === id)?.name;

  const getSlotStatusName = (id: number) => {
    const slot = formattedTimeSlots.find((s) => s.id === id);
    if (!slot) return ""; // return empty if not found
    return `${slot.title} ${slot.start} - ${slot.end}`;
  };
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
            <Text style={styles.sectionTitle}>Job Details</Text>
            <Formik
              initialValues={{
                customer: '',
                customer_id: '', // Added for Formik's state management
                jobAddress: '',
                customer_property_id: '', // Added for Formik's state management
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
              validationSchema={validationSchema}
              onSubmit={handleCreateJob} // সরাসরি onSubmit এ handleCreateJob ব্যবহার করুন
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
              }) => {
                // Formik props ref
                formikPropsRef.current = {
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                };

                return (
                  <>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>
                        Customer <Text style={styles.required}>*</Text>
                      </Text>

                      <TouchableOpacity
                        style={styles.input}
                        onPress={() =>
                          navigation.navigate('CustomerSelectScreen', {
                            previousScreen: 'CreateJobs',
                          })
                        }>
                        <Text
                          style={[
                            {fontSize: wp('3.5%'), color: '#000'},
                            values.customer ? null : {color: '#888'}, // Placeholder color
                          ]}>
                          {values.customer || 'Search Customer...'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>
                        Job Address <Text style={styles.required}>*</Text>
                      </Text>
                      <TouchableOpacity
                          style={styles.dropdown}
                          disabled={values?.customer_id ? false : false}
                          onPress={() =>
                            values?.customer_id   ?
                            navigation.navigate('CustomerJobAddressSelector', {
                              selectedId:values?.customer_id,
                              onSelect: item =>
                                setFieldValue(
                                  'customer_id',
                                  item.id,
                                ),
                              options: addressList,
                            })
                            :{}
                        }>
                        <Text>
                          {getSlotStatusName(values.jobAddress) ||
                            'Please Select Address'}
                        </Text>
                      </TouchableOpacity>
                      {/* <TextInput
                        style={styles.input}
                        editable={values?.customer_id ? true : false}
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
                      /> */}

                      {/* {showAddressDropdown && (
                        <View
                          style={{
                            backgroundColor: '#eee',
                            borderRadius: 5,
                          }}>
                          {showAddressDropdown && (
                            <View
                              style={{
                                backgroundColor: '#eee',
                                borderRadius: 5,
                                padding: 5,
                              }}>
                              {filteredAddress.length > 0 ? (
                                <>
                                  <Text
                                    style={{
                                      fontWeight: '500',
                                      color: '#000',
                                      padding: 6,
                                      fontSize: 16,
                                    }}>
                                    {filteredAddress.length} results found
                                  </Text>
                                  <View
                                    style={{
                                      maxHeight: hp(30),
                                      borderWidth: 1,
                                      borderColor: '#ccc',
                                      borderRadius: 6,
                                      marginTop: 4,
                                      backgroundColor: '#fff',
                                    }}>
                                    <FlatList
                                      data={filteredAddress}
                                      keyExtractor={item => item.id.toString()}
                                      scrollEnabled={false}
                                      ItemSeparatorComponent={() => (
                                        <View style={styles.line} />
                                      )}
                                      style={{
                                        paddingVertical: 8,
                                        paddingHorizontal: 7,
                                      }}
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
                                            <MapPin
                                              color={'#000'}
                                              size={hp(2.5)}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 15,
                                              paddingLeft: 7,
                                              width: wp(76),
                                            }}>
                                            {addr.full_address}
                                          </Text>
                                        </TouchableOpacity>
                                      )}
                                    />
                                  </View>
                                  <TouchableOpacity style={[styles.addressButton]}>
                                 <Text style={styles.addressButtonText}>
                                   Add Address
                                 </Text>
                               </TouchableOpacity>
                                </>
                              ) : (
                                <View>
                                  <Text style={styles.noResultText}>
                                    No address found
                                  </Text>
                                  <TouchableOpacity style={[styles.addressButton]}>
                                 <Text style={styles.addressButtonText}>
                                   Add Address
                                 </Text>
                               </TouchableOpacity>
                                </View>
                              )}
                            </View>
                          )}
                        </View>
                      )}

                      {errors.jobAddress && touched.jobAddress && (
                        <Text style={styles.errorText}>
                          {errors.jobAddress}
                        </Text>
                      )} */}
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
                        style={{
                          position: 'absolute',
                          right: wp(3),
                          bottom: hp(2),
                        }}
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
                        style={{
                          position: 'absolute',
                          right: wp(3),
                          bottom: hp(2),
                        }}
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
                        style={{
                          position: 'absolute',
                          right: wp(3),
                          bottom: hp(2),
                        }}
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
                        style={{
                          position: 'absolute',
                          right: wp(3),
                          bottom: hp(2),
                        }}
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
                        style={{
                          position: 'absolute',
                          right: wp(3),
                          bottom: hp(2),
                        }}
                      />
                    </View>

                    {values.appointmentDate ? (
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Slot</Text>
                        <TouchableOpacity
                          style={styles.dropdown}
                          onPress={() =>
                          navigation.navigate('SlotSelector', {
                            selectedId: values.calendar_time_slot_id,
                            onSelect: item =>
                              setFieldValue(
                                'calendar_time_slot_id',
                                item.id,
                              ),
                            options: formattedTimeSlots,
                          })
                        }>
                        <Text>
                          {getSlotStatusName(values.calendar_time_slot_id) ||
                            'Please Select'}
                        </Text>
                      </TouchableOpacity>
                      </View>
                    ) : null}

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSubmit}>
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
                );
              }}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateJobs;
