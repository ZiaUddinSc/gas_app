import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const JobStatusSelectorScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { selectedId, onSelect, options } = params;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = options.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredOptions(filtered);
  }, [searchQuery, options]);

  const handleSelect = (item) => {
    onSelect(item);
    navigation.goBack();
  };

  return (
    <>
      <CustomHeader
        title="Select Job Status"
        onLeftPress={() => navigation.goBack()}
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
      />
      <View style={{ flex: 1, padding: wp(4) }}>
        <TextInput
          placeholder="Search job status..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            paddingVertical: hp(1.2),
            paddingHorizontal: wp(3),
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            marginBottom: hp(2),
            fontSize: hp(1.8),
          }}
        />

        <FlatList
          data={filteredOptions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                padding: hp(1.5),
                backgroundColor: item.id === selectedId ? '#d0ebff' : '#fff',
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}
            >
              <Text style={{ fontSize: hp(1.9) }}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: hp(2), color: '#888' }}>
              No matching job status found.
            </Text>
          }
        />
      </View>
    </>
  );
};

export default JobStatusSelectorScreen;
