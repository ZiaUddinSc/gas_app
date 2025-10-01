import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowLeft} from 'lucide-react-native';
import {UpdateCompanySettings} from '../../helper/UserHelper';

export default function ContactDetailsEditScreen({navigation, route}) {
  const {company} = route.params;
  const [phone, setPhone] = useState(company.company_phone || '');
  const [website, setWebsite] = useState(company.company_web_site || '');
  const [tagline, setTagline] = useState(company.company_tagline || '');
  const [adminEmail, setAdminEmail] = useState(company.company_email || '');

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

      company_phone: phone,
      company_web_site: website,
      company_tagline: tagline,
      company_email: adminEmail,

      company_address_line_1: company.company_address_line_1,
      company_address_line_2: company.company_address_line_2,
      company_city: company.company_city,
      company_state: company.company_state,
      company_postal_code: company.company_postal_code,
      company_country: company.company_country,
      bank_name: company.company_bank_details.bank_name,
      name_on_account: company.company_bank_details.bank_name,
      account_number: company.company_bank_details.account_number,
      sort_code: company.company_bank_details.sort_code,
      payment_term: company.company_bank_details.payment_term,
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
        title="Edit Contact Details"
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.card}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
        <Text style={styles.label}>Company Website</Text>
        <TextInput
          style={styles.input}
          value={website}
          onChangeText={setWebsite}
        />
        <Text style={styles.label}>Company Tagline</Text>
        <TextInput
          style={styles.input}
          value={tagline}
          onChangeText={setTagline}
        />
        <Text style={styles.label}>Admin Email</Text>
        <TextInput
          style={styles.input}
          value={adminEmail}
          onChangeText={setAdminEmail}
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
  label: {fontSize: 16, color: '#475066', marginBottom: 6},
  input: {
    borderWidth: 1,
    borderColor: '#e4e8ef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonRow: {flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16},
  cancelButton: {
    backgroundColor: '#f5f8fa',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginRight: 10,
  },
  cancelText: {color: '#475066', fontSize: 16},
  saveButton: {
    backgroundColor: '#204c5c',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  saveText: {color: '#fff', fontSize: 16},
});
