import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList,RefreshControl } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import NotFoundCard from '../components/NotFoundCard';
import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from '../theme/ThemeProvider';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BoilerManualListItem from '../components/BoilerManualListItem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import Settings from '../config/settings';
import {GetData} from '../helper/CommonHelper'
import SearchInput from '../components/SearchInput';

interface SliderHandleProps {
  enabled: boolean;
  markerStyle: object;
}



const CustomSliderHandle: React.FC<SliderHandleProps> = ({ enabled, markerStyle }) => {
  return (
    <View
      style={[
        markerStyle,
        {
          backgroundColor: enabled ? COLORS.primary : 'lightgray',
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 10,
          width: 20,
          height: 20,
        },
      ]}
    />
  );
};

type BoilerModel = {
  id: string;
  gc_no: string;
  model: string;
  pdf_url?:string
};

const BoilerManualModels = ({route}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const refRBSheet = useRef<any>(null);
  const { dark, colors } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState(["1"]);
  const [selectedSorts, setSelectedSorts] = useState(["1"]);
  const [selectedRating, setSelectedRating] = useState(["1"]);
  const [priceRange, setPriceRange] = useState([0, 100]); // Initial price range
  const [boilerModels, setBoilerModels] = useState<BoilerModel[]>([]);
  const [showNotFound, setShowNotFound] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [brandInfo, setBrandInfo] = useState<BoilerModel>(null);
  const boilerId =route?.params?.boilerId
  const brandImage =route?.params?.brandImage
  const modelName =route?.params?.modelName || "Brand Name"
  const [search, setSearch] = useState('');
  const [allBoilerModels, setAllBoilerModels] = useState<BoilerModel[]>([]);

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
  };
  /**
  * Render header
 
  */
  const fetchBoilerModels = async (
    pageNumber = 1,
    isRefresh = false,
    searchQuery = '',
  ) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoadingMore(true);
    }
    try {
       let extraUrl= "orderBy=model&order=asc"
       let url=`${Settings.endpoints.boiler_brand_models(
        boilerId
      )}`
      if(searchQuery){
        url=`${url}?search=${searchQuery}&${extraUrl}`
      }else{
        url=`${url}?${extraUrl}`
      }
      const response = await GetData(url);
  
      const newItems = response?.data ?? [];
      if (newItems && newItems.length > 0) {
        const data: BoilerModel[] = newItems;

        if (isRefresh || pageNumber === 1) {
          setBoilerModels(data);
          setAllBoilerModels([...allBoilerModels, ...data]);

        } else {
          const updatedCustomers = [...boilerModels, ...data];
          setBoilerModels(updatedCustomers);
          setAllBoilerModels([...allBoilerModels, ...data]);
        }

        setPage(pageNumber);
        setHasMore(
          response.meta ? pageNumber < response.meta.last_page : false,
        );
        setShowNotFound(false);
      } else {
        if (isRefresh || pageNumber === 1) {
          setBoilerModels([]);
          setShowNotFound(true);
        }
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (isRefresh || pageNumber === 1) {
        setShowNotFound(true);
      }
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };
  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    fetchBoilerModels(page + 1, false, search);
  };
  const onRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchBoilerModels(1, true, search);
  };
  useEffect(() => {
    setPage(1);
    fetchBoilerModels(1, true);
  }, []);
  useEffect(() => {
    setPage(1);
    fetchBoilerModels(1, true);
  }, [search]);



  const handleSearch = (text: string) => {
    setSearch(text);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      fetchBoilerModels(1, true, text);
      // alert(text)
    }, 500);

    setSearchTimeout(newTimeout);

    // setSearch(text);
    // if (text.trim() === '') {
    //   // If input cleared, reset to full data
    //   setBoilerModels(allBoilerModels);
    // } else {
    //     const filtered = boilerModels.filter(item =>
    //       item.model.toLowerCase().includes(text.toLowerCase())
    //     );
    //     setBoilerModels(filtered);
    //  }
  };

  const onclickPdfView = (brandInfo:BoilerModel) =>{
    refRBSheet.current.open()
    setBrandInfo(brandInfo)
    setSelectedPdf(brandInfo?.pdf_url)
  }

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode='contain'
              style={[styles.backIcon, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>
           {modelName}
          </Text>
        </View>
      </View>
    )
  }
  /**
   * Render content
  */
  const renderContent = () => {    
    return (
      <View>
        {/* Search bar */}
        <SearchInput
         onInputChanged={text => handleSearch(text)}
         inputValue={search}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Results container  */}
          <View>
            {/* result list */}
            <View style={{
              backgroundColor: dark ? COLORS.dark1 : COLORS.white,
              marginVertical: 16
            }}>
             
             {  boilerModels && boilerModels.length > 0 ? (
                <>
                  <FlatList
                    data={boilerModels}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 16 }}
                    renderItem={({ item }) => {
                      return (
                      <BoilerManualListItem
                        onPress={() => onclickPdfView(item)}
                        title={item.model}
                        icon={brandImage}
                        description={item?.gc_no.trim()}
                        />
                      )
                    }}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.2}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                  />
                </>
              ) : null}
              
            
            </View>
          </View>
        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={true}
          height={SIZES.height-75}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            draggableIcon: {
              backgroundColor: dark ? COLORS.dark3 : "#000",
            },
            container: {
              borderTopRightRadius: 32,
              borderTopLeftRadius: 32,
              // height: 750,
              height:SIZES.height-75,
              backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              alignItems: "center",
            }
          }}>
          <View style={{ width: SIZES.width - 32,margin:10 }}>
            <Text style={[styles.sheetTitle, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{brandInfo?.model}</Text>
           {selectedPdf ?
                <View style={styles.pdfContainer}>       
                  <Pdf
                    source={{uri: selectedPdf,cache: true }}
                    style={styles.pdf}
                    trustAllCerts={false}
                    onError={err => console.log('PDF error:')}
                  />
                
            </View>
            :null
            }
           </View> 
        </RBSheet>
      </View>
    )
  }

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    const updatedCategories = [...selectedCategories];
    const index = updatedCategories.indexOf(categoryId);

    if (index === -1) {
      updatedCategories.push(categoryId);
    } else {
      updatedCategories.splice(index, 1);
    }

    setSelectedCategories(updatedCategories);
  };

  // toggle rating selection
  const toggleRating = (ratingId: string) => {
    const updatedRatings = [...selectedRating];
    const index = updatedRatings.indexOf(ratingId);

    if (index === -1) {
      updatedRatings.push(ratingId);
    } else {
      updatedRatings.splice(index, 1);
    }

    setSelectedRating(updatedRatings);
  };


  // Toggle sort selection
  const toggleSort = (sortId: string) => {
    const updatedSorts = [...selectedSorts];
    const index = updatedSorts.indexOf(sortId);

    if (index === -1) {
      updatedSorts.push(sortId);
    } else {
      updatedSorts.splice(index, 1);
    }

    setSelectedSorts(updatedSorts);
  };

  // Category item
  const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
        padding: 10,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => toggleCategory(item.id)}>

      <Text style={{
        color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
      }}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Sort item
  const renderSortItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedSorts.includes(item.id) ? COLORS.primary : "transparent",
        padding: 10,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => toggleSort(item.id)}>

      <Text style={{
        color: selectedSorts.includes(item.id) ? COLORS.white : COLORS.primary
      }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRatingItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedRating.includes(item.id) ? COLORS.primary : "transparent",
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => toggleRating(item.id)}>
      <View style={{ marginRight: 6 }}>
        <FontAwesome name="star" size={14} color={selectedRating.includes(item.id) ? COLORS.white : COLORS.primary} />
      </View>
      <Text style={{
        color: selectedRating.includes(item.id) ? COLORS.white : COLORS.primary
      }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <View>
          {renderContent()}
        </View>
       
      </View>
     
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    marginBottom: 16
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Urbanist Bold",
    color: COLORS.black,
    marginLeft: 16
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Urbanist Regular",
    marginHorizontal: 8
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - 32,
    justifyContent: "space-between"
  },
  tabBtn: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32
  },
  selectedTab: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32
  },
  tabBtnText: {
    fontSize: 16,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.primary,
    textAlign: "center"
  },
  selectedTabText: {
    fontSize: 16,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.white,
    textAlign: "center"
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Urbanist Bold",
    color: COLORS.black,
  },
  subResult: {
    fontSize: 14,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.primary
  },
  resultLeftView: {
    flexDirection: "row"
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
    width: SIZES.width
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12
  },
  separateLine: {
    height: .4,
    width: SIZES.width - 32,
    backgroundColor: COLORS.greyscale300,
    marginVertical: 12
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.black,
    fontWeight:'700',
    textAlign:'center',
    marginVertical: 5
  },
  reusltTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - 32,
    justifyContent: "space-between"
  },
  viewDashboard: {
    flexDirection: "row",
    alignItems: "center",
    width: 36,
    justifyContent: "space-between"
  },
  dashboardIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary
  },
  tabText: {
    fontSize: 20,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.black
  },
  pdfContainer: {
    // flex: 1,
    height:SIZES.height,
    marginTop: 50,
    // borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    overflow: "hidden",
  },
  pdf: {
    flex: 1,
    width: SIZES.width,
  },
})

export default BoilerManualModels