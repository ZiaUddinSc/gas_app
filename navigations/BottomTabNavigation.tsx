import {
  View,
  Platform,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import {Cart, Home, Orders, UserProfileSettings, Wallet,CalendarScreen} from '../screens';
import Icon from '../src/theme/Icon';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();
const items = [
  {
    label: 'New Certificate',
    icon: <Image source={Icon.icGoogle} width={15} height={15} />,
    navigateScreen: 'newcertificatelist',
  },

  {
    label: 'Quote',
    icon: <Image source={Icon.icGoogle} width={15} height={15} />,
    navigateScreen: '',
  },

  {
    label: 'Invoice',
    icon: <Image source={Icon.icGoogle} width={15} height={15} />,
    navigateScreen: '',
  },
  {label: 'Job', icon: <Image source={Icon.icGoogle} width={15} height={15} />,
   navigateScreen: 'createnewjob',
  },

  {
    label: 'Customer',
    icon: <Image source={Icon.icGoogle} width={15} height={15} />,
    navigateScreen: 'add-new-customer',
  },
];
const BottomTabNavigation = () => {
  const {dark} = useTheme();
  const refProfileSheet = useRef<any>(null);
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets()
  const navigateNewScreen = (screen) =>{
    refProfileSheet.current.close()
    navigation.navigate(screen) 
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: Platform.OS !== 'ios',
          tabBarStyle: {
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            // left: 0,
            // elevation: 0,
            // height: Platform.OS === 'ios' ? 90 : 60,
            // backgroundColor: dark ? COLORS.dark1 : COLORS.white,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 60 + insets.bottom, 
            backgroundColor: dark ? COLORS.dark1 : COLORS.white,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            tabBarIcon: ({focused}: {focused: boolean}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 16,
                    width: (SIZES.width - 32) / 5,
                  }}>
                  <Image
                    source={focused ? icons.home : icons.home2Outline}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}>
                    Home
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="calendar"
          component={CalendarScreen}
          options={{
            title: '',
            tabBarIcon: ({focused}: {focused: boolean}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 16,
                    width: (SIZES.width - 32) / 5,
                  }}>
                  <Image
                    source={focused ? icons.calendar3 : icons.calendar4}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}>
                    Calender
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="add-new"
          component={Orders}
          options={{
            title: '',
            tabBarIcon: ({focused}: {focused: boolean}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 16,
                    width: (SIZES.width - 32) / 5,
                  }}>
                  <Image
                    source={focused ? icons.plus : icons.plus}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}>
                    Add New
                  </Text>
                </View>
              );
            },
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault(); // stop navigation
              refProfileSheet.current?.open(); // open sheet
            },
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Wallet}
          options={{
            title: '',
            tabBarIcon: ({focused}: {focused: boolean}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 16,
                    width: (SIZES.width - 32) / 5,
                  }}>
                  <Image
                    source={focused ? icons.chat : icons.chatOutline}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}>
                    Chat
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={UserProfileSettings}
          options={{
            title: '',
            tabBarIcon: ({focused}: {focused: boolean}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 16,
                    width: (SIZES.width - 32) / 5,
                  }}>
                  <Image
                    source={focused ? icons.settings : icons.settingOutline}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: focused
                        ? dark
                          ? COLORS.white
                          : COLORS.primary
                        : dark
                        ? COLORS.gray3
                        : COLORS.gray3,
                    }}>
                    Settings
                  </Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
      <RBSheet
        ref={refProfileSheet}
        closeOnPressMask={true}
        height={SIZES.height * 0.5}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.gray2 : COLORS.grayscale200,
            height: 4,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 330,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          },
        }}>
        <View style={{backgroundColor:COLORS.secondary,padding:5}}>    
        <Text style={styles.bottomTitle}>Add New</Text>
        </View>
        <View
          style={[
            styles.separateLine,
            {
                borderColor: dark ? COLORS.greyScale800 : COLORS.black,
            },
          ]}
        />
        {items?.map((item: any, index: number) => (
          <TouchableOpacity
            onPress={()=>item?.navigateScreen ? 
              navigateNewScreen(item?.navigateScreen) :
              {} }
          >
            <Text
              style={[
                styles.bottomSubtitle,{padding : index ===0 ? 2:0},
                {
                  color: dark ? COLORS.white : COLORS.black,
                },
              ]}>
              {item?.label}
            </Text>
            <View
              style={[
                styles.itemSeparateLine,{marginVertical:index === 0 ? 2 : 4},
                {
                  backgroundColor: dark
                    ? COLORS.greyScale800
                    : COLORS.grayscale200,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
        <View style={styles.bottomContainer}>
          {/* <Button
             title="Cancel"
             style={{
               width: (SIZES.width - 32) / 2 - 8,
               backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
               borderRadius: 32,
               borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
             }}
             textColor={dark ? COLORS.white : COLORS.primary}
             onPress={() => refProfileSheet.current.close()}
           />
           <ButtonFilled
             title="Yes, Logout"
             style={styles.logoutButton}
             onPress={() => {
               refRBSheet.current.close();
               logout();
             }}
           /> */}
        </View>
      </RBSheet>
    </>
  );
};
const styles = StyleSheet.create({
  bottomTitle: {
    fontSize: 30,
    fontFamily: 'Urbanist Medium',
    color: COLORS.black,
    textAlign: 'center',
    padding: 10,
  
  },
  bottomSubtitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    textAlign: 'center',
    margin: 8,
  },
  separateLine: {
    width: '100%',
    height: 0.7,
    borderColor:'black',
    borderWidth: 0.3,
    // backgroundColor: COLORS.greyScale800,
    // marginVertical: 12,
  },
  itemSeparateLine: {
    width: '100%',
    height: 0.7,
    backgroundColor: COLORS.greyScale800,
    // padding:4
    // marginVertical: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
});
export default BottomTabNavigation;
