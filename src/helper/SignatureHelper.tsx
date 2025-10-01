import axios from 'axios';

import Settings from '../config/settings';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UpdateDrawSignature = async data => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.put(
      `${Settings.baseUrl}${Settings.endpoints.draw_signature}`,
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


export const UpdateFileSignature = async (data) => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios({
      method: 'post', // ✅ YES, post instead of put (Laravel PUT doesn't handle FormData well)
      url: `${Settings.baseUrl}${Settings.endpoints.file_signature}?_method=PUT`, // Laravel-friendly!
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data', // ✅ Set this explicitly!
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error =>>dddd', error.message);
    console.log('Full error =>>', JSON.stringify(error?.response?.data || error));
    return false;
  }
};