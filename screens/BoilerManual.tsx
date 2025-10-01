import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  RefreshControl
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import {baseProducts, categories, ratings, sorts} from '../data';
import NotFoundCard from '../components/NotFoundCard';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../components/Button';
import {useTheme} from '../theme/ThemeProvider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BolierManualCard from '../components/BolierManualCard';
import BoilerManualList from '../components/BoilerManualList';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Settings from '../config/settings';
import {GetData} from '../helper/CommonHelper';
import SearchInput from '../components/SearchInput';

interface SliderHandleProps {
  enabled: boolean;
  markerStyle: object;
}
type Boiler = {
  id: string;
  name: string;
  logo_url: string;
};

const CustomSliderHandle: React.FC<SliderHandleProps> = ({
  enabled,
  markerStyle,
}) => {
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

const BoilerManual = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const refRBSheet = useRef<any>(null);
  const {dark, colors} = useTheme();
  const [selectedCategories, setSelectedCategories] = useState(['1']);
  const [selectedSorts, setSelectedSorts] = useState(['1']);
  const [selectedRating, setSelectedRating] = useState(['1']);
  const [priceRange, setPriceRange] = useState([0, 100]); // Initial price range
  const [listView, setListView] = useState(false);
  const [boilers, setBoilers] = useState<Boiler[]>([]);
  const [showNotFound, setShowNotFound] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [search, setSearch] = useState('');

  const fetchBoilers = async (
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
      const response = await GetData(Settings.endpoints.boiler_brands,searchQuery);
      const newItems = response?.data ?? [];
      if (newItems && newItems.length > 0) {
        const data: Boiler[] = newItems;

        if (isRefresh || pageNumber === 1) {
          setBoilers(data);
        } else {
          const updatedCustomers = [...boilers, ...data];
          setBoilers(updatedCustomers);
        }

        setPage(pageNumber);
        setHasMore(
          response.meta ? pageNumber < response.meta.last_page : false,
        );
        setShowNotFound(false);
      } else {
        if (isRefresh || pageNumber === 1) {
          setBoilers([]);
          setShowNotFound(true);
        }
        setHasMore(false);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
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
    fetchBoilers(page + 1, false, search);
  };
  const onRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchBoilers(1, true, search);
  };
  useEffect(() => {
    setPage(1);
    fetchBoilers(1, true);
  }, [search]);



  const handleSearch = (text: string) => {
    setSearch(text);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      fetchBoilers(1, true, text);
      // alert(text)
    }, 500);

    setSearchTimeout(newTimeout);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={[
                styles.backIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            Boiler Manual
          </Text>
        </View>
        <TouchableOpacity onPress={() => setListView(!listView)}>
          <Image
            source={listView ? icons.dashboardOutline : icons.list_view}
            resizeMode="contain"
            style={[
              styles.moreIcon,
              {
                tintColor: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };
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
            <View
              style={{
                backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                marginVertical: 16,
              }}>
              {!listView ? (
                <>
                  {boilers && boilers.length > 0 ? (
                    <>
                      <FlatList
                        data={boilers}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        columnWrapperStyle={{gap: 16}}
                        renderItem={({item}) => {
                          return (
                            <BolierManualCard
                              image={item.logo_url}
                              onPress={() =>
                                navigation.navigate('boilermanualmodels', {
                                  boilerId: item.id,
                                  brandImage: item.logo_url,
                                  modelName:item.name
                                })
                              }
                            />
                          );
                        }}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.2}
                        refreshControl={
                          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                      />
                    </>
                  ) : (
                    <NotFoundCard />
                  )}
                </>
              ) : null}
              {listView ? (
                <>
                  {boilers && boilers.length > 0 ? (
                    <>
                      <FlatList
                        data={boilers}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => {
                          return (
                            <BoilerManualList
                              onPress={() =>
                                navigation.navigate('boilermanualmodels', {
                                  boilerId: item.id,
                                  brandImage: item.logo_url,
                                })
                              }
                              title={item.name}
                              icon={item.logo_url}
                            />
                          );
                        }}
                      />
                    </>
                  ) : (
                    <NotFoundCard />
                  )}
                </>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

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
  const renderCategoryItem = ({item}: {item: {id: string; name: string}}) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedCategories.includes(item.id)
          ? COLORS.primary
          : 'transparent',
        padding: 10,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => toggleCategory(item.id)}>
      <Text
        style={{
          color: selectedCategories.includes(item.id)
            ? COLORS.white
            : COLORS.primary,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Sort item
  const renderSortItem = ({item}: {item: {id: string; name: string}}) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedSorts.includes(item.id)
          ? COLORS.primary
          : 'transparent',
        padding: 10,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => toggleSort(item.id)}>
      <Text
        style={{
          color: selectedSorts.includes(item.id)
            ? COLORS.white
            : COLORS.primary,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );



  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {renderHeader()}
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 90,
  },
  headerContainer: {
    flexDirection: 'row',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
    marginLeft: 16,
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
    marginHorizontal: 8,
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
  },
  tabBtn: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32,
  },
  selectedTab: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32,
  },
  tabBtnText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  selectedTabText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.white,
    textAlign: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SIZES.width - 32,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
  },
  subResult: {
    fontSize: 14,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
  },
  resultLeftView: {
    flexDirection: 'row',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
    width: SIZES.width,
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32,
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 12,
  },
  separateLine: {
    height: 0.4,
    width: SIZES.width - 32,
    backgroundColor: COLORS.greyscale300,
    marginVertical: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    marginVertical: 12,
  },
  reusltTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
  },
  viewDashboard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 36,
    justifyContent: 'space-between',
  },
  dashboardIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
  },
  tabText: {
    fontSize: 20,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
  },
});

export default BoilerManual;
