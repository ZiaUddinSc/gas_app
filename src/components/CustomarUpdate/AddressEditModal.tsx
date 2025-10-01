import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import CustomPlacesSearch from '../CustomPlacesSearch';
import Color from '../../theme/Colors';
import {
  Home,
  Save,
  X,
  ArrowLeft,
  PlusCircle,
  CheckCircle,
  XCircle,
  User,
  Building,
  Hash,
  MapPin,
  Smartphone,
  Phone,
  Mail,
  Mails,
  NotebookPen,
} from 'lucide-react-native';

const AddressEditModal = ({visible, onClose, initialValues, onSubmit}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <>
                {/* 🔍 Custom Search */}
                <View style={styles.inputGroup}>
                  <CustomPlacesSearch
                    onSelect={data => {
                      setFieldValue('address_line_1', data.address_line_1);
                      setFieldValue('address_line_2', data.address_line_1);
                      setFieldValue('city', data.city);
                      setFieldValue('country', data.country);
                      setFieldValue('state', data.county);
                      setFieldValue('postal_code', data.postcode);
                      setFieldValue('latitude', data.lat);
                      setFieldValue('longitude', data.lng);
                    }}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), bottom: wp(3)}}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Address Line 1</Text>

                  <TextInput
                    value={values.address_line_1}
                    onChangeText={handleChange('address_line_1')}
                    style={styles.input}
                    placeholder="Address Line 1"
                    placeholderTextColor="black"
                    onBlur={handleBlur('address_line_1')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), bottom: wp(3)}}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Address Line 2</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Address Line 2"
                    placeholderTextColor="black"
                    value={values.address_line_2}
                    onChangeText={handleChange('address_line_2')}
                    onBlur={handleBlur('address_line_2')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), bottom: wp(3)}}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Town/City</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Town/City"
                    placeholderTextColor="black"
                    value={values.city}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), bottom: wp(3)}}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Region/County</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Region/County"
                    placeholderTextColor="black"
                    value={values.state}
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), bottom: wp(3)}}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Post Code</Text>
                  {/* <TextInput
                      value={values.country}
                      onChangeText={handleChange('country')}
                      onBlur={handleBlur('country')}
                  /> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Post Code"
                    placeholderTextColor="black"
                    value={values.postal_code}
                    onChangeText={handleChange('postal_code')}
                    onBlur={handleBlur('postal_code')}
                  />
                  <MapPin
                    color="green"
                    size={20}
                    style={{position: 'absolute', right: wp(2), bottom: wp(3)}}
                  />
                </View>
                {/* Add all other fields just like this */}
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const textColorPrimary = '#343a40';
const borderColor = '#ced4da';
const errorTextColor = 'red';
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.primaryBGColor,
  },
  container: {
    flexGrow: 1,
    // paddingHorizontal: wp(4),
    // paddingTop: hp(2),
    // paddingBottom: hp(3),
    // backgroundColor:Color.white,
    // marginBottom:hp(6)
  },

  formContainer: {
    backgroundColor: Color.white,
    padding: wp(4),
    borderRadius: wp(1),
    marginBottom: hp(2),
    // borderWidth: 1,
    // borderColor: borderColor,
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: textColorPrimary,
    marginBottom: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    paddingBottom: hp(0.5),
  },
  inputGroup: {
    marginBottom: hp(2),
    justifyContent: 'center',
  },
  label: {
    fontSize: hp(1.8),
    color: textColorPrimary,
    marginBottom: hp(0.5),
  },
  required: {
    color: 'red',
  },
  input: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    fontSize: hp(1.8),
    backgroundColor: Color.white,
    elevation: 2,
  },
  multilineInput: {
    minHeight: hp(10),
    textAlignVertical: 'top',
  },
  dropdown: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    backgroundColor: Color.white,
    elevation: 2,
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: hp(2),
  },
  saveButton: {
    backgroundColor: Color.primaryBGColor,
    height: hp(6),
    borderRadius: wp(10),
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Color.white,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  cancelButton: {
    backgroundColor: Color.white,
    height: hp(6),
    borderRadius: wp(10),
    borderWidth: 1,
    borderColor: Color.primaryBGColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  cancelButtonText: {
    color: Color.textPrimaryColor,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  errorText: {
    fontSize: hp(1.4),
    color: errorTextColor,
    marginTop: hp(0.3),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  switchPlaceholder: {
    width: wp(10),
    height: hp(4),
    backgroundColor: '#ccc', // Placeholder for Switch
    borderRadius: wp(2),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  radioGroup: {
    // flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: '#F2F0EF',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    // borderWidth:1
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioOuterActive: {
    borderColor: '#008080',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#008080',
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default AddressEditModal;
