import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-element-dropdown';
import {
  Calendar,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const CreateJobAddress = () => {
  const initialValues = {
    addressLine1: '',
    addressLine2: '',
    townCity: '',
    regionCounty: '',
    postCode: '',
    note: '',
    name: '',
    phone: '',
    email: '',
    gasServiceDueDate: null,
  };

  const validationSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Address Line 1 is required'),
    townCity: Yup.string().required('Town/City is required'),
    regionCounty: Yup.string().required('Region/County is required'),
    postCode: Yup.string().required('Post Code is required'),
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  return (
    <View style={styles.container}>
      <CustomHeader title="Create Job Address" />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={hp(5)}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => console.log(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              {/* Address Lookup */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address Lookup</Text>
                <View style={styles.searchContainer}>
                  <MapPin size={hp(2.5)} color="#666" style={styles.icon} />
                  <Text style={styles.searchPlaceholder}>
                    Search address here...
                  </Text>
                </View>
                <TouchableOpacity style={styles.copyButton}>
                  <Text style={styles.copyButtonText}>
                    Copy Customer Address
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Address Details */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Job Address Details</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Address Line 1</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('addressLine1')}
                    onBlur={handleBlur('addressLine1')}
                    value={values.addressLine1}
                    placeholder="Address Line 1"
                  />
                  {touched.addressLine1 && errors.addressLine1 && (
                    <Text style={styles.errorText}>{errors.addressLine1}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Address Line 2 (Optional)</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('addressLine2')}
                    onBlur={handleBlur('addressLine2')}
                    value={values.addressLine2}
                    placeholder="Address Line 2"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Town/City</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('townCity')}
                    onBlur={handleBlur('townCity')}
                    value={values.townCity}
                    placeholder="Town/City"
                  />
                  {touched.townCity && errors.townCity && (
                    <Text style={styles.errorText}>{errors.townCity}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Region/County</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('regionCounty')}
                    onBlur={handleBlur('regionCounty')}
                    value={values.regionCounty}
                    placeholder="Region/County"
                  />
                  {touched.regionCounty && errors.regionCounty && (
                    <Text style={styles.errorText}>{errors.regionCounty}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Post Code</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('postCode')}
                    onBlur={handleBlur('postCode')}
                    value={values.postCode}
                    placeholder="Post Code"
                  />
                  {touched.postCode && errors.postCode && (
                    <Text style={styles.errorText}>{errors.postCode}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Note</Text>
                  <TextInput
                    style={[styles.input, styles.multilineInput]}
                    onChangeText={handleChange('note')}
                    onBlur={handleBlur('note')}
                    value={values.note}
                    placeholder="Note..."
                    multiline
                  />
                </View>
              </View>

              {/* Occupant's Details */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Occupant's Details</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Name</Text>
                  <View style={styles.inputWithIcon}>
                    <User
                      size={hp(2.5)}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, styles.inputWithIconPadding]}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      placeholder="Name"
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phone</Text>
                  <View style={styles.inputWithIcon}>
                    <Phone
                      size={hp(2.5)}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, styles.inputWithIconPadding]}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      placeholder="Phone"
                      keyboardType="phone-pad"
                    />
                  </View>
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWithIcon}>
                    <Mail
                      size={hp(2.5)}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, styles.inputWithIconPadding]}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Email Address"
                      keyboardType="email-address"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Gas Service Due Date</Text>
                  <TouchableOpacity style={styles.datePicker}>
                    <Calendar
                      size={hp(2.5)}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <Text style={styles.datePlaceholder}>
                      {values.gasServiceDueDate || 'Select date'}
                    </Text>
                    <ChevronDown size={hp(2.5)} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Save Address</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateJobAddress;
