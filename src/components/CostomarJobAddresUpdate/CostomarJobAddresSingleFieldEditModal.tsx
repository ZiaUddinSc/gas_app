import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './AddressModalStyles';

type Props = {
  visible: boolean;
  field: string;
  initialValue: string;
  onClose: () => void;
  onSubmit: (field: string, value: string) => void;
};

const fieldLabels: Record<string, string> = {
  note: 'Note',
  occupant_name: 'Occupant Name',
  occupant_email: 'Occupant Email',
  occupant_phone: 'Occupant Phone',
  due_date: 'Due Date',
};

const CostomarJobAddresSingleFieldEditModal = ({
  visible,
  field,
  initialValue,
  onClose,
  onSubmit,
}: Props) => {
  const [value, setValue] = useState(initialValue || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0]; // format: YYYY-MM-DD
      setValue(isoDate);
    }
  };

  const isDateField = field === 'due_date';
  const isMultiline = field === 'note';

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>{fieldLabels[field] || 'Edit Field'}</Text>

          {isDateField ? (
            <>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={styles.dateBox}>
                <Text style={styles.dateText}>{value || 'Select a date'}</Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </>
          ) : (
            <TextInput
              style={[styles.input, isMultiline && styles.multilineInput]}
              value={value}
              onChangeText={setValue}
              multiline={isMultiline}
              placeholder={`Enter ${fieldLabels[field]}`}
              keyboardType={
                field === 'occupant_email'
                  ? 'email-address'
                  : field === 'occupant_phone'
                  ? 'phone-pad'
                  : 'default'
              }
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onSubmit(field, value.trim())}>
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

export default CostomarJobAddresSingleFieldEditModal;
