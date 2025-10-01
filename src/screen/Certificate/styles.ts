import { StyleSheet,Platform,StatusBar } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';
  import Color from '../../theme/Colors';

const styles = StyleSheet.create({
   safeArea: {
          flex: 1,
          backgroundColor: Color.primaryBGColor,
        },
    container: {
        flex: 1,
        // padding: wp('4%'),
        backgroundColor: '#e2e8f0'
      },
      sab_container: {
        backgroundColor: '#e2e8f0',
        borderTopLeftRadius: wp(3),
        borderTopRightRadius: wp(3),
        // padding: wp(4),
        alignItems: 'center',
        justifyContent:'flex-end',
       marginBottom:hp(2),
        flex:1
      },

   bottomSheet: {
          backgroundColor: Color.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
  elevation:9
        },
  
        handleIndicator: {
          backgroundColor: '#ccc',
          width: 40,
          height: 5,
          borderRadius: 2.5,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            // marginBottom: hp(2),
            borderBottomWidth: 0.5,
            borderBottomColor: Color.primaryBGColor,
            paddingHorizontal: wp(4),
            paddingVertical: wp(4),
            width: wp(100),
            backgroundColor: '#FFF',
            justifyContent: 'space-between',
          },
          arrowDown: {},
          title: {
            fontSize: wp(4),
            color: Color.textColor,
            fontWeight: 'bold',
          },
          actionsContainer: {
            margin: hp(1),
            backgroundColor: '#e2e8f0',
          },
          actionItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: hp(1.2),
            paddingHorizontal: wp(2),
            width: wp(94),
            borderBottomWidth: 1,
            borderBottomColor: '#e2e8f0',
          },
          iconContainer: {
            marginRight: wp(3),
          },
        
          groupContainer: {
            width: wp(94),
            marginTop: hp(1),
          },
          groupTitle: {
            fontSize: wp(3.6),
            fontWeight: 'bold',
            color: '#6B7280',
            marginBottom: hp(1),
          },
          // actionItem: {
          //   flexDirection: 'row',
          //   alignItems: 'center',
          //   paddingVertical: hp(1),
          //   paddingHorizontal: wp(3),
          //   borderRadius: wp(2),
          //   elevation: 2,
          //   marginBottom: hp(1),
          // },
          // iconContainer: {
          //   marginRight: wp(2),
          // },
          actionText: {
            fontSize: wp(3.8),
            fontWeight: '600',
          },
});

export default styles;