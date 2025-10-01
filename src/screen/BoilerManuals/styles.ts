import { View, Text, StyleSheet, Dimensions,Platform,StatusBar } from 'react-native';

const { width } = Dimensions.get('window');
import Color from '../../theme/Colors';
export const styles = StyleSheet.create({
   safeArea: {
            flex: 1,
            backgroundColor: Color.primaryBGColor,
          },
    container: {
      flex: 1,
      backgroundColor: Color.white, // Background color as seen in the screenshot
    //   justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    card: {
      width: width * 0.9,
      backgroundColor: Color.white,
      borderRadius: 10,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 5,
    },
  

    iconBtn: {
      backgroundColor: '#1D4D5D',
      padding: 14,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    dropdown: {
      height: 50,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    placeholderStyle: {
      color: '#A0A0A0',
    },
    selectedTextStyle: {
      color: '#000',
    },
    itemTextStyle: {
      color: '#333',
    },
    resultBox: {
      marginTop: 20,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      elevation:5
    },
    resultText: {
      fontWeight: '600',
      fontSize: 16,
      color: '#3A4D63',
    },
  });
  