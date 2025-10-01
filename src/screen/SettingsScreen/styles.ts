import {StyleSheet,Platform,StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

import Color from '../../theme/Colors';
export const styles = StyleSheet.create({
   safeArea: {
          flex: 1,
          backgroundColor: '#f0f0f0',
        },
        container: {
          flex: 1,
          backgroundColor: '#F2F4F8',
        },
        header: {
          height: hp('17%'),
          backgroundColor: '#1E90FF',
          borderBottomLeftRadius: wp('10%'),
          borderBottomRightRadius: wp('10%'),
   width:wp(100)

        },
        profileContainer: {
          alignItems: 'center',
          marginTop: -hp('6%'),
        },
        profileImage: {
          width: wp('22%'),
          height: wp('22%'),
          borderRadius: wp('11%'),
          borderWidth: 2,
          borderColor: '#fff',
        },
        cameraIcon: {
          position: 'absolute',
          bottom: 5,
          right: wp('37%'),
          backgroundColor: '#fff',
          padding: wp('1.5%'),
          borderRadius: wp('5%'),
          elevation: 3,
        },
        infoCard: {
          backgroundColor: '#fff',
          margin: wp('5%'),
          borderRadius: wp('3%'),
          padding: wp('4%'),
          elevation: 3,
        },
        infoRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: hp('1%'),
        },
        infoTitle: {
          fontSize: wp('4.5%'),
          fontWeight: 'bold',
          marginLeft: wp('2%'),
        },
        label: {
          fontWeight: '600',
          color: '#555',
        },
        infoText: {
          fontSize: wp('3.5%'),
          marginTop: hp('0.5%'),
          color: '#444',
        },
        menuItem: {
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: wp('5%'),
          padding: wp('4%'),
          borderRadius: wp('3%'),
          marginBottom: hp('1.2%'),
          elevation: 2,
        },
        menuIcon: {
          marginRight: wp('4%'),
        },
        menuText: {
          fontSize: wp('4%'),
          color: '#333',
        },
});
