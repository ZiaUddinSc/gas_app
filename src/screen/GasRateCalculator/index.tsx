import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  FlameIcon,
  ArrowLeft,
  CirclePlusIcon,
  CircleMinusIcon,
  Flashlight,
  FlashlightOff,
  FlashlightIcon,
} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {styles} from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CustomButton from '../../components/CustomButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Card from '../../components/Card';
import SupscriptText from '../../components/SupScriptText';
import Torch from 'react-native-torch';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  calculateGrossRate,
  calculateGrossKW,
  calculateGrossNet,
} from '../../helper/customMethods';
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
];
const GasRateCalculator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
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

  const handleTorchPress = async () => {
    
    if (Platform.OS === 'ios') {
      Torch.switchState(!isTorchOn);
    } else {
      const cameraAllowed = await Torch.requestCameraPermission(
        'Camera Permissions', // dialog title
        'We require camera permissions to use the torch on the back of your phone.', // dialog body
      );

      if (cameraAllowed) {
        try {
          await Torch.switchState(true);
          setIsTorchOn(!isTorchOn);
        } catch (e) {
          alert('We seem to have an issue accessing your torch');
        }
      }
    }
    setTimeout(() => {
      Torch.switchState(true);
    },1000);
    
    setIsTorchOn(!isTorchOn);
  };

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
    <SafeAreaView style={styles.content}>
      <CustomHeader
        title="Gas Rate Calculator"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
        rightIcon1={
          isTorchOn ? (
            <FlashlightIcon
              size={24}
              color="white"
              onPress={() => handleTorchPress()}
            />
          ) : (
            <FlashlightOff
              size={24}
              color="white"
              onPress={() => handleTorchPress()}
            />
          )
        }
      />

      <View style={styles.container}>
        <View style={styles.sub_container}>
          <View style={styles.row}>
            <Dropdown
              style={styles.dropdown}
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
          <View style={styles.circleView}>
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
              colors={gasType?.value === '2' ? '#D1D5DA' : '#164E63'}>
              {({remainingTime}) => (
                <View>
                  {gasType?.value === '1' && isMatricPlaying === false ? (
                    <Dropdown
                      style={styles.Circledropdown}
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
                        color: Color.primaryBGColor,
                      }}>
                      {timerCount ? secondsToTime(timerCount) : '0:00'}
                    </Text>
                  ) : null}
                  {gasType?.value === '1' && isMatricPlaying ? (
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 30,
                        color: Color.primaryBGColor,
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
              }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder={'Initial Reading'}
                  placeholderTextColor={'#A2AFC2'}
                  onChangeText={value => onChangeInitialReading(value)}
                  value={initialReading}
                  keyboardType={'numeric'}
                />
              </View>
              {isFinalReading ? (
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
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
          <View style={styles.row_center}>
            <CustomButton
              style={[styles.btnStyle, {backgroundColor: '#F59E0B'}]}
              textName={'Reset'}
              handleSubmit={() => resetCalculator()}
              buttonTextStyle={styles.btnTextStyle}
            />
            {!isStart && isEnableCalculate === false ? (
              <>
                {gasType?.value === '2' || initialReading ? (
                  <CustomButton
                    style={[styles.btnStyle, {backgroundColor: '#0D9488'}]}
                    textName={'Start'}
                    handleSubmit={() => imperialStartCount(gasType?.value)}
                    buttonTextStyle={styles.btnTextStyle}
                  />
                ) : null}
              </>
            ) : null}
            {isStart ? (
              <CustomButton
                style={[styles.btnStyle, {backgroundColor: '#B91C1B'}]}
                textName={'Stop'}
                handleSubmit={() => stopStartCount(gasType?.value)}
                buttonTextStyle={styles.btnTextStyle}
              />
            ) : null}
            {isEnableCalculate ? (
              <CustomButton
                style={[
                  styles.btnStyle,
                  {backgroundColor: Color.primaryBGColor},
                ]}
                textName={'Calculate'}
                handleSubmit={() => {
                  calculateMetricValue();
                }}
                buttonTextStyle={styles.btnTextStyle}
              />
            ) : null}
          </View>
          <View
            style={[
              styles.row_center,
              {justifyContent: 'space-between', marginTop: 10},
            ]}>
            <Card
              style={styles.card}
              childrenIcon={
                <View style={styles.iconView}>
                  <FlameIcon
                    style={{alignSelf: 'center'}}
                    color="black"
                    size={30}
                  />
                </View>
              }
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
            <Card
              style={styles.card}
              childrenIcon={
                <View style={styles.iconView}>
                  <CirclePlusIcon
                    style={{alignSelf: 'center'}}
                    color="black"
                    size={30}
                  />
                </View>
              }
              cardHeader="GROSS"
              cardTextString={' (KW)'}
              calculatorValue={calculateGrossKW(
                gasName?.value,
                gasType?.value,
                isDisplayCalculate ? spendTime : timerCount,
                readingDiff,
              )}
            />
            <Card
              style={styles.card}
              childrenIcon={
                <View style={styles.iconView}>
                  <CircleMinusIcon
                    style={{alignSelf: 'center'}}
                    color="black"
                    size={30}
                  />
                </View>
              }
              cardHeader="NET"
              cardTextString={' (KW)'}
              calculatorValue={calculateGrossNet(
                gasName?.value,
                gasType?.value,
                isDisplayCalculate ? spendTime : timerCount,
                readingDiff,
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GasRateCalculator;
