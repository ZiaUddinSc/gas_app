import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import {Search, ArrowLeft} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../CustomHeader/CustomHeader';
import {GetJob} from '../../helper/GetApiHelper'
import {useFormData} from '../../contexts/FormContext';;

const LinkedJobSelector = ({onSelectJob}) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
 const {formData, setFormData} = useFormData();
  const handleJobSelect = useCallback(
    jobId => {
        
      const jobName =
        jobs.find(j => j.id === jobId)?.customer?.customer_full_name || '';
      const customerPropertyId =
        jobs.find(j => j.id === jobId)?.customer_property_id || '';

      setSelectedJob({id: jobId, name: jobName,customer_property_id:customerPropertyId});
      onSelectJob({id: jobId, name: jobName,customer_property_id:customerPropertyId});
      setIsModalVisible(false);
      setSearchTerm('');
    },
    [onSelectJob, jobs],
  );

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const fetchJobs = useCallback(
    async pageNo => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const res = await GetJob(pageNo);
        if (Array.isArray(res?.jobs)) {
          const newJobs = res.jobs.filter(
            newJob => !jobs.some(existing => existing.id === newJob.id),
          );
          const updatedJobs = [...jobs, ...newJobs];
          
          setJobs(updatedJobs);
          setFilteredJobs(updatedJobs);
          setLastPage(res.meta?.last_page || 1);
          setHasMore(pageNo < (res.meta?.last_page || 1));
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, jobs],
  );

  // 🔍 Filter jobs on search term change
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job =>
        (job.customer?.customer_full_name || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, jobs]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Linked Job</Text>
      <Text style={styles.input} onPress={() => setIsModalVisible(true)}>
        {formData.selectedJob?.name || 'Click here to select a job'}
      </Text>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <CustomHeader
            title="Search Jobs"
            leftIcon={<ArrowLeft size={24} color="white" />}
            onLeftPress={() => {
              setIsModalVisible(false);
              setSearchTerm('');
            }}
          />
          <View style={styles.modalContent}>
            <View style={styles.searchContainer}>
              <Search size={wp(6)} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by customer name..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholderTextColor="#888"
              />
            </View>
            <FlatList
              data={filteredJobs}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleJobSelect(item.id)}>
                  <Text style={styles.itemText}>
                    {item.customer?.customer_full_name}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No jobs found</Text>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: wp(3),
    marginBottom: hp(1),
  },
  title: {
    color: '#2c3e50',
    fontSize: hp(1.8),
    fontWeight: '700',
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
    // justifyContent: 'center',
    alignItems: 'center',
    height: hp(100),
    width: wp(100),
    paddingBottom: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    maxHeight: '70%',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
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
});

export default LinkedJobSelector;
