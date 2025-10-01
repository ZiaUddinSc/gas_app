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
    backgroundColor: '#f5f5f5',
    padding: wp(4),
  },
  header: {
    fontSize: hp(3),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: '#333',
  },
  scrollContainer: {
    paddingBottom: hp(2),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: wp(3),
    padding: wp(5),
    marginBottom: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginBottom: hp(1),
    color: '#222',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  email: {
    fontSize: hp(2),
    color: '#666',
    marginLeft: wp(3),
  },
  subscriptionType: {
    fontSize: hp(2),
    color: '#666',
    marginLeft: wp(3),
  },
  dateContainer: {
    backgroundColor: '#f0f0f0',
    padding: wp(3),
    borderRadius: wp(2),
    marginBottom: hp(1.5),
  },
  date: {
    fontSize: hp(1.8),
    color: '#555',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  price: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: wp(2),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    borderRadius: wp(1.5),
  },
  status: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: hp(1.5),
  },
  printButton: {
    padding: wp(1),
  },
});
