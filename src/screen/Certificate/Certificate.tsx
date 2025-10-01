import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView, // Added ScrollView
  Button,
  SafeAreaView,
} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronDown, FileText, CircleX} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {GetRecordList} from '../../helper/GetApiHelper';

const Certificate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();


  const onNext = action => {
navigation.navigate('CP12Form', {
  titleData: action.name,
  slug: action.slug,
});
};

  // const onNext = action => {
  //   if (
  //     action.label === 'CP12 Homeowner Gas Safety Record' ||
  //     action.label === 'CP12 Landlord Gas Safety Record' ||
  //     action.label === 'CP14 Gas Warning Notice' ||
  //     action.label === 'Service / Maintenance Record' ||
  //     action.label === 'Gas Breakdown Record' ||
  //     action.label === 'Gas Boiler System Commissioning Checklist'
  //   ) {
  //     navigation.navigate('CP12Form', {titleData: action.label});
  //   } else if (
  //     action.label === 'Powerflush Certificate' ||
  //     action.label === 'Installation / Commissioning Decommissioning Record' ||
  //     action.label === 'Unvented Hot Water Cylinders' ||
  //     action.label === 'Job Sheet'
  //   ) {
  //     navigation.navigate('Miscellaneous', {titleData: action.label});
  //   }
  // };

  const [record, setRecord] = useState([]);
  useFocusEffect(
    useCallback(() => {
      fetchRecord();
    }, []),
  );

  const fetchRecord = async () => {
    try {
      const res = await GetRecordList();
      console.log('sfjkshfjsdhf', res.data);
      if (res) {
        setRecord(res.data);
      }
    } catch (error) {
      console.error('Error fetching titles:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <CustomHeader
        title="Certificate"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <View style={styles.sab_container}>
          <View style={styles.header}>
            <Text style={styles.title}>Certificate Types</Text>
            <TouchableOpacity
              style={styles.arrowDown}
              onPress={() => navigation.goBack()}>
              <CircleX size={wp(7)} color="#6B7280" />
            </TouchableOpacity>
          </View>
          {record?.data
            ?.filter(group => group.name === 'Domestic Gas Records')
            .map((group, groupIndex) => (
              <View key={groupIndex} style={styles.groupContainer}>
                <Text style={styles.groupTitle}>{group.name}</Text>

                {group.childs.map((item, index) => {
                  const isTop = index === 0;
                  const isBottom = index === group.childs.length - 1;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.actionItem,
                        {
                          backgroundColor: Color.white,
                          borderTopRightRadius: isTop ? 10 : 0,
                          borderTopLeftRadius: isTop ? 10 : 0,
                          borderBottomRightRadius: isBottom ? 10 : 0,
                          borderBottomLeftRadius: isBottom ? 10 : 0,
                        },
                      ]}
                      onPress={() => onNext(item)}>
                      <View style={styles.iconContainer}>
                        <FileText size={24} color={Color.primaryBGColor} />
                      </View>
                      <Text
                        style={[
                          styles.actionText,
                          {color: Color.primaryBGColor},
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Certificate;
