import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronDown, FileText, CircleX} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const groupedData = [
  {
    groupTitle: 'Domestic Gas Records',
    items: [
      {id: '1', label: 'CP12 Gas Safety Record (Landlord/Homeowner)'},
      {id: '2', label: 'CP12 Landlord Gas Safety Record'},
      {id: '3', label: 'CP14 Gas Warning Notice'},
      {id: '4', label: 'Service / Maintenance Record'},
      {id: '5', label: 'Gas Breakdown Record'},
      {id: '6', label: 'Gas Boiler System Commissioning Checklist'},
    ],
  },
  {
    groupTitle: 'Miscellaneous',
    items: [
      {id: '7', label: 'Powerflush Certificate'},
      {id: '8', label: 'Installation / Commissioning Decommissioning Record'},
      {id: '9', label: 'Unvented Hot Water Cylinders'},
      {id: '10', label: 'Job Sheet'},
    ],
  },
];
const roundedTop = [
  'Quote',
  'CP12 Gas Safety Record (Landlord/Homeowner)',
  'Powerflush Certificate',
];
const roundedBottom = [
  'Invoice',
  'Gas Boiler System Commissioning Checklist',
  'Job Sheet',
];

const GasBottomSheet = ({onClose}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onNext = action => {
    if (
      action.label === 'CP12 Gas Safety Record (Landlord/Homeowner)' ||
      action.label === 'CP12 Landlord Gas Safety Record' ||
      action.label === 'CP14 Gas Warning Notice' ||
      action.label === 'Service / Maintenance Record' ||
      action.label === 'Gas Breakdown Record' ||
      action.label === 'Gas Boiler System Commissioning Checklist'
    ) {
      navigation.navigate('CP12Form', {titleData: action.label});
    } else if (
      action.label === 'Powerflush Certificate' ||
      action.label === 'Installation / Commissioning Decommissioning Record' ||
      action.label === 'Unvented Hot Water Cylinders' ||
      action.label === 'Job Sheet'
    ) {
  
      navigation.navigate('Miscellaneous', {titleData: action.label});
    }
  };

  return (
    <BottomSheetScrollView contentContainerStyle={{elevation: 5}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Certificate Types</Text>
          <TouchableOpacity style={styles.arrowDown} onPress={() => onClose()}>
            <CircleX size={wp(7)} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {groupedData.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{group.groupTitle}</Text>

            {group.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.actionItem,
                  {
                    backgroundColor: Color.white,
                    borderTopRightRadius: roundedTop.includes(item.label)
                      ? 10
                      : null,
                    borderTopLeftRadius: roundedTop.includes(item.label)
                      ? 10
                      : null,

                    borderBottomRightRadius: roundedBottom.includes(item.label)
                      ? 10
                      : null,
                    borderBottomLeftRadius: roundedBottom.includes(item.label)
                      ? 10
                      : null,
                  },
                ]}
                onPress={() => {
                  // Handle click
                  onNext(item);
                  onClose();
                }}>
                <View style={styles.iconContainer}>
                  <FileText size={24} color={Color.primaryBGColor} />
                </View>

                <Text
                  style={[
                    styles.actionText,
                    {
                      color: Color.primaryBGColor,
                    },
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    width: wp(94),
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  iconContainer: {
    marginRight: wp(3),
  },

  groupContainer: {
    width: wp(94),
    marginTop: hp(1),
  },
  groupTitle: {
    fontSize: wp(3.6),
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: hp(1),
  },
  // actionItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: hp(1),
  //   paddingHorizontal: wp(3),
  //   borderRadius: wp(2),
  //   elevation: 2,
  //   marginBottom: hp(1),
  // },
  // iconContainer: {
  //   marginRight: wp(2),
  // },
  actionText: {
    fontSize: wp(3.8),
    fontWeight: '600',
  },
});

export default GasBottomSheet;
