import React, {useState} from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';

type Props = {
  visible: boolean;
  initialNote: string;
  onClose: () => void;
  onSubmit: (note: string) => void;
};

const NoteEditModal = ({visible, initialNote, onClose, onSubmit}: Props) => {
  const [note, setNote] = useState(initialNote);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Customer Note</Text>
          <TextInput
            style={styles.largeInput}
            placeholder="Enter customer note"
            multiline
            numberOfLines={6}
            value={note}
            onChangeText={setNote}
          />
          


<View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => onSubmit(note)}>
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

export default NoteEditModal;
