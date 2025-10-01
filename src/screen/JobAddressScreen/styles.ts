import {StyleSheet, Platform, StatusBar} from 'react-native';
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
    padding: wp(5),
    backgroundColor: '#eaf2f5',
  },
  sectionTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(2),
  },
  subHeader: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginTop: hp(3),
    marginBottom: hp(1),
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(2),
    padding: wp(4),
    marginBottom: hp(1),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  infoText: {
    marginLeft: wp(2),
    fontSize: wp(3.8),
    color: '#444',
    flex: 1,
    flexWrap: 'wrap',
  },
  noDataWrapper: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: wp(5),
  height:hp(89)
},
noDataText: {
  fontSize: hp(2),
  color: '#666',
  textAlign: 'center',
},
});

export default styles;
