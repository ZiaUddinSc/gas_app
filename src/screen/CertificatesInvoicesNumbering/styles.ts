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
fontSize: hp(2.5),
fontWeight: 'bold',
color: '#1e293b',
marginBottom: hp(0.5),
},
subHeader: {
fontSize: hp(2),
color: '#64748b',
marginBottom: hp(2),
},
scrollContainer: {
paddingBottom: hp(12),
},
card: {
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
typeHeader: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: hp(1.5),
},
typeName: {
fontSize: hp(2),
fontWeight: '600',
color: '#1e293b',
marginLeft: wp(3),
},
inputGroup: {
marginBottom: hp(1.5),
},
label: {
fontSize: hp(1.8),
color: '#64748b',
marginBottom: hp(0.5),
},
input: {
borderWidth: 1,
borderColor: '#cbd5e1',
borderRadius: wp(1),
padding: wp(3),
fontSize: hp(1.9),
backgroundColor: '#fff',
},
buttonContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
position: 'absolute',
bottom: 0,
left: 0,
right: 0,
padding: wp(4),
backgroundColor: '#f8fafc',
borderTopWidth: 1,
borderTopColor: '#e2e8f0',
},
cancelButton: {
backgroundColor: '#e2e8f0',
padding: wp(3.5),
borderRadius: wp(2),
flex: 1,
marginRight: wp(2),
alignItems: 'center',
},
cancelButtonText: {
color: '#64748b',
fontWeight: '600',
fontSize: hp(1.9),
},
updateButton: {
backgroundColor: '#3b82f6',
padding: wp(3.5),
borderRadius: wp(2),
flex: 1,
marginLeft: wp(2),
alignItems: 'center',
},
updateButtonText: {
color: 'white',
fontWeight: '600',
fontSize: hp(1.9),
},
});
