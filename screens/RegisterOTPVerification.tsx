import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {COLORS} from '../constants';
import {OtpInput} from 'react-native-otp-entry';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';
import {useNavigation} from '@react-navigation/native';
import {UserOTPVerify} from '../helper/AuthHelper';
import {formatTime} from '../helper/customMethods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {UserRegisterOTPVerify} from '../helper/AuthHelper';

type Nav = {
  navigate: (value: string) => void;
};
const formatNumber = number => number.replace(/[()]/g, '');

const RegisterOTPVerification = ({route}) => {
  const {navigate} = useNavigation<Nav>();
  const [time, setTime] = useState(179);
  const {colors, dark} = useTheme();
  const {phone, data} = route.params; // receive phone number
  const [otp, setOtp] = useState('');

  const maskedPhone = phone.slice(0, -2).replace(/\d/g, '*') + phone.slice(-2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //Verify OTP
  const verfifyOTP = () => {
    const phoneNo = formatNumber(phone);
    let new_data = {
      otp: otp,
      mobile: phoneNo,
    };
    UserRegisterOTPVerify(new_data).then(async response => {
      if (response?.success) {
        // alert(JSON.stringify(response))
        navigate('fillyourprofile2', {
          phone: phone,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'OTP Verification Failed',
          text2: response?.message || 'Invalid credentials',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    });
  };

  const handleResend = () => {
    console.log('Resend OTP');
    setTime(179); // reset timer
    // Call API to resend OTP here
  };

  //Verify OTP

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Verify OTP" />
        <ScrollView contentContainerStyle={styles.center}>
          {/* <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Verify Your Phone Number</Text> */}
          <Text
            style={[
              styles.title,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}>
            Code has been send to +44{phone}
          </Text>
          <OtpInput
            numberOfDigits={4}
            onTextChange={text => setOtp(text)}
            focusColor={COLORS.primary}
            focusStickBlinkingDuration={500}
            onFilled={text => console.log(`OTP is ${text}`)}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite,
                borderColor: dark ? COLORS.gray : COLORS.secondaryWhite,
                borderWidth: 0.4,
                borderRadius: 10,
                height: 58,
                width: 58,
              },
              pinCodeTextStyle: {
                color: dark ? COLORS.white : COLORS.black,
              },
            }}
          />
          <TouchableOpacity
            style={styles.codeContainer}
            onPress={() => handleResend()}
            disabled={time > 0} // disabled while timer > 0
          >
            <Text
              style={[
                styles.code,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              {time ? 'Resend code in' : 'Resend OTP'}
            </Text>
            {time > 0 ? (
              <Text style={styles.time}>{`  ${formatTime(time)}  `}</Text>
            ) : null}
          </TouchableOpacity>
          {/* <TouchableOpacity
                            style={[styles.button, !canResend && styles.disabledButton]}
                            onPress={handleResend}
                            disabled={!canResend}
                                >
                    <Text style={styles.buttonText}>
                      'Resend OTP' : `Resend in ${formatTime(timer)}`}
                    </Text> */}
        </ScrollView>
        <ButtonFilled
          title="Verify"
          style={styles.button}
          onPress={() => verfifyOTP()}
        />
      </View>
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
  title: {
    fontSize: 18,
    fontFamily: 'Urbanist Medium',
    color: COLORS.greyscale900,
    textAlign: 'center',
    marginVertical: 64,
  },
  OTPStyle: {
    borderRadius: 8,
    height: 58,
    width: 58,
    backgroundColor: COLORS.secondaryWhite,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
    borderWidth: 0.4,
    borderColor: 'gray',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    justifyContent: 'center',
  },
  code: {
    fontSize: 18,
    fontFamily: 'Urbanist Medium',
    color: COLORS.greyscale900,
    textAlign: 'center',
  },
  time: {
    fontFamily: 'Urbanist Medium',
    fontSize: 18,
    color: COLORS.primary,
  },
  button: {
    borderRadius: 32,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 144,
  },
});

export default RegisterOTPVerification;
