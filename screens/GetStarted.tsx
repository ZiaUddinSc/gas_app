import React, {useEffect} from 'react';
import {Text, ImageBackground, StyleSheet, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, images} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Nav = {
  navigate: (value: string) => void;
};

const GetStarted = () => {
  const {navigate} = useNavigation<Nav>();
  const fadeAnim = new Animated.Value(0);

  // Add useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          navigate('(tabs)');
        } else {
          navigate('login');
        }
      });

      // navigate('login');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []); // run only once after component mounts

  return (
    <ImageBackground
      resizeMode="contain"
      source={images.backgroundAvatar3}
      style={styles.area}></ImageBackground>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  background: {
    justifyContent: 'center', // vertically center children
    alignItems: 'center', // horizontally center children
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: 270,
  },
  greetingText: {
    fontSize: 40,
    color: COLORS.white,
    fontFamily: 'Urbanist Bold',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  logoName: {
    fontSize: 76,
    color: COLORS.white,
    fontFamily: 'Urbanist ExtraBold',
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 12,
    fontFamily: 'semiBold',
    paddingHorizontal: 16,
  },
});

export default GetStarted;
