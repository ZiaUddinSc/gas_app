import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color from '../../theme/Colors';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Camera, ArrowLeft} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserPasswordChange, UserUpdate} from '../../helper/UserHelper';
import LottieLoader from '../../components/LottieLoader';

const ProfileUpdate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();

  const titleData = route.params?.titelData;

  const [photo, setPhoto] = useState();
  const [photoFile, setPhotoFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confriomPassword, setconfriomPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [gsCard, setGsCard] = useState('');
  const [oilRegistrationNumber, setOilRegistrationNumber] = useState('');
  const [installerRefNo, setInstallerRefNo] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
      console.log(userInfo.photo_url);
      setPhoto(userInfo.photo);
      setName(userInfo.name);
      setEmail(userInfo.email);
      setGsCard(userInfo.gas_safe_id_card);
      setOilRegistrationNumber(userInfo.oil_registration_number);
      setInstallerRefNo(userInfo.installer_ref_no);
      // do something with userInfo here
    };

    fetchUserInfo();
  }, []);

  const handleCancel = () => {
    navigation.goBack(); // or reset to a previous screen
  };

  const UpdateName = () => {
    setLoading(true); // start loader
    let data = {name: name};

    UserUpdate(data).then(async res => {
      if (res) {
        console.log('Success:', res);

        try {
          const userInfoString = await AsyncStorage.getItem('userInfo');
          const userInfo = JSON.parse(userInfoString);

          const updatedUserInfo = {
            ...userInfo,
            name: data.name,
          };

          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify(updatedUserInfo),
          );
          setLoading(false);
          navigation.goBack();
        } catch (err) {
          setLoading(false);
          Alert.alert('Error', 'Failed to update');
          console.log('AsyncStorage Error:', err);
        }
      } else {
        setLoading(false);
        Alert.alert('Network Error', 'Please check your internet connection.');
      }
    });
  };

  const UpdateEmail = () => {
    setLoading(true);
    let data = {email: email};
    UserUpdate(data).then(async res => {
      if (res) {
        console.log('Success:', res);

        try {
          const userInfoString = await AsyncStorage.getItem('userInfo');
          const userInfo = JSON.parse(userInfoString);

          const updatedUserInfo = {
            ...userInfo,
            email: data.email,
          };

          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify(updatedUserInfo),
          );
          setLoading(false);
          navigation.goBack();
        } catch (err) {
          setLoading(false);
          Alert.alert('Error', 'Failed to update');
          console.log('AsyncStorage Error:', err);
        }
      } else {
        setLoading(false);
        Alert.alert('Network Error', 'Please check your internet connection.');
      }
    });
  };

  const validatePassword = text => {
    setPassword(text);

    const hasUpperCase = /[A-Z]/.test(text);
    const hasLowerCase = /[a-z]/.test(text);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(text);
    const isLongEnough = text.length >= 8;

    if (!isLongEnough) {
      setPasswordMessage('Must be at least 8 characters');
      setPasswordValid(false);
    } else if (!hasUpperCase) {
      setPasswordMessage('Include at least 1 uppercase letter');
      setPasswordValid(false);
    } else if (!hasLowerCase) {
      setPasswordMessage('Include at least 1 lowercase letter');
      setPasswordValid(false);
    } else if (!hasSymbol) {
      setPasswordMessage('Include at least 1 special character');
      setPasswordValid(false);
    } else {
      setPasswordMessage('✅ Strong password');
      setPasswordValid(true);
    }

    setPasswordsMatch(text === confriomPassword);
  };

  const validateConfirmPassword = text => {
    setconfriomPassword(text);
    setPasswordsMatch(password === text);
  };

  const UpdatePassword = () => {
    validatePassword;
    validateConfirmPassword;

    let data = {
      password: password,
      password_confirmation: confriomPassword,
    };

    UserPasswordChange(data).then(async response => {
      if (response) {
        console.log('Change Password:', response);
        Alert.alert('Success', 'Password changed successfully!');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    });
  };

  const UpdateGsCard = () => {
    setLoading(true);
    let data = {gas_safe_id_card: gsCard};
    UserUpdate(data).then(async res => {
      if (res) {
        console.log('Success:', res);

        try {
          const userInfoString = await AsyncStorage.getItem('userInfo');
          const userInfo = JSON.parse(userInfoString);

          const updatedUserInfo = {
            ...userInfo,
            gas_safe_id_card: data.gas_safe_id_card,
          };

          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify(updatedUserInfo),
          );
          setLoading(false);
          navigation.goBack();
        } catch (err) {
          setLoading(false);
          Alert.alert('Error', 'Failed to update');
          console.log('AsyncStorage Error:', err);
        }
      } else {
        setLoading(false);
        Alert.alert('Network Error', 'Please check your internet connection.');
      }
    });
  };
  const UpdateOilRegistrationNumber = () => {
    setLoading(true);
    let data = {oil_registration_number: oilRegistrationNumber};
    UserUpdate(data).then(async res => {
      if (res) {
        console.log('Success:', res);

        try {
          const userInfoString = await AsyncStorage.getItem('userInfo');
          const userInfo = JSON.parse(userInfoString);

          const updatedUserInfo = {
            ...userInfo,
            oil_registration_number: data.oil_registration_number,
          };

          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify(updatedUserInfo),
          );
          setLoading(false);
          navigation.goBack();
        } catch (err) {
          setLoading(false);
          Alert.alert('Error', 'Failed to update');
          console.log('AsyncStorage Error:', err);
        }
      } else {
        setLoading(false);
        Alert.alert('Network Error', 'Please check your internet connection.');
      }
    });
  };
  const UpdateInstallerRefNo = () => {
    setLoading(true);
    let data = {installer_ref_no: installerRefNo};
    UserUpdate(data).then(async res => {
      if (res) {
        console.log('Success:', res);

        try {
          const userInfoString = await AsyncStorage.getItem('userInfo');
          const userInfo = JSON.parse(userInfoString);

          const updatedUserInfo = {
            ...userInfo,
            installer_ref_no: data.installer_ref_no,
          };

          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify(updatedUserInfo),
          );
          setLoading(false);
          navigation.goBack();
        } catch (err) {
          setLoading(false);
          Alert.alert('Error', 'Failed to update');
          console.log('AsyncStorage Error:', err);
        }
      } else {
        setLoading(false);
        Alert.alert('Network Error', 'Please check your internet connection.');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {titleData == 'Name' ? (
        <>
          <CustomHeader
            title={'Update Data'}
            fontSize={hp(1.8)}
            leftIcon={<ArrowLeft size={24} color="white" />}
            onLeftPress={() => navigation.goBack()}
          />
          <View style={styles.card}>
            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: photo
                    ? photo
                    : 'https://app.gascertificate.app/build/assets/200x200-44e1cf33.jpg',
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraIcon}>
                <Camera size={wp('4.5%')} color="#1E90FF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>
              Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
              autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={UpdateName}>
                <Text style={styles.saveText}>✓ Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
      {titleData == 'Email' ? (
        <>
          <CustomHeader
            title={'Update Data'}
            fontSize={hp(1.8)}
            leftIcon={<ArrowLeft size={24} color="white" />}
            onLeftPress={() => navigation.goBack()}
          />
          <View style={styles.card}>
            <Text style={styles.label}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={UpdateEmail}>
                <Text style={styles.saveText}>✓ Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
      {titleData == 'Password' ? (
        <>
          <CustomHeader
            title={'Update Password'}
            fontSize={hp(1.8)}
            leftIcon={<ArrowLeft size={24} color="white" />}
            onLeftPress={() => navigation.goBack()}
          />
          <View style={styles.card}>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={validatePassword}
                secureTextEntry
                autoCapitalize="none"
                placeholder="******"
              />
              {password.length > 0 && (
                <Text
                  style={{
                    color: passwordValid ? 'green' : 'red',
                    marginBottom: 10,
                  }}>
                  {passwordMessage}
                </Text>
              )}

              <Text style={styles.label}>Password Confirmation</Text>
              <TextInput
                style={styles.input}
                value={confriomPassword}
                onChangeText={validateConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                placeholder="******"
              />
              {confriomPassword.length > 0 && (
                <Text
                  style={{
                    color: passwordsMatch ? 'green' : 'red',
                    marginBottom: 10,
                  }}>
                  {passwordsMatch
                    ? '✅ Passwords match'
                    : '❌ Passwords do not match'}
                </Text>
              )}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={UpdatePassword}>
                <Text style={styles.saveText}>✓ Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}

      {titleData == 'Gas Safe ID Card' ? (
        <>
          <CustomHeader
            title={'Update Data'}
            fontSize={hp(1.8)}
            leftIcon={<ArrowLeft size={24} color="white" />}
            onLeftPress={() => navigation.goBack()}
          />
          <View style={styles.card}>
            <Text style={styles.label}>Gas Safe ID Card</Text>
            <TextInput
              style={styles.input}
              value={gsCard}
              onChangeText={setGsCard}
              autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={UpdateGsCard}>
                <Text style={styles.saveText}>✓ Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
      {titleData == 'Oil Registration Number' ? (
        <>
          <CustomHeader
            title={'Update Data'}
            fontSize={hp(1.8)}
            leftIcon={<ArrowLeft size={24} color="white" />}
            onLeftPress={() => navigation.goBack()}
          />
          <View style={styles.card}>
            <Text style={styles.label}>Oil Registration Number</Text>
            <TextInput
              style={styles.input}
              value={oilRegistrationNumber}
              onChangeText={setOilRegistrationNumber}
              autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={UpdateOilRegistrationNumber}>
                <Text style={styles.saveText}>✓ Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
      {titleData == 'Installer Ref Number' ? (
        <>
          <CustomHeader
            title={'Update Data'}
            fontSize={hp(1.8)}
            leftIcon={<ArrowLeft size={24} color="white" />}
            onLeftPress={() => navigation.goBack()}
          />
          <View style={styles.card}>
            <Text style={styles.label}>Installer Ref Number</Text>
            <TextInput
              style={styles.input}
              value={installerRefNo}
              onChangeText={setInstallerRefNo}
              autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={UpdateInstallerRefNo}>
                <Text style={styles.saveText}>✓ Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
      <LottieLoader visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',

    // justifyContent: 'center',
    // paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1E293B',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#475569',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#0F172A',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelText: {
    color: '#334155',
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: Color.primaryBGColor || '#0F766E',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
  },
  profileContainer: {
    alignItems: 'center',
    // marginTop: -hp('6%'),
  },
  profileImage: {
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: wp('11%'),
    borderWidth: 2,
    borderColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: wp('37%'),
    backgroundColor: '#fff',
    padding: wp('1.5%'),
    borderRadius: wp('5%'),
    elevation: 3,
  },
  overlayLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // 30% dark overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensure it's above everything
    elevation: 10, // for Android
    // height:30,width:30
  },
});

export default ProfileUpdate;
