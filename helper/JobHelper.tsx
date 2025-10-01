// CistomerHelper.tsx

import axios from 'axios';

import Settings from '../config/settings';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CreateJob = async data => {
  const token = await AsyncStorage.getItem('userToken');

  return (data = await axios
    .post(`${Settings.baseUrl}${Settings.endpoints.create_jobs}`, data, {
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
      console.error('Customer Error', error);
      return false;
    }));
};
export const JobUpdate = async (jobId, data) => {
  const token = await AsyncStorage.getItem('userToken');

  return (data = await axios
    .put(`${Settings.baseUrl}${Settings.endpoints.job_update(jobId)}`, data, {
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
      console.error('Customer Error', error);
      return false;
    }));
};

export const CreateJobClander = async data => {
  const token = await AsyncStorage.getItem('userToken');
  try {
    const response = await axios.post(
      `${Settings.baseUrl}${Settings.endpoints.create_jobs_calendar}`,
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
    console.error('Clander Create Error:', error);
    return false;
  }
};

export const JobStatusUpdate = async (id: number, data: Object = {}) => {
  const token = await AsyncStorage.getItem('userToken');
  try {
    const response = await axios.put(
      `${Settings.baseUrl}${Settings.endpoints.job_status_update(id)}`,
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
    console.error('job Status Update Error:', error);
    return false;
  }
};
