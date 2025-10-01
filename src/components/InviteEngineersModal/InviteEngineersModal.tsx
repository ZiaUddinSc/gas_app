// import React from 'react';
// import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput,Clipboard } from 'react-native';
// import {
// Facebook,
// MailPlus,
// MessageSquareMore
// } from 'lucide-react-native';
// import Color from '../../theme/Colors'

// const InviteEngineersModal = ({ isVisible, onClose }) => {
//   const referralCode = 'BHU543109'; // আপনার রেফারেল কোড

//   const handleCopyToClipboard = () => {
//     Clipboard.setString(referralCode);
//     alert('Referral code copied to clipboard!');
//   };

//   const handleShare = (platform) => {
//     // এখানে শেয়ার করার লজিক যোগ করুন (যেমন - শেয়ারিং লাইব্রেরি ব্যবহার করে)
//     alert(`Sharing via ${platform}`);
//     onClose(); // শেয়ার করার পরে মডেল বন্ধ করুন
//   };

//   return (
//     <Modal
//       visible={isVisible}
//       transparent={true}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Invite a engineer and get free subscription</Text>
//           <Text style={styles.modalDescription}>
//             You both will get a promo when your invited engineer make his first subscription. <Text style={{ color: 'blue' }}>See More</Text>
//           </Text>

//           <View style={styles.benefitItem}>
//             <Text style={styles.benefitIcon}>📄</Text>
//             <View>
//               <Text style={styles.benefitTitle}>You will get 30 days free subscription</Text>
//               <Text style={styles.benefitText}>Once your friend will subscribe for first time you will additionally 30 days free subscription.</Text>
//             </View>
//           </View>

//           <View style={styles.benefitItem}>
//             <Text style={styles.benefitIcon}>👷</Text>
//             <View>
//               <Text style={styles.benefitTitle}>They will get 90 days free subscription</Text>
//               <Text style={styles.benefitText}>Your friend will get a 90 days free trail period. Normaly the free trails only available for 14 days.</Text>
//             </View>
//           </View>

//           <View style={styles.referralContainer}>
//             <TextInput
//               style={styles.referralInput}
//               value={referralCode}
//               editable={false}
//             />
//             <TouchableOpacity style={styles.copyButton} onPress={handleCopyToClipboard}>
//               <Text style={styles.copyButtonText}>Copy</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.shareButtons}>
//             <TouchableOpacity style={styles.shareButton} onPress={() => handleShare('Facebook')}>
//               <Facebook size={24} color={'#FFF'}/>
//               <Text style={styles.shareButtonText}>Facebook</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.shareButton} onPress={() => handleShare('Email')}>
//               <MailPlus size={24} color={'#FFF'}/>
//               <Text style={styles.shareButtonText}> Email</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.shareButton} onPress={() => handleShare('SMS')}>
//             <MessageSquareMore size={24} color={'#FFF'}/>
//               <Text style={styles.shareButtonText}>SMS</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // হালকা কালো ব্যাকগ্রাউন্ড
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   modalDescription: {
//     fontSize: 14,
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   benefitItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   benefitIcon: {
//     fontSize: 20,
//     marginRight: 10,
//   },
//   benefitTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   benefitText: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   referralContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   referralInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//   },
//   copyButton: {
//     backgroundColor: '#4CAF50', // সবুজ রঙ
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   copyButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   shareButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 15,
//   },
//   shareButton: {
//     backgroundColor: Color.primaryBGColor,
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     borderRadius: 5,
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   shareButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     paddingLeft:3
//   },
//   closeButton: {
//     backgroundColor: 'lightgray',
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default InviteEngineersModal;

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Facebook, Mail, MessageSquare, Copy} from 'lucide-react-native';
import Color from '../../theme/Colors';
import { styles } from './styles';

const InviteEngineersModal = ({isVisible, onClose,onPress}) => {
  const inviteCode = 'BHU543109';

  const copyToClipboard = () => {
    Clipboard.setString(inviteCode);
    alert('Copied to clipboard');
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animatable.View
          animation="zoomIn"
          duration={500}
          style={styles.modalContainer}>
          <Text style={styles.title}>Invite an engineer and get free subscription</Text>
          <Text style={styles.subtitle}>
            You both will get a promo when your invited engineer makes his first subscription.
          </Text>

          <View style={styles.box}>
            <Text style={styles.boldText}>You will get 30 days free subscription</Text>
            <Text style={styles.infoText}>
              Once your friend will subscribe for the first time, you will additionally get 30 days.
            </Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.boldText}>They will get 90 days free subscription</Text>
            <Text style={styles.infoText}>
              Your friend will get 90 days free trial period. Normally the free trial is only 14 days.
            </Text>
          </View>

          <View style={styles.copyRow}>
            <Text style={styles.code}>{inviteCode}</Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
              <Copy color="white" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Facebook size={20} color="white" />
              <Text style={styles.btnText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Mail size={20} color="white" />
              <Text style={styles.btnText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <MessageSquare size={20} color="white" />
              <Text style={styles.btnText}>SMS</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default InviteEngineersModal;
