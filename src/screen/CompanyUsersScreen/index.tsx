import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {ArrowLeft, Plus, Search} from 'lucide-react-native';
import styles from './styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {GetCompanyUserList} from '../../helper/GetApiHelper';
import moment from 'moment';

const CompanyUsersScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState(null);

  const [userInfo, setUserInfo] = useState();

  const addNewUser = () => {
    // Navigation to add user screen or show modal
    navigation.navigate('AddUserScreen');
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      setUserInfo(JSON.parse(userInfoString));
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo?.id) {
      fetchUser();
    }
  }, [userInfo]);
  const fetchUser = async () => {
    if (!userInfo?.id) return;
    try {
      const res = await GetCompanyUserList(userInfo?.id); // Replace with actual user ID
      console.log('setUserListdfsdfsdf', res.data);
      if (res) {
        setUserList(res.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader
          fontSize={hp(2.2)}
          title="Company Users"
          leftIcon={<ArrowLeft size={24} color="white" />}
          onLeftPress={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.searchContainer}>
              <Search size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#888"
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addNewUser}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>Add New User</Text>
            </TouchableOpacity>
          </View>
          {userList && (
            <FlatList
              data={userList.data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.userCard}>
                  <View style={styles.userInfo}>
                    {item.package && (
                      <Text style={styles.userRenewal}>
                        {item.package.title ? item.package.title : 'N/A'}
                      </Text>
                    )}
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userRenewal}>
                      Renews{' '}
                      {item.package ? (
                        <Text>
                          {item.package.end_date
                            ? moment(item.package.end_date).format(
                                'DD MMMM YYYY',
                              )
                            : 'N/A'}
                        </Text>
                      ) : (
                        'N/A'
                      )}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      item.package != null
                        ? styles.activeButton
                        : styles.inactiveButton,
                    ]}>
                    <Text style={styles.statusText}>
                      {item.package === null ? 'Inactive' : 'Active'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No users found</Text>
                </View>
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompanyUsersScreen;
