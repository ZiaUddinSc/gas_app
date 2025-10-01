
import API from '../config/settings.js'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const textColorPrimary = '#343a40';

const CustomPlacesSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchPlaces = async (text) => {
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

  const handleSelect = async (place) => {
    const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${API.googleApiKey}`;

    try {
      const response = await fetch(detailUrl);
      const json = await response.json();
      const details = json.result;
      const components = details.address_components;
    
      const getComponent = (type) =>
        components.find((c) => c.types.includes(type))?.long_name || '';
        const formattedData = {
        address: details.formatted_address,
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
        city: getComponent('locality') || getComponent('postal_town').toUpperCase(),
        country: getComponent('country').toUpperCase(),
        county: getComponent('administrative_area_level_1').toUpperCase(),
        postcode: getComponent('postal_code').toUpperCase(),
        address_line_1: `${getComponent('street_number')}`.trim().toUpperCase() || `${getComponent('route')}`.trim().toUpperCase(),
        address_line_2: `${getComponent('route')}`.trim().toUpperCase(),

      };

      onSelect(formattedData);
      setQuery(details.formatted_address);
      setResults([]);
    } catch (err) {
      console.error('Details fetch error:', err);
    }
  };

  return (
    <View style={{ zIndex: 10 }}>
      <Text style={styles.label}>Address Lookup</Text>
      <TextInput
        value={query}
        placeholder="Search Address"
        style={styles.input}
        onChangeText={searchPlaces}
        autoFocus={true}
      />
      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id}
          scrollEnabled={false}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
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
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 2,
    borderRadius: 5,
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
});

export default CustomPlacesSearch;
