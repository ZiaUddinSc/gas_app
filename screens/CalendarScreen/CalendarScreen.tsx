import React, {useState, useRef, useEffect} from 'react';
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
import dayjs from 'dayjs';
import {Calendar} from 'react-native-calendars';
import {COLORS, SIZES, icons} from '../../constants';
import moment from 'moment';
import JobCard from '../../components/JobCard';
import styles from './styles';
import Header from '../../components/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../theme/ThemeProvider';
import {GetData} from '../../helper/CommonHelper';
import Settings from '../../config/settings';
import {
  convertTimetoTimeHour,
  capitalizeWords,
} from '../../helper/customMethods';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const agendaItems: Record<
  string,
  {
    id: string;
    title: string;
    time: string;
    customer: any;
    calendar: any;
    estimated_amount: number;
    thestatus: any;
  }[]
> = {};
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
  const [jobs, setJobs] = useState<any[]>([]);
  const [year, month] = selectedDate.split('-').map(Number);
  const today = dayjs();
  const [baseDate, setBaseDate] = useState(today);

  const getStartOfWeek = date => {
    const day = date.day(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const diff = (day === 0 ? -6 : 1) - day; // Shift so that Monday = start
    return date.clone().add(diff, 'day'); // clone to avoid mutation
  };

  const generateWeeks = monthDate => {
    const startOfMonth = monthDate.clone().startOf('month');
    const endOfMonth = monthDate.clone().endOf('month');
    const weeks = [];

    let start = getStartOfWeek(startOfMonth);

    while (start.isBefore(endOfMonth)) {
      const week = Array.from({length: 7}, (_, i) =>
        start.clone().add(i, 'day').format('YYYY-MM-DD'),
      );
      weeks.push(week);
      start = start.clone().add(7, 'day'); // clone again to avoid mutation
    }
    return weeks;
  };
  const goToToday = () => {
    const monthOfToday = today.clone().startOf('month');
    setBaseDate(monthOfToday);
    const newWeeks = generateWeeks(monthOfToday);
    setWeeks(newWeeks);
    setSelectedDate(today.format('YYYY-MM-DD'));

    const weekIndex = newWeeks.findIndex(week =>
      week.includes(today.format('YYYY-MM-DD')),
    );

    if (weekIndex !== -1) {
      setTimeout(() => {
        flatListDatesRef.current.scrollToIndex({
          index: weekIndex,
          animated: true,
        });
      }, 50);
    }
  };
  const changeMonth = direction => {
    const newMonth =
      direction === 'next'
        ? baseDate.add(1, 'month')
        : baseDate.subtract(1, 'month');
    setBaseDate(newMonth);
    const newWeeks = generateWeeks(newMonth);
    setWeeks(newWeeks);
    flatListDatesRef.current.scrollToIndex({index: 0, animated: false});
  };
  const [weeks, setWeeks] = useState(generateWeeks(baseDate));

  const fetchJobs = async () => {
    let response = await GetData(`${Settings.endpoints.get_jobs_list}`);
    if (response?.data.length > 0) {
      let jobData = response?.data;
      jobData.forEach(job => {
        if (job.calendar && job.calendar.date) {
          // Convert date to YYYY-MM-DD format
          const parts = job.calendar.date.split('-'); // "05-10-2025" -> ["05","10","2025"]
          const dateKey = `${parts[2]}-${parts[1].padStart(
            2,
            '0',
          )}-${parts[0].padStart(2, '0')}`;

          if (!agendaItems[dateKey]) {
            agendaItems[dateKey] = [];
          }

          agendaItems[dateKey].push({
            id: job.id.toString(),
            title: job.description || 'No Title',
            customer: job.customer,
            thestatus: job.thestatus,
            estimated_amount: job.estimated_amount || 0.0,
            time: job?.calendar.slot ? job.calendar.slot.start : '',
            calendar: job.calendar,
          });
        }
      });
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  // const datesOfMonth = generateMonthDates(
  //   today.getFullYear(),
  //   today.getMonth(),
  // );
  const datesOfMonth = React.useMemo(() => {
    const selectedDateObj = new Date(selectedDate);
    return generateMonthDates(
      selectedDateObj.getFullYear(),
      selectedDateObj.getMonth(),
    );
  }, [selectedDate]);

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

  const eventsForSelectedDate = React.useMemo(() => {
    return agendaItems[selectedDate] || [];
  }, [selectedDate, agendaItems]);

  type DateData = {
    day: number;
    month: number;
    year: number;
    timestamp: number;
    dateString: string;
  };

  const goToTargetDate = date => {
    const targetDate = dayjs(date);
    let monthOfTarget = targetDate.clone().startOf('month');
    setBaseDate(monthOfTarget);
    // alert(monthOfTarget)
    const newWeeks = generateWeeks(monthOfTarget);
    setWeeks(newWeeks);
    // setSelectedDate(targetDate.format('YYYY-MM-DD'));

    const weekIndex = newWeeks.findIndex(week =>
      week.includes(targetDate.format('YYYY-MM-DD')),
    );

    if (weekIndex !== -1) {
      setTimeout(() => {
        flatListDatesRef.current?.scrollToIndex({
          index: weekIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }, 150);
    }
  };
  const onDayPress = (day: DateData) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // update selected day
    setSelectedDate(day.dateString);
    // alert(day.dateString)
    goToTargetDate(day.dateString);
    const events = agendaItems[day.dateString] || [];
    scrollRef.current?.scrollToOffset({offset: 0, animated: true});
    setExpanded(!expanded);
    // regenerate month strip for the selected month
    const selected = new Date(day.dateString);
    const monthDates = generateMonthDates(
      selected.getFullYear(),
      selected.getMonth(),
    );
    const index = monthDates.indexOf(day.dateString);
    if (index >= 0) {
      flatListDatesRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };
  useEffect(() => {
    const initialWeeks = generateWeeks(baseDate);
    setWeeks(initialWeeks);
    goToToday();
  }, []);

  const onWeekDayPress = (date: string) => {
    setSelectedDate(date);

    // Find the week index containing this date
    const weekIndex = weeks.findIndex(week => week.includes(date));
    if (weekIndex >= 0 && flatListDatesRef.current) {
      flatListDatesRef.current.scrollToIndex({
        index: weekIndex,
        animated: true,
        viewPosition: 0.5, // center the week
      });
    }
  };
  const renderWeek = ({item}) => (
    <View style={styles.weekRow}>
      {item.map(date => {
        const isSelected = date === selectedDate;
        const day = dayjs(date);
        const hasEvent = agendaItems[date] && agendaItems[date].length > 0;
        return (
          <TouchableOpacity
            key={date}
            onPress={() => onWeekDayPress(date)}
            style={[styles.dayContainer]}>
            <View>
              <Text
                style={[styles.dayText, isSelected && styles.selectedDayText]}>
                {day?.format('dd')?.charAt(0)}
              </Text>
            </View>
            <View
              style={[
                styles.weekDate,
                isSelected && {borderRadius: 20, backgroundColor: COLORS.black},
              ]}>
              <Text
                style={[styles.dateText, isSelected && {color: COLORS.white}]}>
                {day.format('D')}
              </Text>
              {hasEvent && (
                <View
                  style={[
                    styles.dot,
                    {backgroundColor: dark ? 'white' : 'blue'},
                  ]}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderDayView = () => (
    // <ScrollView style={styles.dayView}>
    <View style={{flex: 1, paddingTop: 16}}>
      {expanded ? (
        <View>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => setExpanded(!expanded)}>
              <Text style={styles.headerText}>
                {baseDate.format('MMMM YYYY')}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => changeMonth('prev')}>
                <Image
                  source={icons.arrow_right}
                  style={{height: 30, width: 30, tintColor: '#007AFF'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.todayButtonContainer}
                onPress={goToToday}>
                <Text style={styles.todayButton}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeMonth('next')}>
                <Image
                  source={icons.next}
                  style={{height: 30, width: 30, tintColor: '#007AFF'}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={
              {
                // borderColor: "#CBCBCB",
                // borderTopWidth: 0.5,
                // borderLeftWidth: 0.2,
                // borderRightWidth: 0.2,
              }
            }
            ref={flatListDatesRef}
            data={weeks}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderWeek}
            onMomentumScrollEnd={e => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / SIZES.width,
              );
              if (weeks[index]) {
                const newWeekStart = dayjs(weeks[index][0]);
                setBaseDate(newWeekStart);
              }
            }}
          />
          <View style={styles.selectedDateView}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {moment(selectedDate).format('ddd D  MMM YYYY')}
            </Text>
          </View>
          <FlatList
            ref={scrollRef}
            style={{marginTop: 16}}
            data={
              eventsForSelectedDate.length > 0 ? [eventsForSelectedDate] : []
            }
            keyExtractor={() => selectedDate} // only one row for the day
            renderItem={({item}) => {
              const eventDate = new Date(selectedDate);
              const dayName = eventDate.toLocaleDateString('en-US', {
                weekday: 'short',
              });
              return (
                <>
                  <JobCard
                    id={item?.[0]?.id}
                    jobName={item?.[0]?.title}
                    customerName={item?.[0]?.customer?.full_name}
                    jobStatus={item?.[0]?.thestatus?.name}
                    JobAddress={
                      item?.[0]?.customer?.address?.address_line_1
                        ? `${capitalizeWords(
                            item?.[0]?.customer?.address?.address_line_1,
                          )}${
                            item?.[0]?.customer?.address?.address_line_2
                              ? ', ' +
                                capitalizeWords(
                                  item?.[0]?.customer?.address?.address_line_2,
                                )
                              : ''
                          }${
                            item?.[0]?.customer?.address?.city
                              ? ', ' +
                                capitalizeWords(item?.[0]?.customer?.address?.city)
                              : ''
                          }`
                        : 'N/A'
                    }
                    others={`${
                      item?.[0]?.customer?.address?.postal_code
                        ?  item?.[0]?.customer?.address?.postal_code
                        : ''
                    }`}
                    amount={item?.[0]?.estimated_amount || 0.0}
                    time={
                      item?.[0]?.time
                        ? convertTimetoTimeHour(item?.[0]?.time)
                        : ''
                    }
                  />
                </>
                // <View style={styles.eventRow}>
                //   {/* Right side: all events for that day */}
                //   <View style={[styles.card]}>
                //     {item.map((event: any, index: number) => (
                //       <>
                //       <View style={{flexDirection:'row',width:'5%',justifyContent:'space-between'}}>
                //       <View style={[styles.leftLine, { backgroundColor: "white" }]} />
                //       </View>
                //       <View style={{width:'95%'}}>
                //         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                //           <View>
                //           <Text>Job Name</Text>
                //           </View>
                //           <View style={{marginRight:10}}>
                //             <Text style={{textAlign:'center'}}>£70</Text>
                //             <Text style={{textAlign:'center'}}>7:00AM</Text>
                //           </View>
                //         </View>
                //         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                //         <View
                //             style={[
                //               styles.userImg,
                //               {
                //                 backgroundColor: dark ? COLORS.white : COLORS.black,
                //                 justifyContent: 'center',
                //                 alignItems: 'center',
                //               },
                //             ]}>
                //             <Text style={{fontSize:20, color: dark ? COLORS.black : COLORS.white}}>
                //               {getInitials("item?.customer?.full_name")}
                //             </Text>
                //         </View>

                //         {/* <View
                //             style={[
                //               styles.userImg,
                //               {
                //                 backgroundColor: dark ? COLORS.white : COLORS.black,
                //                 justifyContent: 'center',
                //                 alignItems: 'center',
                //               },
                //             ]}>
                //             <Text style={{fontSize:20, color: dark ? COLORS.black : COLORS.white}}>
                //               {getInitials("item?.customer?.full_name")}
                //             </Text>
                //         </View> */}

                //         {/* <View key={event.id} style={{marginBottom: 8}}>
                //           <Text style={styles.title}>{"Event Title"}</Text>
                //           <Text style={styles.time}>{event.time}</Text>
                //           {index < item.length - 1 && (
                //             <View style={styles.separator} />
                //           )}
                //         </View> */}
                //         </View>

                //       <View style={{flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
                //         <Text>Job Name</Text>
                //         <Text>£70</Text>
                //       </View>
                //       </View>
                //       </>
                //     ))}
                //   </View>
                // </View>
              );
            }}
            ListEmptyComponent={() => (
              <Text style={{textAlign: 'center', marginTop: 16, color: '#888'}}>
                No jobs for this day
              </Text>
            )}
          />
        </View>
      ) : (
        <>
          <Calendar
            current={selectedDate} // <-- ensures calendar shows the selected date's month
            markingType={'multi-dot'}
            markedDates={{
              ...markedDates,
              [selectedDate]: {selected: true, selectedColor: COLORS.black},
            }}
            onDayPress={onDayPress}
            theme={{
              selectedDayBackgroundColor: '#00adf5',
              todayTextColor: '#00adf5',
              arrowColor: COLORS.black,
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
            }}
          />

          {/* <FlatList
              ref={flatListDatesRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={datesOfMonth}
              keyExtractor={item => item}
              renderItem={({item}) => renderCollapsedDate(item)}
              contentContainerStyle={{paddingVertical: 8}}
            /> */}
        </>
      )}
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded(!expanded);
        }}>
        <View style={styles.dragHandle} />
      </TouchableOpacity>
      {/* Events List */}
    </View>
    // </ScrollView>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={{paddingLeft: 16, paddingTop: 16}}>
          <Header title="Calendar" />
        </View>
        <View style={styles.content}>{renderDayView()}</View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
