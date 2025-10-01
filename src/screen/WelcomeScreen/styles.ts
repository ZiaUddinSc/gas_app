import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#104E61',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: wp('8%'),
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: hp('8%'),
  },
  logo: {
    height: hp('20%'),
    width: wp('40%'),
    marginBottom: hp('8%'),
  },
  loginBtn: {
    backgroundColor:Color.black,
    borderRadius: wp('2%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('25%'),
    marginBottom: hp('2%'),
    width:wp('90%')
  },
  loginText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    textAlign: 'center',
  },
  registerBtn: {
    backgroundColor: Color.white,
    borderColor: '#1C1E24',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('25%'),
    width:wp('90%')
  },
  registerText: {
    color: '#1C1E24',
    fontSize: wp('4.5%'),
    textAlign: 'center',
  },
});