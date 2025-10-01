// screens/PickerScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomHeader from './CustomHeader/CustomHeader';
import {ArrowLeft} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TitlePicker = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data = [], onSelect} = route.params;

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchText, data]);

  const handleSelect = item => {
    if (onSelect) onSelect(item);
    navigation.goBack();
  };

  return (
    <>
      <CustomHeader
        title="Select Title"
        onLeftPress={() => navigation.goBack()}
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
      />
      <View style={{flex: 1, padding: 16}}>
        {/* 🔍 Search Input */}
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />

        {/* 📋 List */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelect(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default TitlePicker;
