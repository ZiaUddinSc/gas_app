import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {

  ArrowLeft,


} from 'lucide-react-native';
import { UpdateCompanySettings } from '../../helper/UserHelper';

export default function BankDetailsEditScreen({navigation, route}) {
  const {company} = route.params;
  const bank = company.company_bank_details || {};

  const [bankName, setBankName] = useState(bank.bank_name || '');
  const [accountName, setAccountName] = useState(bank.name_on_account || '');
  const [sortCode, setSortCode] = useState(bank.sort_code || '');
  const [accountNumber, setAccountNumber] = useState(bank.account_number || '');
  const [paymentTerm, setPaymentTerm] = useState(bank.payment_term || '');

 const onSave = async () => {
    const payload = {
      company_name: company.company_name,
      business_type: company.business_type,
      display_company_name: company.display_company_name,
      vat_registered: company.vat_registered,
      vat_number: company.vat_number,

      gas_safe_registration_no: company.gas_safe_registration_no,
      registration_no: company.registration_no,
      register_body_id: company.register_body_id,
      registration_body_for_legionella:
        company.registration_body_for_legionella,
      registration_body_no_for_legionella:
        company.registration_body_no_for_legionella,

       company_phone: company.company_phone,
      company_web_site: company.company_web_site,
      company_tagline: company.company_tagline,
      company_email: company.company_email,

    company_address_line_1: company.company_address_line_1,
      company_address_line_2: company.company_address_line_2,
      company_city: company.company_city,
      company_state: company.company_state,
      company_postal_code: company.company_postal_code,
      company_country: company.company_country,


      bank_name: bankName,
      name_on_account:accountName,
      account_number: accountNumber,
      sort_code: sortCode,
      payment_term: paymentTerm,
    };

    const res = await UpdateCompanySettings(company.id, payload);
    console.log('res=>>>', res);

    if (res && res.message === 'Company Settings updated successfully') {
      navigation.goBack();
    } else {
      let errorMsg = 'Please try again later.';
      if (res && res.message) {
        errorMsg = res.message;
      }
      Alert.alert('Update Failed', errorMsg);
    }
  };

  return (
     <SafeAreaView>
     <CustomHeader
        fontSize={hp(2.2)}
        title="Edit Bank Details"
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
    <View style={styles.card}>
      <Text style={styles.label}>Bank Name</Text>
      <TextInput
        style={styles.input}
        value={bankName}
        onChangeText={setBankName}
      />

      <Text style={styles.label}>Account Name</Text>
      <TextInput
        style={styles.input}
        value={accountName}
        onChangeText={setAccountName}
      />

      <Text style={styles.label}>Sort Code</Text>
      <TextInput
        style={styles.input}
        value={sortCode}
        onChangeText={setSortCode}
      />

      <Text style={styles.label}>Account Number</Text>
      <TextInput
        style={styles.input}
        value={accountNumber}
        onChangeText={setAccountNumber}
      />

      <Text style={styles.label}>Payment Terms</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={paymentTerm}
        onChangeText={setPaymentTerm}
        multiline={true}
        numberOfLines={3}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    margin: 16,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#475066',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e4e8ef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#f5f8fa',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginRight: 10,
  },
  cancelText: {
    color: '#475066',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#204c5c',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
});
