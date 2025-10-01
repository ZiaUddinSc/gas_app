import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useTheme} from '../theme/ThemeProvider';


interface InputProps extends TextInputProps {
    id: string;
    placeholderTextColor?: string;
    placeholderStyle?: any;
    value?: string;
    onPress: () => void;
}


const TouchableTextInput: React.FC<InputProps> = props => {
  const {dark} = useTheme();

  return (
    <TouchableOpacity style={[styles.container]} onPress={props.onPress}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
          },
        ]}>
        <Text
          style={[
            styles.input,
            {color: props.placeholderTextColor},
            props.value ? {} : props.placeholderStyle,
          ]}>
          {props.value || props.placeholder}
        </Text>
      </View>
    </TouchableOpacity>
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

export default TouchableTextInput;
