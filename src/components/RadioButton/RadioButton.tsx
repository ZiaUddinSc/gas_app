import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik, Field, ErrorMessage} from 'formik'; // Removed Form import
import * as Yup from 'yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  AlertCircle,
  CheckCircle,
  MapPin,
  Phone,
  FileText,
  Check,
  X,
  ArrowLeft,
} from 'lucide-react-native';
import Svg, {Path} from 'react-native-svg';
import CustomHeader from '../CustomHeader/CustomHeader';
import Color from '../../theme/Colors';

import {styles} from './style';


const RadioButton = ({label, value, selectedValue, onSelect}) => (
  <TouchableOpacity style={styles.radioOption} onPress={() => onSelect(value)}>
    <View
      style={[
        styles.radioIcon,
        {
          backgroundColor:
            selectedValue === value ? Color.primaryBGColor : 'transparent',
        },
      ]}>
      {selectedValue === value && <Check size={12} color="#fff" />}
    </View>
    <Text style={styles.radioText}>{label}</Text>
  </TouchableOpacity>
);




export default RadioButton;
