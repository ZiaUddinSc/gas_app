import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ArrowLeft,MapPin,Plus} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles'; // Assuming you have a styles.ts file

import CustomHeader from '../../components/CustomHeader/CustomHeader';

const CustomerJobAddrsSelectorScreen = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const {selectedId, onSelect, options} = params;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    console.log(options);
    // const filtered = options.filter(item =>
    //   item.title.toLowerCase().includes(query),
    // );
    // setFilteredOptions(filtered);
  }, [searchQuery, options]);

  const handleSelect = item => {
    onSelect(item);
    navigation.goBack();
  };

  return (
    <>
      <CustomHeader
        title="Search Address"
        onLeftPress={() => navigation.goBack()}
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
      />
      <View style={{flex: 1, padding: wp(4)}}>
        <TextInput
          placeholder="Search Address..."
          value={searchQuery}
          autoFocus={true}
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
          <View
                              style={{
                                backgroundColor: '#eee',
                                borderRadius: 5,
                                padding: 5,
                              }}>
                              {options.length > 0 ? (
                                <>
                                  <Text
                                    style={{
                                      fontWeight: '500',
                                      color: '#000',
                                      padding: 6,
                                      fontSize: 16,
                                    }}>
                                    {options.length} results found
                                  </Text>
                                  <View
                                    style={{
                                      maxHeight: hp(30),
                                      borderWidth: 1,
                                      borderColor: '#ccc',
                                      borderRadius: 6,
                                      marginTop: 4,
                                      backgroundColor: '#fff',
                                    }}>
                                    <FlatList
                                      data={options}
                                      keyExtractor={item => item.id.toString()}
                                      scrollEnabled={false}
                                      ItemSeparatorComponent={() => (
                                        <View style={styles.line} />
                                      )}
                                      style={{
                                        paddingVertical: 8,
                                        paddingHorizontal: 7,
                                      }}
                                      renderItem={({item: addr}) => (
                                        <TouchableOpacity
                                          onPress={() => {
                                            setFieldValue(
                                              'jobAddress',
                                              addr.full_address,
                                            );
                                            setFieldValue(
                                              'customer_property_id',
                                              addr.id,
                                            );
                                            setShowAddressDropdown(false);
                                          }}
                                          style={styles.dropdownItem}>
                                          <View style={styles.round}>
                                            <MapPin
                                              color={'#000'}
                                              size={hp(2.5)}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 15,
                                              paddingLeft: 7,
                                              width: wp(76),
                                            }}>
                                            {addr.full_address}
                                          </Text>
                                        </TouchableOpacity>
                                      )}
                                    />
                                  </View>
                                  <TouchableOpacity style={[styles.addressButton]}>
                                   <View style={{flexDirection:'row'}}>
                                      <Plus color="#fff" size={20} strokeWidth={2} />
                                      <Text style={styles.addressButtonText}>
                                          Add Address
                                      </Text>
                                  </View> 
                               </TouchableOpacity>
                                </>
                              ) : (
                                <View>
                                  <Text style={styles.noResultText}>
                                    No address found
                                  </Text>
                                  <TouchableOpacity style={[styles.addressButton]}>
                                 <Text style={styles.addressButtonText}>
                                   Add Address
                                 </Text>
                               </TouchableOpacity>
                                </View>
                              )}
                            </View>

        {/* <FlatList
          data={filteredOptions}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                padding: hp(1.5),
                backgroundColor: item.id === selectedId ? '#d0ebff' : '#fff',
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}>
              <Text style={{fontSize: hp(1.9)}}>
                {item.title} {item.start} - {item.end}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text
              style={{textAlign: 'center', marginTop: hp(2), color: '#888'}}>
              No matching slot found.
            </Text>
          }
        /> */}
      </View>
    </>
  );
};

export default CustomerJobAddrsSelectorScreen;
