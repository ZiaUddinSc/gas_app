import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: wp(5),
  },
  section: {
    marginBottom: hp(3),
    backgroundColor: 'white',
    borderRadius: wp(2),
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: '600',
    marginBottom: hp(2),
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2),
    padding: wp(3),
    marginBottom: hp(1),
  },
  searchPlaceholder: {
    color: '#999',
    marginLeft: wp(2),
    fontSize: hp(1.8),
  },
  copyButton: {
    alignSelf: 'flex-start',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(3),
    backgroundColor: '#e3f2fd',
    borderRadius: wp(1),
  },
  copyButtonText: {
    color: '#1976d2',
    fontSize: hp(1.6),
  },
  inputContainer: {
    marginBottom: hp(1.5),
  },
  label: {
    fontSize: hp(1.8),
    color: '#555',
    marginBottom: hp(0.5),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2),
    padding: wp(3),
    fontSize: hp(1.8),
    backgroundColor: 'white',
  },
  multilineInput: {
    minHeight: hp(10),
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2),
    backgroundColor: 'white',
  },
  inputIcon: {
    marginLeft: wp(3),
  },
  inputWithIconPadding: {
    flex: 1,
    paddingLeft: wp(2),
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2),
    padding: wp(3),
    backgroundColor: 'white',
  },
  datePlaceholder: {
    flex: 1,
    marginLeft: wp(2),
    fontSize: hp(1.8),
    color: '#999',
  },
  errorText: {
    color: 'red',
    fontSize: hp(1.6),
    marginTop: hp(0.5),
  },
  submitButton: {
    backgroundColor: '#1976d2',
    padding: wp(4),
    borderRadius: wp(2),
    alignItems: 'center',
    marginTop: hp(2),
  },
  submitButtonText: {
    color: 'white',
    fontSize: hp(2),
    fontWeight: '600',
  },
  icon: {
    marginRight: wp(2),
  },
});