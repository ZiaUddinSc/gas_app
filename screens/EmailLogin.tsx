import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useRef,
} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
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
import {UserLogin} from '../helper/AuthHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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

const EmailLogin = () => {
  const {navigate} = useNavigation<Nav>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [isChecked, setChecked] = useState(false);
  const {colors, dark} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);

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

  // Implementing apple authentication
  const appleAuthHandler = () => {
    console.log('Apple Authentication');
  };

  // Implementing facebook authentication
  const facebookAuthHandler = () => {
    console.log('Facebook Authentication');
  };

  const handleLogin = () => {
    const email = formState.inputValues.email;
    const password = formState.inputValues.password;
    if (formState.formIsValid) {
      let loginValues = {
        email: email,
        password: password,
      };

      UserLogin(loginValues).then(async response => {
        if (response?.success) {
          let data = response?.data;
          if (data.user.first_login === 1) {
            navigate('(tabs)');
            // navigate('CompanyInformationForm',{token: data.token,user: data.user});
          } else if (data.token) {
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
            navigate('(tabs)');
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: response?.message || 'Invalid credentials',
            position: 'top',
            visibilityTime: 3000,
          });
        }
      });
    }
  };
  // Implementing google authentication
  const googleAuthHandler = () => {
    console.log('Google Authentication');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Scroll to bottom when keyboard appears
        scrollViewRef.current?.scrollToEnd({animated: true});
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Scroll back to top when keyboard hides
        scrollViewRef.current?.scrollTo({y: 0, animated: true});
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <KeyboardWrapper
      contentContainerStyle={[styles.container, {paddingBottom: 30}]}
      >
       
          <View style={styles.titleContainer}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  dark ? illustrations.welcomeDark : illustrations.welcome
                }
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
            <Text
              style={[
                styles.title,
                {color: dark ? COLORS.white : COLORS.greyscale900},
              ]}>
              Login to your account
            </Text>
          </View>

          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['email']}
            placeholder="Email"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.email}
            keyboardType="email-address"
          />
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['password']}
            autoCapitalize="none"
            id="password"
            placeholder="Password"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.padlock}
            secureTextEntry={true}
          />
          <View style={styles.checkBoxContainer}>
            <CheckBox
              style={styles.checkbox}
              value={isChecked}
              boxType="square"
              onTintColor={isChecked ? COLORS.primary : 'gray'}
              onFillColor={isChecked ? COLORS.primary : 'gray'}
              onCheckColor={COLORS.white}
              onValueChange={setChecked}
              tintColors={{true: COLORS.primary, false: 'gray'}}
            />
            <Text
              style={[
                styles.privacy,
                {
                  color: dark ? COLORS.white : COLORS.black,
                },
              ]}>
              Remenber me
            </Text>
          </View>
          <View style={styles.floatingButtonContainer}>
          <ButtonFilled
            title="Login"
            onPress={handleLogin}
            style={styles.button}
          />
          </View>
          
          <TouchableOpacity onPress={() => navigate('forgotpasswordmethods')}>
            <Text
              style={[
                styles.forgotPasswordBtnText,
                {
                  color: dark ? COLORS.black : COLORS.primary,
                },
              ]}>
              Forgot the password?
            </Text>
          </TouchableOpacity>
          
            <TouchableOpacity onPress={() => navigate('login')}>
              <OrSeparator text="or Login With Mobile Number" />
            </TouchableOpacity>
          
       
        <View style={styles.bottomContainer}>
          <Text
            style={[
              styles.bottomLeft,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}>
            Don&apos;t have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigate('signup')}>
            <Text
              style={[
                styles.bottomRight,
                {
                  color: dark ? COLORS.white : COLORS.primary,
                },
              ]}>
              {'  '}Sign Up
            </Text>
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
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
    fontSize: 20,
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
    // alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 18,
    position: 'absolute',
    bottom: 0,
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
  floatingButtonContainer: {
    // position: 'absolute',
    // bottom: Platform.OS === 'ios' ? 20 : 10,
    // left: 16,
    // right: 16,
    zIndex: 1000,
  },
});

export default EmailLogin;
