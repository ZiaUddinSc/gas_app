import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonFilled from '../components/ButtonFilled';
import Header from '../components/Header';
import Input from '../components/Input';
import OrSeparator from '../components/OrSeparator';
import SocialButton from '../components/SocialButton';
import {COLORS, SIZES, icons, illustrations} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import {validateInput} from '../utils/actions/formActions';
import {reducer} from '../utils/reducers/formReducers';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import Login from '../screens/Login';
import {UserOTPRegister} from '../helper/AuthHelper';
import Toast from 'react-native-toast-message';
import KeyboardWrapper from '../components/KeyboardWrapper';

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? 'example@gmail.com' : '',
    password: isTestMode ? '**********' : '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

type Nav = {
  navigate: (value: string) => void;
};

const Signup = () => {
  const {navigate} = useNavigation<Nav>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const {colors, dark} = useTheme();
  const [phone, setPhone] = useState('');
  const formatNumber = number => number.replace(/[()]/g, '');

  const handleChange = (text: string) => {
    // Remove all spaces and brackets first
    let clean = text.replace(/[()\s]/g, '');
    // If user clears input → keep it empty
    if (clean.length === 0) {
      setPhone('');
      return;
    }
    // Always make sure it starts with 0
    if (!clean.startsWith('0')) {
      clean = '0' + clean;
    }
    // Format as (0)xxxx... only if more than 1 digit
    if (clean.length > 1) {
      clean = `(0)` + clean.slice(1);
    }

    setPhone(clean);
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error);
    }
  }, [error]);

  // Implementing apple authentication
  const appleAuthHandler = () => {
    console.log('Apple Authentication');
  };

  // Implementing facebook authentication
  const facebookAuthHandler = () => {
    console.log('Facebook Authentication');
  };

  const handleNext = () => {
    const regex = /^(?:07|\(0\)7)\d+$/;
    if (regex.test(phone)) {
      const phoneNo = formatNumber(phone);
      let data = {mobile: phoneNo};
      alert("test")
      UserOTPRegister(data).then(async response => {
        if (response?.success) {
           alert(JSON.stringify(response));
          navigate('registerotpverification', {
            phone: phone,
            data: {otp: response?.otp, user_id: response?.user_id},
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Exists',
            text2: response?.message || 'User already Exists',
            position: 'top',
            visibilityTime: 3000,
          });
        }
      });
    }else{
      Alert.alert("Warning","Invalid Mobile Number")
    }

  };
  // Implementing google authentication
  const googleAuthHandler = () => {
    console.log('Google Authentication');
  };

  return (
    <SafeAreaView
      style={[
        styles.area,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <KeyboardWrapper
        contentContainerStyle={[styles.container, {paddingBottom: 30}]}>
        <View style={styles.titleContainer}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={dark ? illustrations.welcomeDark : illustrations.welcome}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <Text
            style={[
              styles.title,
              {color: dark ? COLORS.white : COLORS.greyscale900},
            ]}>
            Create Your Account
          </Text>
        </View>
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>🇬🇧</Text>
          <Text style={styles.prefix}>+44</Text>
          <TextInput
            style={[styles.input, {color: dark ? COLORS.white : COLORS.black}]}
            placeholder="Enter your phone number"
            placeholderTextColor={COLORS.gray}
            selectionColor="#111"
            value={phone}
            onChangeText={handleChange}
            keyboardType="numeric"
            // autoFocus={true}
          />
        </View>

        <View>
          <ButtonFilled
            title="Next"
            onPress={handleNext}
            style={styles.button}
          />
        </View>
        <TouchableOpacity onPress={() => navigate('login')}>
          <OrSeparator text="or Login With Mobile Number" />
        </TouchableOpacity>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 237,
    height: 200,
    marginBottom: 22,
    marginTop: -22,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginVertical: 32,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Urbanist Bold',
    color: '#212121',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // <--- Add this line
    marginVertical: 18,
    width: '100%',
  },
  checkbox: {
    marginRight: Platform.OS === 'ios' ? 8 : 14,
    height: 16,
    width: 16,
    borderRadius: 4,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  privacy: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.black,
  },
  socialTitle: {
    fontSize: 19.25,
    fontFamily: 'Urbanist Medium',
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 26,
  },

  socialBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    position: 'absolute',
    bottom: 12,
    right: 0,
    left: 0,
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: 'Urbanist Regular',
    color: 'black',
  },
  bottomRight: {
    fontSize: 16,
    fontFamily: 'Urbanist Medium',
    color: COLORS.primary,
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30,
  },
  forgotPasswordBtnText: {
    fontSize: 16,
    fontFamily: 'semiBold',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 12,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 20,
  },
  flag: {
    fontSize: 20,
    marginRight: 6,
  },
  prefix: {
    fontSize: 14,
    color: '#333',
    marginRight: 6,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: '#111',
  },
});

export default Signup;
