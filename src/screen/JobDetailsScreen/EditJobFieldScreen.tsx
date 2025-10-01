import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';

import styles from './JobModalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors';
import {JobUpdate} from '../../helper/JobHelper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {ArrowLeft} from 'lucide-react-native';
import {GetJobStatus} from '../../helper/GetApiHelper';

const fieldLabels: Record<string, string> = {
  description: 'Job Description',
  details: 'Job Details',
  estimated_amount: 'Estimated Amount',
  customer_job_status_id: 'Job Status',
  customer_job_priority_id: 'Job Priority',
  reference_no: 'Reference No',
};

const EditJobFieldScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    field,
    initialValue,
    inputType = 'text',
    dropdownOptions,
    jobId,
    fetchJobDetails,
  } = route.params;

  const [value, setValue] = useState(initialValue?.toString() || '');
  const [jobStatus, setJobStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setValue(initialValue?.toString() || '');
  }, [initialValue]);

  useEffect(() => {
    fetchJobStatus();
  }, []);

  const fetchJobStatus = async () => {
    setLoading(true);
    const res = await GetJobStatus();
    if (res?.data) {
      setJobStatus(res.data);
    }
    setLoading(false);
  };

  const handleJobFieldUpdate = async () => {
    const payload = {[field]: dropdownOptions ? Number(value) : value};
    const res = await JobUpdate(jobId, payload);

    if (res?.success === true) {
      fetchJobDetails?.();
      Toast.show({
        type: 'success',
        text1: 'Updated successfully',
        text2: res?.message || `${fieldLabels[field]} updated.`,
        position: 'top',
        visibilityTime: 2500,
      });
      navigation.goBack();
    } else if (res?.errors) {
      const firstKey = Object.keys(res.errors)[0];
      const firstMessage = res.errors[firstKey]?.[0] || 'Something went wrong.';
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: firstMessage,
        position: 'top',
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Unexpected error',
        text2: 'Please try again later.',
        position: 'top',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <CustomHeader
        title="Edit Job Details"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>
            {fieldLabels[field] || 'Edit Field'}
          </Text>

          {dropdownOptions ? (
            <TouchableOpacity
              style={styles.input}
              onPress={() =>
                navigation.navigate('JobStatusSelector', {
                  selectedId: Number(value),
                  options: jobStatus,
                  onSelect: item => setValue(item.id.toString()),
                })
              }>
              <Text style={{color: value ? 'black' : '#999'}}>
                {jobStatus.find(s => s.id === Number(value))?.name ||
                  `Select ${fieldLabels[field]}`}
              </Text>
            </TouchableOpacity>
          ) : (
            <TextInput
              style={[
                styles.input,
                inputType === 'multiline' && styles.multilineInput,
              ]}
              value={value}
              onChangeText={setValue}
              multiline={inputType === 'multiline'}
              keyboardType={
                inputType === 'numeric'
                  ? Platform.OS === 'ios'
                    ? 'decimal-pad'
                    : 'numeric'
                  : 'default'
              }
              placeholder={`Enter ${fieldLabels[field]}`}
              placeholderTextColor="black"
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleJobFieldUpdate}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditJobFieldScreen;
