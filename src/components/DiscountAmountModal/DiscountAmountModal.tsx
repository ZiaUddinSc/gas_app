import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {X, CheckCircle} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DiscountAmountModal = ({visible, onClose, onSave, isVat}) => {
  const [discount, setDiscount] = useState('20');
  const [vat, setVat] = useState('20');
  const handleSave = () => {
    onSave(parseFloat(discount), parseFloat(isVat !== 1 ? vat : '0.00'));
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
            {isVat == 1 ? (
              <View style={{flex: 1, marginRight: wp('2%')}}>
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
    </Modal>
  );
};

export default DiscountAmountModal;

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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: hp('3%'),
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
});
