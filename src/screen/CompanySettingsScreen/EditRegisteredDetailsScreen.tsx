import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
// import your dropdown if needed
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowLeft} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {UpdateCompanySettings} from '../../helper/UserHelper';

export default function EditRegisteredDetailsScreen({navigation, route}) {
  const {company} = route.params;
  const [gasSafeNo, setGasSafeNo] = useState(
    company.gas_safe_registration_no || '',
  );
  const [registrationNo, setRegistrationNo] = useState(
    company.registration_no || '',
  );
  const [registrationBody, setRegistrationBody] = useState(
    company.register_body_id || '',
  );
  const [regBodyLegionella, setRegBodyLegionella] = useState(
    company.registration_body_for_legionella || '',
  );
  const [regNoLegionella, setRegNoLegionella] = useState(
    company.registration_body_no_for_legionella || '',
  );

  const onSave = async () => {
    const payload = {
      company_name: company.company_name,
      business_type: company.business_type,
      display_company_name: company.display_company_name,
      vat_registered: company.vat_registered,
      vat_number: company.vat_number,

      gas_safe_registration_no: gasSafeNo,
      registration_no: registrationNo,
      register_body_id: registrationBody,
      registration_body_for_legionella: regBodyLegionella,
      registration_body_no_for_legionella: regNoLegionella,
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
        title="Edit Registered Details"
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.card}>
        <Text style={styles.label}>Gas Safe Registration No</Text>
        <TextInput
          style={styles.input}
          value={gasSafeNo}
          onChangeText={setGasSafeNo}
        />
        <Text style={styles.label}>Registration No</Text>
        <TextInput
          style={styles.input}
          value={registrationNo}
          onChangeText={setRegistrationNo}
        />
        <Text style={styles.label}>Registration Body For</Text>
        <TextInput
          style={styles.input}
          value={registrationBody}
          onChangeText={setRegistrationBody}
        />
        {/* Dropdown can be used here */}
        <Text style={styles.label}>
          Registration Body For Legionella Risk Assessment
        </Text>
        <TextInput
          style={styles.input}
          value={regBodyLegionella}
          onChangeText={setRegBodyLegionella}
        />
        <Text style={styles.label}>
          Registration No For Legionella Risk Assessment
        </Text>
        <TextInput
          style={styles.input}
          value={regNoLegionella}
          onChangeText={setRegNoLegionella}
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
