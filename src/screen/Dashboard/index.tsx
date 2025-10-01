import React,{useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet,Animated} from 'react-native';
import {
  FileText,
  Layers,
  Users,
  Briefcase,
  Calendar,
  Calculator,
  BookOpen,
  Settings,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {styles} from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import GasRateCalculator from '../GasRateCalculator';
import {AnimateItem} from '../../helper/customMethods'; 
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const menuItems = [
  {title: 'New Certificate / Invoice', icon: <FileText color={Color.fontColor} size={20} />},
  {title: 'Existing Records & Drafts', icon: <Layers color={Color.fontColor} size={20} />},
  {title: 'Customers (0)', icon: <Users color={Color.fontColor} size={20} />},
  {title: 'Jobs (0)', icon: <Briefcase color={Color.fontColor} size={20} />},
  {title: 'Calendar', icon: <Calendar color={Color.fontColor} size={20} />},
  {title: 'Gas Rate Calculator', icon: <Calculator color={Color.fontColor} size={20} />},
  {title: 'Boiler Manual', icon: <BookOpen color={Color.fontColor} size={20} />},
  {title: 'Settings', icon: <Settings color={Color.fontColor} size={20} />},
];

const MenuList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const animatedValues = useRef(menuItems.map(() => new Animated.Value(0))).current;

  const onPressListItem = item => {
    var str = item.title;
   
    var jobs = str.substring(0,4);
    var customers = str.substring(0,9);
    console.log(jobs)
    if (item.title === 'Gas Rate Calculator') {
      navigation.navigate('Calculator');
    }else if(item.title === 'Boiler Manual'){
      navigation.navigate('BoilerManuals');
    }else if(item.title === 'Settings'){
      navigation.navigate('SettingsScreen');
    }
    else if(jobs === 'Jobs'){
      navigation.navigate('JobsScreen');
    }
    else if(customers === 'Customers'){
      navigation.navigate('Customers');
    }
    else if(item.title === 'Calendar'){
      navigation.navigate('CalendarScreen');
    }
  };

  const renderItem = ({ item, index }: any) => {
    AnimateItem(animatedValues,index);
  const translateY = animatedValues[index].interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const opacity = animatedValues[index];
  return (

    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
    <TouchableOpacity style={styles.item} onPress={() => onPressListItem(item)}>
      <View style={styles.row}>
        <View style={styles.icon}>{item.icon}</View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <ChevronRight color={Color.fontColor} size={20} />
    </TouchableOpacity>
    </Animated.View>
  );
}

  return (
    <>
         <CustomHeader
  title="Dashboard"
  // leftIcon={<ArrowLeft size={24} color="white" />}
  onLeftPress={() => navigation.goBack()}
  onRightPress1={() => alert('Notification')}
  
/>
    <View style={styles.container}>
 

        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    </>
  );
};

export default MenuList;
