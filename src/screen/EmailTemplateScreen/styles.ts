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
    backgroundColor: '#f8fafc',
    padding: wp(4),
  },
  header: {
    fontSize: hp(2.8),
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: hp(2),
  },
  scrollContainer: {
    paddingBottom: hp(4),
  },
  templateCard: {
    backgroundColor: 'white',
    borderRadius: wp(2),
    padding: wp(4),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  templateTitle: {
    fontSize: hp(2.2),
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: wp(3),
  },
  templateDescription: {
    fontSize: hp(1.9),
    color: '#64748b',
    lineHeight: hp(2.5),
    marginBottom: hp(1),
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginTop: hp(0.5),
  },
});
