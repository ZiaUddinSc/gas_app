import API from '../config/settings.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const textColorPrimary = '#343a40';
import {COLORS, SIZES} from '../constants';
import {useTheme} from '../theme/ThemeProvider';

const CustomPlacesSearch = ({onSelect}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const {dark} = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const searchPlaces = async text => {
    setQuery(text);

    if (text.length < 3) return;

    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${API.googleApiKey}&components=country:uk`;

    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      setResults(json.predictions || []);
    } catch (error) {
      console.error('Places API Error:', error);
    }
  };

  const handleSelect = async place => {
    const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${API.googleApiKey}`;

    try {
      const response = await fetch(detailUrl);
      const json = await response.json();
      const details = json.result;
      const components = details.address_components;

      const getComponent = type =>
        components.find(c => c.types.includes(type))?.long_name || '';
        let postcode = getComponent('postal_code').toUpperCase()
        let address_line_1 =
          `${getComponent('street_number')}`.trim().toUpperCase() 
        let address_line_2 = `${getComponent('route')}`.trim().toUpperCase()
        let city = getComponent('locality') || getComponent('postal_town').toUpperCase()
      const formattedData = {
        address: details.formatted_address,
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
        city:
        city,
        country: getComponent('country').toUpperCase(),
        county: getComponent('administrative_area_level_1').toUpperCase(),
        postcode: postcode,
        address_line_1:address_line_1,
        address_line_2: address_line_2,
      };
      onSelect(formattedData);
      setQuery(`${address_line_1 ? address_line_1+', ':""} ${address_line_2}, ${city}, ${postcode}`);
      setResults([]);
    } catch (err) {
      console.error('Details fetch error:', err);
    }
  };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

  return (
    <View style={{zIndex: 10}}>
      {/* <Text style={styles.label}>Address Lookup</Text> */}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocused
              ? dark
                ? COLORS.primary100
                : COLORS.primary
              : dark
              ? COLORS.dark2
              : COLORS.greyscale500,
            backgroundColor: isFocused
              ? COLORS.tansparentPrimary
              : dark
              ? COLORS.dark2
              : COLORS.greyscale500,
          },
        ]}>
        <TextInput
          value={query}
          placeholder="Search Address"
          style={[styles.input, {color: dark ? COLORS.white : COLORS.black}]}
          onChangeText={searchPlaces}
          onFocus={handleFocus}
                    onBlur={handleBlur}
        />
      </View>
      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={item => item.place_id}
          scrollEnabled={false}
          keyboardShouldPersistTaps="always"
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.item}>
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
 input: {
        color: COLORS.black,
        flex: 1,
        fontFamily: "Urbanist Regular",
        fontSize: 14,
        paddingTop: 0,
    },
  label: {
    fontSize: hp(1.8),
    color: textColorPrimary,
    marginBottom: hp(0.5),
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 200,
  },
  item: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
  },
});

export default CustomPlacesSearch;
