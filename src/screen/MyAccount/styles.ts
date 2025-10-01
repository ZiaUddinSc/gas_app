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
          },
          content: {
            padding: 20,
          },
          section: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          },
          sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
            color: '#333',
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            paddingBottom: 8,
          },
          infoRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
          iconView: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          label: {
            fontSize: 16,
            color: '#666',
            paddingLeft:3
          },
          value: {
            fontSize: 16,
            color: '#333',
            fontWeight: '500',
          },
          naText: {
            fontSize: 16,
            color: '#888',
            fontStyle: 'italic',
          },
          linkText: {
            fontSize: 16,
            color: '#007AFF',
          },
          signatureContainer: {
            height: 100,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          },
          signatureImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          },
          addSignature: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          addSignatureText: {
            marginLeft: 10,
            color: '#555',
          },
          popupOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          },
          popup: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            width: '80%',
          },
          popupTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
            color: '#333',
          },
          popupInput: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            padding: 10,
            marginBottom: 15,
          },
          popupButtons: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
          },
          popupButton: {
            padding: 10,
            marginLeft: 10,
          },
          popupButtonPrimary: {
            backgroundColor: Color.primaryBGColor,
            borderRadius: 5,
            padding: 10,
            alignItems:'center',
            justifyContent:'center',
            marginTop:10
          },
          popupButtonText: {
            color: '#FFF',
            fontSize:18,
            fontWeight:'600'
          },
          modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          
          modalBox: {
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          },
          
          modalBtn: {
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          },
          
          modalBtnPrimary: {
            padding: 15,
            backgroundColor: '#1E90FF',
            borderRadius: 10,
            marginTop: 10,
          },
          
          modalCancel: {
            padding: 15,
            marginTop: 10,
            alignItems: 'center',
          },
          
          modalText: {
            fontSize: 16,
            textAlign: 'center',
          },
          
          modalTextWhite: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
          },
});
