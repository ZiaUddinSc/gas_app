import { StyleSheet,Platform,StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../../theme/Colors';
export const styles = StyleSheet.create({
      safeArea: {
             flex: 1,
             backgroundColor: Color.primaryBGColor,
           },
  container: {
    flex: 1,
    padding: wp(3),
    backgroundColor: '#FFF',
  },
  title: {
    color: '#2c3e50',
    fontSize: hp(1.8),
    fontWeight: '700',
    marginBottom: hp(1),
},
safety_container: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: wp(2),
    marginTop: wp(2),

},
safety_content: {
    backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: wp(3),
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between'
},
rece_content: {
    backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: wp(3),
},
safety_questionsAnswered: {
    color: '#7f8c8d',
    fontSize: hp(1.8),
},
safety_progress: {
    color: '#7f8c8d',
        fontSize: hp(2.2),
        
},
inputLabel: {
    color: '#7f8c8d',
    fontSize: hp(1.8),
    marginBottom: hp(1),
},
input: {
    // backgroundColor: '#FFF',
    borderRadius: 5,
    padding: wp(3),
    fontSize: hp(2),
    color: '#2c3e50',
    borderColor: '#bdc3c7',},
    create_button:{
                backgroundColor:Color.primaryBGColor,
                padding: 10,
                alignItems: 'center',
                flex: 1,
                marginVertical:7,marginBottom:hp(4)
              }
});