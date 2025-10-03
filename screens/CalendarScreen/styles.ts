import {StyleSheet, Platform, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../constants';

const borderColor = '#ced4da';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 90,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 50,
    flex: 1,
    paddingTop: 30,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.5,
    top:5,
    // borderBottomColor: Color.primaryBGColor,
    borderTopRightRadius: wp(2),
    borderTopLeftRadius: wp(2),
    height: hp(8),
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',

    justifyContent: 'center',
    elevation: 1,
    backgroundColor: COLORS.white,
    borderTopRightRadius: wp(1),
    borderTopLeftRadius: wp(1),
  },
  activeTabItem: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.black,
    fontSize: hp(2),
    fontWeight: '700',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Month View Styles
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  monthTitle: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#333',
  },
  todayButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    borderRadius: wp(1),
  },
  todayText: {
    color: '#fff',
    fontSize: hp(1.6),
  },
  calendar: {
    width: '100%',
  },
  // List View Styles
  listItem: {
    padding: wp(3),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemTitle: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: '#333',
  },
  listItemDate: {
    fontSize: hp(1.6),
    color: '#777',
  },
  // Week View Styles
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  weekTitle: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#333',
  },
  dayView: {
    flex: 1,
  },
  dayTimeline: {
    width: wp(15),
    paddingTop: hp(2),
  },
  timeLabel: {
    fontSize: hp(1.4),
    color: '#777',
    paddingVertical: hp(1.5),
    textAlign: 'right',
  },
  weekDays: {
    flexDirection: 'row',
  },
  weekDayColumn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1),
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  selectedDayColumn: {
    backgroundColor: '#e0f7fa',
  },
  dayOfWeek: {
    fontSize: hp(1.6),
    color: '#777',
  },
  dayOfMonth: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDayText: {
    color: '#00bcd4',
  },
  // Day View Styles
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  dayTitle: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#333',
  },
  dayEvents: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: wp(15),
    right: 0,
    bottom: 0,
  },
  allDayEvent: {
    backgroundColor: '#fce4ec',
    padding: wp(2),
    borderRadius: wp(1),
    marginVertical: hp(0.5),
    marginLeft: wp(2),
  },
  allDayText: {
    fontSize: hp(1.6),
    color: '#d81b60',
  },
  event: {
    backgroundColor: '#e3f2fd',
    padding: wp(2),
    borderRadius: wp(1),
    marginLeft: wp(2),
    position: 'absolute',
  },
  eventText: {
    fontSize: hp(1.6),
    color: '#1e88e5',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#fff', // or your theme color
    margin: 10,
    // borderTopWidth: 1,
    // borderTopColor: '#ddd',
  },
  collapsedDate: {
    width: 40,
    height: 40,
    marginHorizontal: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'blue',
    marginTop: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '600' },
  time: { fontSize: 14, color: '#555', marginTop: 2 },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
  eventRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start', // align left column to top
  },
  leftDate: {
    width: 60, // fixed width for vertical day/date
    alignItems: 'center',
  },
  dayText: { fontSize: 14, color: '#555' },
  dateText: { fontSize: 14, fontWeight: '600', marginTop: 2 },
});

export default styles;
