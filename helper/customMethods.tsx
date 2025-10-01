import {
  HOUR,
  GROSS_NET_VALUE,
  MATRIC_NATURAL_GAS_RATE,
  IMPERIAL_GAS_RATE,
  LPG_GROSS_NET_VALUE,
  GROSS_NET_TIME_VALUE,
  NET_TIME_VALUE,
} from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Animated} from 'react-native';
import { getISO2FromCallingCode } from '../utils/mapCountryCodeToISO2';
import moment from "moment";
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const secondsToTime = e => {
  const m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0');
  return m + ':' + s;
};
export const calculateGrossRate = (
  gasName = '0',
  gasType = '0',
  time = 0,
  readingDiff = 0,
) => {
  let value = 0.0;
  //Imperial=2, Natural Gas = 1,

  if (time > 0) {
    if (gasType === '1' && (gasName === '1' || gasName === '2')) {
      value = (HOUR * readingDiff) / time;
    } else {
      value = (HOUR * GROSS_NET_VALUE) / time;
    }
  }
  return value.toFixed(2);
};
export const calculateGrossKW = (
  gasName = '0',
  gasType = '0',
  time = 0,
  readingDiff = 0,
) => {
  let value = 0.0;
  if (time > 0) {
    if (gasType === '1' && gasName === '1') {
      value = (HOUR * readingDiff * 10.76) / time;
    } else if (gasType === '2' && gasName === '1') {
      value = (HOUR * IMPERIAL_GAS_RATE) / (time * GROSS_NET_TIME_VALUE);
    } else if (gasType === '1' && gasName === '2') {
      value =
        ((HOUR * LPG_GROSS_NET_VALUE) / (time * GROSS_NET_TIME_VALUE)) *
        readingDiff;
    } else {
      value = (HOUR * LPG_GROSS_NET_VALUE) / (time * GROSS_NET_TIME_VALUE);
    }
  }

  return value.toFixed(2);
};
export const calculateGrossNet = (
  gasName = '1',
  gasType = '1',
  time = 120,
  readingDiff = 0,
) => {
  let value = 0.0;
  if (time > 0) {
    if (gasType === '1' && gasName === '1') {
      value = (HOUR * readingDiff * 10.76) / time / NET_TIME_VALUE;
    } else if (gasType === '2' && gasName === '1') {
      value =
        (HOUR * IMPERIAL_GAS_RATE) /
        (time * GROSS_NET_TIME_VALUE) /
        NET_TIME_VALUE;
    } else if (gasType === '1' && gasName === '2') {
      value =
        ((HOUR * LPG_GROSS_NET_VALUE) /
          (time * GROSS_NET_TIME_VALUE) /
          NET_TIME_VALUE) *
        readingDiff;
    } else {
      value =
        (HOUR * LPG_GROSS_NET_VALUE) /
        (time * GROSS_NET_TIME_VALUE) /
        NET_TIME_VALUE;
    }
  }

  return value.toFixed(2);
};

export const AnimateItem = (animatedValues = [], index: number) => {
  Animated.timing(animatedValues[index], {
    toValue: 1,
    duration: 900, // animation time
    delay: index * 300, // ⏳ staggered effect
    useNativeDriver: true,
  }).start();
};

export const getGreeting = (): string => {
  // Get current local time (or you can adjust for UK)
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } 
  // else if (hour >= 17 && hour < 21) {
  //   return 'Good Evening';
  // } 
  else {
    return 'Good Evening';
  }
};
export const convertTimetoTimeHour = (time): string => {
  if (!time || time.trim() === "") {
    return "N/A"; // or return a default like "00:00"
  }
  const formatted = moment(time, "HH:mm:ss").format("HH:mm")
  return formatted
};

export type User = {
  id: number;
  name: string;
  email: string;
  first_login: number;
  role: string;
  photo: string | null;
  google_id: string | null;
};

export const getUserFromStorage = async (): Promise<User | null> => {
  try {
    const userString = await AsyncStorage.getItem('userInfo');
    if (userString) {
      return JSON.parse(userString) as User;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user from storage:', error);
    return null;
  }
};


export const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const getInitials = (name: string): string => {
  if (!name) return '';

  const words = name.trim().split(' ').filter(Boolean); // remove empty strings
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  const first = words[0].charAt(0).toUpperCase();
  const last = words[words.length - 1].charAt(0).toUpperCase();

  return first + last;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};




export const parseFullNumber = (fullNumber: string): { iso2: string; localNumber: string } => {
  const phoneNumber = parsePhoneNumberFromString(fullNumber);

  if (phoneNumber) {
    let local = phoneNumber.nationalNumber || '';
    // Special case: strip leading 0 for UK
    if (phoneNumber.country === 'GB' && local.startsWith('0')) {
      local = local.slice(1);
    }

    return {
      iso2: phoneNumber.country || 'GB',
      localNumber: local,
    };
  
};

}

export const formatDate = (dateStr: string) => {
  if(dateStr){
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short", // "Sep"
      year: "numeric",
    });
  }else{
    return ''
  }
};

