import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './JobModalStyles';
import {GetJobStatus, GetPriorities} from '../../helper/GetApiHelper';

type InputType = 'text' | 'multiline' | 'numeric';

type Option = {
  id: number;
  name: string;
};

type Props = {
  visible: boolean;
  field: string;
  initialValue: string | number;
  inputType?: InputType;
  dropdownOptions?: Option[];
  onClose: () => void;
  onSubmit: (field: string, value: string | number) => void;
};

const fieldLabels: Record<string, string> = {
  description: 'Job Description',
  details: 'Job Details',
  estimated_amount: 'Estimated Amount',
  customer_job_status_id: 'Job Status',
  customer_job_priority_id: 'Job Priority',
  reference_no: 'Reference No',
};

const JobSingleFieldEditModal = ({
  visible,
  field,
  initialValue,
  inputType = 'text',
  dropdownOptions,
  onClose,
  onSubmit,
}: Props) => {
  const [value, setValue] = useState(initialValue?.toString() || '');

  useEffect(() => {
    setValue(initialValue?.toString() || '');
  }, [initialValue]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>{fieldLabels[field] || 'Edit Field'}</Text>

          {dropdownOptions ? (
            <Dropdown
              style={styles.input}
              data={dropdownOptions}
              labelField="name"
              valueField="id"
              value={Number(value)}
              placeholder={`Select ${fieldLabels[field]}`}
              onChange={item => setValue(item.id.toString())}
            />
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
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() =>
                onSubmit(field, dropdownOptions ? Number(value) : value.trim())
              }>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default JobSingleFieldEditModal;
