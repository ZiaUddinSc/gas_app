import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LogoSvg from '../../components/LogoSvg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  EyeIcon,
  EyeClosed,
  EyeOff,
  ArrowLeft,
  CheckSquare,
  Square,
} from 'lucide-react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {UserSignUp} from '../../helper/AuthHelper';
import Toast from 'react-native-toast-message';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import IconButton from '../../components/IconButton';

export default function Index() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [agree, setAgree] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [hideConfPass, setHideConfPass] = useState(true);

  //Form Validation Using Formik nad Yum
  const validationSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required').label('Name'),
    name: Yup.string().required('The  name field is required.'),
    email: Yup.string()
      .email('Please enter valid email')
      .required('The email field is required.')
      .label('Email'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('The password field is required.')
      .label('Password'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
      .label('Password Confirmation'),
    terms: Yup.boolean().oneOf(
      [true],
      'You must accept the terms and conditions',
    ),
  });

  const checkBoxChanged = () => {
    setAgree(!agree);
  };
  const handleFormSubmit = (values: any) => {
    UserSignUp(values).then(async data => {
      if (data.success) {
        Toast.show({
          type: 'success',
          text2: data?.message || 'Registration successful!',
          position: 'top',
          visibilityTime: 3000,
        });
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
        navigation.navigate('CompanyInformationForm',{token: data.token,user: data.user});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data?.message || 'Invalid credentials',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.content}>
      <ScrollView>
        <CustomHeader
          title="Sign Up"
          fontSize={hp(2.2)}
          leftIcon={<ArrowLeft size={24} color="white" />}
          onLeftPress={() => navigation.navigate('Login')}
        />
        <View style={styles.container}>
          <View style={styles.loginBody}>
            <View>
              <Text style={styles.textHeader}>Sign Up</Text>
            </View>
            {/* <View style={styles.signupSection}>
            <Text style={styles.dontAcountText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.singUp}>Sign In</Text>
            </TouchableOpacity>
          </View> */}
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                referral_code: '',
                terms: false,
              }}
              onSubmit={values => handleFormSubmit(values)}
              validationSchema={validationSchema}>
              {({
                setFieldValue,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <Text style={styles.inputLabel}>Full Name*</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="David Peterson"
                      placeholderTextColor="#AFAFAF"
                      onChangeText={text => setFieldValue('name', text)}
                      onBlur={() => setFieldValue('name', values.name)}
                      value={values.name}
                    />
                  </View>
                  {errors.name && touched.name && (
                    <Text style={styles.errorMessage}>{errors.name}</Text>
                  )}
                  <Text style={styles.inputLabel}>Email*</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="username@example.com"
                      placeholderTextColor="#AFAFAF"
                      onChangeText={text => setFieldValue('email', text)}
                      onBlur={() => setFieldValue('email', values.email)}
                      value={values.email}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                  <Text style={styles.inputLabel}>Password*</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="************"
                      placeholderTextColor="#AFAFAF"
                      secureTextEntry={hidePass}
                      onChangeText={text => setFieldValue('password', text)}
                      onBlur={() => setFieldValue('password', values.password)}
                      value={values.password}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 20,
                      }}
                      onPress={() => setHidePass(!hidePass)}>
                      {hidePass ? (
                        <EyeOff color={'#AFAFAF'} size={20} />
                      ) : (
                        <EyeIcon color={'#AFAFAF'} size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                  <Text style={styles.inputLabel}>Password Confirmation*</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="************"
                      placeholderTextColor="#AFAFAF"
                      secureTextEntry={hideConfPass}
                      onChangeText={text =>
                        setFieldValue('password_confirmation', text)
                      }
                      onBlur={() =>
                        setFieldValue(
                          'password_confirmation',
                          values.password_confirmation,
                        )
                      }
                      value={values.password_confirmation}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 20,
                      }}
                      onPress={() => setHideConfPass(!hideConfPass)}>
                      {hideConfPass ? (
                        <EyeOff color={'#AFAFAF'} size={20} />
                      ) : (
                        <EyeIcon color={'#AFAFAF'} size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errors.password_confirmation &&
                    touched.password_confirmation && (
                      <Text style={styles.errorMessage}>
                        {errors.password_confirmation}
                      </Text>
                    )}

                  <Text style={styles.inputLabel}>Referral Code(optonal)</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholderTextColor="#AFAFAF"
                      onChangeText={text =>
                        setFieldValue('referral_code', text)
                      }
                      onBlur={() =>
                        setFieldValue('referral_code', values.referral_code)
                      }
                      value={values.referral_code}
                    />
                  </View>
                  <View>
                    <View
                      style={[
                        styles.actions,
                        {marginLeft: 15, justifyContent: 'flex-start'},
                      ]}>
                      {/* <TouchableOpacity
                        onPress={() => setFieldValue('terms', !values.terms)}
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {values.terms ? (
                          <CheckSquare color="#FFFFFF" size={20} />
                        ) : (
                          <Square color="#FFFFFF" size={20} />
                        )}

                       
                      </TouchableOpacity>
                       <Text
                          style={[
                            styles.forgot,
                            {fontWeight: '700', marginTop: 0, paddingLeft: 5},
                          ]}>
                          I agree to the Terms & Conditions and Privacy Policy.
                        </Text> */}
                      <Switch
                        trackColor={{false: '#767577', true: '#FFFFFF'}}
                        thumbColor={values.terms ? '#007969ff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() =>
                          setFieldValue('terms', !values.terms)
                        }
                        value={values.terms}
                      />
                      <Text
                        style={[
                          styles.forgot,
                        
                        ]}>
                        I agree to the Terms & Conditions and Privacy Policy.
                      </Text>
                    </View>
                    <View style={{marginLeft: 15}}>
                      {touched.terms && errors.terms && (
                        <Text style={{color: 'red'}}>{errors.terms}</Text>
                      )}
                    </View>
                    <View style={styles.actions}>
                      {/* <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'flex-start',
                        }}
                        onPress={() => setFieldValue('terms', !values.terms)}
                        >
                        <CheckBox
                          value={values.terms || false}
                          onValueChange={(newValue) => setFieldValue('terms',newValue)}
                          tintColors={{ true: '#FFFFFF', false: '#FFFFFF' }}
                        />
                        <Text style={styles.forgot}>I agree to the </Text>
                      </TouchableOpacity> */}
                      {/* <TouchableOpacity>
                        <Text style={[styles.forgot, {fontWeight: '700'}]}>
                          Terms & Conditions and Privacy Policy.
                        </Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={e => handleSubmit()}>
                    <Text style={styles.loginText}>Register Now</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            <View style={styles.row}>
              <View style={styles.line} />
              <Text style={styles.or}>Already have an account?</Text>
              <View style={styles.line} />
            </View>
            <IconButton
              title="Sign in"
              onPress={() => navigation.navigate('Login')}
              icon={undefined}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
