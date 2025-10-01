import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';
  
  import Color from '../../theme/Colors';
  
export const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioIcon: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    borderWidth: 2,
    borderColor: Color.primaryBGColor,
    marginRight: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioText: {
    fontSize: hp(2),
    color: '#2c3e50',
  },
});