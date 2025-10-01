// FileUpload.tsx

import React, {useEffect, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActionSheetIOS,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
} from 'react-native';
import DocumentPicker from '@react-native-documents/picker';
import {CloudUpload, X} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const FileUpload = () => {
  const [signatureSvg, setSignatureSvg] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const handlePermission = async type => {
    let permission;
    if (type === 'camera') {
      permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;
    } else {
      permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }

    const status = await check(permission);

    if (status === RESULTS.GRANTED) return true;

    const requestStatus = await request(permission);
    return requestStatus === RESULTS.GRANTED;
  };

  const showImagePickerOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        async buttonIndex => {
          if (buttonIndex === 1) await takePhoto();
          if (buttonIndex === 2) await pickImage();
        },
      );
    } else {
      Alert.alert('Upload Signature', 'Choose an option', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Take Photo', onPress: async () => await takePhoto()},
        {text: 'Choose from Library', onPress: async () => await pickImage()},
      ]);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await handlePermission('camera');
    if (!hasPermission) return;

    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    });

    handleImageResult(result);
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        console.log('User cancelled');
      } else if (result.errorCode) {
        console.log('Error code:', result.errorCode);
        console.log('Error message:', result.errorMessage);
      } else if (result.assets) {
        setSignatureImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Full error:', error);
    }
  };

  const handleImageResult = result => {
    if (result.didCancel) {
      console.log('User cancelled');
    } else if (result.errorCode) {
      Alert.alert('Error', 'Failed to get image');
    } else if (result.assets) {
      setSignatureImage(result.assets[0].uri);
      Alert.alert('Success', 'Signature added successfully');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      {signatureImage && (
        <Image source={{uri: signatureImage}} style={styles.previewImage} />
      )}
      <TouchableOpacity
        style={styles.uploadArea}
        onPress={showImagePickerOptions}>
        <Text style={styles.uploadText}>Upload Documents</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  title: {
    color: '#2c3e50',
    fontSize: hp(1.8),
    fontWeight: '700',
    marginBottom: hp(1),
  },
  uploadArea: {
    borderWidth: 0.5,
    // borderStyle: 'dashed',
    borderColor: 'gray',
    borderRadius: 6,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    paddingVertical:8
  },
  subText: {
    fontSize: 13,
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
  },
  fileList: {
    marginTop: 20,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  previewImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default FileUpload;
