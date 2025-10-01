import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../../components/IconButton';
import {UserLogin} from '../../helper/AuthHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
export default function Index() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [rememberMe, setRememberMe] = useState(false);

  //Form Validation Using Formik nad Yum
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email')
      .required('The email field is required.')
      .label('Email'),
    password: Yup.string()
      .required('The password field is required.')
      .label('Password'),
  });
  const handleFormSubmit = (values: any) => {
    // Handle form submission logic here
    //  Alert.alert(JSON.stringify(values))

    UserLogin(values).then(async data => {
      if (data.user.first_login === 1) {
        navigation.navigate('CompanyInformationForm',{token: data.token,user: data.user});
      } else if (data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
        navigation.replace('Dashboard');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data?.message || 'Invalid credentials',
          position: 'top',
          visibilityTime: 3000,
        });
      }
      // if (data.token) {
      //   // Save token and user to AsyncStorage
      //   await AsyncStorage.setItem('userToken', data.token);
      //   await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
      //   navigation.replace('Dashboard');
      // } else {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Login Failed',
      //     text2: data?.message || 'Invalid credentials',
      //     position: 'top',
      //     visibilityTime: 3000,
      //   });
      // }
    });
  };

  return (
    <View style={styles.content}>
      <ScrollView>
        {/* <CustomHeader
        title=""
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.navigate("WelcomeScreen")}     /> */}
        <View style={styles.container}>
          {/* <LogoSvg height={100} width={100}/> */}
          <Image
            source={require('../../assets/full_logo.png')}
            style={{
              height: 100,
              width: 150,
              resizeMode: 'cover',
              marginBottom: 20,
            }}
          />
          <View style={styles.loginBody}>
            <View>
              <Text style={styles.textHeader}>Sign In</Text>
            </View>
            {/* <View style={styles.signupSection}>
            
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.singUp}>Sign Up</Text>
            </TouchableOpacity>
          </View> */}
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={values => handleFormSubmit(values)}
              validationSchema={validationSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <CustomInput
                    label="Email*"
                    placeholder="username@example.com"
                    placeHolerTextColor="#AFAFAF"
                    handleChange={handleChange('email')}
                    handleBlur={handleBlur('email')}
                    value={values.email}
                    secureTextEntry={false}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                  <CustomInput
                    label="Password*"
                    placeholder="************"
                    placeHolerTextColor="#AFAFAF"
                    handleChange={handleChange('password')}
                    handleBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                  <View>
                    <View style={styles.actions}>
                      <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[styles.loginBtn, {opacity: isValid ? 1 : 0.5}]}
                    disabled={!isValid}
                    onPress={() => {
                      handleSubmit(); // This should call your form submit
                      handleFormSubmit(values);
                    }}>
                    <Text style={styles.loginText}>LOGIN</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            <View style={styles.row}>
              <View style={styles.line} />
              <Text style={styles.or}>Don't have an account?</Text>
              <View style={styles.line} />
            </View>
            <IconButton
              title="Sign Up"
              onPress={() => navigation.navigate('SignUp')}
              icon={undefined}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
