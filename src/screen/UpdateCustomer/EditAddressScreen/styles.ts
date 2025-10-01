import { StyleSheet,Platform,StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../../../theme/Colors';

const textColorPrimary = '#343a40';
const borderColor = '#ced4da';
const errorTextColor = 'red';

const styles = StyleSheet.create({
 safeArea: {
    flex: 1,
    backgroundColor: Color.primaryBGColor,
  },
  container: {
    flexGrow: 1,
    // paddingHorizontal: wp(4),
    // paddingTop: hp(2),
    // paddingBottom: hp(3),
    // backgroundColor:Color.white,
    // marginBottom:hp(6)
  },

  formContainer: {
    backgroundColor: Color.white,
    padding: wp(4),
    borderRadius: wp(1),
    flex:1,
    // borderWidth: 1,
    // borderColor: borderColor,
    height:hp(100)
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
  label: {
    fontSize: hp(1.8),
    color: textColorPrimary,
    marginBottom: hp(0.5),
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
  multilineInput: {
    minHeight: hp(10),
    textAlignVertical: 'top',
  },
  dropdown: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    backgroundColor: Color.white,
    elevation: 2,
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: hp(2),
  },
  saveButton: {
    backgroundColor: Color.primaryBGColor,
    height: hp(6),
    borderRadius: wp(10),
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Color.white,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  cancelButton: {
    backgroundColor: Color.white,
    height: hp(6),
    borderRadius: wp(10),
    borderWidth: 1,
    borderColor: Color.primaryBGColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  cancelButtonText: {
    color: Color.textPrimaryColor,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  errorText: {
    fontSize: hp(1.4),
    color: errorTextColor,
    marginTop: hp(0.3),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  switchPlaceholder: {
    width: wp(10),
    height: hp(4),
    backgroundColor: '#ccc', // Placeholder for Switch
    borderRadius: wp(2),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  radioGroup: {
    // flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: '#F2F0EF',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    // borderWidth:1
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioOuterActive: {
    borderColor: '#008080',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#008080',
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default styles;