import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {ArrowLeft, Search, Plus} from 'lucide-react-native';
import styles from './styles';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import * as Animatable from 'react-native-animatable';
import Avatar from '../../components/Avatar/Avatar';
import Color from '../../theme/Colors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GetJob} from '../../helper/GetApiHelper';
import LottieLoader from '../../components/LottieLoader';
import AddToCalendarModal from '../../components/AddToCalendarModal/AddToCalendarModal';
import { GetData } from '../../helper/CommonHelper';
import Settings from '../../config/settings';
import {INVOICE_ID} from '../../helper/constant'
import {useFocusEffect} from '@react-navigation/native';


const InvoiceJobLink = ({navigation, route}) => {
  const onSelect = route.params?.onSelect;
  const {userId} = route.params;
  const handleJobSelect = job => {
    if (onSelect) onSelect(job);
    navigation.goBack();
  };

  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobForCalendar, setSelectedJobForCalendar] = useState<
    any | null
  >(null);


  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, []),
  );
  const fetchJobs = useCallback(
    async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const res = await GetData(`${Settings.endpoints.get_link_job(INVOICE_ID,userId)}`);
        if(res?.success){
          setJobs(res?.data)
        }else{
          setJobs([])
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore],
  );

  const handleLoadMore = () => {
    if (page < lastPage && !loading) {
      setPage(prev => prev + 1);
    }
  };

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        job =>
          job.description
            ?.toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
          job.customer?.customer_full_name
            ?.toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
          job.property?.full_address
            ?.toLowerCase()
            .includes(debouncedSearch.toLowerCase()),
      ),
    [jobs, debouncedSearch],
  );

  const renderItem = useCallback(
    ({item, index}: any) => (
      <Animatable.View
        key={`job-${item.id}`} // Use unique job id instead of index
        animation="zoomIn"
        delay={(item.id % 5) * 100} // Use id for delay calculation
        duration={600}
        useNativeDriver>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleJobSelect(item)}>
          <View style={styles.card_row}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar
                name={item?.customer_name || 'Unknown'}
                colors={[Color.primaryBGColor, '#008080']}
                size={50}
              />
              <View style={{width: wp(50)}}>
                <View style={styles.card_content}>
                  <Text style={styles.card_name}>
                    {item?.description || ''}
                  </Text>
                </View>
                <View style={styles.card_content}>
                  <Text style={styles.card_text}>
                    {`${item?.customer_name}(${item?.postal_code})` ||
                      ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <CustomHeader
        title="Link Job"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* Filter Row */}
        <View style={{backgroundColor: '#ddd7d6', padding: wp(2)}}>
          <View style={styles.filterRow}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Search size={20} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Add Job Button */}
        {/* <View style={styles.addJobBtn}>
          <Text style={styles.addJobText}>Add Job</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateJobs');
            }}>
            <Plus size={24} color={Color.textPrimaryColor} />
          </TouchableOpacity>
        </View> */}

        {/* Table Data using FlatList */}
        <FlatList
          data={filteredJobs}
          keyExtractor={item => `job-${item.id}`} // Consistent key format
          renderItem={renderItem}
          onEndReached={hasMore ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<LottieLoader visible={loading} />}
          ListEmptyComponent={
            !loading && <Text style={{textAlign: 'center'}}>No Jobs Found</Text>
          }
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            navigation.navigate('CreateJobs');
          }}>
          <Text style={styles.saveButtonText}>Add New Job</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceJobLink;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import {Search, X, Briefcase, ArrowLeft} from 'lucide-react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import CustomHeader from '../../components/CustomHeader/CustomHeader';

// const jobList = [
//   {id: '1', title: 'Job description text22', subtitle: 'Test'},
//   {id: '2', title: 'Test Desc', subtitle: 'Zia (23456)'},
//   {id: '3', title: 'Test', subtitle: 'Zia (23456)'},
//   {
//     id: '4',
//     title: 'CP12 Landlord Gas Safety Record',
//     subtitle: 'Masud khan (DA1 3AG)',
//   },
//   {
//     id: '5',
//     title: 'CP12 Gas Safety Record (Landlord/Homeowner)',
//     subtitle: 'Nayon chowdhury (PA16 7NH)',
//   },
//   {id: '6', title: 'test with emrul', subtitle: 'Mir Mohi Uddin (IG1 1QY)'},
//   {id: '7', title: 'GAS CERTIFICATE', subtitle: 'Zia Uddin (NG3 5FR)'},
// ];

// const InvoiceJobLink = ({navigation, route}) => {
//   const [searchText, setSearchText] = useState('');
//   const onSelect = route.params?.onSelect;

//   const filteredJobs = jobList.filter(
//     job =>
//       job.title.toLowerCase().includes(searchText.toLowerCase()) ||
//       job.subtitle.toLowerCase().includes(searchText.toLowerCase()),
//   );

//   const handleJobSelect = job => {
//     if (onSelect) onSelect(job);
//     navigation.goBack();
//   };

//   return (
//     <View style={{flex: 1}}>
//       <CustomHeader
//         title="Link Job"
//         fontSize={hp(2.2)}
//         leftIcon={<ArrowLeft size={24} color="white" />}
//         onLeftPress={() => navigation.goBack()}
//       />

//       <View style={styles.container}>
//         <View style={styles.searchBox}>
//           <TextInput
//             placeholder="search Here"
//             placeholderTextColor="#888"
//             value={searchText}
//             onChangeText={setSearchText}
//             style={styles.input}
//           />
//           <Search size={20} color="#333" />
//         </View>

//         <FlatList
//           data={filteredJobs}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => (
//             <TouchableOpacity
//               style={styles.jobCard}
//               onPress={() => handleJobSelect(item)}>
//               <View style={styles.iconCircle}>
//                 <Briefcase size={20} color="#0C5D73" />
//               </View>
//               <View style={styles.jobTextContainer}>
//                 <Text style={styles.jobTitle}>{item.title}</Text>
//                 <Text style={styles.jobSubtitle}>{item.subtitle}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// export default InvoiceJobLink;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2F7FA',
//     padding: wp('4%'),
//     paddingTop: hp('4%'),
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   title: {
//     fontSize: wp('5.5%'),
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   searchBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: wp('3%'),
//     paddingVertical: hp('1.2%'),
//     marginBottom: hp('2%'),
//   },
//   input: {
//     flex: 1,
//     fontSize: wp('4%'),
//     color: '#000',
//   },
//   jobCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: wp('3%'),
//     marginBottom: hp('1%'),
//   },
//   iconCircle: {
//     width: wp('10%'),
//     height: wp('10%'),
//     borderRadius: wp('5%'),
//     backgroundColor: '#E0ECF0',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: wp('3%'),
//   },
//   jobTextContainer: {
//     flex: 1,
//   },
//   jobTitle: {
//     fontSize: wp('4.3%'),
//     fontWeight: '600',
//     color: '#1E2A38',
//   },
//   jobSubtitle: {
//     fontSize: wp('3.8%'),
//     color: '#607D8B',
//   },
// });
