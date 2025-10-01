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
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Color from '../../theme/Colors';

import {styles} from './style';
interface InputProps {
  label?: string;
  value: any;
  handleChange: any;
  handleBlur?: any;
  keyboardType?: any;
  placeholder: string;
  secureTextEntry?: boolean;
  placeHolerTextColor: string;
}
const CustomInput = ({label, name, placeholder, ...props}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <Field name={name}>
      {({field, form}) => (
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={[styles.input]}
            placeholder={placeholder}
            value={field.value}
            onChangeText={form.handleChange(name)}
            onBlur={form.handleBlur(name)}
            {...props}
          />

          <ErrorMessage name={name} component={CustomError} />
        </View>
      )}
    </Field>
  </View>
);

// Reusable error message component
const CustomError = ({children}) => (
  <View style={styles.errorContainer}>
    <AlertCircle size={16} color="red" style={styles.errorIcon} />
    <Text style={styles.errorText}>{children}</Text>
  </View>
);

export default CustomInput;
