import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  X,
  CheckCircle,
  Delete,
  RemoveFormatting,
  DeleteIcon,
  Trash,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const EditInvoiceItemModal = ({
  visible,
  onClose,
  onSave,
  data,
  onDeleteItem,
  isVat,
}) => {
  const [description, setDescription] = useState('');
  const [units, setUnits] = useState('1');
  const [price, setPrice] = useState('0.00');
  const [vat, setVat] = useState('0.00');

  const handleSave = () => {
    if (!description.trim()) return;
    onSave({
      description,
      units: parseInt(units),
      price: parseFloat(price),
      vat: parseFloat(isVat !== 1 ? vat : '0.00'),
    });
    setDescription('');
    setUnits('');
    setPrice('');
  };
  useEffect(() => {
    if (visible && data) {
      setDescription(data.description || '');
      setUnits(data.units?.toString() || '1');
      setPrice(data.price?.toString() || '0.00');
      setVat(data.vat?.toString() || '0.00');
    }
  }, [visible, data]);
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Line Item</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#444" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>
            Description <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.rowBetween}>
            <View style={{flex: 1, marginRight: wp('2%')}}>
              <Text style={styles.label}>Units</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={units}
                onChangeText={setUnits}
              />
            </View>
            <View style={{flex: 1, marginRight: wp('2%')}}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
              />
            </View>
            {isVat !== 1 ? (
              <View style={{flex: 1}}>
                <Text style={styles.label}>Vat</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={vat}
                  onChangeText={setVat}
                />
              </View>
            ) : null}
          </View>

          <View
            style={[
              styles.buttonRow,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: hp(2),
              },
            ]}>
            <TouchableOpacity
              onPress={() => onDeleteItem(data.id)}
              style={styles.dltButton}>
              <Trash color={'#FFF'} size={hp(2)} />
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveText}> Save Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditInvoiceItemModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('5%'),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#1E2A38',
  },
  label: {
    fontSize: wp('4%'),
    marginTop: hp('1.5%'),
    color: '#333',
  },
  required: {
    color: 'red',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: wp('3%'),
    marginTop: hp('0.5%'),
    textAlignVertical: 'top',
    fontSize: wp('4%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.2%'),
    fontSize: wp('4%'),
    marginTop: hp('0.5%'),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: hp('3%')
  },
  cancelButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: wp('2%'),
  },
  dltButton: {
    padding: hp('1.2%'),
    borderRadius: 8,
    backgroundColor: 'red',
  },
  cancelText: {
    fontSize: wp('4%'),
    color: '#333',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0C5D73',
    borderRadius: 8,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
  },
  saveText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: '500',
  },
});
