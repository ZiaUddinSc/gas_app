import {StyleSheet} from 'react-native';
import Color from '../../theme/Colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 14,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primaryBGColor,
    textAlign: 'center',
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 14,
    color: Color.darkGray,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Color.black,
  },
  infoText: {
    marginTop: 5,
    fontSize: 13,
    color: Color.gray,
  },
  copyRow: {
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  code: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBGColor,
  },
  copyBtn: {
    backgroundColor: Color.primaryBGColor,
    padding: 6,
    borderRadius: 6,
  },
  socialRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  socialBtn: {
    flexDirection: 'row',
    backgroundColor: Color.primaryBGColor,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    marginLeft: 6,
  },
  closeBtn: {
    marginTop: 20,
  },
  closeText: {
    color: Color.primaryBGColor,
    fontWeight: 'bold',
  },
});
