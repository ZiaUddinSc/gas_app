import React, {useState, useEffect} from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';

type Props = {
  visible: boolean;
  field: 'company_name' | 'vat_no';
  initialValue: string;
  onClose: () => void;
  onSubmit: (field: string, value: string) => void;
};

const fieldLabels = {
  company_name: 'Company Name',
  vat_no: 'VAT Number',
};

const SingleFieldEditModal = ({visible, field, initialValue, onClose, onSubmit}: Props) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>{fieldLabels[field]}</Text>

          <TextInput
            style={styles.input}
            value={value}
            placeholder={`Enter ${fieldLabels[field]}`}
            onChangeText={setValue}
          />

        

      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.saveButton}
                          onPress={() => onSubmit(field, value)}>
                          <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={onClose}>
                          <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>



        </View>
      </View>
    </Modal>
  );
};

export default SingleFieldEditModal;
