import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TextInputProps,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import {capitalizeWords} from '../helper/customMethods';

interface InputProps extends TextInputProps {
  id: string;
  icon?: any;
  placeholderTextColor?: string;
  errorText?: string[];
  onInputChanged: (id: string, text: string) => void;
  value?: string; // 👈 important for controlled input
  numeric?: boolean; // 👈 added
}

const Input: React.FC<InputProps> = props => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(props.value || ''); // local state for displaying
  const {dark} = useTheme();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onChangeText = (text: string) => {
    // let formattedText = text;
    // if (!props.secureTextEntry) {
    //   formattedText = capitalizeWords(text);
    // }
    // setInputValue(formattedText);
    // props.onInputChanged(props.id, formattedText);
    setInputValue(text);
    props.onInputChanged(props.id, text);
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocused
              ? dark
                ? COLORS.primary100
                : COLORS.primary
              : dark
              ? COLORS.dark2
              : COLORS.greyscale500,
            backgroundColor: isFocused
              ? COLORS.tansparentPrimary
              : dark
              ? COLORS.dark2
              : COLORS.greyscale500,
          },
        ]}>
        {props.icon && (
          <Image
            source={props.icon}
            style={[
              styles.icon,
              {
                tintColor: isFocused
                  ? dark
                    ? COLORS.white
                    : COLORS.primary
                  : '#BCBCBC',
              },
            ]}
          />
        )}
        <TextInput
          {...props}
          value={props.value ?? inputValue}
          onChangeText={text => {
            if (props.numeric) {
              // ✅ Allow digits and decimal
              let cleaned = text.replace(/[^0-9.]/g, '');
        
              // ✅ Ensure only one decimal point
              const parts = cleaned.split('.');
              if (parts.length > 2) {
                cleaned = parts[0] + '.' + parts.slice(1).join('');
              }
        
              // ✅ Limit to 2 digits after decimal
              if (cleaned.includes('.')) {
                const [intPart, decPart] = cleaned.split('.');
                cleaned = intPart + '.' + decPart.slice(0, 2);
              }
        
              setInputValue(cleaned);
              props.onInputChanged(props.id, cleaned);
            } else {
              setInputValue(text);
              props.onInputChanged(props.id, text);
            }
          }}
          onFocus={handleFocus}
          onBlur={() => {
            if (props.numeric) {
              let formatted = inputValue;
              if (!formatted.includes('.')) {
                formatted += '.00'; // add fraction if missing
              } else {
                const [intPart, decPart] = formatted.split('.');
                formatted = intPart + '.' + (decPart + '00').slice(0, 2); // ensure 2 digits
              }
              setInputValue(formatted);
              props.onInputChanged(props.id, formatted);
            }
            handleBlur();
          }}
          keyboardType={props.numeric ? 'numeric' : props.keyboardType}
          style={[styles.input, {color: dark ? COLORS.white : COLORS.black}]}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          autoCapitalize={props.secureTextEntry ? 'none':'words'} // 👈 only capitalize words if not password
        />
      </View>
      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    height: 20,
    width: 20,
    tintColor: '#BCBCBC',
  },
  input: {
    color: COLORS.black,
    flex: 1,
    fontFamily: 'Urbanist Regular',
    fontSize: 14,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default Input;