import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
const BusinessTypeSelectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {colors, dark} = useTheme();
  const {selectedValue, onSelectBusinessType} = route.params || {};

  const business_type = [
    {id: 1, label: 'Company', value: 'Company'},
    {id: 2, label: 'Sole trader', value: 'Sole trader'},
    {id: 3, label: 'Other', value: 'Other'},
  ];

  const selectBusinessType = item => {
    if (onSelectBusinessType) {
      onSelectBusinessType(item);
    }
    navigation.goBack();
  };


  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header title={'Select Business Type'} />
      <FlatList
  data={business_type}
  keyExtractor={(item) => item.value}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={{
        width: '100%',              // full width to center content
        alignItems: 'center',       // centers children horizontally
        paddingVertical: 12,        // vertical padding inside each item
        marginVertical: 6,    
        borderBottomWidth: 1,       // only bottom border
        borderBottomColor: dark ? COLORS.black : COLORS.grayscale200,    // spacing between items
      }}
      onPress={() => selectBusinessType(item)}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'Urbanist SemiBold',
          color: dark ? COLORS.white : COLORS.black,
          textAlign: 'center',      // ensures text is centered inside Text component
          paddingHorizontal: 10,    // horizontal padding if you want space from edges
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  )}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
    // justifyContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.grayscale700,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.grayscale700, // placeholder text color
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000', // selected item text color
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000', // search input text color
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    // borderRadius: wp('2%'),
    // padding: wp('2.5%'),
    backgroundColor: '#fff',
    // paddingLeft: wp(8),
  },
  listContent: {
    paddingBottom: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 2,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
});

export default BusinessTypeSelectScreen;
