import axios from 'axios';

import Settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const GetData = async (endPoint,search="") => {
    const token = await AsyncStorage.getItem('userToken');
    let url =endPoint
    if(search){
      url =`${url}?search=${search}`
    }
    return await axios
      .get(`${Settings.baseUrl}${url}`, {
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