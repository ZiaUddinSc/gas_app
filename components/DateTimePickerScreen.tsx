import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {useTheme} from '../theme/ThemeProvider';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import {GetTimeSlots} from '../helper/GetApiHelper';
import {PostData} from '../helper';
import Settings from '../config/settings';
import moment from 'moment';
import {convertTimetoTimeHour} from '../helper/customMethods';
import {async} from 'validate.js';

const {width, height} = Dimensions.get('window');
interface KeywordItemProps {
  item: {
    id: string;
    start: string;
    disabled: boolean;
    finalColor: string;
  };
  onPress: (id: string) => void;
  selected: boolean;
}

export default function DateTimePickerScreen({route}) {
  const navigation = useNavigation<any>();
  const today = new Date();
  const didRun = useRef(false);
  const flatListRef = useRef<FlatList<any>>(null);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [slotStatus, setSlotStatus] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [slot, setSlot] = useState<boolean>(false);
  const [seeAlll, setSeeAll] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const {dark} = useTheme();

  const KeywordItem: React.FC<KeywordItemProps> = ({
    item,
    onPress,
    selected,
  }) => {
    return (
      <TouchableOpacity
        disabled={item?.disabled}
        style={[
          {
            paddingHorizontal: 14,
            marginHorizontal: 5,
            borderRadius: 21,
            height: 39,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor:
              selectedTime === item?.start ? COLORS.black : item?.finalColor,
            borderWidth: 1,
            backgroundColor:
              selectedTime === item?.start
                ? COLORS.primary
                : dark
                ? COLORS.dark3
                : 'transparent',
          },
        ]}
        onPress={() => onPress(item.id)}>
        <Text
          style={{
            color:
              selectedTime === item?.start
                ? COLORS.white
                : dark
                ? COLORS.white
                : COLORS.primary,
          }}>
          {convertTimetoTimeHour(item?.start)}
        </Text>
      </TouchableOpacity>
    );
  };

  const scrollBy = (direction: 'left' | 'right') => {
    let newIndex = scrollIndex;
    if (direction === 'left') {
      newIndex = Math.max(0, scrollIndex - 3); // scroll 3 items left
    } else {
      newIndex = Math.min(timeSlots.length - 1, scrollIndex + 3); // scroll 3 items right
    }
    setScrollIndex(newIndex);
    flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
  };

  const megeSlots = (slotStatus, timeSlots) => {
    const mergedSlots = timeSlots.map(slot => {
      // find matching job by calendar_time_slot_id
      const max = slotStatus?.max ?? 0;
      const jobs = slotStatus?.jobs ?? [];
      const job = jobs.find(j => j.calendar_time_slot_id === slot.id);
      let finalColor = '#00FF00'; // default color
      let disabled = false;
      if (job) {
        if (job.totalJob === max) {
          finalColor = '#FF0000';
          disabled = true;
        } else if (job.totalJob > max) {
          finalColor = COLORS.yellow;
        }
      }
      return {
        ...slot,
        finalColor,
        disabled,
      };
    });
    setTimeSlots(mergedSlots);
    setTimeout(() => {
      setScrollIndex(8);
      flatListRef.current?.scrollToIndex({index: 8, animated: true});
      // setSlot(true);
    }, 2000);
  };
  const todayString = `${today.getFullYear()}/${
    today.getMonth() + 1
  }/${today.getDate()}`;
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [mainState, setMainState] = useState({
    selectedDate: '', // correct spelling
    selectedTime: '',
  });
  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    fetchTimeSlots(date);
    setSlot(true)
  };
  const fetchTimeSlots = async date => {
    try {
      const res = await GetTimeSlots();
      if (res?.data && Array.isArray(res.data)) {
        fetchSlotStatus(date, res.data);
      }
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  };
  const fetchSlotStatus = async (date, data) => {
    try {
      let selectedDate = moment(date, 'YYYY/MM/DD').format('DD-MM-YYYY');
      let response: any = await PostData(
        {date: selectedDate},
        `${Settings.endpoints.get_status_slots}`,
      );
      if (response.success) {
        megeSlots(response?.data, data);
      }
    } catch (error) {
      console.error('Error fetching slot status:', error);
    }
  };

  useEffect(() => {
    fetchTimeSlots(selectedDate);
   
    //
  }, []);

  const onSelectTime = item => {
    setSelectedSlot(item);
    setSelectedTime(item?.start);
  };
  const handleConfirm = () => {
    navigation.navigate('createnewjob', {
      ...route.params,
      selectedDate,
      selectedSlot,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.container,
          {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
        ]}>
        <Header title="Book Appointment" />
        <View style={styles.calendarContainer}>
          {/* Wrapper for calendar and icon */}
          <View style={{marginTop: 10,marginLeft:10}}>
            <Text style={{fontWeight: '700', fontSize: 20}}>Select Date</Text>
          </View>
          <View style={styles.calendarWrapper}>
            <DatePicker
              mode="calendar"
              locale="en"
              minimumDate={todayString}
              isGregorian={true}
              onDateChange={(date: string) => handleDateChange(date)} // ✅ use this
              // selected={selectedDate}
              onSelectedChange={(date: string) => {}}
              //   selected={selectedDate}
              //   onDateChange={(date: string) => setSelectedDate(date)}
              options={{
                backgroundColor: '#fff',
                textHeaderColor: '#000',
                textDefaultColor: '#000',
                selectedTextColor: '#fff',
                mainColor: '#000',
                textSecondaryColor: '#999',
                borderColor: '#fff',
                headerFont: 'bold', // Header month/year bold
                defaultFont: 'bold',
                textFontSize: 14, // Secondary text bold (weekdays)
              }}
            />
          </View>
        </View>
       {slot ? 
        <>
        <View style={{marginTop: 10,marginLeft:10,flexDirection:'row',justifyContent:'space-between'}}>
          <View>
          <Text style={{fontWeight: '700', fontSize: 20}}>Select Hours</Text>
          </View>
          {/* <TouchableOpacity>
          <Text style={{fontWeight: '700', fontSize: 20}}>See All</Text>
          </TouchableOpacity> */}
        </View>
        {/* Scrollable Horizontal Time Buttons */}
        <View style={styles.timeContainer}>
          <TouchableOpacity
            onPress={() => scrollBy('left')}
            style={styles.arrowWrapper}>
            <Image
              source={icons.arrow_right}
              resizeMode="contain"
              style={styles.scrollIcon}
            />
          </TouchableOpacity>
          <FlatList
            ref={flatListRef}
            data={timeSlots}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingHorizontal: 16}}
            renderItem={({item}) => (
              <KeywordItem
                item={item}
                onPress={() => onSelectTime(item)}
                selected={true}
              />
            )}
          />

          <TouchableOpacity
            onPress={() => scrollBy('right')}
            style={styles.arrowWrapper}>
            <Image
              source={icons.arrowRight}
              resizeMode="contain"
              style={styles.scrollIcon}
            />
          </TouchableOpacity>
        </View>
        </>
      :null
      }

        {/* Confirm Button  */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            {backgroundColor: selectedDate === '' || selectedTime === "" ? COLORS.grayTie : COLORS.black},
          ]}
          onPress={handleConfirm}
          disabled={ selectedDate === '' || selectedTime === "" ? true : false}>
          <Text style={styles.confirmText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  calendarWrapper: {
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
    padding: 8,
    // backgroundColor: '#fff',
    borderRadius: 8,
    // elevation: 3, // shadow on Android
  },
  scrollIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
    padding: 5,
  },
  calendarContainer: {
    height: SIZES.height * 0.50,
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  timeContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
  },
  timeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    // backgroundColor: '#f2f2f2',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#000',
  },
  timeText: {
    color: '#000',
    fontSize: 12,
  },
  timeTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    margin: 16,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, // distance from bottom
    left: 20,
    right: 20,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
