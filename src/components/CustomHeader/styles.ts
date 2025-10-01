import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../../theme/Colors';
export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('6%'),
    // paddingHorizontal: wp('1%'),
    backgroundColor: Color.primaryBGColor,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // marginTop:hp(2)
  },
  side: {
    // width: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:wp(2)
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: '500',
    color: '#FFF',
    // letterSpacing:-0.5
  },
});
