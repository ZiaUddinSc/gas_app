// CistomerHelper.tsx

import axios from 'axios';

import Settings from '../config/settings';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CreateServiceRecord = async data => {
  const token = await AsyncStorage.getItem('userToken');
  // console.log('URL=>>>',  `${Settings.baseUrl}${Settings.endpoints.login}`)
  return (data = await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.create_service_record}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // console.log('data===>>>',response.data)
      return response.data;
    })
    .catch(error => {
      console.error('C Error', error.message);
      return false;
    }));
};

