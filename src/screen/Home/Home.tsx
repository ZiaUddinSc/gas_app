import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  Image
} from 'react-native';
import {
  Layers,
  Users,
  Briefcase,
  BookOpen,
  LogOut,
  CircleUser,
} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {styles} from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AnimateItem} from '../../helper/customMethods';
import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutModal from '../../components/LogoutModal/LogoutModal';
import {GetCustomers, GetJob} from '../../helper/GetApiHelper';
import {useFocusEffect} from '@react-navigation/native';


const menuItems = [
  {title: 'Customers', icon: <Users color={Color.fontColor} size={35} />},
  {title: 'Jobs', icon: <Briefcase color={Color.fontColor} size={35} />},
  {
    title: 'Existing Records & Drafts',
    icon: <Layers color={Color.fontColor} size={35} />,
  },
  {
    title: 'Boiler Manual',
    icon: <BookOpen color={Color.fontColor} size={35} />,
  },
];

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const animatedValues = useRef(
    menuItems.map(() => new Animated.Value(0)),
  ).current;

  const [lastPressTime, setLastPressTime] = useState(0);
  const [fristTab, setFristTab] = useState('');
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const tapCount = useRef(0);
  const resetTimer = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  useFocusEffect(
    useCallback(() => {
      fetchJobs();
      fetchCustomers();
    }, []),
  );
  const fetchJobs = async () => {
    const res = await GetJob();
    if (res.meta) {
      setTotalJobs(res.meta.total);
    }
  };
  const fetchCustomers = async () => {
    const res = await GetCustomers(1);
    if (res.meta) {
      setTotalCustomer(res.meta.total);
    }
  };

  useEffect(() => {
    if (fristTab) {
      resetTimer.current = setTimeout(() => {
        setFristTab('');
      }, 10000);
    }

    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, [fristTab]);

  const handleDoubleTap = () => {
    navigation.navigate('InviteFriendScreen');
  };

  const onPressListItem = item => {
    if (item.title === 'Boiler Manual') {
      navigation.navigate('BoilerManuals');
    } else if (item.title === 'Jobs') {
      navigation.navigate('JobsScreen');
    } else if (item.title === 'Customers') {
      navigation.navigate('Customers');
    }
  };

  const renderItem = ({item, index}: any) => {
    AnimateItem(animatedValues, index);
    const translateY = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    });

    const opacity = animatedValues[index];
    return (
      <Animatable.View
        key={index}
        animation="zoomIn"
        delay={index * 300}
        duration={600}
        useNativeDriver>
        <TouchableOpacity
          style={styles.item}
          onPress={() => onPressListItem(item)}>
          <View style={styles.icon}>{item.icon}</View>
          {item.title === 'Jobs' ? (
            <Text style={styles.title}>
              Jobs <Text style={{color: 'green'}}>({totalJobs})</Text>
            </Text>
          ) : item.title === 'Customers' ? (
            <Text style={styles.title}>
              Customers <Text style={{color: 'green'}}>({totalCustomer})</Text>
            </Text>
          ) : (
            <Text style={styles.title}>{item.title}</Text>
          )}
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  const handleLogout = async () => {
   await AsyncStorage.clear();
    navigation.replace('Login');
  };
  return (
    <SafeAreaView style={styles.content}>
      <CustomHeader
        title="Home"
        fontSize={hp(2.2)}
        // leftIcon={<ArrowLeft size={24} color="white" />}
        // onLeftPress={() => navigation.goBack()}
        rightIcon1={<LogOut size={24} color="white" />}
        onRightPress1={() => setShowLogoutModal(true)}
        leftIcon={
        <Image
            source={require('../../assets/logo.png')}
            style={{height:35,width:35}}
            resizeMode="contain"
          />
        }
      />
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{marginTop: hp(1.2)}}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
        />
      </View>

      {/* Floating Invite Button */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        direction="alternate"
        duration={1000}>
        <TouchableOpacity
          style={inviteButtonStyle.button}
          onPress={handleDoubleTap}>
          <Text style={inviteButtonStyle.text}>{'Invite Engineer'}</Text>
        </TouchableOpacity>
      </Animatable.View>

      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  );
};

const inviteButtonStyle = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
    alignSelf: 'center',
    backgroundColor: Color.primaryBGColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  buttonround: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
    backgroundColor: Color.primaryBGColor,
    padding: hp(1),
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    height: hp(7),
    width: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Home;
