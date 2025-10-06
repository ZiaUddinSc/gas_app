import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
// import your dropdown if needed

import {SafeAreaView} from 'react-native-safe-area-context';
import {UpdateCompanySettings} from '../helper/UserHelper';
import {COLORS, SIZES, FONTS, icons, images, illustrations} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import Input from '../components/Input';
import {validate} from 'validate.js';
import {reducer} from '../utils/reducers/formReducers';
import ButtonFilled from '../components/ButtonFilled';

export default function EditRegisteredDetailsScreen({navigation, route}) {
  const {dark} = useTheme();
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
  console.log('company===>', registrationBody);
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

  const inputChangedHandler = (inputId, inputValue) => {
    switch (inputId) {
      case 'gasSafeNo':
        setGasSafeNo(inputValue);
        break;
      case 'registrationNo':
        setRegistrationNo(inputValue);
        break;
      case 'registrationBody':
        setRegistrationBody(inputValue);
        break;
      case 'regBodyLegionella':
        setRegBodyLegionella(inputValue);
        break;
      case 'regNoLegionella':
        setRegNoLegionella(inputValue);
        break;
      default:
        break;
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.arrowLeft}
              resizeMode="contain"
              style={[
                styles.arrowLeftIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.primary,
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            Edit Registered Details
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {renderHeader()}
      <View style={{paddingHorizontal: 10}}>
        <Text style={styles.label}>Gas Safe Registration No</Text>
        <Input
          id="gasSafeNo"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Gas Safe Registration No"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={gasSafeNo}
        />
        <Text style={styles.label}>Registration No</Text>
        <Input
          id="registrationNo"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Registration No"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={registrationNo}
        />
        <Text style={styles.label}>Registration Body For</Text>
        <Input
          id="registrationBody"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Registration Body For"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={registrationBody.toString()}
        />
        {/* Dropdown can be used here */}
        <Text style={styles.label}>
          Registration Body For Legionella Risk Assessment
        </Text>
        <Input
          id="regBodyLegionella"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Registration Body For Legionella Risk Assessment"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={regBodyLegionella}
        />
        <Text style={styles.label}>
          Registration No For Legionella Risk Assessment
        </Text>
        <Input
          id="regNoLegionella"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder=" Registration No For Legionella Risk Assessment"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={regNoLegionella}
        />

        <View style={styles.buttonRow}>
          <ButtonFilled
            onPress={() => navigation.goBack()}
            title={'Cancel'}
            style={{width: '40%'}}
          />
          <ButtonFilled
            onPress={onSave}
            title={'Save'}
            style={{width: '40%', marginLeft: 10}}
          />
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLeftIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.primary,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
    marginLeft: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});