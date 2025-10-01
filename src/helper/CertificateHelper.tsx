import axios from 'axios';

import Settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const GetQuoteNumber = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return await axios
    .get(`${Settings.baseUrl}${Settings.endpoints.get_quote_number}`, {
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

export const CreateQuote = async data => {
  const token = await AsyncStorage.getItem('userToken');
  return  await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.store_quote}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Create Quote Error', error);
      return false;
    });
};
export const CreateInvoice = async data => {
  const token = await AsyncStorage.getItem('userToken');

  return  await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.store_invoice}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Invoice Quote Error', error);
      return false;
    });
};