

import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../constants';
import {useTheme} from '../theme/ThemeProvider';

interface DropdownItem {
  label: string;
  value: string;
}

interface ModalDropdownProps {
  data: DropdownItem[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  errorText?: string;
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const CustomDropdown: React.FC<ModalDropdownProps> = ({
  data,
  value,
  onValueChange,
  placeholder = 'Select item',
  searchPlaceholder = 'Search...',
  label = 'Relation',
  errorText,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const {dark} = useTheme();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[
          styles.label, 
          {color: dark ? COLORS.white : COLORS.gray2},
          isFocus && {color: COLORS.primary}
        ]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: COLORS.primary},
          {backgroundColor: dark ? COLORS.dark2 : COLORS.white},
         
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          {color: dark ? COLORS.gray3 : COLORS.gray2}
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {color: dark ? COLORS.white : COLORS.black}
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          {color: dark ? COLORS.white : COLORS.black}
        ]}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={SCREEN_HEIGHT * 0.6}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : `Select ${label}`}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onValueChange(item.value);
          setIsFocus(false);
        }}
        
       
        mode="modal"
        modalProps={{
          animationType: 'slide',
          transparent: true,
          
          statusBarTranslucent: true,
        }}
        
        // Modal container styling
        containerStyle={[
          styles.modalContainer,
          {backgroundColor: dark ? COLORS.dark2 : COLORS.white}
        ]}
        
        // Item styling
        itemTextStyle={[
          styles.itemText,
          {color: dark ? COLORS.white : COLORS.black}
        ]}
        itemContainerStyle={styles.itemContainer}
        activeColor={dark ? COLORS.primary100 : COLORS.primary100}
        
        // Search input styling
        showsVerticalScrollIndicator={true}
      />
      
      {/* {errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.gray3,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 16,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    borderRadius: 4,
    fontFamily: 'Urbanist Regular',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
    fontFamily: 'Urbanist Regular',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
    fontFamily: 'Urbanist Regular',
  },
  
  // Modal styles
  modalContainer: {
    // borderRadius: 12,
    marginHorizontal: 20,
    // marginVertical: SCREEN_HEIGHT * 0.1, // Screen 10% margin
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    textAlign:'center'
  },
  itemContainer: {
    // borderRadius: 8,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.gray3,
    // marginHorizontal: 8,
    // marginVertical: 2,
  },
});

export default CustomDropdown;

// import React, {useState} from 'react';
// import {View, Text, StyleSheet, Platform} from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import {COLORS} from '../constants';
// import {useTheme} from '../theme/ThemeProvider';

// interface PickerItem {
//   label: string;
//   value: string;
// }

// interface ModalPickerProps {
//   data: PickerItem[];
//   value?: string;
//   onValueChange: (value: string) => void;
//   placeholder?: string;
//   label?: string;
//   errorText?: string;
//   disabled?: boolean;
// }

// const CustomDropdown: React.FC<ModalPickerProps> = ({
//   data,
//   value,
//   onValueChange,
//   placeholder = 'Select an item...',
//   label = 'Select',
//   errorText,
//   disabled = false,
// }) => {
//   const {dark} = useTheme();

//   const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//       fontSize: 16,
//       paddingVertical: 12,
//       paddingHorizontal: 16,
//       borderWidth: 1,
//       borderColor: dark ? COLORS.dark2 : COLORS.gray3,
//       borderRadius: 12,
//       color: dark ? COLORS.white : COLORS.black,
//       paddingRight: 30,
//       backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//       fontFamily: 'Urbanist Regular',
//     },
//     inputAndroid: {
//       fontSize: 16,
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       borderWidth: 1,
//       borderColor: dark ? COLORS.dark2 : COLORS.gray3,
//       borderRadius: 12,
//       color: dark ? COLORS.white : COLORS.black,
//       paddingRight: 30,
//       backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//       fontFamily: 'Urbanist Regular',
//     },
//     placeholder: {
//       color: dark ? COLORS.gray3 : COLORS.gray2,
//       fontFamily: 'Urbanist Regular',
//     },
//   });

//   return (
//     <View style={styles.container}>
//       {(value || Platform.OS === 'ios') && (
//         <Text style={[
//           styles.label,
//           {color: dark ? COLORS.white : COLORS.gray2}
//         ]}>
//           {label}
//         </Text>
//       )}
      
//       <RNPickerSelect
//         onValueChange={onValueChange}
//         items={data}
//         value={value}
//         placeholder={{
//           label: placeholder,
//           value: null,
//           color: dark ? COLORS.gray3 : COLORS.gray2,
//         }}
//         style={pickerSelectStyles}
//         useNativeAndroidPickerStyle={false}
//         disabled={disabled}
//         Icon={() => {
//           return (
//             <View style={[
//               styles.icon,
//               {borderLeftColor: dark ? COLORS.white : COLORS.black},
//               {transform: [{ rotate: '90deg' }]}
//             ]} />
//           );
//         }}
//       />
      
//       {/* {errorText && (
//         <Text style={styles.errorText}>{errorText}</Text>
//       )} */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // marginVertical: 10,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 16,
//     top: -8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 12,
//     borderRadius: 4,
//     fontFamily: 'Urbanist Regular',
//   },
//   icon: {
//     backgroundColor: 'transparent',
//     borderTopWidth: 6,
//     borderTopColor: 'transparent',
//     borderRightWidth: 6,
//     borderRightColor: 'transparent',
//     borderLeftWidth: 6,
//     borderLeftColor: '#9EA0A4',
//     borderBottomWidth: 6,
//     borderBottomColor: 'transparent',
//     width: 0,
//     height: 0,
//     top: 18,
//     right: 15,
//   },
//   errorText: {
//     color: COLORS.error,
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 8,
//     fontFamily: 'Urbanist Regular',
//   },
// });

// export default CustomDropdown;