import React, {useCallback, useMemo, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import GasRateCalculator from '../screen/GasRateCalculator';
import SettingsScreen from '../screen/SettingsScreen/SettingsScreen';

import HomeScreen from '../screen/Home/Home';
import CalendarScreen from '../screen/CalendarScreen/CalendarScreen';
import {Home, Calendar, Calculator, Settings, Plus} from 'lucide-react-native';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Color from '../theme/Colors.js';
import BottomSheet, {
  BottomSheetScrollView,
  useBottomSheetTimingConfigs,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import HomeBottomSheetContent from '../components/HomeBottomSheetContent'; // Import the new component
import {Easing} from 'react-native-reanimated';

type RootStackParamList = {
  Home: undefined;
  Calendar: undefined;
  Calculator: undefined;
  Settings: undefined;
  Plus: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabs = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const handlePresentBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 250,
    easing: Easing.exp,
  });

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            height: 70,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarIcon: ({color, size, focused}) => {
            if (route.name === 'Home')
              return (
                <Home
                  color={focused ? Color.primaryBGColor : '#9ca3af'}
                  size={24}
                />
              );
            if (route.name === 'Calendar')
              return (
                <Calendar
                  color={focused ? Color.primaryBGColor : '#9ca3af'}
                  size={24}
                />
              );
            if (route.name === 'Gas Rate Calculator')
              return (
                <Calculator
                  color={focused ? Color.primaryBGColor : '#9ca3af'}
                  size={24}
                />
              );
            if (route.name === 'Settings')
              return (
                <Settings
                  color={focused ? Color.primaryBGColor : '#9ca3af'}
                  size={24}
                />
              );
            return null;
          },
          tabBarActiveTintColor: Color.primaryBGColor, // Active label and icon color
          tabBarInactiveTintColor: '#9ca3af', // Inactive label and icon color
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
  name="Gas Rate Calculator"
  component={GasRateCalculator}
  options={{
    tabBarLabel: ({focused, color}) => (
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: focused ? Color.primaryBGColor : '#9ca3af',
            fontSize: 10,
          }}>
          Gas Rate
        </Text>
        <Text
          style={{
            color: focused ? Color.primaryBGColor : '#9ca3af',
            fontSize: 10,
          }}>
          Calculator
        </Text>
      </View>
    ),
  }}
/>
        <Tab.Screen
          name="Plus"
          component={View}
          options={{
            tabBarIcon: () => (
              <TouchableOpacity
                style={styles.plusButton}
                onPress={handlePresentBottomSheet}>
                <Plus color={'white'} size={26} />
              </TouchableOpacity>
            ),
            tabBarLabel: () => null,
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              handlePresentBottomSheet();
            },
          })}
        />

        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        animationConfigs={animationConfigs}
        enablePanDownToClose={true}
        handleIndicatorStyle={styles.handleIndicator}
        style={styles.bottomSheet}
        // snapPoints={snapPoints}
      >
        <HomeBottomSheetContent onClose={handleCloseBottomSheet} />
      </BottomSheet>
    </>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  plusButton: {
    backgroundColor: Color.primaryBGColor,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    //   marginBottom: 30,
    position: 'absolute',
    top: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheet: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 9,
  },

  handleIndicator: {
    backgroundColor: '#ccc',
    width: 40,
    height: 5,
    borderRadius: 2.5,
  },
});
