import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';


type Props = {
  visible: boolean;
  initialValue: number;
  onClose: () => void;
  onSubmit: (value: number) => void;
};

const AutoReminderUpdateModal = ({
  visible,
  initialValue,
  onClose,
  onSubmit,
}: Props) => {
  const [selected, setSelected] = useState(initialValue);
const options = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 2 },
];
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Auto Reminder</Text>

          {options.map(item => (
  <TouchableOpacity
    key={item.value}
    onPress={() => setSelected(item.value)}
    style={styles.radioRow}>
    <View
      style={[
        styles.radioCircle,
        selected === item.value && styles.radioSelected,
      ]}
    />
    <Text style={styles.radioLabel}>{item.label}</Text>
  </TouchableOpacity>
))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onSubmit(selected)}>
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

export default AutoReminderUpdateModal;
