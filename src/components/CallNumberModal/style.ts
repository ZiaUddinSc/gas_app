import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: wp(5),
    borderRadius: wp(2),
    width: '80%',
  },
  title: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 4,
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  number: {
    marginLeft: wp(3),
    fontSize: wp(4.2),
    color: '#111',
    fontWeight: '500',
  },

  closeButton: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderColor: '#333',
    right: 5,
    top: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  icon: {
    marginLeft: 10,
  },
});
