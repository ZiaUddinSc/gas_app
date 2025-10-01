import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {PhoneCall, X, UserCircle2Icon} from 'lucide-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from './style';

interface Props {
  visible: boolean;
  numbers: string[];
  onClose: () => void;
  onSelect: (number: string) => void;
}

const CallNumberModal: React.FC<Props> = ({
  visible,
  numbers,
  onClose,
  onSelect,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X color={'#333'} />
          </TouchableOpacity>
          <Text style={styles.title}>Dial Number</Text>

          {numbers.map((num, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => onSelect(num)}>
              <>
                <UserCircle2Icon
                  color="#008080"
                  size={wp(5)}
                  style={styles.avatar}
                />
                <View style={styles.info}>
                  <Text style={styles.number}>{num}</Text>
                </View>
                <View style={styles.icon}>
                  <PhoneCall color="#008080" size={wp(5)} />
                </View>
              </>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default CallNumberModal;
