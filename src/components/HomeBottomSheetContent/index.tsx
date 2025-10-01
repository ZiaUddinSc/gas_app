import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Wrench,
  User,
  Calendar,
  Award,
  FileText,
  X,
  CircleX,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors'; // Assuming you have a Colors file
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const items = [
  {
    label: 'New Certificate',
    icon: <Award size={wp(6)} />,
    iconColor: '#FFFF00',
  },

  {label: 'Quote', icon: <Calendar size={wp(6)} />, iconColor: '#FFFF00'},

  {label: 'Invoice', icon: <FileText size={wp(6)} />, iconColor: '#FFFF00'},
  {label: 'Job', icon: <Wrench size={wp(6)} />, iconColor: '#FFFF00'},
  {label: 'Customer', icon: <User size={wp(6)} />, iconColor: '#FFFF00'},
];

const HomeBottomSheetContent = ({onClose}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onNext = action => {
    if (action.label === 'New Certificate') {
      navigation.navigate('Certificate');
    } else if (action.label === 'Invoice') {
      navigation.navigate('InvoiceScreen');
      // navigation.navigate('InvoiceEditScreen');
      
    } else if (action.label === 'Quote') {
      navigation.navigate('QuoteScreen');
    }
  };

  return (
    <BottomSheetScrollView contentContainerStyle={{elevation: 5}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New</Text>
          <TouchableOpacity style={styles.arrowDown} onPress={() => onClose()}>
            <CircleX size={wp(7)} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          {items.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionItem,
                {
                  backgroundColor: Color.white,
                  // backgroundColor: index % 2 === 0 ? '#eff9f9' : Color.white,
                  borderTopRightRadius:
                    action.label === 'New Certificate' ? 10 : null,
                  borderTopLeftRadius:
                    action.label === 'New Certificate' ? 10 : null,
                  borderBottomRightRadius:
                    action.label === 'Customer' ? 10 : null,
                  borderBottomLeftRadius:
                    action.label === 'Customer' ? 10 : null,
                },
              ]}
              onPress={() => {
                // Handle action based on label
                onNext(action);
                onClose(); // Close the bottom sheet after action (optional)
              }}>
              <View style={[styles.iconContainer]}>
                {React.cloneElement(action.icon, {
                  color: Color.primaryBGColor,
                })}
              </View>

              <Text style={[styles.actionText, {color: Color.primaryBGColor}]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e8f0',
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    // padding: wp(4),
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: hp(2),
    borderBottomWidth: 0.5,
    borderBottomColor: Color.primaryBGColor,
    paddingHorizontal: wp(4),
    paddingBottom: wp(4),
    width: wp(100),
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  arrowDown: {},
  title: {
    fontSize: wp(4),
    color: Color.textColor,
    fontWeight: 'bold',
  },
  actionsContainer: {
    margin: hp(1),
    backgroundColor: '#e2e8f0',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    width: wp(94),
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  iconContainer: {
    marginRight: wp(3),
  },
  actionText: {
    fontSize: wp(3.8),
    color: Color.textColor,
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.2),
    marginRight: wp(3),
  },
  cancelText: {
    fontSize: wp(4.5),
    color: '#6B7280',
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: Color.primaryBGColor,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.2),
    borderRadius: wp(1),
  },
  okText: {
    fontSize: wp(4.5),
    color: Color.white,
    fontWeight: 'bold',
  },
});

export default HomeBottomSheetContent;
