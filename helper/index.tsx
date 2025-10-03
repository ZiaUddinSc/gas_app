import axios from 'axios';

import Settings from '../config/settings';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PostData = async (data,url) => {
  const token = await AsyncStorage.getItem('userToken');
  return (data = await axios
    .post(`${Settings.baseUrl}${url}`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return {success: true,data:response.data};
    })
    .catch(error => {
      const errorMessage = error?.response?.data?.message || 'Server Error';
      console.log(errorMessage)
      return {success: false, message: errorMessage}; // ⬅️ return message
    }));
};

export const UpdateData = async (data,url) => {
  const token = await AsyncStorage.getItem('userToken');
  return (data = await axios
    .put(`${Settings.baseUrl}${url}`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return {success: true,data:response.data};
    })
    .catch(error => {
      const errorMessage = error?.response?.data?.message || 'Server Error';
      console.log(errorMessage)
      return {success: false, message: errorMessage}; // ⬅️ return message
    }));
};