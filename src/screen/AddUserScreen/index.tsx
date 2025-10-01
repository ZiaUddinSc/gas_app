import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowLeft, ChevronDown} from 'lucide-react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompanyUserStore} from '../../helper/AuthHelper';
import {GetPackages} from '../../helper/GetApiHelper';
import LottieLoader from '../../components/LottieLoader';

interface Error {
  name: any;
  email: any;
  password: any;
  passwordConfirmation: any;
  cardHolderName: any;
  cardNumber: any;
  expiryDate: any;
  cvc: any;
  postalCode: any;
}

const AddUserScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    gasSafeId: '',
    oilRegistrationNumber: '',
    installerRefNo: '',
    subscriptionType: 'monthly',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState<Error>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    postalCode: '',
  });
  const [showFeatures, setShowFeatures] = useState(null);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
    // Clear error when typing
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = 'This field is required';
    if (!formData.email) newErrors.email = 'This field is required';
    if (!formData.password) newErrors.password = 'This field is required';
    if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = 'Passwords do not match';
    }
    if (!formData.cardHolderName)
      newErrors.cardHolderName = 'This field is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'This field is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'This field is required';
    if (!formData.cvc) newErrors.cvc = 'This field is required';
    if (!formData.postalCode) newErrors.postalCode = 'This field is required';

    // ExpiryDate validation
    const exp = formData.expiryDate.replace(/[^0-9]/g, '');
    if (exp.length === 4) {
      const inputMonth = parseInt(exp.substring(0, 2), 10);
      const inputYear = parseInt(exp.substring(2, 4), 10);

      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear() % 100; // YY format

      if (inputMonth < 1 || inputMonth > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (
        inputYear < currentYear ||
        (inputYear === currentYear && inputMonth < currentMonth)
      ) {
        newErrors.expiryDate = 'Expiry date must be in the future';
      }
    } else {
      newErrors.expiryDate = 'Enter valid MM/YY';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildApiPayload = (formData, selectedPricingId, stripeToken) => ({
    pricing_package_id: selectedPricingId,
    name: formData.name,
    email: formData.email,
    password: formData.password,
    password_confirmation: formData.passwordConfirmation,
    gas_safe_id_card: formData.gasSafeId,
    oil_registration_number: formData.oilRegistrationNumber,
    installer_ref_no: formData.installerRefNo,
    token: stripeToken,
    card_holder_name: formData.cardHolderName,
  });

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (validateForm()) {
      const selectedPricingId = formData.subscriptionType === 'monthly' ? 1 : 2;
      const stripeToken = 'pm_card_visa';

      const payload = buildApiPayload(formData, selectedPricingId, stripeToken);

      const response = await CompanyUserStore(payload, token);
      console.log('Response from API:', response);

      if (response?.success !== false) {
        navigation.goBack();
      } else {
        Alert.alert('Error', response.message || 'Failed to submit');
      }
    }
  };

  const handleExpiryDateChange = text => {
    let value = text.replace(/[^\d]/g, '');
    if (value.length >= 2)
      value =
        value.slice(0, 2) + (value.length > 2 ? ' / ' + value.slice(2, 4) : '');

    // Validation
    let errorMsg = '';
    if (value.length === 7) {
      // MM / YY format
      const mmyy = value.replace(/[^0-9]/g, '');
      const inputMonth = parseInt(mmyy.substring(0, 2), 10);
      const inputYear = parseInt(mmyy.substring(2, 4), 10);

      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear() % 100; // YY format

      if (inputMonth < 1 || inputMonth > 12) {
        errorMsg = 'Invalid month';
      } else if (
        inputYear < currentYear ||
        (inputYear === currentYear && inputMonth < currentMonth)
      ) {
        errorMsg = 'Expiry date must be in the future';
      }
    } else if (value.length > 0 && value.length < 7) {
      errorMsg = 'Enter valid MM/YY';
    }

    setFormData({...formData, expiryDate: value});
    setErrors({...errors, expiryDate: errorMsg});
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await GetPackages(); // Replace with actual user ID

      console.log('Packages fetched:', res);
      if (res?.data) {
        setPackages(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  const filteredPackages = packages.filter(
    pkg => pkg.period !== 'Free Trail' && pkg.price > 0,
  );

  // if (loading || !companyDetails) {
  //     return <LottieLoader visible={loading} />;
  //   }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader
          title="Create User"
          fontSize={hp(2.2)}
          leftIcon={<ArrowLeft size={hp(3)} color="white" />}
          onLeftPress={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Personal Information Section */}
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            <InputField
              label="Name *"
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              error={errors.name}
              placeholder="Jhon Deo"
            />
            <InputField
              label="Email *"
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              keyboardType="email-address"
              error={errors.email}
              placeholder="yourname@example.com"
            />
            <InputField
              label="Password *"
              value={formData.password}
              onChangeText={text => handleInputChange('password', text)}
              secureTextEntry
              error={errors.password}
              placeholder="******"
            />
            <InputField
              label="Password Confirmation"
              value={formData.passwordConfirmation}
              onChangeText={text =>
                handleInputChange('passwordConfirmation', text)
              }
              secureTextEntry
              error={errors.passwordConfirmation}
              placeholder={'******'}
            />
          </View>

          {/* Professional Information Section */}
          <Text style={styles.sectionTitle}>Professional Information</Text>
          <View style={styles.card}>
            <InputField
              label="Gas Safe Id Card"
              value={formData.gasSafeId}
              onChangeText={text => handleInputChange('gasSafeId', text)}
              error={undefined}
              placeholder={undefined}
            />
            <InputField
              label="Oil Registration Number"
              value={formData.oilRegistrationNumber}
              onChangeText={text =>
                handleInputChange('oilRegistrationNumber', text)
              }
              error={undefined}
              placeholder={undefined}
            />
            <InputField
              label="Installer Ref No"
              value={formData.installerRefNo}
              onChangeText={text => handleInputChange('installerRefNo', text)}
              error={undefined}
              placeholder={undefined}
            />
          </View>

          {/* Subscription Section */}
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.card}>
            {filteredPackages.length === 0 ? (
              <Text>No subscription packages available.</Text>
            ) : (
              filteredPackages.map(pkg => (
                <TouchableOpacity
                  key={pkg.id}
                  style={[
                    styles.subscriptionOption,
                    formData.subscriptionType === pkg.period.toLowerCase() &&
                      styles.selectedOption,
                    {
                      marginBottom:
                        pkg.title === 'Monthly Subscription' ? wp(3) : 0,
                    },
                  ]}
                  onPress={() =>
                    handleInputChange(
                      'subscriptionType',
                      pkg.period.toLowerCase(),
                    )
                  }>
                  <View style={styles.radioContainer}>
                    <View style={styles.radioOuter}>
                      {formData.subscriptionType ===
                        pkg.period.toLowerCase() && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </View>
                  <View style={styles.subscriptionDetails}>
                    <Text style={styles.subscriptionTitle}>
                      {pkg.title} £{parseFloat(pkg.price).toFixed(2)} /
                      {pkg.period}
                    </Text>
                    <Text style={styles.subscriptionDescription}>
                      {pkg.description}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setShowFeatures(
                          showFeatures === pkg.period.toLowerCase()
                            ? null
                            : pkg.period.toLowerCase(),
                        )
                      }
                      style={styles.featuresButton}>
                      <Text style={styles.featuresButtonText}>
                        MORE FEATURES
                      </Text>
                      <ChevronDown
                        size={hp(2)}
                        color="#007AFF"
                        style={[
                          styles.chevron,
                          showFeatures === pkg.period.toLowerCase() &&
                            styles.rotateChevron,
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Payment Information Section */}
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.card}>
            <InputField
              label="Card Holder Name"
              value={formData.cardHolderName}
              onChangeText={text => handleInputChange('cardHolderName', text)}
              error={errors.cardHolderName}
              placeholder={'Jhon Doe'}
            />
            <InputField
              label="Card Number"
              value={formData.cardNumber}
              onChangeText={text => handleInputChange('cardNumber', text)}
              keyboardType="numeric"
              placeholder="1234 1234 1234 1234"
              error={errors.cardNumber}
            />
            <View style={styles.rowInputs}>
              <View style={[styles.inputContainer, {flex: 2}]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={[styles.input, errors.expiryDate && styles.inputError]}
                  value={formData.expiryDate}
                  onChangeText={handleExpiryDateChange}
                  placeholder="MM / YY"
                  keyboardType="numeric"
                />
                {errors.expiryDate ? (
                  <Text style={styles.errorText}>{errors.expiryDate}</Text>
                ) : null}
              </View>
              <View
                style={[styles.inputContainer, {flex: 1, marginLeft: wp(2)}]}>
                <Text style={styles.label}>CVC</Text>
                <TextInput
                  style={[styles.input, errors.cvc && styles.inputError]}
                  value={formData.cvc}
                  onChangeText={text => handleInputChange('cvc', text)}
                  placeholder="CVC"
                  keyboardType="numeric"
                  secureTextEntry
                />
                {errors.cvc && (
                  <Text style={styles.errorText}>{errors.cvc}</Text>
                )}
              </View>
              <View
                style={[styles.inputContainer, {flex: 2, marginLeft: wp(2)}]}>
                <Text style={styles.label}>Postal Code</Text>
                <TextInput
                  style={[styles.input, errors.postalCode && styles.inputError]}
                  value={formData.postalCode}
                  onChangeText={text => handleInputChange('postalCode', text)}
                  placeholder="G13 TLS"
                />
                {errors.postalCode && (
                  <Text style={styles.errorText}>{errors.postalCode}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSubmit}>
              <Text style={[styles.buttonText, {color: 'white'}]}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const InputField = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  ...props
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...props}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

export default AddUserScreen;
