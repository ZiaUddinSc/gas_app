import {View, StyleSheet, FlatList, Text, TextInput} from 'react-native';
import React, {useState, useCallback} from 'react';
import {COLORS, icons, SIZES} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import {useTheme} from '../theme/ThemeProvider';
import {products} from '../data';
import ProductCard from '../components/ProductCard';
import HeaderWithSearch from '../components/HeaderWithSearch';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Button from '../components/Button';
import ButtonFilled from '../components/ButtonFilled';
import SquareCardItem from '../components/SquareCardItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  calculateGrossRate,
  calculateGrossKW,
  calculateGrossNet,
} from '../helper/customMethods';
import SupscriptText from '../src/components/SupScriptText';

const GAS_LIST = [
  {label: 'Natural Gas', value: '1'},
  {label: 'LPG', value: '2'},
];
const GAS_TYPE_LIST = [
  {label: 'Metric', value: '1'},
  {label: 'Imperial', value: '2'},
];
const CALCULATOR_TIMER = [
  {label: '1.00', value: 60},
  {label: '2.00', value: 120},
  {label: '3.00', value: 180},
  {label: '4.00', value: 240},
];

const GasCalculator = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {dark, colors} = useTheme();
  const [gasName, setGasName] = useState<any>({
    label: 'Natural Gas',
    value: '1',
  });
  const [gasType, setGasType] = useState<any>({label: 'Metric', value: '1'});
  const [calculatTimer, setCalculatTimer] = useState<any>(CALCULATOR_TIMER[1]);
  const [initialReading, setInitialReading] = useState<any>(null);
  const [finalReading, setFinalReading] = useState<any>(null);
  const [isFinalReading, setIsFinalReading] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isTimerPlaying, setisTimerPlaying] = useState<boolean>(false);
  const [timerCount, setTimer] = useState<number>(0);
  const [isPlaying, setIsplaying] = useState<boolean>(false);
  const [isEnableCalculate, setIsEnableCalculate] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isMatricPlaying, setIsMatricPlaying] = useState<boolean>(false);
  const [intervalValue, setIntervalValue] = useState<any>(null);
  const [isDisplayCalculate, setIsDisplayCalculate] = useState<boolean>(false);
  const [spendTime, setSpendTime] = useState<number>(0);
  const [readingDiff, setReadingDiff] = useState<number>(0);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const secondsToTime = e => {
    const m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, '0'),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, '0');

    return +m + ':' + s;
    //return `${h}:${m}:${s}`;
  };

  const imperialStartCount = value => {
    setisTimerPlaying(!isTimerPlaying);
    if (value === '1') {
      setIsplaying(true);
      setIsStart(true);
      setIsMatricPlaying(true);
    } else {
      setIsStart(true);
      let interval = setInterval(() => {
        console.log(value);
        setTimer(lastTimerCount => {
          return lastTimerCount + 1;
        });
      }, 1000); //each count lasts for a second
      setIntervalValue(interval);
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }
  };
  //Switch on and Off for Torch Light

  const stopStartCount = value => {
    clearInterval(intervalValue);
    setisTimerPlaying(true);
    if (value === 2) {
      setIsStart(true);
    } else {
      setIsplaying(false);
      setIsStart(false);
      setIsFinalReading(true);
    }
  };

  const onChangeGasValue = value => {
    setGasName(value);
    onChangeDropdownReset(value);
  };
  const onChangeDropdownReset = value => {
    setInitialReading(null);
    setIsEnableCalculate(false);
    setIsDisplayCalculate(false);
    setIsFinalReading(false);
    setFinalReading(null);
    clearInterval(intervalValue);
    setKey(prev => prev + 1);
    setTimer(0);
    setSpendTime(0);
    setIsplaying(false);
    if (value === 2) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  };
  const onChangeGasType = gasType => {
    if (gasType?.value === '1') {
      stopStartCount(gasType?.value);
      setTimer(0);
      setIsMatricPlaying(false);
    } else {
      setSpendTime(0);
    }
    setGasType(gasType);
    onChangeDropdownReset(gasType?.value);
  };
  const onChangeTimer = value => {
    setCalculatTimer(value);
  };

  const onChangeInitialReading = value => {
    setInitialReading(value);
  };

  const onChangeFinalReading = value => {
    setFinalReading(value);
    if (value) {
      setIsStart(false);
      setIsEnableCalculate(true);
    } else {
      setIsStart(false);
      setIsEnableCalculate(false);
    }
  };
  const calculateMetricValue = useCallback(() => {
    if (parseFloat(initialReading) > parseFloat(finalReading)) {
      alert(
        'Invalid readings. Final reading must be greater than or equal to initial reading.',
      );
      return;
    }
    let spendTime = calculatTimer?.value - remainingTime;
    if (calculatTimer?.value === remainingTime) {
      spendTime = calculatTimer?.value;
    }
    setIsDisplayCalculate(true);
    setSpendTime(spendTime);
    let value = finalReading - initialReading;
    setReadingDiff(value);
  }, [
    calculatTimer,
    initialReading,
    isFinalReading,
    remainingTime,
    finalReading,
  ]);

  const resetCalculator = () => {
    setTimer(0);
    setGasType({label: 'Metric', value: '1'});
    setGasName(GAS_LIST[0]);
    setCalculatTimer(CALCULATOR_TIMER[1]);
    setIsStart(false);
    setInitialReading(null);
    setFinalReading(null);
    setIsFinalReading(false);
    clearInterval(intervalValue);
    setKey(prevKey => prevKey + 1);
    setIsplaying(false);
    setIsStart(false);
    setIsEnableCalculate(false);
    setIsMatricPlaying(false);
    setReadingDiff(0);
  };
  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <HeaderWithSearch
          title="Gas Rate Calculator"
          icon={icons.home2Outline}
          onPress={() => navigation.navigate('(tabs)')}
        />
        {/* <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}> */}
        <View style={styles.row}>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer} // dropdown popup style
            data={GAS_LIST}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select item'}
            searchPlaceholder="Please Search..."
            value={gasName}
            onChange={item => onChangeGasValue(item)}
          />
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer} // dropdown popup style
            data={GAS_TYPE_LIST}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select item'}
            searchPlaceholder="Please Search..."
            value={gasType}
            onChange={item => {
              onChangeGasType(item);
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.white,
            marginVertical: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            onUpdate={time => setRemainingTime(time)}
            duration={calculatTimer?.value}
            onComplete={() => {
              setIsMatricPlaying(false);
              setKey(prev => prev + 1);
              setIsStart(false);
              setIsplaying(false);
              setIsFinalReading(true);
            }}
            //   colors={
            //     gasType?.value === '2'
            //       ? (dark ? COLORS.white : COLORS.dark1)  // lighter/darker gray depending on theme
            //       : (dark ? COLORS.white : COLORS.dark1)  // teal variations for dark/light
            //   }
            colors={gasType?.value === '2' ? '#D1D5DA' : '#164E63'}>
            {({remainingTime}) => (
              <View>
                {gasType?.value === '1' && isMatricPlaying === false ? (
                  <Dropdown
                    style={styles.Circledropdown}
                    containerStyle={styles.dropdownContainer} // dropdown popup style
                    data={CALCULATOR_TIMER}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select item'}
                    searchPlaceholder="Please Search..."
                    value={calculatTimer}
                    onChange={item => onChangeTimer(item)}
                  />
                ) : null}
                {gasType?.value === '2' ? (
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 30,
                      color: dark ? COLORS.white : COLORS.black,
                    }}>
                    {timerCount ? secondsToTime(timerCount) : '0:00'}
                  </Text>
                ) : null}
                {gasType?.value === '1' && isMatricPlaying ? (
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 30,
                      color: dark ? COLORS.white : COLORS.black,
                    }}>
                    {remainingTime ? secondsToTime(remainingTime) : '0:00'}
                  </Text>
                ) : null}
              </View>
            )}
          </CountdownCircleTimer>
        </View>
        {gasType?.value === '1' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 30,
            }}>
            <View
              style={[
                styles.inputView,
                {borderColor: dark ? COLORS.white : COLORS.greyScale800},
              ]}>
              <TextInput
                style={[
                  styles.input,
                  {color: dark ? COLORS.white : COLORS.black},
                ]}
                placeholder={'Initial Reading'}
                placeholderTextColor={'#A2AFC2'}
                onChangeText={value => onChangeInitialReading(value)}
                value={initialReading}
                keyboardType={'numeric'}
              />
            </View>
            {isFinalReading ? (
              <View
                style={[
                  styles.inputView,
                  {borderColor: dark ? COLORS.white : COLORS.greyScale800},
                ]}>
                <TextInput
                  style={[
                    styles.input,
                    {color: dark ? COLORS.white : COLORS.black},
                  ]}
                  placeholder={'Final Reading'}
                  placeholderTextColor={'#A2AFC2'}
                  onChangeText={value => onChangeFinalReading(value)}
                  value={finalReading}
                  keyboardType={'numeric'}
                />
              </View>
            ) : null}
          </View>
        ) : null}
        <View
          style={[
            styles.row_center,
            {
              justifyContent:
                (isEnableCalculate || initialReading || isStart) 
                  ? 'space-between'
                  : 'center',
            },
          ]}>
            <Button
                  style={styles.resetBtnStyle}
                  title={'Reset'}
                  onPress={() => resetCalculator()}
                  // buttonTextStyle={styles.btnTextStyle}
                />
          {/* <Button
            style={[styles.btnStyle]}
            title={'Reset'}
            onPress={() => resetCalculator()}
            //   style={styles.btnTextStyle}
          /> */}
          {!isStart && isEnableCalculate === false ? (
            <>
              {gasType?.value === '2' || initialReading ? (
                <Button
                  style={styles.startBtnStyle}
                  title={'Start'}
                  onPress={() => imperialStartCount(gasType?.value)}
                  // buttonTextStyle={styles.btnTextStyle}
                />
              ) : null}
            </>
          ) : null}
          {isStart ? (
            <Button
              style={styles.stopStyle}
              title={'Stop'}
              onPress={() => stopStartCount(gasType?.value)}
            />
          ) : null}
          {isEnableCalculate ? (
            <Button
              title="Calculate"
              style={styles.btnStyle}
              onPress={() => calculateMetricValue()}
            />
          ) : null}
        </View>
        <View
          style={[
            styles.row_center,
            {justifyContent: 'space-between', marginVertical: 40},
          ]}>
          <SquareCardItem
            onPress={() => {}}
            icon={icons.fire}
            cardTextString={
              <SupscriptText
                base=" GAS RATE (M"
                exponent="3"
                eloseBracket={'/HR)'}
              />
            }
            calculatorValue={calculateGrossRate(
              gasName?.value,
              gasType?.value,
              isDisplayCalculate ? spendTime : timerCount,
              readingDiff,
            )}
          />
          <SquareCardItem
            cardHeader="GROSS (KW)"
            onPress={() => {}}
            icon={icons.plus_circle}
            calculatorValue={calculateGrossKW(
              gasName?.value,
              gasType?.value,
              isDisplayCalculate ? spendTime : timerCount,
              readingDiff,
            )}
          />
          <SquareCardItem
            cardHeader="NET (KW)"
            onPress={() => {}}
            icon={icons.minus_circle}
            calculatorValue={calculateGrossNet(
              gasName?.value,
              gasType?.value,
              isDisplayCalculate ? spendTime : timerCount,
              readingDiff,
            )}
          />
        </View>
        {/* </ScrollView> */}
      </View>
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
  scrollView: {
    marginVertical: 2,
  },
  row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnStyle: {
    // borderRadius: 2,
    width: (SIZES.width - 32) / 2 - 15,
    borderRadius: 32,
    // backgroundColor: COLORS.red,
    borderColor: COLORS.primary,
  },
  stopStyle: {
    // borderRadius: 2,
    width: (SIZES.width - 32) / 2 - 15,
    borderRadius: 32,
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  startBtnStyle: {
    // borderRadius: 2,
    width: (SIZES.width - 32) / 2 - 15,
    borderRadius: 32,
    backgroundColor: '#00ab66',
    borderColor: '#00ab66',
  },
  resetBtnStyle: {
    // borderRadius: 2,
    width: (SIZES.width - 32) / 2 - 15,
    borderRadius: 32,
    backgroundColor: COLORS.yellow,
    borderColor: COLORS.yellow,
  },
  Circledropdown: {
    height: 40,
    width: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    elevation: 4, // shadow on Android
    shadowColor: '#000', // shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
  
  },
  inputView: {
    margin: 5,
    // borderWidth: 0.5,
    // borderColor: 'black',
    marginBottom: 5,
    borderRadius: 2,
    height: 50,
    width: 150,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'Urbanist Regular',
    fontSize: 14,
    paddingTop: 0,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    width: SIZES.width / 2.5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default GasCalculator;
