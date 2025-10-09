import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useEffect,
  } from "react";
  import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatListProps,
  } from "react-native";
  import RBSheet from "react-native-raw-bottom-sheet";
  import {COLORS, SIZES} from '../constants';
  interface Item {
    id: number | string;
    name: string;
  }
  
  interface CustomRBSheetListProps {
    data: Item[];
    onSelectItem?: (item: Item) => void;
    dark?: boolean;
  }
  
  export interface CustomRBSheetListRef {
    open: () => void;
    close: () => void;
  }
  
  const CustomRBSheetList = forwardRef<
    CustomRBSheetListRef,
    CustomRBSheetListProps
  >(({ data = [], onSelectItem, dark = false }, ref) => {
    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredData] = useState<Item[]>(data);
    const refRBSheet = useRef<RBSheet>(null);
  
    // Expose open/close methods to parent
    useImperativeHandle(ref, () => ({
      open: () => refRBSheet.current?.open(),
      close: () => refRBSheet.current?.close(),
    }));
  
    // Filter data whenever searchText changes
    useEffect(() => {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }, [searchText, data]);
  
    const renderItem: FlatListProps<Item>["renderItem"] = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          onSelectItem && onSelectItem(item);
          refRBSheet.current?.close();
        }}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  
    return (
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={SIZES.height}
        customStyles={{
            wrapper: {
              backgroundColor:'rgba(0,0,0,0.5)',
            },
            draggableIcon: {
              backgroundColor: dark ? COLORS.dark3 : "#000",
            },
            container: {
              backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            }
          }}
      >
          <View style={styles.searchWrapper}>
          <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
            <Text style={styles.crossIcon}>✕</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={<View style={styles.separator} />}
            />
        </View>
      </RBSheet>
    );
  });
  
  const styles = StyleSheet.create({
    searchWrapper: {
        paddingLeft:10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        // marginBottom: 5,
      },
      crossIcon: {
        marginHorizontal:15,
        fontSize: 25,
        color: '#333',

        // marginLeft: 10,
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
        height:52,
        color: '#000',
        paddingVertical: 6,
        borderBottomWidth: StyleSheet.hairlineWidth, // thin underline only
        borderColor: '#E0E0E0',
      },
      
      item: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 16,
      },
      itemText: {
        textAlign:'center',
        fontSize: 18,
        fontFamily: 'Urbanist',
        color: '#333',
      },
      separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E0E0E0', // full width separator
      },
  });
  
  export default CustomRBSheetList;
  