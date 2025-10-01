import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../../theme/Colors'
export const styles = StyleSheet.create({
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: Color.white,
    textAlign: 'center',
    marginTop: hp('5%'),
  },
});
