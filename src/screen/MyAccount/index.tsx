import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {
  ArrowLeft,
  Edit,
  User,
  Mail,
  Key,
  IdCard,
  Hash,
  Signature,
  User2,
  BadgePoundSterling,
  ReceiptPoundSterling,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
  UpdateDrawSignature,
  UpdateFileSignature,
} from '../../helper/SignatureHelper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LottieLoader from '../../components/LottieLoader';
import {GetSignature} from '../../helper/GetApiHelper';
import Toast from 'react-native-toast-message';

interface UserInfo {
  name: string;
  email: string;
  installer_ref_no?: string;
  oil_registration_number?: string;
  gas_safe_id_card?: string;
  photo_url?: string;
}

const MyAccount = ({navigation}) => {
  const [signatureImage, setSignatureImage] = useState(null);
  const route = useRoute();

  // Mock user data
  const user = {
    name: 'Bhuiyan Sakib',
    email: 'sakibbhuiyan@yahoo.com',
    gasSafeId: '654321',
    paymentMethod: 'Mastercard ....4444',
    expiry: 'December 2026',
    subscription: 'Monthly Subscription (£8.99)',
    lastPayment: '12th May, 2025 - 12th June, 2025',
  };

  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // will store selected image file
  const [previewUri, setPreviewUri] = useState(null); // for previewing
  const [showModal, setShowModal] = useState(false); // for popup modal
  const [signature, setSignature] = useState(); // for popup modal

  const loadUserData = async () => {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (userInfoString) {
      const parsedInfo: UserInfo = JSON.parse(userInfoString);
      setUserInfo(parsedInfo);
    }
  };

  useFocusEffect(
    useCallback(() => {
       fetchSignature();
      loadUserData();
      if (route.params?.signature) {
        setSignatureImage(route.params.signature);
      }
    }, [route.params?.signature]),
  );

  const onUpdatePage = data => {
    // alert(data.name)

    navigation.navigate('ProfileUpdate', {titelData: data.name});
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          return true;
        } else {
          console.log('Camera permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Camera permission was not granted.');
      setShowModal(false);
      return;
    }

    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.errorMessage) {
        console.log('ImagePicker Error Message: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        setFile({
          uri: image.uri,
          type: image.type,
          name: image.fileName ?? 'photo.jpg',
        });
        setPreviewUri(image.uri);
        UploadSignature();
      }
      setShowModal(false);
    });
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        setFile({
          uri: image.uri,
          type: image.type,
          name: image.fileName ?? 'photo.jpg',
        });
        setPreviewUri(image.uri);
        UploadSignature();
        fetchSignature();
      }
      setShowModal(false);
    });
  };

  const UploadSignature = async () => {
    const formData = new FormData();

    formData.append('sign', {
      uri: file.uri,
      name: file.name || 'signature.jpg',
      type: file.type || 'image/jpeg',
    });

    console.log('📤 Uploading file:', formData);
    setLoading(true);

    const res = await UpdateFileSignature(formData);

    if (res) {
      setLoading(false);
      Alert.alert('Success', 'Signature uploaded successfully!', [
        {
          text: 'OK',
          onPress: () => {
            fetchSignature();
          },
        },
      ]);
      setFile(null);
      setPreviewUri(null);
      fetchSignature();
    } else {
      setLoading(false);
      Alert.alert('Error', 'Upload failed');
    }
  };



  const fetchSignature = async () => {
    setLoading(true);
    try {
      const res = await GetSignature(userInfo.id);
      if (res) {
        console.log('signature====>', res.data);
        setSignature(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader
          fontSize={hp(2.2)}
          title="My Account"
          leftIcon={<ArrowLeft size={24} color="white" />}
          onLeftPress={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content}>
          {/* Personal Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => onUpdatePage({name: 'Name'})}>
              <View style={styles.iconView}>
                <User size={17} color="#0d9488" />
                <Text style={styles.label}>Name:</Text>
              </View>
              <Text style={styles.value}>{userInfo.name}</Text>
            </TouchableOpacity>
          </View>

          {/* Account Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Details</Text>

            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => onUpdatePage({name: 'Email'})}>
              <View style={styles.iconView}>
                <Mail size={17} color="#0d9488" />
                <Text style={styles.label}>Email</Text>
              </View>
              <Text style={styles.value}>{userInfo.email}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => onUpdatePage({name: 'Password'})}>
              <View style={styles.iconView}>
                <Key size={17} color="#0d9488" />
                <Text style={styles.label}>Password</Text>
              </View>

              <Text style={styles.linkText}>Change password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => onUpdatePage({name: 'Gas Safe ID Card'})}>
              <View style={styles.iconView}>
                <IdCard size={17} color="#0d9488" />
                <Text style={styles.label}>Gas Safe ID Card</Text>
              </View>
              <Text style={styles.value}>{userInfo.gas_safe_id_card}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => onUpdatePage({name: 'Oil Registration Number'})}>
              <View style={styles.iconView}>
                <Hash size={17} color="#0d9488" />
                <Text style={styles.label}>Oil Registration Number</Text>
              </View>

              <Text
                style={
                  userInfo.oil_registration_number === '' ||
                  userInfo.oil_registration_number === null
                    ? styles.naText
                    : styles.value
                }>
                {userInfo.oil_registration_number !== null &&
                userInfo.oil_registration_number !== ''
                  ? userInfo.oil_registration_number
                  : 'N/A'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => onUpdatePage({name: 'Installer Ref Number'})}>
              <View style={styles.iconView}>
                <Hash size={17} color="#0d9488" />
                <Text style={styles.label}>Installer Ref Number</Text>
              </View>

              <Text
                style={
                  userInfo.installer_ref_no === '' ||
                  userInfo.installer_ref_no === null
                    ? styles.naText
                    : styles.value
                }>
                {userInfo.installer_ref_no !== null &&
                userInfo.installer_ref_no !== ''
                  ? userInfo.installer_ref_no
                  : 'N/A'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Signature Section */}
          <View style={styles.section}>
            <View style={styles.iconView}>
              <Signature size={24} color="#0d9488" />
              <Text
                style={[
                  styles.sectionTitle,
                  {paddingBottom: 0, marginBottom: 0, paddingLeft: 5},
                ]}>
                Signature
              </Text>
            </View>
            <TouchableOpacity
              style={styles.signatureContainer}
              onPress={() =>
                navigation.navigate('SignatureScreen', {
                  onSelect: signature => {
                    setSignatureImage(signature); // Receive selected job
                  },
                })
              }>
              <>
                {signatureImage ? (
                  <Image
                    source={{uri: signatureImage}}
                    style={styles.signatureImage}
                  />
                ) : (
                  <>
                    {signature ? (
                      <Image
                        source={{uri: signature.path}}
                        style={styles.signatureImage}
                      />
                    ) : (
                      <View style={styles.addSignature}>
                        <Edit size={24} color="#555" />
                        <Text style={styles.addSignatureText}>
                          Add Signature
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.popupButtonPrimary}
              onPress={() => setShowModal(true)}>
              <Text style={styles.popupButtonText}>Upload Signature</Text>
            </TouchableOpacity>
          </View>

          {/* Subscriptions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subscriptions</Text>
            <View style={styles.infoRow}>
              <View style={styles.iconView}>
                <User size={17} color="#0d9488" />
                <Text style={styles.label}>{user.subscription}</Text>
              </View>
            </View>
            <View
              style={[
                styles.infoRow,
                {flexDirection: 'column', alignItems: 'flex-start'},
              ]}>
              <View style={styles.iconView}>
                <User2 size={17} color="#0d9488" />
                <Text style={styles.label}>Company Members</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('CompanyUsersScreen')}>
                <Text style={styles.linkText}>
                  Manage subscription policies
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payments Section */}
          <View style={styles.section}>
            <View style={styles.iconView}>
              <BadgePoundSterling size={24} color="#0d9488" />
              <Text
                style={[
                  styles.sectionTitle,
                  {paddingBottom: 0, marginBottom: 0, paddingLeft: 5},
                ]}>
                Payments
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Payment Method</Text>
              <Image
                source={require('../../assets/icon/mastercard.png')}
                style={{height: 17, width: 30}}
                resizeMode="stretch"
              />
              <Text style={styles.value}>{user.paymentMethod}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Expires</Text>
              <Text style={styles.value}>{user.expiry}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Default</Text>
            </View>
            <View
              style={[
                styles.infoRow,
                {flexDirection: 'column', alignItems: 'flex-start'},
              ]}>
              <View style={styles.iconView}>
                <ReceiptPoundSterling size={24} color="#0d9488" />
                <Text
                  style={[
                    styles.sectionTitle,
                    {paddingBottom: 0, marginBottom: 0, paddingLeft: 5},
                  ]}>
                  Billing History
                </Text>
              </View>
              <Text style={styles.value}>{user.lastPayment}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal transparent visible={showModal} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalBox}>
          <TouchableOpacity onPress={openCamera} style={styles.modalBtn}>
            <Text style={styles.modalText}>📷 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openGallery} style={styles.modalBtn}>
            <Text style={styles.modalText}>📁 Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.modalCancel}>
            <Text style={styles.modalText}>❌ Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <LottieLoader visible={loading} />
    </SafeAreaView>
  );
};

export default MyAccount;
