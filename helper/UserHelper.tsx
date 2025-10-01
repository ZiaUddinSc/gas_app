import axios from 'axios';

import Settings from '../config/settings';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserUpdate = async data => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.put(
      `${Settings.baseUrl}${Settings.endpoints.profile_update}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log('Error =>>', error.response?.data);
    return false;
  }
};

export const UserPasswordChange = async data => {
  console.log('Password:', data);

  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.put(
      `${Settings.baseUrl}${Settings.endpoints.change_password}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log('Error =>>', error.response?.data);
    return false;
  }
};

export const UpdateCompanySettings = async (cpmpanyId, data) => {

console.log(`${Settings.baseUrl}${Settings.endpoints.company_details_update(
        cpmpanyId,
      )}`)
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.put(
      `${Settings.baseUrl}${Settings.endpoints.company_details_update(
        cpmpanyId,
      )}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log('Error =>>', error);
    return false;
  }
};
