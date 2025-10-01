import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {X, CheckCircle, Trash} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const EditDiscountAmountModal = ({
  visible,
  onClose,
  onSave,
  onDelete,
  initialValue,
  isVat,
}) => {
  const [discount, setDiscount] = useState('20');
  const [vat, setVat] = useState('0');
  useEffect(() => {
    if (visible && initialValue !== undefined) {
      setDiscount(String(initialValue?.amount));
      setVat(isVat !== 1 ? String(initialValue?.vat) : '0.00');
    }
  }, [visible, initialValue]);
  const handleSave = () => {
    onSave(parseFloat(discount), parseFloat(vat));
    setDiscount('20');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Discount Amount</Text>
              <Text style={[styles.title, {fontSize: 14, fontWeight: '400'}]}>
                This invoice has £{discount} outstanding.
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#444" />
            </TouchableOpacity>
          </View>

          <View style={styles.rowBetween}>
            <View style={{flex: 1, marginRight: wp('2%')}}>
              <Text style={styles.label}>Discount Amount</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={discount}
                onChangeText={setDiscount}
              />
            </View>
            {isVat !== 1 ? (
              <View style={{flex: 1, marginRight: wp('2%')}}>
                <Text style={styles.label}>Vat</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={isVat !== 1 ? vat : '0.00'}
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
              onPress={() => onDelete()}
              style={styles.dltButton}>
              <Trash color={'#FFF'} size={hp(2)} />
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveText}> Save Discount</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditDiscountAmountModal;

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.2%'),
    fontSize: wp('4%'),
    marginTop: hp('0.5%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: hp('3%'),
  },
  cancelButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: wp('2%'),
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
  dltButton: {
    padding: hp('1.2%'),
    borderRadius: 8,
    backgroundColor: 'red',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
