import axios from 'axios';
import Settings from '../config/settings';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetJob = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log(token);
    const response = await axios.get(
      `${Settings.baseUrl}${
        Settings.endpoints.get_jobs_list
      }?page=${page}&sort=created_at&order=desc&t=${Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      jobs: response.data?.data ?? [],
      meta: response.data?.meta,
    };
  } catch (error) {
    console.log('Error =>>', error);
    return {
      jobs: [],
      meta: null,
    };
  }
};

export const GetCustomers = async (pageNo, search = '', order = 'desc') => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${
        Settings.endpoints.get_customers_list
      }?page=${pageNo}&search=${search}&sort=created_at&order=${order}&t=${Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      jobs: response.data?.data ?? [],
      meta: response.data?.meta,
    };
  } catch (error) {
    console.log('Error =>>', error.response?.data || error.message);
    return {
      jobs: [],
      meta: null,
    };
  }
};

export const GetAddress = async customerId => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_customer_property(
        customerId,
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.log('Error job address =>>', error);
    return false;
  }
};

export const GetTitle = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_title}`,
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
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};
export const GetPriorities = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_priorities}`,
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
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};
export const GetJobStatus = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_job_status}`,
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
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};
export const GetTimeSlots = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_calendar_time_slots}`,
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
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};

export const GetSingleJob = async id => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_single_jobs(id)}`,
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
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};
export const GetSingleJobCalendar = async id => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_single_job_calendar(id)}`,
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
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};

export const GetSignleCustomer = async customerId => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_single_customer(
        customerId,
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};
export const GetSignleJobAddress = async customerId => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_single_job_address(
        customerId,
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};

export const GetRecordList = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_records_list}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.log('Error =>>', error.response?.data || error.message);
    return false;
  }
};
export const GetAddressList = async customerId => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log(
      'Api',
      `${Settings.baseUrl}${Settings.endpoints.get_job_address_list(
        customerId,
      )}`,
    );

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_job_address_list(
        customerId,
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.log('Error =>>', error);
    return false;
  }
};
export const GetSignature = async userId => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_signature(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.log('Error signetur =>>', error);
    return false;
  }
};
export const GetCompanyUserList = async userId => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.company_user_list(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.log('Error signetur =>>', error);
    return false;
  }
};
export const GetSingleUser = async userId => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_single_user(userId)}`,
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
    console.log('Error Single User =>>', error);
    return false;
  }
};
export const GetCompanyDetails = async companyId => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_company_details(companyId)}`,
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
    console.log('Error Single User =>>', error);
    return false;
  }
};
export const GetPackages = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.packages}`,
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
    console.log('Error Packages  =>>', error);
    return false;
  }
};

export const GetCustomerJob = async (customerId, page = 1) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log(
      'Api',
      `${Settings.baseUrl}${Settings.endpoints.get_customar_job_list(
        customerId,
      )}?page=${page}`,
    );
    const response = await axios.get(
      `${Settings.baseUrl}${Settings.endpoints.get_customar_job_list(
        customerId,
      )}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data; // ✅ return only data
  } catch (error) {
    console.log(
      'Get Customer Job List Error =>>',
      error.response || error.message,
    );
    return false;
  }
};
