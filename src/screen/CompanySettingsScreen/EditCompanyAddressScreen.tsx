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
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowLeft} from 'lucide-react-native';
import { UpdateCompanySettings } from '../../helper/UserHelper';

export default function EditCompanyAddressScreen({navigation, route}) {
  const {company} = route.params;

  const [lookup, setLookup] = useState('');
  const [addressLine1, setAddressLine1] = useState(
    company.address_line_1 || '',
  );
  const [addressLine2, setAddressLine2] = useState(
    company.address_line_2 || '',
  );
  const [city, setCity] = useState(company.city || '');
  const [region, setRegion] = useState(company.region || '');
  const [postcode, setPostcode] = useState(company.post_code || '');
  const [state, setState] = useState(company.state || '');

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

      company_address_line_1: addressLine1,
      company_address_line_2: addressLine2,
      company_city: city,
      company_state: state,
      company_postal_code: postcode,
      company_country: region,


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

    // onSelectAddress callback function to update state with selected address data
  const onSelectAddress = data => {
    setAddressLine1(data.address_line_1);
    setAddressLine2(data.address_line_2);
    setCity(data.city);
    setRegion(data.country); 
    setPostcode(data.postal_code);
    setState(data.state)
  };
  
  // The display value for the address lookup field
  const displayAddress = addressLine1
    ? `${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}${
        city ? ', ' + city : ''
      }${region ? ', ' + region : ''}`
    : 'Select Address Lookup';

  return (
    <SafeAreaView>
      <CustomHeader
        fontSize={hp(2.2)}
        title="Edit Company Address"
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.card}>
        <Text style={styles.label}>Address Lookup</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddressAdd', { onSelectAddress });
          }}
          style={styles.input}>
          <Text
            style={[
             
              displayAddress === 'Select Address Lookup' && styles.placeholderText,
            ]}>
            {displayAddress}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Address Line 1 <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={addressLine1}
          onChangeText={setAddressLine1}
        />
        <Text style={styles.label}>
          Address Line 2 <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={addressLine2}
          onChangeText={setAddressLine2}
        />
        <Text style={styles.label}>
          Town/City <Text style={styles.required}>*</Text>
        </Text>
        <TextInput style={styles.input} value={city} onChangeText={setCity} />
        <Text style={styles.label}>Region/County</Text>
        <TextInput
          style={styles.input}
          value={region}
          onChangeText={setRegion}
        />
        <Text style={styles.label}>
          Post Code <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={postcode}
          onChangeText={setPostcode}
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
  required: {color: 'red'},
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
  placeholderText: {color: '#000', fontSize: 16},
 
});
