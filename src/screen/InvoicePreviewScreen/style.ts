import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBGColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: Color.white,
    elevation: 3,
  },
  title: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp(2),
  },
  pdfContainer: {
    flex: 1,
    margin: wp(4),
    backgroundColor: '#f8f9fa',
    borderRadius: wp(2),
    overflow: 'hidden',
  },
  pdf: {
    width: '100%',
    height: '100%',
  },
  buttonRow: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    
    padding: wp(4),
    backgroundColor: Color.white,
  },
  button: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    margin:hp(.5),
    backgroundColor: '#008080',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: hp(1.8),
    marginLeft: wp(1.5),
    fontWeight: '600',
  },
});

export default styles;
