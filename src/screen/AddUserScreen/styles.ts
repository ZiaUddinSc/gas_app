import { StyleSheet,Platform,StatusBar } from 'react-native';
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
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: wp(5),
    paddingBottom: hp(5),
  },
  sectionTitle: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp(1),
    marginTop: hp(2),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: wp(2),
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: hp(1.5),
  },
  label: {
    fontSize: hp(1.8),
    color: '#666',
    marginBottom: hp(0.5),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(1),
    padding: Platform.OS === 'ios' ? hp(1.5) : hp(1),
    fontSize: hp(1.8),
    color: '#333',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: hp(1.5),
    marginTop: hp(0.5),
  },
  formError: {
    color: '#ff4444',
    fontSize: hp(1.8),
    textAlign: 'center',
    marginTop: hp(1),
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subscriptionOption: {
    flexDirection: 'row',
    padding: wp(2),
    borderRadius: wp(1),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f7ff',
  },
  radioContainer: {
    justifyContent: 'center',
    marginRight: wp(3),
  },
  radioOuter: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
    backgroundColor: '#007AFF',
  },
  subscriptionDetails: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: hp(1.9),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp(0.5),
  },
  subscriptionDescription: {
    fontSize: hp(1.6),
    color: '#666',
    marginBottom: hp(1),
  },
  featuresButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuresButtonText: {
    color: '#007AFF',
    fontSize: hp(1.6),
    fontWeight: '600',
  },
  chevron: {
    marginLeft: wp(1),
  },
  rotateChevron: {
    transform: [{rotate: '180deg'}],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  button: {
    flex: 1,
    padding: hp(1.8),
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: wp(2),
  },
  saveButton: {
    backgroundColor: Color.primaryBGColor,
    marginLeft: wp(2),
  },
  buttonText: {
    fontSize: hp(1.8),
    fontWeight: '600',
  },
});

export default styles;