import {StyleSheet, Platform, StatusBar} from 'react-native';
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
    backgroundColor: '#f4f4f4',
  },
  scrollContent: {
    padding: wp('3%'),
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: wp('0.5%')},
    shadowOpacity: 0.1,
    shadowRadius: wp('1%'),
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    padding: wp('1%'),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
    paddingVertical: hp('0.5%'),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('45%'),
    marginRight: wp('2%'),
  },
  icon: {
    marginRight: wp('3%'),
    width: wp('5%'),
    alignItems: 'center',
  },
  labelText: {
    fontSize: wp('4%'),
    color: '#777',
    paddingRight: wp(2),
  },
  value: {
    fontSize: wp('4%'),
    color: '#333',
    flex: 1,
    paddingLeft: wp(3),
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  logoImage: {
    width: wp('30%'),
    height: hp('8%'),
  },

  header: {flexDirection: 'row', alignItems: 'center', padding: 16},
  title: {fontSize: 18, fontWeight: 'bold', marginLeft: 12},
  form: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  label: {fontWeight: '600', marginTop: 14, color: '#222'},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(1),
    padding: Platform.OS === 'ios' ? hp(1.5) : hp(1),
    fontSize: hp(1.8),
    color: '#333',
  },
  saveButton: {
    backgroundColor: Color.primaryBGColor,
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  saveText: {color: 'white', fontWeight: 'bold', textAlign: 'center'},
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: wp('0.5%')},
    shadowOpacity: 0.1,
    shadowRadius: wp('1%'),
    elevation: 3,
  },
  toggleButton: {},
  active: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  inactive: {
     height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#D5D5D5',
  },
  form1: {
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 12,
    padding: 5,
  },
});
