import axios from 'axios';

import Settings from '../config/settings';
import {Alert} from 'react-native';
export const UserLogin = async data => {
  // console.log('URL=>>>',  `${Settings.baseUrl}${Settings.endpoints.login}`)
  return (data = await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.login}`, data)
    .then(response => {
      // console.log('data===>>>',response.data)
      return response.data;
    })
    .catch(error => {
      const errorMessage = error?.response?.data?.message || 'Server Error';
      return {success: false, message: errorMessage}; // ⬅️ return message
    }));
};


export const UserSignUp = async data => {
  // console.log('URL=>>>',  `${Settings.baseUrl}${Settings.endpoints.login}`)
  return (data = await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.signup}`, data)
    .then(response => {
      console.log('data===>>>',response)
      return response.data;
    })
    .catch(error => {
      const errorMessage = error?.response?.data?.message || 'Server Error';
      return {success: false, message: errorMessage}; // ⬅️ return message
    }));
};


export const CompanyStore = async (data,token) => {
  // console.log('URL=>>>',  `${Settings.baseUrl}${Settings.endpoints.login}`)

  return (data = await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.company_store}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // console.log('data===>>>',response.data)
      return response;
    })
    .catch(error => {
      const errorMessage = error?.response?.data?.message || 'Server Error';
      return {success: false, message: errorMessage}; // ⬅️ return message
    }));
};
export const CompanyUserStore = async (data,token) => {
  // console.log('URL=>>>',  `${Settings.baseUrl}${Settings.endpoints.login}`)

  return (data = await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.company_user_store}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // console.log('data===>>>',response.data)
      return response;
    })
    .catch(error => {
      const errorMessage = error?.response?.data?.message || 'Server Error';
      return {success: false, message: errorMessage}; // ⬅️ return message
    }));
};
export const CompanUserUpdate= async (data,token,id) => {

  return (data = await axios
    .put(`${Settings.baseUrl}${Settings.endpoints.company_user_update(id)}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // console.log('data===>>>',response.data)
      return response;
    })
    .catch(error => {
      const errorMessage = error?.response?.data?.message || 'Server Error';
      return {success: false, message: errorMessage}; // ⬅️ return message
    }));
};