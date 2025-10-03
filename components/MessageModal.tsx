import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {COLORS, SIZES, icons, illustrations} from '../constants';
import Button from '../components/Button';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';

interface MessageModalProps {
  open: boolean;
  heading?: string;
  title?: string;
  icon?: string;
}

// Suppress defaultProps warning
const error = console.error;
// console.error = (...args: any[]) => {
//     if (/defaultProps/.test(args[0])) return;
//     error(...args);
// };

const MessageModal: React.FC<MessageModalProps> = ({
  open,
  title,
  heading,
  icon,
}) => {
  const {colors, dark} = useTheme();

  const modalVisible = open;

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <View style={styles.backgroundIllustration}>
            <Image
              source={illustrations.background}
              resizeMode="contain"
              style={[
                styles.modalIllustration,
                {
                  tintColor: dark ? COLORS.white : COLORS.primary,
                },
              ]}
            />
            <Image
              source={icon ? icon : icons.cart2}
              resizeMode="contain"
              style={[
                styles.editPencilIcon,
                {
                  tintColor: dark ? COLORS.dark3 : COLORS.white,
                },
              ]}
            />
          </View>
          <Text
            style={[
              styles.modalTitle,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            {heading}
          </Text>
          <Text
            style={[
              styles.modalSubtitle,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}>
            {/* You have successfully made order. */}
            {title}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 12,
  },
  modalContainer: {
    margin: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalSubContainer: {
    height: 520,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22,
  },
  successBtn: {
    width: '100%',
    marginTop: 12,
    borderRadius: 32,
  },
  receiptBtn: {
    width: '100%',
    marginTop: 12,
    borderRadius: 32,
    backgroundColor: COLORS.tansparentPrimary,
    borderColor: COLORS.tansparentPrimary,
  },
  backgroundIllustration: {
    height: 150,
    width: 150,
    marginVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPencilIcon: {
    width: 52,
    height: 52,
    tintColor: COLORS.white,
    zIndex: 99999,
    position: 'absolute',
    top: 54,
    left: 54,
  },
});

export default MessageModal;
