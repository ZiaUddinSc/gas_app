import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    elevation: 5,
  },
  label: {
    fontSize: hp(2),
    color: '#333',
    marginBottom: hp(1),
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
    fontSize: hp(2),
    color: '#000',
    marginBottom: hp(2),
  },
  multilineInput: {
    minHeight: hp(12),
    textAlignVertical: 'top',
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
});
