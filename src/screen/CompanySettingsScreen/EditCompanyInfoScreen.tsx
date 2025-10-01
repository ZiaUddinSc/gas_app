import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
// If you use a dropdown library, import it here
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowLeft} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import {UpdateCompanySettings} from '../../helper/UserHelper';

export default function CompanyInfoEditScreen({navigation, route}) {
  const {company} = route.params;
  const [form, setForm] = useState({
    ...company,
  });
  const [companyName, setCompanyName] = useState(company.company_name || '');
  const [businessType, setBusinessType] = useState(company.business_type || '');
  const [vatNumber, setVatNumber] = useState(company.vat_number || '');
  const [vatRegistered, setVatRegistered] = useState(
    company.vat_registered || false,
  );
  const [displayCompanyName, setDisplayCompanyName] = useState(
    company.display_company_name || false,
  );

  const businessTypeOptions = [
    {label: 'Sole trader', value: 'soleTrader'},
    {label: 'Company', value: 'company'},
    {label: 'Other', value: 'other'},
    // add more as needed
  ];

  const onSave = async () => {
    const payload = {
      company_name: companyName,
      business_type: businessType,
      display_company_name: displayCompanyName ? 1 : 0,
      vat_registered: vatRegistered ? 1 : 0,
      vat_number: vatNumber,

      gas_safe_registration_no: company.gas_safe_registration_no,
      registration_no: company.registration_no,
      register_body_id: company.register_body_id,
      registration_body_for_legionella: company.registration_body_for_legionella,
      registration_body_no_for_legionella: company.registration_body_no_for_legionella,
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
        title="Edit Company Info"
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.card}>
        <Text style={styles.label}>
          Company Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={companyName}
          onChangeText={setCompanyName}
        />

        <Text style={styles.label}>
          Company Business Type <Text style={styles.required}>*</Text>
        </Text>
        <Dropdown
          data={businessTypeOptions}
          labelField="label"
          valueField="value"
          value={businessType}
          style={styles.dropdown}
          placeholder="Select Business Type"
          onChange={item => setBusinessType(item.value)}
        />
        {/* Replace with dropdown if you want */}

        <View style={styles.switchRow}>
          <Text style={styles.label}>VAT Registered</Text>
          <Switch value={vatRegistered} onValueChange={setVatRegistered} />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.label}>
            Display company name on certificates?
          </Text>
          <Switch
            value={displayCompanyName}
            onValueChange={setDisplayCompanyName}
          />
        </View>

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
  required: {color: 'red'},
  input: {
    borderWidth: 1,
    borderColor: '#e4e8ef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  dropdown: {
    borderWidth: 1,
    borderColor: '#e4e8ef',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 48,
    justifyContent: 'center',
  },
});
