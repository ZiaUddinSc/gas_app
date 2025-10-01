import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const QuoteCustomerNoteAdd = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialNote = route.params?.note || '';
  const onSave = route.params?.onSave;

  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialNote) {
      setNote(initialNote);
    }
  }, [initialNote]);

  const handleSave = () => {
    if (onSave) {
      onSave(note);
    }
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Customer Note"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={handleCancel}
      />

<View style={{padding:wp(6)}}>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Note for Customer</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={6}
          placeholder="Type your note here..."
          value={note}
          onChangeText={setNote}
        />
      </View>


      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save Note</Text>
        </TouchableOpacity>
      </View>
    </View>
          </View>
  );
};

export default QuoteCustomerNoteAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  inputSection: {
    marginTop: hp(2),
  },
  label: {
    fontSize: wp(4.2),
    fontWeight: '500',
    marginBottom: hp(1),
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: wp(3),
    textAlignVertical: 'top',
    fontSize: wp(4),
    minHeight: hp(20),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  cancelButton: {
    backgroundColor: '#eee',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(5),
    borderRadius: 6,
  },
  cancelText: {
    color: '#333',
    fontSize: wp(4),
  },
  saveButton: {
    backgroundColor: '#0C5D73',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(5),
    borderRadius: 6,
  },
  saveText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '500',
  },
});
