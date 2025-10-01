import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors';
const textColorPrimary = '#343a40';
const borderColor = '#ced4da';

export default StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: wp(5),
   

  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp(5),
    width: '100%',
height: hp(28),
justifyContent:'space-evenly'
  },
  label: {
    fontSize: hp(2),
    marginBottom: hp(1),
    fontWeight: '600',
    color: '#333',
  },

  multilineInput: {
    minHeight: hp(12),
    textAlignVertical: 'top',
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    justifyContent: 'center',
  },
  dateText: {
    fontSize: hp(2),
    color: '#000',
  },
  saveBtn: {
        backgroundColor: '#008080',
        paddingVertical: hp(1.5),
        borderRadius: 6,
        marginTop: hp(2),
      },
      btnText: {
        color: '#fff',
        fontSize: hp(2),
        textAlign: 'center',
        fontWeight: 'bold',
      },
      cancelText: {
        color: 'red',
        textAlign: 'center',
        marginTop: hp(1),
        fontSize: hp(1.8),
      },
      saveButton: {
        backgroundColor: Color.primaryBGColor,
        height: hp(5),
        borderRadius: wp(5),
        // marginBottom: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(35),
      },
      saveButtonText: {
        color: Color.white,
        fontSize: hp(2.5),
        fontWeight: 'bold',
        marginLeft: wp(1),
      },
      cancelButton: {
        backgroundColor: Color.white,
        height: hp(5),
        borderRadius: wp(5),
        borderWidth: 1,
        borderColor: Color.primaryBGColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(35),
      },
      cancelButtonText: {
        color: Color.textPrimaryColor,
        fontSize: hp(2.5),
        fontWeight: 'bold',
        marginLeft: wp(1),
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp(2),
      },
      sectionTitle: {
          fontSize: hp(2.2),
          fontWeight: 'bold',
          color: textColorPrimary,
          marginBottom: hp(1.5),
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
          paddingBottom: hp(0.5),
        },
        inputGroup: {
          marginBottom: hp(2),
          justifyContent: 'center',
        },
   
        required: {
          color: 'red',
        },
        input: {
          height: hp(5.2),
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: wp(1),
          paddingHorizontal: wp(3),
          fontSize: hp(1.8),
          backgroundColor: Color.white,
          elevation: 2,
        },
        scrollContainer: {
  flexGrow: 1,
  paddingBottom: 20,
},
formContainer: {
  backgroundColor: Color.white,
  padding: wp(4),
  borderRadius: wp(1),
  marginBottom: hp(2),
},
  container: {
       flex: 1,
       // padding: wp('4%'),
       backgroundColor: '#FFF',
     },
});
