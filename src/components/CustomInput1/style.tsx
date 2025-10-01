import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';
  
  import Color from '../../theme/Colors';
  
export const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: hp(2),
    fontWeight: 'bold',
    marginBottom: hp(0.8),
    color: '#7f8c8d',
  },
      inputText: {
        height: hp('6%'),
        color: '#777777',
        fontWeight: '800',
      },
      inputFieldContainer: {},
      inputIcon: {
        position: 'absolute',
        left: wp(3),
        zIndex: 1,
      },
      input: {
        height: hp(6),
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 8,
        paddingHorizontal: wp(3),
        fontSize: hp(2),
        color: '#2c3e50',
        backgroundColor: '#ffffff',
      },
      errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(0.5),
      },
      errorIcon: {
        marginRight: wp(1),
      },
      errorText: {
        color: '#e74c3c',
        fontSize: hp(1.6),
      },
});