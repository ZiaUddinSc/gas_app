import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {CancelJobs, CompletedOrders, OngoingJobs} from '../tabs/jobTabs';
import {COLORS, icons, images, SIZES} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';

const renderScene = SceneMap({
  first: OngoingJobs,
  second: CompletedOrders,
  third: CancelJobs,
});

interface TabRoute {
  key: string;
  title: string;
}

interface RenderLabelProps {
  route: TabRoute;
  focused: boolean;
}

const MyJobs = ({route}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const layout = useWindowDimensions();
  const {dark, colors} = useTheme();
  const success = route?.params?.success;

  const [index, setIndex] = React.useState(success ? 2 : 0);
  const [routes] = React.useState([
    {key: 'first', title: 'Ongoing'},
    {key: 'second', title: 'Completed'},
    {key: 'third', title: 'Cancelled'},
  ]);

  useFocusEffect(
    useCallback(() => {
      if (success) {
        setIndex(2);
      } else {
        setIndex(0);
      }
    }, []),
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: dark ? COLORS.white : COLORS.primary,
      }}
      style={{
        backgroundColor: colors.background,
      }}
      activeColor={dark ? COLORS.white : COLORS.primary}
      inactiveColor={dark ? COLORS.white : COLORS.greyscale900}
      renderLabel={({route, focused}: RenderLabelProps) => (
        <Text
          style={[
            {
              color: focused ? (dark ? COLORS.white : COLORS.primary) : 'gray',
              fontSize: 16,
              fontFamily: 'Urbanist SemiBold',
            },
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  /**
   * Render header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.arrowLeft}
              resizeMode="contain"
              style={[
                styles.backIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            My Jobs
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode="contain"
            style={[
              styles.moreIcon,
              {
                tintColor: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {renderHeader()}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
      <ButtonFilled
        title="Add New Job"
        onPress={() => navigation.navigate('createnewjob')}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
    marginLeft: 16,
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30,
    position: 'absolute',
    bottom: 0, // distance from bottom
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
  },
});

export default MyJobs;
