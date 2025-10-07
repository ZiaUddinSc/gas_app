import React, {useState, useReducer, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  Image,
} from 'react-native';
// If you use a dropdown library, import it here
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dropdown} from 'react-native-element-dropdown';
import {UpdateCompanySettings} from '../helper/UserHelper';
import {COLORS, SIZES, FONTS, icons, images, illustrations} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import Input from '../components/Input';
import {validate} from 'validate.js';
import {reducer} from '../utils/reducers/formReducers';
import ButtonFilled from '../components/ButtonFilled';

export default function CompanyInfoEditScreen({navigation, route}) {
  const {company} = route.params;
  const [form, setForm] = useState({
    ...company,
  });

  const {dark} = useTheme();
  const [companyName, setCompanyName] = useState(company.company_name || '');
  const [businessType, setBusinessType] = useState(company.business_type || '');
  const [vatNumber, setVatNumber] = useState(company.vat_number || '');
  const [vatRegistered, setVatRegistered] = useState(
    company.vat_registered || false,
  );
  const [displayCompanyName, setDisplayCompanyName] = useState(
    company.display_company_name === 1 ? true : false,
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
      company_registration: vatNumber,

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
      case 'company_name':
        setCompanyName(inputValue);
        break;
      case 'vat_number':
        setVatNumber(inputValue);
        break;
      default:
        break;
    }
  };

  const handleBusinessTypeChange = item => {
    setBusinessType(item.value);
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
            Edit Company Info
          </Text>
        </View>
        {/* <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => onHandleBellIcon()}>
              <Image
                source={icons.bell}
                resizeMode="contain"
                style={[
                  styles.searchIcon,
                  {
                    tintColor: autoReminder === 1 ? 'green' : 'red',
                  },
                ]}
              />
            </TouchableOpacity>
            <Text
              style={{fontSize: 10, color: dark ? COLORS.white : COLORS.black}}>
              {autoReminder === 1 ? 'On' : 'Off'}
            </Text>
          </View> */}
      </View>
    );
  };

  return (
    <SafeAreaView>
      {renderHeader()}
      <View style={{paddingHorizontal: 10}}>
        <Text style={styles.label}>
          Company Name <Text style={styles.required}>*</Text>
        </Text>

        <Input
          id="company_name"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Company Name"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={companyName}
        />

        <Text style={styles.label}>
          Company Business Type <Text style={styles.required}>*</Text>
        </Text>
        {/* <Dropdown
          data={businessTypeOptions}
          labelField="label"
          valueField="value"
          value={businessType}
          style={styles.dropdown}
          placeholder="Select Business Type"
          onChange={item => setBusinessType(item.value)}
        /> */}
        <Dropdown
          data={businessTypeOptions}
          labelField="label"
          valueField="value"
          value={businessType}
          style={[
            styles.dropdown,
            {backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500},
          ]}
          placeholder="Select Business Type"
          onChange={handleBusinessTypeChange}
        />
        {/* Replace with dropdown if you want */}

        <View style={styles.switchRow}>
          <Text style={styles.label}>VAT Registered</Text>
          <Switch
            value={company.vat_registered != '' ? true : false}
            thumbColor={company.vat_registered != '' ? 'green' : 'red'}
            onValueChange={setVatRegistered}
          />
        </View>

        {company.vat_registered != '' ? (
          <>
            <Text style={styles.label}>VAT Number</Text>
            <Input
              id="vat_number"
              onInputChanged={inputChangedHandler}
              errorText={undefined} // No validation error
              placeholder="VAT Number"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={vatNumber}
            />
          </>
        ) : null}

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
          {/* <ButtonFilled
            onPress={() => navigation.goBack()}
            title={'Cancel'}
            style={{width: '40%'}}
          /> */}
          <ButtonFilled
            onPress={onSave}
            title={'Save'}
            style={{width: '95%'}}
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
  buttonRow: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 16,
  },
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

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
  },
  headerLeft: {
    padding:16,
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
