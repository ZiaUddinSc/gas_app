import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState,useRef} from 'react';
import {COLORS, icons, SIZES} from '../constants';
import {getTimeAgo} from '../utils/date';
import {useTheme} from '../theme/ThemeProvider';
import PhoneInput from 'react-native-phone-number-input';
interface CustomInputProps {
  ref?:any
  onInputChanged: (text) => void;
  onInputFormatedChanged: (text) => void;
  inpuValue?: any;
  countryCode?: any;
  placeholderText?:any

}

const CustomPhoneInput: React.FC<CustomInputProps> = ({
  ref,
  onInputChanged,
  onInputFormatedChanged,
  inpuValue,
  countryCode,
  placeholderText
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const {colors, dark} = useTheme();

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
          borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
        },
      ]}>
      <PhoneInput
        key={ref}
        ref={phoneInputRef}
        value={inpuValue} // just number
        defaultCode={countryCode as any} // set country code
        layout="first"
        onChangeText={text => {
          onInputChanged(text);
        }}
        textInputProps={{
          placeholder: placeholderText,
          placeholderTextColor: dark ? COLORS.grayTie : COLORS.black,
          style: {color: dark ? COLORS.white : COLORS.black}, // text color
        }}
        onChangeFormattedText={text => {
          onInputFormatedChanged(text);
        }}
        withDarkTheme={false} // disable built-in dark theme if customizing
        withShadow={false}
        autoFocus={false}
        textContainerStyle={[
          styles.textPhoneInput,
          {backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500},
        ]} // style the input field
        codeTextStyle={[
          styles.codeText,
          {color: dark ? COLORS.greyscale500 : COLORS.dark2},
        ]} // style the country code
        containerStyle={[
          styles.containerPhoneStyle,
          {
            borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
          },
        ]} // outer wrapper
        flagButtonStyle={{
          backgroundColor: 'transparent',
        }}
        countryPickerProps={{
          theme: 'dark', // "dark" or "light"
          modalProps: {
            animationType: 'slide',
          },
          withAlphaFilter: true,
          withCallingCode: true,
          // optionally customize text style
          renderFlagButton: undefined, // optional
        }}
      />
    </View>
  );
};
const phoneInputRef = useRef<PhoneInput>(null);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    // marginVertical: 10,
    backgroundColor: COLORS.greyscale500,
  },
  containerPhoneStyle: {
    // borderWidth: 1,
    width: '98%',
    borderColor: '#ccc',
    borderRadius: 16,
    backgroundColor: '#fff',
    height: 50,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: '#111',
  },
  textPhoneInput: {
    paddingVertical: 0,
    fontSize: 14,
    height: '100%',
  },
  codeText: {
    fontSize: 14,
  },
});

export default CustomPhoneInput;
