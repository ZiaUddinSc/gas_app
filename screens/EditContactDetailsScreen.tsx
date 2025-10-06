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

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UpdateCompanySettings} from '../helper/UserHelper';
import {COLORS, SIZES, FONTS, icons, images, illustrations} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import Input from '../components/Input';
import {validate} from 'validate.js';
import {reducer} from '../utils/reducers/formReducers';
import ButtonFilled from '../components/ButtonFilled';

export default function ContactDetailsEditScreen({navigation, route}) {
  const {dark} = useTheme();
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

  const inputChangedHandler = (inputId, inputValue) => {
    switch (inputId) {
      case 'phone':
        setPhone(inputValue);
        break;
      case 'website':
        setWebsite(inputValue);
        break;
      case 'tagline':
        setTagline(inputValue);
        break;
      case 'adminEmail':
        setAdminEmail(inputValue);
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
            Edit Contact Details
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
        <Text style={styles.label}>Phone Number</Text>
        <Input
          id="phone"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Phone Number"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={phone}
        />
        <Text style={styles.label}>Company Website</Text>
        <Input
          id="website"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Company Website"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={website}
        />
        <Text style={styles.label}>Company Tagline</Text>
        <Input
          id="tagline"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Company Tagline"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={tagline}
        />
        <Text style={styles.label}>Admin Email</Text>
        <Input
          id="adminEmail"
          onInputChanged={inputChangedHandler}
          errorText={undefined} // No validation error
          placeholder="Admin Email"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          value={adminEmail}
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