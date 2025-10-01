import axios from 'axios';

import Settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const GetData = async (endPoint) => {
    const token = await AsyncStorage.getItem('userToken');
    return await axios
      .get(`${Settings.baseUrl}${endPoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Code Error', error);
        return false;
      });
  };