import { StyleSheet,Platform,StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../../theme/Colors';


const borderColor = '#ced4da';

const styles = StyleSheet.create({
  safeArea: {
         flex: 1,
         backgroundColor: Color.primaryBGColor,
       },
       container: {
        flex: 1,
        padding: wp('4%'),
        backgroundColor: '#f4f6f8',
      },
      header: {
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: hp('2%'),
      },
      section: {
        marginBottom: hp('2%'),
      },
      sectionTitle: {
        fontSize: wp('4.2%'),
        fontWeight: '600',
        marginBottom: hp('1%'),
        color: '#333',
      },
      card: {
        backgroundColor: '#fff',
        padding: wp('4%'),
        borderRadius: wp('2%'),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      },
      infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1.2%'),
        justifyContent:'space-between'

        
      },
      infoText: {
        fontSize: wp('3.8%'),
        color: '#555',
        marginLeft: wp('2%'),
        flexShrink: 1,
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
          // flexDirection: 'row',
          // justifyContent: 'space-around',
          marginTop: hp(2),
        },
        saveButton: {
          backgroundColor: Color.primaryBGColor,
          height:hp(6),
          borderRadius: wp(10),
          marginBottom:hp(2),
             alignItems:'center',
          justifyContent:'center'
        },
        saveButtonText: {
          color: Color.white,
          fontSize: hp(2.5),
          fontWeight: 'bold',
          marginLeft: wp(1),
        },
        cancelButton: {
          backgroundColor: Color.white,
      height:hp(6),
          borderRadius: wp(10),
          borderWidth:1,
          borderColor:Color.primaryBGColor,
          alignItems:'center',
          justifyContent:'center',
          marginBottom:hp(2)
        },
        cancelButtonText: {
          color: Color.textPrimaryColor,
          fontSize: hp(2.5),
          fontWeight: 'bold',
          marginLeft: wp(1),
        },
});

export default styles;