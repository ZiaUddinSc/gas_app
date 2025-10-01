import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Color from '../../theme/Colors';
import { Home } from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
  title?: string;
  leftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  rightIcon1?: React.ReactNode;
  onRightPress1?: () => void;
  rightIcon2?: React.ReactNode;
  onRightPress2?: () => void;
  fontSize?:any
}

const CustomHeader = ({
  title,
  leftIcon,
  onLeftPress,
  rightIcon1,
  onRightPress1,
  rightIcon2,
  onRightPress2,
  fontSize
  
}: Props) => {
   const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.side}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress}>
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        {title && <Text style={[styles.title,{fontSize:fontSize}]}>{title}</Text>}
      </View>

      <View style={[styles.side, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
        {rightIcon1 || title ==='Sign Up' || title ==='Company Information'? (
          <TouchableOpacity onPress={onRightPress1} style={{ marginLeft: 10 }}>
            {rightIcon1}
          </TouchableOpacity>
        ):<TouchableOpacity onPress={()=>navigation.navigate("Dashboard")} style={{ marginRight:wp(2)}}>
        <Home color={'#fff'}/>
       </TouchableOpacity>}
        {rightIcon2 && (
          <TouchableOpacity onPress={onRightPress2} style={{ marginLeft: 10 }}>
            {rightIcon2}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;