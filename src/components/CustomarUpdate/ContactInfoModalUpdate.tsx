import React, {useState, useEffect} from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';

type Props = {
  visible: boolean;
  initialValues: {
    id:number,
    mobile: string;
    phone: string;
    email: string;
    other_email: string;
  };
  onClose: () => void;
  onSubmit: (data: Props['initialValues']) => void;
};

const ContactInfoModalUpdate = ({
  visible,
  initialValues,
  onClose,
  onSubmit,
}: Props) => {
  const [form, setForm] = useState(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (key: keyof Props['initialValues'], value: string) => {
    setForm({...form, [key]: value});
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile</Text>
            <TextInput
              style={styles.input}
              value={form.mobile}
              keyboardType="phone-pad"
              onChangeText={val => handleChange('mobile', val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={form.phone}
              keyboardType="phone-pad"
              onChangeText={val => handleChange('phone', val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              keyboardType="email-address"
              onChangeText={val => handleChange('email', val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Other Email</Text>
            <TextInput
              style={styles.input}
              value={form.other_email}
              keyboardType="email-address"
              onChangeText={val => handleChange('other_email', val)}
            />
          </View>
        

            <View style={styles.buttonContainer}>
                            <TouchableOpacity
                              style={styles.saveButton}
                               onPress={() => onSubmit(form)}>
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

export default ContactInfoModalUpdate;
