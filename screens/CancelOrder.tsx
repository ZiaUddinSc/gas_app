import {View, Text, StyleSheet, TextInput,Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-virtualized-view';
import {COLORS, SIZES} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ReasonItem from '../components/ReasonItem';
import {GetData} from '../helper/CommonHelper';
import {UpdateData} from '../helper';
import Settings from '../config/settings';
import { async } from 'validate.js';

const CancelOrder = ({route}) => {
  const navigation =useNavigation() as any;
  const {colors, dark} = useTheme();
  const [cancelReasons, setRancelReasons] = useState<any>([]);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [note, setNote] = useState<string>('');
  const jobId =route?.params?.jobId
  const fetchCancelJobs = async () => {
    let reasons = await GetData(`${Settings.endpoints.cancel_reasons}`);
    if (reasons?.data.length > 0) {
      setRancelReasons(reasons?.data);
    }
  };
  useEffect(() => {
    fetchCancelJobs();
  }, []);

  const CancelJob = async()=>{
    if(selectedReason){ 
      let data={
        status:3,
        cancel_reason_id:selectedItem?.id,
        cancel_reason_note:note
       }
       let update = await UpdateData(data,Settings.endpoints.cancel_job_submit(jobId))
       if(update?.success){
         navigation.replace('myjobs',{success:true})
       }
      }else{
        Alert.alert("Info","Please Select Reason")
      }
    // alert(JSON.stringify(data))
  }
  /***
   * Render content
   */
  const handleCheckboxPress = (item: any) => {
    setSelectedItem(item)
    if (selectedReason === item?.name) {
      // If the clicked item is already selected, deselect it
      setSelectedReason(null);
    } else {
      // Otherwise, select the clicked item
      setSelectedReason(item?.name);
    }
  };

  const renderContent = () => {
    const [comment, setComment] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    return (
      <View style={{marginVertical: 12}}>
        <Text
          style={[
            styles.inputLabel,
            {
              color: dark ? COLORS.grayscale100 : COLORS.greyscale900,
            },
          ]}>
          Please select the reason for the cancellations
        </Text>
        <View style={{marginVertical: 16}}>
          <ReasonItem
            checked={selectedItem === 'Schedule change'}
            onPress={() => handleCheckboxPress('Schedule change')}
            title="Schedule change"
          />
        </View>
        <Text
          style={[
            styles.inputLabel,
            {
              color: dark ? COLORS.grayscale100 : COLORS.greyscale900,
            },
          ]}>
          Add detailed reason
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
              borderColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
            },
          ]}
          placeholder="Write your reason here..."
          placeholderTextColor={
            dark ? COLORS.secondaryWhite : COLORS.greyscale900
          }
          multiline={true}
          numberOfLines={4} // Set the number of lines you want to display initially
        />
      </View>
    );
  };
  /**
   * Render submit buttons
   */
  const renderSubmitButton = () => {
    return (
      <View
        style={[
          styles.btnContainer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ButtonFilled
          title="Submit"
          style={styles.submitBtn}
          onPress={() => CancelJob()}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Cancel Job" />
        <View >
          <View style={{marginVertical: 12}}>
            <Text
              style={[
                styles.inputLabel,
                {
                  color: dark ? COLORS.grayscale100 : COLORS.greyscale900,
                },
              ]}>
              Please select the reason for the cancellations
            </Text>
            <View style={{marginVertical: 16}}>
              {cancelReasons?.map((reason: any, index: number) => (
                <ReasonItem
                  key={index}
                  checked={selectedReason === reason.name}
                  onPress={() => handleCheckboxPress(reason)}
                  title={reason.name}
                />
              ))}
            </View>
            <Text
              style={[
                styles.inputLabel,
                {
                  color: dark ? COLORS.grayscale100 : COLORS.greyscale900,
                },
              ]}>
              Add detailed reason
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                  borderColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
                },
              ]}
              placeholder="Write your reason here..."
              placeholderTextColor={
                dark ? COLORS.secondaryWhite : COLORS.greyscale900
              }
              value={note}
              onChangeText={(text)=>setNote(text)}
              multiline={true}
              numberOfLines={4} // Set the number of lines you want to display initially
            />
          </View>
        </View>
      </View>
      {renderSubmitButton()}
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
    padding: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  headerIcon: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: COLORS.gray,
  },
  arrowLeft: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  moreIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 5,
    width: '100%',
    padding: 10,
    paddingBottom: 10,
    fontSize: 12,
    height: 150,
    textAlignVertical: 'top',
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.black,
    marginBottom: 6,
    marginTop: 16,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 22,
    height: 72,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  btn: {
    height: 48,
    width: SIZES.width - 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  submitBtn: {
    width: SIZES.width - 32,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Urbanist Medium',
    color: COLORS.white,
  },
});

export default CancelOrder;
