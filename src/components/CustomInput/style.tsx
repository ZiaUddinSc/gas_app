import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';
  
  import Color from '../../theme/Colors';
  
export const styles = StyleSheet.create({
    inputLabel: {
        marginLeft: wp('4%'),
        color: Color.white,
        fontSize: wp('4%'),
        marginBottom: 5,
      },
      inputView: {
        marginLeft: wp('4%'),
        marginBottom: wp('2%'),
        width: wp('82%'),
        backgroundColor: '#EAEAEA',
        borderRadius: wp('2%'),
        height: hp('6%'),
        justifyContent: 'center',
        padding: wp('3%'),
      },
      inputText: {
        height: hp('6%'),
        color: '#777777',
        fontWeight: '800',
      },
});