import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList,SafeAreaView ,Platform,StatusBar} from 'react-native';
import { PlusCircle, X, Search, ArrowLeft } from 'lucide-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader/CustomHeader'; 
import Color from '../../theme/Colors';

const SelectItemScreen = ({ route, navigation }) => {
    const { onSelect, items, title } = route.params;
    const [searchTerm, setSearchTerm] = useState('');

    const handleItemSelect = useCallback((itemId: number) => {
        const selectedItem = items.find(item => item.id === itemId);
        onSelect(selectedItem);
        navigation.goBack();
        setSearchTerm('');
    }, [onSelect, navigation, items]);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContainer}>
            <CustomHeader
             fontSize={hp(1.7)}
                title={title}
                leftIcon={<ArrowLeft size={24} color="white" />}
                onLeftPress={() => {
                    navigation.goBack();
                    setSearchTerm('');
                }}
            />
            <View style={styles.modalContent}>
                <View style={styles.searchContainer}>
                    <Search size={wp(6)} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={`Search ${title}...`}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        placeholderTextColor="#888"
                    />
                </View>
                <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => handleItemSelect(item.id)}
                        >
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>No items found</Text>
                    )}
                />
            </View>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
                 flex: 1,
                 backgroundColor: Color.primaryBGColor,
               },
    container: {
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        padding: wp(3),
        margin: wp(2),
    },
    title: {
        color: '#2c3e50',
        fontSize: hp(2.4),
        fontWeight: 'bold',
        marginBottom: hp(2),
    },
     inputContainer: {
        marginBottom: hp(2),
    },
    label: {
        color: '#7f8c8d',
        fontSize: hp(1.8),
        marginBottom: hp(1),
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: wp(2.2),
        fontSize: hp(1.7),
        color: '#2c3e50',
        borderColor: '#bdc3c7',
        borderWidth: 1,

    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        height: hp(100),
        width: wp(100),
        paddingBottom: 30
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '90%',
        maxHeight: '70%',
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(2.5),
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: hp(0.5),
        marginBottom: hp(1),

    },
    searchInput: {
        flex: 1,
        paddingVertical: hp(1),
        fontSize: hp(2),
        color: '#222',
    },
    searchIcon: {
        marginRight: wp(2.5),
    },
    closeButton: {
        padding: wp(1.2),
        marginRight: -wp(1.2),
    },
    item: {

        backgroundColor: '#FFF',
    },
    itemText: {
        padding: wp(4),
        fontSize: hp(2),
        color: '#222',
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
    },
    emptyText: {
        padding: wp(4),
        fontSize: hp(2),
        color: '#888',
        textAlign: 'center',
    },
      displayValue: {
        marginTop: hp(1),
        fontSize: hp(1.6),
        color: '#555',
    },
});

export default SelectItemScreen;