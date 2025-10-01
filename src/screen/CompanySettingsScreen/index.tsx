import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Pencil,
  ArrowLeft,
  User,
  Briefcase,
  Hash,
  Phone,
  Globe,
  Type,
  Mail,
  MapPin,
  Calendar,
  Image as ImageIcon,
  PiggyBank,
  Vault,
  SwitchCamera,
} from 'lucide-react-native';
import {useFocusEffect} from '@react-navigation/native';
import Color from '../../theme/Colors';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
import {GetCompanyDetails, GetSingleUser} from '../../helper/GetApiHelper';
import LottieLoader from '../../components/LottieLoader';
const iconColor = '#009688';

const CompanySettingsScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState();
  const [companyDetails, setCompanyDetails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      setUserInfo(JSON.parse(userInfoString));
    };
    fetchUserInfo();
  }, []);




    useFocusEffect(
    React.useCallback(() => {
      if (userInfo?.id) {
      fetchCompanyDetails();
    }
    }, [userInfo])
  );

  const fetchCompanyDetails = async () => {
    if (!userInfo?.id) return;
    setLoading(true);
    try {
      const res = await GetSingleUser(userInfo?.id); // Replace with actual user ID

      if (res.success) {
        const resCompanyDetails = await GetCompanyDetails(
          res.data.companies[0].id,
        );
        console.log('setCompanyDetails', resCompanyDetails.data);
        setCompanyDetails(resCompanyDetails.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };
  if (loading || !companyDetails) {
    return <LottieLoader visible={loading} />;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        fontSize={hp(2.2)}
        title="Company Settings"
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Company Information Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Company Information</Text>
              {/* <TouchableOpacity style={styles.editButton}>
                <Pencil size={wp('5%')} color={Color.primary} />
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditCompanyInfo', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <User size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Name</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.company_name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditCompanyInfo', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Briefcase
                  size={wp('4%')}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={styles.labelText}>Business Type</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.business_type}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditCompanyInfo', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Vault size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Vat Registered</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.vat_registered
                  ? companyDetails?.company?.vat_registered
                  : 'Not Registered for VAT'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditCompanyInfo', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <SwitchCamera
                  size={wp('4%')}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={styles.labelText}>
                  Display company name on certificates?
                </Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.display_company_name === 0
                  ? 'No'
                  : 'Yes'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Registered Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Registered Details</Text>
              {/* <TouchableOpacity style={styles.editButton}>
                <Pencil size={wp('5%')} color={Color.primary} />
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditRegisteredDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Hash size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Gas Safe Registration No</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.gas_safe_registration_no || 'N/A'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditRegisteredDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <User size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Registration No</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.registration_no || 'N/A'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditRegisteredDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <User size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Registration Body For</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.register_body_id || 'N/A'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditRegisteredDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <User size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>
                  Registration Body For Legionella Risk Assessment
                </Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.registration_body_for_legionella ||
                  'N/A'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditRegisteredDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Hash size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>
                  Registration No For Legionella Risk Assessment
                </Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.registration_body_no_for_legionella ||
                  'N/A'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contact Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Contact Details</Text>
              {/* <TouchableOpacity style={styles.editButton}>
                <Pencil size={wp('5%')} color={Color.primary} />
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditContactDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Phone size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Phone Number</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.company_phone || 'N/A'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditContactDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Globe size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Company Website</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.company_web_site || 'N/A'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditContactDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Type size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Company Tagline</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.company_tagline || 'N/A'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditContactDetails', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Mail size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Admin Email</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.company_email || 'N/A'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Company Address Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Company Address</Text>
              {/* <TouchableOpacity style={styles.editButton}>
                <Pencil size={wp('5%')} color={Color.primary} />
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('EditCompanyAddress', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <MapPin size={wp('4%')} color={iconColor} style={styles.icon} />
                <Text style={styles.labelText}>Address</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.full_address || 'N/A'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Payment Term & Bank Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Payment Term & Bank Details
              </Text>
              {/* <TouchableOpacity style={styles.editButton}>
                <Pencil size={wp('5%')} color={Color.primary} />
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('BankDetailsEdit', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <PiggyBank
                  size={wp('4%')}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={styles.labelText}>Bank Details</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.company_bank_details.bank_name}
                {', '}
                {companyDetails?.company?.company_bank_details.name_on_account}
                {', '}
                {companyDetails?.company?.company_bank_details.account_number}
                {', '}
                {companyDetails?.company?.company_bank_details.sort_code}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                navigation.navigate('BankDetailsEdit', {
                  company: companyDetails.company,
                })
              }>
              <View style={styles.labelContainer}>
                <Calendar
                  size={wp('4%')}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={styles.labelText}>Payment Terms</Text>
              </View>
              <Text style={styles.value}>
                {companyDetails?.company?.company_bank_details.payment_term}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Company Logo Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Company Logo</Text>
              <TouchableOpacity style={styles.editButton}>
                <Pencil size={wp('5%')} color={Color.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              {companyDetails?.company?.company_logo ? (
                <Image
                  source={{uri: companyDetails?.company?.logo_url}}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require('../../assets/gas_safe_register.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CompanySettingsScreen;
