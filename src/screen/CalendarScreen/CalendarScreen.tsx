import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

import { Calendar } from 'react-native-calendars';
import { Home, ChevronLeft, ChevronRight, ArrowLeft, } from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,

} from 'react-native-responsive-screen';
import styles from './styles';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';


const CalendarScreen = () => {
      const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedTab, setSelectedTab] = useState('Day');
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDateShort = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `${formatDateShort(startOfWeek)} - ${formatDateShort(endOfWeek)}, ${startOfWeek.getFullYear()}`;
  };



  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {['List', 'Month', 'Week', 'Day'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabItem, selectedTab === tab && styles.activeTabItem]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMonthHeader = () => (
    <View style={styles.monthHeader}>
      <TouchableOpacity onPress={() => setCurrentDate(prev => { const date = new Date(prev); date.setMonth(date.getMonth() - 1); return date; })}>
        <ChevronLeft color="#777" size={wp(5)} />
      </TouchableOpacity>
      <Text style={styles.monthTitle}>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
      <TouchableOpacity onPress={() => setCurrentDate(prev => { const date = new Date(prev); date.setMonth(date.getMonth() + 1); return date; })}>
        <ChevronRight color="#777" size={wp(5)} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.todayButton} onPress={() => setCurrentDate(new Date())}>
        <Text style={styles.todayText}>Today</Text>
      </TouchableOpacity> */}
    </View>
  );

  const renderMonthView = () => (
    <View>
      {renderMonthHeader()}
      <Calendar
        style={styles.calendar}
        current={currentDate.toISOString().split('T')[0]}
        onDayPress={(day) => setCurrentDate(new Date(day.dateString))}
        monthFormat={'MMMM yyyy'}
        onMonthChange={(month) => setCurrentDate(new Date(month.dateString))}
        firstDay={1}
        markedDates={{
          [currentDate.toISOString().split('T')[0]]: { selected: true, marked: true, selectedColor: '#2089dc' },
        }}
        theme={{
          calendarBackground: '#f2f2f2',
          dayTextColor: '#333',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#333',
          arrowColor: '#2089dc',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: hp(1.8),
          textMonthFontSize: hp(2),
          textDayHeaderFontSize: hp(1.6),
        }}
      />
    </View>
  );

  const renderListView = () => (
    <FlatList
      data={Array.from({ length: 10 }, (_, i) => ({ id: i.toString(), title: `Event ${i + 1}`, date: new Date() }))}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemDate}>{item.date.toLocaleDateString()}</Text>
        </View>
      )}
    />
  );

  const renderWeekHeader = () => (
    <View style={styles.weekHeader}>
      <TouchableOpacity onPress={() => setCurrentDate(prev => { const date = new Date(prev); date.setDate(date.getDate() - 7); return date; })}>
        <ChevronLeft color="#777" size={wp(5)} />
      </TouchableOpacity>
      <Text style={styles.weekTitle}>{formatWeekRange(currentDate)}</Text>
      <TouchableOpacity onPress={() => setCurrentDate(prev => { const date = new Date(prev); date.setDate(date.getDate() + 7); return date; })}>
        <ChevronRight color="#777" size={wp(5)} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.todayButton} onPress={() => setCurrentDate(new Date())}>
        <Text style={styles.todayText}>Today</Text>
      </TouchableOpacity> */}
    </View>
  );

  const renderWeekView = () => (
    <ScrollView style={styles.dayView}>
      {renderWeekHeader()}
      <View style={styles.dayTimeline}>
        {Array.from({ length: 20 }, (_, i) => (
          <Text key={i} style={styles.timeLabel}>{`${i + 4} AM`}</Text>
        ))}
      </View>
      <ScrollView horizontal style={styles.weekDays}>
        {Array.from({ length: 7 }, (_, i) => {
          const day = new Date(currentDate);
          day.setDate(currentDate.getDate() - currentDate.getDay() + 1 + i);
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected = day.toDateString() === currentDate.toDateString();
          return (
            <TouchableOpacity
              key={i}
              style={[styles.weekDayColumn, isSelected && styles.selectedDayColumn]}
              onPress={() => setCurrentDate(day)}
            >
              <Text style={[styles.dayOfWeek, isToday && styles.todayText, isSelected && styles.selectedDayText]}>
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
              <Text style={[styles.dayOfMonth, isToday && styles.todayText, isSelected && styles.selectedDayText]}>
                {day.getDate()}
              </Text>
              {/* Add events for the day here */}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScrollView>
  );

  const renderDayHeader = () => (
    <View style={styles.dayHeader}>
      <TouchableOpacity onPress={() => setCurrentDate(prev => { const date = new Date(prev); date.setDate(date.getDate() - 1); return date; })}>
        <ChevronLeft color="#777" size={wp(5)} />
      </TouchableOpacity>
      <Text style={styles.dayTitle}>{formatDate(currentDate)}</Text>
      <TouchableOpacity onPress={() => setCurrentDate(prev => { const date = new Date(prev); date.setDate(date.getDate() + 1); return date; })}>
        <ChevronRight color="#777" size={wp(5)} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.todayButton} onPress={() => setCurrentDate(new Date())}>
        <Text style={styles.todayText}>Today</Text>
      </TouchableOpacity> */}
    </View>
  );

  const renderDayView = () => (
    <ScrollView style={styles.dayView}>
      {renderDayHeader()}
      <ScrollView horizontal>
        <View style={styles.dayTimeline}>
          {Array.from({ length: 20 }, (_, i) => (
            <Text key={i} style={styles.timeLabel}>{`${i + 4} AM`}</Text>
          ))}
        </View>
        <View style={styles.dayEvents}>
          {/* Add all-day events here */}
          <View style={styles.allDayEvent}>
            <Text style={styles.allDayText}>All Day Event</Text>
          </View>
          {/* Add timed events here */}
          {Array.from({ length: 10 }, (_, i) => (
            <View key={i} style={[styles.event, { top: hp(5) * (i + 4), height: hp(4) }]}>
              <Text style={styles.eventText}>{`Event at ${i + 4} AM`}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );

  return (
    
    <SafeAreaView style={styles.safeArea}>
         <CustomHeader
        title="Calendar"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      
     
      <View style={styles.content}>
        {selectedTab === 'Month' && renderMonthView()}
        {selectedTab === 'List' && renderListView()}
        {selectedTab === 'Week' && renderWeekView()}
        {selectedTab === 'Day' && renderDayView()}
      </View>
      {renderTabBar()}
    </SafeAreaView>
  );
};



export default CalendarScreen;