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
import {Cart, Home, Orders, UserProfileSettings, Wallet} from '../screens';
import Icon from '../src/theme/Icon';
import style from '../src/components/CallNumberModal/style';
import RBSheet from 'react-native-raw-bottom-sheet';

const Tab = createBottomTabNavigator();
const items = [
  {
    label: 'New Certificate',
    icon: <Image source={Icon.icGoogle} width={15} height={15} />,
    iconColor: '#FFFF00',
  },

  {
    label: 'Quote',
    icon: <Image source={Icon.icGoogle} width={15} height={15} />,
  },

  {
    label: 'Invoice',
    icon: <Image source={Icon.icGoogle} width={15} height={15} />,
  },
  {label: 'Job', icon: <Image source={Icon.icGoogle} width={15} height={15} />},
  {
    label: 'Customer',
    icon: <Image source={Icon.icGoogle} width={15} height={15} />,
  },
];
const BottomTabNavigation = () => {
  const {dark} = useTheme();
  const refProfileSheet = useRef<any>(null);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: Platform.OS !== 'ios',
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: Platform.OS === 'ios' ? 90 : 60,
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
          name="calender"
          component={Cart}
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
        height={SIZES.height * 0.8}
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
            height: 260,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          },
        }}>
        <Text style={styles.bottomTitle}>Add New</Text>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
            },
          ]}
        />
        {items?.map((item: any, index: number) => (
          <TouchableOpacity>
            <Text
              style={[
                styles.bottomSubtitle,
                {
                  color: dark ? COLORS.white : COLORS.black,
                },
              ]}>
              {item.label}
            </Text>
            <View
              style={[
                styles.itemSeparateLine,
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
    fontSize: 25,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    textAlign: 'center',
    padding: 10,
  },
  bottomSubtitle: {
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    textAlign: 'center',
    margin: 6,
  },
  separateLine: {
    width: '100%',
    height: 0.7,
    backgroundColor: COLORS.greyScale800,
    marginVertical: 12,
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
