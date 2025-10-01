import React, { useState } from 'react';
import { View, Text, Image,Platform,StatusBar, TextInput,Clipboard, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Color from '../../theme/Colors';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {

    ArrowLeft,
    Copy
  } from 'lucide-react-native';
const InviteFriendScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const inviteCode = '4854WAF';

  const handleSendInvite = () => {
   
    console.log('Inviting with email:', email);
    alert(`Invite sent to ${email}!`);
  };

    const copyToClipboard = () => {
      Clipboard.setString(inviteCode);
      alert('Copied to clipboard');
    };

  return (
    <SafeAreaView style={styles.safeArea}>
       <CustomHeader
        title="Invite Engineers"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
        onRightPress1={() => alert('Notification')}
      />
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require('../../assets/invite.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Title and Subtitle */}
      <Text style={styles.title}>Invite Engineers</Text>
      <Text style={styles.subtitle}>Invite an engineer and get free subscription</Text>
      <Text style={styles.description}> You both will get a promo when your invited engineer makes his first subscription.</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Invite Code */}
      <View style={styles.copyRow}>
            <Text style={styles.code}>{inviteCode}</Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
              <Copy color="white" size={20} />
            </TouchableOpacity>
          </View>
      <Text style={styles.inviteCodeLabel}>Your invite code</Text>

      {/* Send Invite Button */}
      <TouchableOpacity style={styles.button} onPress={handleSendInvite}>
        <Text style={styles.buttonText}>SEND INVITE</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
                flex: 1,
                backgroundColor: Color.primaryBGColor,
              },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  illustration: {
    width: '100%',
    height: 260, 
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginBottom: 15,
    color: '#555', 
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  inviteCode: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#e91e63', 
  },
  inviteCodeLabel: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  button: {
    backgroundColor: Color.primaryBGColor, 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default InviteFriendScreen;