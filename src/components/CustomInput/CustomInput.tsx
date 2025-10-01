import React from 'react';
import {TextInput, View, Text} from 'react-native';
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
const CustomInput = (props: InputProps) => {
  const {
    label,
    placeholder,
    placeHolerTextColor,
    value,
    keyboardType,
    handleChange,
    handleBlur,
    secureTextEntry,
  } = props;
  return (
    <>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          placeholderTextColor={placeHolerTextColor}
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </>
  );
};
export default CustomInput;
