import {StyleSheet,Platform,StatusBar} from 'react-native';
import Color from '../../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
      content:{
    flex:1,
    // paddingTop:Platform.OS=="ios"?hp(4):null,
    backgroundColor: Color.primaryBGColor,
      },
  container: {
    flex: 1,
    backgroundColor: Color.primaryBGColor,
    // padding: wp('4%'),
  },
  sub_container: {
    height: hp('100%'),
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  dropdown: {
    // margin: hp('1%'),
    height: hp('5%'),
    width: wp('45%'),
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: wp('1%'),
    paddingHorizontal: wp('1%'),
  },
  Circledropdown: {
    margin: hp('1%'),
    height: hp('5%'),
    width: wp('20%'),
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputView: {
    margin:5,
    borderWidth: 0.5,
    borderColor: 'black',
    marginBottom: wp('2%'),
    borderRadius: wp('1%'),
    height: hp('5.5%'),
    justifyContent: 'center',
  },
  inputText: {
    height: hp('6%'),
    color: '#777777',
    fontWeight: '800',
    width: wp('44%'),
    fontSize:hp('2%')
  },
  btnStyle: {
    borderRadius: wp('1%'),
    width: wp('30%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:hp('3%'),
    marginHorizontal:wp('1%')
  },
  btnTextStyle: {
    color: Color.white,
    fontWeight: '700',
    fontSize: 20,
  },
  card: {
    height: hp('15%'),
    width: wp('30%'),
    borderColor: Color.black,
    backgroundColor:Color.white,
    justifyContent:'space-evenly',
    alignItems:'center',
    borderRadius: wp('1%'),
    // borderWidth:0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    color: '#475569',
    fontWeight: '700',
    fontSize: 30,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  circleView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  row_center:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconView:{
    height: 40,
    width: 40,
    backgroundColor: 'rgba(20, 80, 101, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  }
});
