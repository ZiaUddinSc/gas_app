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
    backgroundColor: '#f4fafa',
  },
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginBottom: wp(4),
    color: '#004d4d',
  },
  card: {
    backgroundColor: 'white',
    // padding: wp(4),
    paddingVertical: wp(2),
    borderRadius: wp(2),
    marginBottom: wp(4),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    marginBottom: wp(2),
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2.5),
    marginLeft: wp(4),
  },
  icon: {
    marginRight: wp(2.5),
  },
  label: {
    fontSize: wp(4),
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  line: {
    height: 1,
    width: wp(90),
    backgroundColor: '#007070',
    marginBottom: hp(1),
  },
});

export default styles;
