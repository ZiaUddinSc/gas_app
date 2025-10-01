import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C5D73',
  },
  scrollContainer: {},
  card: {
    backgroundColor: '#fff',

    padding: wp('4%'),
  },
  sectionTitle: {
    fontSize: wp('6%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
  },
  fieldContainer: {
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: wp('4%'),
    color: '#444',
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: hp('1%'),
    fontSize: wp('4.2%'),
  },
  selectBox: {
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  selectText: {
    fontSize: wp('4%'),
    color: '#333',
  },
  addItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: hp('1.5%'),
  },
  amountBox: {
    // backgroundColor: '#F5F5F5',
    
    borderRadius: 10,
    marginBottom: hp('2%'),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginVertical: hp('0.5%'),
  },
  datePickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: hp('1.5%'),
  },
  notesBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: hp('1.5%'),
  },
  submitButton: {
    backgroundColor: '#009688',
    paddingVertical: hp('1.8%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  submitText: {
    fontSize: wp('4.5%'),
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: Color.primaryBGColor,
    height: hp(6),
    borderRadius: wp(10),
    marginBottom: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Color.white,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //Line Item Add row 
  LineItemAddRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'red',
    padding:2,
    paddingVertical: hp('1.2%'),
  },
  lineDescription:{

  },
  unitsPrice:{

  }

});
