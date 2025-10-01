// CistomerHelper.tsx

import axios from 'axios';

import Settings from '../config/settings';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CreateCustomer = async data => {
  const token = await AsyncStorage.getItem('userToken');
  // console.log('URL=>>>',  `${Settings.baseUrl}${Settings.endpoints.login}`)
  return (data = await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.create_customers}`, data, {
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
      Alert.alert('Customer Create Error', error);
      return false;
    }));
};

export const CreateCustomerProperty = async data => {
  const token = await AsyncStorage.getItem('userToken');
  try {
    const response = await axios.post(
      `${Settings.baseUrl}${Settings.endpoints.create_customers_address}`,
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
    Alert.alert('Property Error:', error);
    return false;
  }
};

export const CreateCustomerContactInfo = async data => {
  const token = await AsyncStorage.getItem('userToken');
  try {
    const response = await axios.post(
      `${Settings.baseUrl}${Settings.endpoints.create_customers_contact}`,
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
    Alert.alert('Contact Info Error:', error);
    return false;
  }
};
export const CustomerUpdate = async (customerId,data) => {
  const token = await AsyncStorage.getItem('userToken');

  try {
    const response = await axios.put(
      `${Settings.baseUrl}${Settings.endpoints.customer_update(
        customerId
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
    console.error('Update  Error:', error.message);
    return false;
  }
};
export const CustomerContactInfoUpdate = async (customerId,data) => {
  const token = await AsyncStorage.getItem('userToken');

  try {
    const response = await axios.put(
      `${Settings.baseUrl}${Settings.endpoints.customer_contact_info_update(
        customerId
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
    console.error('Update  Error:', error.message);
    return false;
  }
};
export const AddCustomerContactInfo = async (data) => {
  const token = await AsyncStorage.getItem('userToken');
  try {
    const response = await axios.post(
      `${Settings.baseUrl}${Settings.endpoints.create_customers_contact}`,
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
    console.error('Update  Error:', error.message);
    return false;
  }
};
export const CustomerJobAddressUpdate = async (customerId,data) => {
  const token = await AsyncStorage.getItem('userToken');

  try {
    const response = await axios.put(
      `${Settings.baseUrl}${Settings.endpoints.customer_job_address_update(
        customerId
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
    console.log('Update Error Response:', error?.response?.data);
    return false;
  }
};
