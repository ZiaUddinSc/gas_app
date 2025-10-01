import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../../theme/Colors';
import styles from './styles';
import {CustomerUpdate} from '../../../helper/CustomerHelper';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import { ArrowLeft } from 'lucide-react-native';

const Index = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {initialValues, customerId, fetchCustomer, titleOptions} = route.params;

  const handleTitleNameUpdate = async values => {
    const payload = {
      title_id: values.title_id,
      full_name: values.full_name,
    };

    const res = await CustomerUpdate(customerId, payload);
    if (res.message === 'Customer successfully updated.') {
      fetchCustomer?.();
      navigation.goBack();
    } else {
      Alert.alert('Update Failed', 'Please try again later.');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={hp(22)}
      keyboardShouldPersistTaps="handled">
      <CustomHeader
        title="Edit Customer"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleTitleNameUpdate}>
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              handleBlur,
              values,
            }) => (
              <>
                <Text style={styles.sectionTitle}>Personal Information</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Title</Text>
                  {/* <Dropdown
                    style={styles.dropdown}
                    data={titleOptions}
                    labelField="name"
                    valueField="id"
                    placeholder="Please Select"
                    value={values.title_id}
                    onChange={item => setFieldValue('title_id', item.id)}
                  /> */}

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TitlePicker', {
                        data: titleOptions, // your title list
                        onSelect: item => setFieldValue('title_id', item.id),
                      });
                    }}
                    style={[
                      {
                        padding: 10,
                      },
                      styles.input,
                    ]}>
                    <Text>
                      {titleOptions.find(t => t.id === values.title_id)?.name ||
                        'Please Select Title'}
                    </Text>
                  </TouchableOpacity>

                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={values.full_name}
                    onChangeText={handleChange('full_name')}
                    placeholder="Enter Full Name"
                    placeholderTextColor="black"
                    onBlur={handleBlur('full_name')}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSubmit}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Index;
