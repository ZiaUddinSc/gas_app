import React, {useState, useEffect,useCallback,useMemo} from 'react';
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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation,useRoute} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import DateIcon from '../../components/DateIcon/DateIcon';
import Avatar from '../../components/Avatar/Avatar';
import Color from '../../theme/Colors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GetCustomerJob, GetJob} from '../../helper/GetApiHelper';
import LottieLoader from '../../components/LottieLoader';
import AddToCalendarModal from '../../components/AddToCalendarModal/AddToCalendarModal';

const NumberOfJob = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const {customerId} = route.params;
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobForCalendar, setSelectedJobForCalendar] = useState<any | null>(null);
  

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

const fetchJobs = useCallback(async (pageNo: number) => {
  if (loading || !hasMore) return;
  setLoading(true);
  try {
    const res = await GetCustomerJob(customerId, pageNo); // ✅ pass page number
console.log('📦 API Response:', res);
   const { data: jobList = [], meta } = res;

setJobs(prev => {
  const uniqueJobs = jobList.filter(
    newJob => !prev.some(j => j.id === newJob.id)
  );
  return [...prev, ...uniqueJobs];
});

setLastPage(meta?.last_page || 1);
setHasMore(pageNo < (meta?.last_page || 1));
  } catch (error) {
    Alert.alert("Error", "Failed to load jobs");
  } finally {
    setLoading(false);
  }
}, [loading, hasMore]);

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

const filteredJobs = useMemo(() => 
  jobs.filter(job =>
    job.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    job.customer?.customer_full_name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    job.property?.full_address?.toLowerCase().includes(debouncedSearch.toLowerCase())
  ),
[jobs, debouncedSearch]);
  // --- New AddDate function to open modal ---
  const AddDate = useCallback((item: any) => {
   
    setSelectedJobForCalendar(item); // Set the job data to pass to the modal
    setIsModalVisible(true); // Show the modal
  }, []);

  const handleCalendarUpdateSuccess = useCallback(() => {
    navigation.replace('JobsScreen');
  }, []);


    const handleModalClose = useCallback(() => {
      setIsModalVisible(false);
      setSelectedJobForCalendar(null);
    }, []);

  const renderItem = useCallback(({item,index}: any) => (
    <Animatable.View
      key={`job-${item.id}`} // Use unique job id instead of index
      animation="zoomIn"
      delay={(item.id % 5) * 100} // Use id for delay calculation
      duration={600}
      useNativeDriver>
      
      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('JobDetailsScreen',{jobId:item.id })}>
        <Text style={styles.card_title}>{item.description}</Text>
        <View style={styles.line} />
        <View style={styles.card_row}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar
              name={item.customer?.customer_full_name || 'Unknown'}
              colors={[Color.primaryBGColor, '#008080']}
              size={50}
            />
            <View style={{width: wp(50)}}>
              <View style={styles.card_content}>
                <Text style={styles.card_name}>
                  {item.customer?.customer_full_name || 'No Name'}
                </Text>
              </View>
              <View style={styles.card_content}>
                <Text style={styles.card_text}>
                  {item.property?.full_address || 'No Address'}
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity onPress={() => AddDate(item)}>
            <DateIcon
              
              date={item?.calendar?.date}
             slot={item?.calendar?.slot}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animatable.View>
 ), []);

  // const renderItem = ({item, index}: any) => (
  //   <Animatable.View
  //     key={index}
  //     animation="zoomIn"
  //     delay={(index % 5) * 100} // Adjust delay as needed
  //     duration={600}
  //     useNativeDriver>
  //     <TouchableOpacity style={styles.card}>
  //       <Text style={[styles.card_title]}>{item.title}</Text>
  //       <View style={styles.line} />
  //       <View style={styles.card_row}>
  //         <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //           <Avatar
  //             name={item.customer}
  //             colors={[Color.primaryBGColor, '#008080']}
  //             size={50}
  //           />
  //           <View style={{width: wp(50)}}>
  //             <View style={styles.card_content}>
  //               <Text style={[styles.card_name]}>{item.customer}</Text>
  //             </View>
  //             <View style={styles.card_content}>
  //               <Text style={[styles.card_text, {}]}>{item.address}</Text>
  //             </View>
  //           </View>
  //         </View>
  //         <TouchableOpacity>
  //           <DateIcon
  //             topColor={index % 2 === 0 ? '#ffec9c' : '#8A98C7'}
  //             textColor={index % 2 === 0 ? '#ffec9c' : '#8A98C7'}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </TouchableOpacity>
  //   </Animatable.View>
  // );
  const [calendarUpdated, setCalendarUpdated] = useState(false);
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <CustomHeader
        title="Jobs"
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
      <AddToCalendarModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        jobData={selectedJobForCalendar}
        onSuccess={handleCalendarUpdateSuccess}
      />
      </View>
    </SafeAreaView>
  );
};

export default NumberOfJob;
