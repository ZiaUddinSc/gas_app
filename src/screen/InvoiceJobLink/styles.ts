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
        // padding: wp('2%'),
        backgroundColor: Color.white,
      },

      filterRow: {
        flexDirection: 'row',
        // marginBottom: hp('1.5%'),
        gap: wp('2%'),
        flexWrap: 'wrap',
        alignItems:'center',
        paddingHorizontal:wp(1),
        
      },
      searchIcon:{position:'absolute',marginLeft:wp(3)
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: wp('2%'),
        padding: wp('2.5%'),
        backgroundColor: '#fff',
        paddingLeft:wp(8)
      },
      dropdown: {
        width: wp('25%'),
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: wp('2%'),
        paddingHorizontal: wp('2.5%'),
        backgroundColor: '#fff',
      },
      goButton: {
        backgroundColor: Color.primaryBGColor,
        borderRadius: wp('2%'),
        paddingHorizontal: wp('4%'),
        justifyContent: 'center',
      },
      goText: {
        color: 'white',
      },
      resetButton: {
        backgroundColor: '#E2E8F0',
        borderRadius: wp('2%'),
        paddingHorizontal: wp('4%'),
        justifyContent: 'center',
      },
      resetText: {
        color: '#1E293B',
      },
      tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
  
        borderBottomWidth: 1,
        borderColor: '#CBD5E1',
      },
      headerText: {
        flex: 1,
        fontWeight: '600',
        color: '#475569',
        fontSize: wp('3.5%'),
      },
      jobCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp('1.5%'),
        borderBottomWidth: 1,
        borderColor: '#E2E8F0',
      },
      jobTitle: {
        flex: 1,
        color: '#1E293B',
        fontSize: wp('3.8%'),
      },
      jobText: {
        marginRight: wp(2),
        color: '#555',
      },
      emptyText: {
        textAlign: 'center',
        marginVertical: hp('2%'),
        color: '#94A3B8',
      },
      pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp('1.5%'),
        alignItems: 'center',
        gap: wp('4%'),
      },
      pageText: {
        fontWeight: 'bold',
        fontSize: wp('4%'),
        color: '#0F172A',
      },
      addJobBtn: {
        // marginBottom: hp('1%'),
        // backgroundColor: Color.primaryBGColor,
        padding: wp('3%'),
        // borderRadius: wp('4%'),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
         borderBottomWidth:3,
             borderBottomColor:'#ddd7d6'
      },
      addJobText: {
        color: Color.textPrimaryColor,
        fontSize: wp('4%'),
        fontWeight:'700'
      },
      card_content:{
        alignItems:'center',
        flexDirection:'row'
    },
      card_row:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    card_text:{ 
      color:'black',
      fontSize: hp(1.7),
      paddingLeft:wp(3),
      fontWeight:'400',
      paddingTop:7
     },
    card_name:{ 
      color:'black',
      fontSize: hp(1.9),
      paddingLeft:wp(3),
      fontWeight:'500',
      paddingTop:7
     },
     card_title:{ 
      color:'black',
      fontSize: hp(1.8),
      fontWeight:'700',
      paddingLeft:wp(3)
     },
     line:{
      width: wp(94),
      height: 2,
      backgroundColor: 'gray',
      opacity: 0.2,
      marginVertical:hp(1),
      alignSelf:'center'
    },
       scrollContent: {
        padding: wp('1%'),
        paddingBottom: hp('10%'),
      },
      card:{
        padding: wp('2%'),
         borderWidth:0.5,
             borderColor:'#ddd7d6',
             margin:wp(1),
             marginHorizontal:hp(1),
             borderRadius:wp(2),
             backgroundColor:'rgba(220,220,220,0.1)'

      },
      saveButton: {
                backgroundColor: Color.primaryBGColor,
                height:hp(6),
                borderRadius: wp(10),
                marginBottom:hp(1),
                   alignItems:'center',
                justifyContent:'center'
              },
              saveButtonText: {
                color: Color.white,
                fontSize: hp(2.5),
                fontWeight: 'bold',
                marginLeft: wp(1),
              },
});

export default styles;