import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import {X, CalendarDays, Circle, CheckCircle} from 'lucide-react-native'; // X icon for close, CalendarDays for date icon
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CreateJobClander} from '../../helper/JobHelper'; // Assuming this is your API helper
import {GetTimeSlots} from '../../helper/GetApiHelper'; // Assuming this is your API helper to fetch time slots
import Color from '../../theme/Colors';
// Validation Schema for the modal form
const validationSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  calendar_time_slot_id: Yup.number()
    .required('Time slot is required')
    .nullable(),
});

interface AddToCalendarModalProps {
  isVisible: boolean;
  onClose: () => void;
  // This prop will be the 'item' (job object) from your FlatList renderItem
  jobData: {
    id: number; // job ID
    customer_id: number; // customer ID
    calendar?: {
      date: string; // existing date if any, e.g., "DD-MM-YYYY"
      calendar_time_slot_id: number; // existing slot ID if any
    };
  } | null;
  onSuccess: () => void; // Callback after successful calendar update
}

const AddToCalendarModal: React.FC<AddToCalendarModalProps> = ({
  isVisible,
  onClose,
  jobData,
  onSuccess,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Date object for DateTimePicker
  const [timeSlots, setTimeSlots] = useState<any[]>([]);

  

  useEffect(() => {
    if (isVisible && jobData) {
      fetchTimeSlots();

      // Initialize with existing calendar date if available
      if (jobData.calendar?.date) {
        const parsedDate = moment(jobData.calendar.date, 'DD-MM-YYYY').toDate();
        setSelectedDate(parsedDate);
      } else {
        setSelectedDate(new Date()); // Default to current date if no existing date
      }
    }
  }, [isVisible, jobData]);

  const fetchTimeSlots = async () => {
    try {
      const res = await GetTimeSlots();
      if (res?.data && Array.isArray(res.data)) {
        setTimeSlots(res.data);
      }
    } catch (error) {
      console.error('Error fetching time slots:', error);
      Alert.alert('Error', 'Failed to load time slots.');
    }
  };

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android' && event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleAddToCalendar = async (values: any) => {
    if (!jobData) {
      Alert.alert('Error', 'Job data not found for scheduling.');
      return;
    }

    try {
      const calendarPayload = {
        customer_id: jobData.customer_id,
        customer_job_id: jobData.id,
        date: moment(values.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        calendar_time_slot_id: values.calendar_time_slot_id,
      };

      const res = await CreateJobClander(calendarPayload);

      if (res?.success) {
        onClose();
        Alert.alert(
          'Success',
          'Job added to calendar!',
          [
            {
              text: 'OK',
              onPress: () => {
                onSuccess(); // Call your refresh function
                // Close the modal
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Error',
          res?.message || 'Failed to add job to calendar. Please try again.',
        );
      }
    } catch (error) {
      console.error('Calendar submission error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modalContainer}>
          {/* Modal Header */}
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Add To Calendar</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
              <X size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <Formik
            initialValues={{
              date:
                jobData?.calendar?.date ||
                moment(new Date()).format('DD-MM-YYYY'),
              calendar_time_slot_id:
                jobData?.calendar?.calendar_time_slot_id || null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddToCalendar}
            enableReinitialize={true} // Important to re-initialize form when jobData changes
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={modalStyles.formContent}>
                {/* Date Input */}
                <View style={modalStyles.inputGroup}>
                  <Text style={modalStyles.label}>Date *</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowDatePicker(true);
                      Keyboard.dismiss();
                    }}
                    style={modalStyles.dateInputTouchable}>
                    <TextInput
                      style={modalStyles.dateInputText}
                      placeholder="DD-MM-YYYY"
                      value={values.date}
                      editable={false}
                      pointerEvents="none"
                    />
                    <CalendarDays
                      size={20}
                      color="#888"
                      style={modalStyles.dateIcon}
                    />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={selectedDate} // Use the actual Date object
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={(event, date) => {
                        onDateChange(event, date);
                        if (date) {
                          setFieldValue(
                            'date',
                            moment(date).format('DD-MM-YYYY'),
                          );
                        }
                      }}
                    />
                  )}
                  {errors.date && touched.date && (
                    <Text style={modalStyles.errorText}>{String(errors.date)}</Text>
                  )}
                </View>

                {/* Time Slots */}
                <View style={modalStyles.inputGroup}>
                  <Text style={modalStyles.label}>Slot *</Text>
                  {timeSlots.map(slot => (
                    <TouchableOpacity
                      key={slot.id}
                      style={modalStyles.radioButtonContainer}
                      onPress={() =>
                        setFieldValue('calendar_time_slot_id', slot.id)
                      }>
                      {values.calendar_time_slot_id === slot.id ? (
                        <CheckCircle size={20} color="#007bff" /> // Selected icon
                      ) : (
                        <Circle size={20} color="#ccc" /> // Unselected icon
                      )}
                      <Text style={modalStyles.radioButtonLabel}>
                        {`${slot.title} ${slot.start.substring(
                          0,
                          5,
                        )} - ${slot.end.substring(0, 5)}`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {errors.calendar_time_slot_id &&
                    touched.calendar_time_slot_id && (
                      <Text style={modalStyles.errorText}>
                        {String(errors.calendar_time_slot_id)}
                      </Text>
                    )}
                </View>

                {/* Action Buttons */}
                <View style={modalStyles.buttonContainer}>
                  <TouchableOpacity
                    style={modalStyles.cancelButton}
                    onPress={onClose}>
                    <Text style={modalStyles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalStyles.addToCalendarButton}
                    onPress={() => handleSubmit()}>
                    <Text style={modalStyles.addToCalendarButtonText}>
                      Add To Calendar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

// Styles for the Modal
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp(90), // 90% of screen width
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: hp(0.5),
  },
  formContent: {
    padding: hp(2),
  },
  inputGroup: {
    marginBottom: hp(2),
  },
  label: {
    fontSize: hp(1.8),
    marginBottom: hp(0.8),
    color: '#555',
    fontWeight: '500',
  },
  dateInputTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
    backgroundColor: '#fff',
  },
  dateInputText: {
    flex: 1,
    fontSize: hp(1.8),
    color: '#000',
    paddingVertical: 0, // Remove default padding on TextInput
  },
  dateIcon: {
    marginLeft: wp(2),
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    // borderWidth: 1, // Optional: for visual separation of radio buttons
    // borderColor: '#eee',
    // borderRadius: 5,
    // marginBottom: hp(1),
  },
  radioButtonLabel: {
    fontSize: hp(1.8),
    marginLeft: wp(3),
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp(2),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: hp(2),
  },
  cancelButton: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(5),
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#555',
    fontSize: hp(1.8),
    fontWeight: 'bold',
  },
  addToCalendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.primaryBGColor,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(5),
    borderRadius: 8,
    justifyContent: 'center',
  },
  addToCalendarButtonText: {
    color: '#fff',
    fontSize: hp(1.8),
    fontWeight: 'bold',
    marginLeft: wp(1.5),
  },
  errorText: {
    color: 'red',
    fontSize: hp(1.5),
    marginTop: hp(0.5),
  },
});

export default AddToCalendarModal;
