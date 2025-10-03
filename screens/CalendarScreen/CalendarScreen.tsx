import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

import {Calendar} from 'react-native-calendars';
import {icons} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import Header from '../../components/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../theme/ThemeProvider';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const agendaItems = {
  '2025-10-03': [{id: '1', title: 'Team Meeting', time: '10:00 AM'}],
  '2025-10-05': [{id: '2', title: 'Doctor Appointment', time: '2:00 PM'}],
  '2025-10-10': [
    {id: '3', title: 'Project Deadline', time: 'All Day'},
    {id: '4', title: 'Lunch with Friend', time: '1:00 PM'},
  ],
};
const generateMonthDates = (year: number, month: number) => {
  const dates: string[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

const CalendarScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedTab, setSelectedTab] = useState('Day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const {colors, dark} = useTheme();
  const [expanded, setExpanded] = useState(true);
  const scrollRef = useRef<FlatList>(null);
  const flatListDatesRef = useRef<FlatList>(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const today = new Date();
  const datesOfMonth = generateMonthDates(
    today.getFullYear(),
    today.getMonth(),
  );

  // Generate marked dates for dots
  const markedDates: any = {};
  Object.keys(agendaItems).forEach(date => {
    markedDates[date] = {marked: true, dots: [{color: 'blue'}]};
  });
  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: '#00adf5',
  };

  const eventsForSelectedDate = agendaItems[selectedDate] || [];

  const toggleCalendar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const onDayPress = (day: DateData) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedDate(day.dateString);
    setExpanded(false);

    // Scroll events list to top
    scrollRef.current?.scrollToOffset({offset: 0, animated: true});

    // Scroll collapsed date strip to center selected date
    const index = datesOfMonth.indexOf(day.dateString);
    if (index >= 0) {
      flatListDatesRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // center the selected date
      });
    }
  };

  const renderCollapsedDate = (date: string) => {
    const dayNumber = new Date(date).getDate();
    const isSelected = date === selectedDate;
    const hasEvent = agendaItems[date] && agendaItems[date].length > 0;

    return (
      <TouchableOpacity
        onPress={() => onDayPress({dateString: date} as DateData)}
        style={[
          styles.collapsedDate,
          isSelected && {backgroundColor: '#00adf5'},
        ]}>
        <Text style={[styles.dateText, isSelected && {color: '#fff'}]}>
          {dayNumber}
        </Text>
        {hasEvent && <View style={styles.dot} />}
      </TouchableOpacity>
    );
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDateShort = (d: Date) =>
      d.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});

    return `${formatDateShort(startOfWeek)} - ${formatDateShort(
      endOfWeek,
    )}, ${startOfWeek.getFullYear()}`;
  };

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {['List', 'Month', 'Week', 'Day'].map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabItem, selectedTab === tab && styles.activeTabItem]}
          onPress={() => setSelectedTab(tab)}>
          <Text
            style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText,
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMonthHeader = () => (
    <View style={styles.monthHeader}>
      <TouchableOpacity
        onPress={() =>
          setCurrentDate(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() - 1);
            return date;
          })
        }>
        {/* <ChevronLeft color="#777" size={wp(5)} /> */}
        <Image source={icons.arrowLeft} style={{height: 16, width: 16}} />
      </TouchableOpacity>
      <Text style={styles.monthTitle}>
        {currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </Text>
      <TouchableOpacity
        onPress={() =>
          setCurrentDate(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() + 1);
            return date;
          })
        }>
        <Image source={icons.arrowRight} style={{height: 16, width: 16}} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.todayButton} onPress={() => setCurrentDate(new Date())}>
        <Text style={styles.todayText}>Today</Text>
      </TouchableOpacity> */}
    </View>
  );

  const renderMonthView = () => (
    <View>
      <Calendar
        style={styles.calendar}
        current={currentDate.toISOString().split('T')[0]}
        onDayPress={day => setCurrentDate(new Date(day.dateString))}
        monthFormat={'MMMM yyyy'}
        onMonthChange={month => setCurrentDate(new Date(month.dateString))}
        firstDay={1}
        markedDates={{
          [currentDate.toISOString().split('T')[0]]: {
            selected: true,
            marked: true,
            selectedColor: '#2089dc',
          },
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
      data={Array.from({length: 10}, (_, i) => ({
        id: i.toString(),
        title: `Event ${i + 1}`,
        date: new Date(),
      }))}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemDate}>
            {item.date.toLocaleDateString()}
          </Text>
        </View>
      )}
    />
  );

  const renderWeekHeader = () => (
    <View style={styles.weekHeader}>
      <TouchableOpacity
        onPress={() =>
          setCurrentDate(prev => {
            const date = new Date(prev);
            date.setDate(date.getDate() - 7);
            return date;
          })
        }>
        <Image source={icons.arrowLeft} style={{height: 16, width: 16}} />
      </TouchableOpacity>
      <Text style={styles.weekTitle}>{formatWeekRange(currentDate)}</Text>
      <TouchableOpacity
        onPress={() =>
          setCurrentDate(prev => {
            const date = new Date(prev);
            date.setDate(date.getDate() + 7);
            return date;
          })
        }>
        {/* <ChevronRight color="#777" size={wp(5)} /> */}
        <Image source={icons.arrowRight} style={{height: 16, width: 16}} />
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
        {Array.from({length: 20}, (_, i) => (
          <Text key={i} style={styles.timeLabel}>{`${i + 4} AM`}</Text>
        ))}
      </View>
      <ScrollView horizontal style={styles.weekDays}>
        {Array.from({length: 7}, (_, i) => {
          const day = new Date(currentDate);
          day.setDate(currentDate.getDate() - currentDate.getDay() + 1 + i);
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected = day.toDateString() === currentDate.toDateString();
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.weekDayColumn,
                isSelected && styles.selectedDayColumn,
              ]}
              onPress={() => setCurrentDate(day)}>
              <Text
                style={[
                  styles.dayOfWeek,
                  isToday && styles.todayText,
                  isSelected && styles.selectedDayText,
                ]}>
                {day.toLocaleDateString('en-US', {weekday: 'short'})}
              </Text>
              <Text
                style={[
                  styles.dayOfMonth,
                  isToday && styles.todayText,
                  isSelected && styles.selectedDayText,
                ]}>
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
      <TouchableOpacity
        onPress={() =>
          setCurrentDate(prev => {
            const date = new Date(prev);
            date.setDate(date.getDate() - 1);
            return date;
          })
        }>
        <Image source={icons.arrowLeft} style={{height: 16, width: 16}} />
      </TouchableOpacity>
      <Text style={styles.dayTitle}>{formatDate(currentDate)}</Text>
      <TouchableOpacity
        onPress={() =>
          setCurrentDate(prev => {
            const date = new Date(prev);
            date.setDate(date.getDate() + 1);
            return date;
          })
        }>
        <Image source={icons.arrowRight} style={{height: 16, width: 16}} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.todayButton} onPress={() => setCurrentDate(new Date())}>
        <Text style={styles.todayText}>Today</Text>
      </TouchableOpacity> */}
    </View>
  );

  const renderDayView = () => (
    <ScrollView style={styles.dayView}>
      <View style={{flex: 1, padding: 16}}>
        {expanded ? (
          <Calendar
            current={selectedDate} // <-- ensures calendar shows the selected date's month
            markingType={'multi-dot'}
            markedDates={{
              ...markedDates,
              [selectedDate]: {selected: true, selectedColor: '#00adf5'},
            }}
            onDayPress={onDayPress}
            theme={{
              selectedDayBackgroundColor: '#00adf5',
              todayTextColor: '#00adf5',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
            }}
          />
        ) : (
          <>
            <FlatList
              ref={flatListDatesRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={datesOfMonth}
              keyExtractor={item => item}
              renderItem={({item}) => renderCollapsedDate(item)}
              contentContainerStyle={{paddingVertical: 8}}
            />
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setExpanded(!expanded);
              }}>
              <View style={styles.dragHandle} />
            </TouchableOpacity>
          </>
        )}

        {/* Events List */}
        <FlatList
          ref={scrollRef}
          style={{marginTop: 16}}
          data={eventsForSelectedDate}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const eventDate = new Date(selectedDate);
            const dayName = eventDate.toLocaleDateString('en-US', {
              weekday: 'short',
            });
            const dayNumber = eventDate.getDate();

            return (
              <View style={styles.eventRow}>
                {/* Left side: week and date vertically */}
                <View style={styles.leftDate}>
                  <Text style={styles.dayText}>{dayName}</Text>
                  <Text style={styles.dateText}>{dayNumber}</Text>
                </View>

                {/* Right side: event card */}
                <View style={styles.card}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <Text style={{textAlign: 'center', marginTop: 16, color: '#888'}}>
              No events for this day
            </Text>
          )}
        />
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Calendar" />

        <View style={styles.content}>
          {selectedTab === 'Month' && renderMonthView()}
          {selectedTab === 'List' && renderListView()}
          {selectedTab === 'Week' && renderWeekView()}
          {selectedTab === 'Day' && renderDayView()}
        </View>
        {renderTabBar()}
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
