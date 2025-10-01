import {StyleSheet,Platform,StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

import Color from '../../theme/Colors';
export const styles = StyleSheet.create({
    content:{
  flex:1,
  backgroundColor: Color.primaryBGColor
    },
    container: {
        flex: 1,
        backgroundColor: Color.white,
      },
    
      item: {
        // flexDirection: 'row',
        alignItems: 'center',
        // gap:wp(10),
        backgroundColor: Color.white,
        marginBottom: hp('1.5%'),
        borderRadius: wp('1%'),
        marginTop:hp(0.5),
      height:hp(18),
      width:wp(44),
        borderColor:Color.textPrimaryColor,
        // borderWidth:.5,
        justifyContent:'center',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
      },
      row:{flexDirection:'row',alignItems:'center'},
      icon: {
        // marginRight: wp('3%'),
      },
      title: {
        fontSize: wp('4.5%'),
        color: Color.fontColor,
        textAlign:'center'
      },
  });
  