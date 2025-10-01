import {
  View,
  Switch,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {reducer} from '../utils/reducers/formReducers';
import {validateInput} from '../utils/actions/formActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Input from '../components/Input';
import {getFormatedDate} from 'react-native-modern-datepicker';
import DatePickerModal from '../components/DatePickerModal';
import Button from '../components/Button';
import {useTheme} from '../theme/ThemeProvider';
import ButtonFilled from '../components/ButtonFilled';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import TouchableTextInput from '../components/TouchableTextInput';

const isTestMode = true;
const business_type = [
  {label: 'Company', value: 'Company'},
  {label: 'Sole trader', value: 'Sole trader'},
  {label: 'Other', value: 'Other'},
];
const initialState = {
  inputValues: {
    fullName: isTestMode ? 'John Doe' : '',
    email: isTestMode ? 'example@gmail.com' : '',
    nickname: isTestMode ? '' : '',
    phoneNumber: '',
  },
  inputValidities: {
    fullName: false,
    email: false,
    nickname: false,
    phoneNumber: false,
  },
  formIsValid: false,
};

type Nav = {
  navigate: (value: string) => void;
};

const FillYourProfile = () => {
  const {navigate} = useNavigation<Nav>();
  const route = useRoute();
    const navigation = useNavigation();
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const {colors, dark} = useTheme();
  const [isVatRegisterEnabled, setIsVatRegisterEnabled] = useState(false);
  const [bussinessValue, setBussinessValue] = useState(null);
  const today = new Date();
  const startDate = getFormatedDate(
    new Date(today.setDate(today.getDate() + 1)),
    'YYYY/MM/DD',
  );

  const [startedDate, setStartedDate] = useState('12/12/2023');

  const toggleVatEnabled = () => {
    setIsVatRegisterEnabled(!isVatRegisterEnabled);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const onChangeBusinessType = selectedType => {
    setBussinessValue(selectedType?.value);
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error);
    }
  }, [error]);

  // Image Profile handler
  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        let imageUri = response.assets[0].uri;
        setImage({uri: imageUri});
      }
    });
  };

  // Render countries codes modal
  function RenderAreasCodesModal() {
    const renderItem = ({item}: {item: any}) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            setSelectedArea(item), setModalVisible(false);
          }}>
          <Image
            source={{uri: item.flag}}
            resizeMode="contain"
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
            }}
          />
          <Text style={{fontSize: 16, color: '#fff'}}>{item.item}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: SIZES.height,
                width: SIZES.width,
                backgroundColor: COLORS.primary,
                borderRadius: 12,
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}>
                <Ionicons
                  name="close-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <FlatList
                data={areas}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={item => item.code}
                style={{
                  padding: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Fill Your Profile" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 50}}>
            <Input
              id="fullName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['fullName']}
              placeholder="Full Name*"
              placeholderTextColor={COLORS.gray}
            />
            <Input
              id="businessName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Business Name*"
              placeholderTextColor={COLORS.gray}
            />
            <View>
              <TouchableTextInput
                id={''}
                value={bussinessValue ? bussinessValue : 'Select Business Type'}
                placeholder="Select Business Type"
                placeholderTextColor={COLORS.gray}
                onPress={() => {
                  navigation.navigate('BusinessTypeSelectScreen', {
                    selectedValue: bussinessValue,
                    onSelectBusinessType: item => {
                      setBussinessValue(item.value); // or full item if needed
                    },
                  });
                }}
              />
              {/* <Dropdown
                style={styles.dropdown}
                data={business_type}
                search
                // labelField="displayLabel"
                // valueField="id"
                placeholder="Business Type*"
                labelField="label" // ✅ Corrected
                valueField="value" // ✅ Corrected
                value={bussinessValue}
                onChange={item => {
                  onChangeBusinessType(item);
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{backgroundColor: colors.background}} // ✅ Light blue background
              /> */}
            </View>
            {/* <Input
              id="businessName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Business Type DropDown*"
              placeholderTextColor={COLORS.gray}
            /> */}
            {bussinessValue === 'Company' ? (
              <Input
                id="RegistrationNumber*"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['nickname']}
                placeholder="Registration Number"
                placeholderTextColor={COLORS.gray}
              />
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  marginRight: 10,
                  color: dark ? COLORS.white : COLORS.grayscale700,
                }}>
                VAT Registered
              </Text>
              <Switch
                value={isVatRegisterEnabled}
                thumbColor={isVatRegisterEnabled ? 'green' : 'red'}
                trackColor={{
                  false: '#EEEEEE',
                  true: dark ? COLORS.white : COLORS.grayscale700,
                }}
                ios_backgroundColor={dark ? COLORS.white : COLORS.grayscale700}
                onValueChange={toggleVatEnabled}
              />
            </View>
            {isVatRegisterEnabled ? (
              <Input
                id="vatnumber"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['nickname']}
                placeholder="VAT Number*"
                placeholderTextColor={COLORS.gray}
              />
            ) : null}
            <Input
              id="Email"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Email*"
              placeholderTextColor={COLORS.gray}
            />
            <Input
              id="Password*"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Password"
              placeholderTextColor={COLORS.gray}
            />
            <Input
              id="Password"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.gray}
            />
            {/* <View style={{
              width: SIZES.width - 32
            }}>
              <TouchableOpacity
                style={[styles.inputBtn, {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                }]}
                onPress={handleOnPressStartDate}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.grayscale400 }}>{startedDate}</Text>
                <Feather name="calendar" size={24} color={COLORS.grayscale400} />
              </TouchableOpacity>
            </View> */}
            {/* <View style={[styles.inputContainer, {
              backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
              borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            }]}>
              <TouchableOpacity
                style={styles.selectFlagContainer}
                onPress={() => setModalVisible(true)}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={icons.down}
                    resizeMode='contain'
                    style={styles.downIcon}
                  />
                </View>
                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                  <Image
                    source={{ uri: selectedArea?.flag }}
                    resizeMode="contain"
                    style={styles.flagIcon}
                  />
                </View>
                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                  <Text style={{ color: dark ? COLORS.white : "#111", fontSize: 12 }}>{selectedArea?.callingCode}</Text>
                </View>
              </TouchableOpacity>
             
            </View> */}
          </View>
        </ScrollView>
      </View>
      <DatePickerModal
        open={openStartDatePicker}
        startDate={startDate}
        selectedDate={startedDate}
        onClose={() => setOpenStartDatePicker(false)}
        onChangeStartDate={date => setStartedDate(date)}
      />
      {RenderAreasCodesModal()}
      <View style={styles.bottomContainer}>
        <ButtonFilled
          title="Continue"
          style={styles.continueButton}
          onPress={() => navigate('fillyourprofile2')}
        />
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
    padding: 16,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    marginVertical: 12,
    alignItems: 'center',
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 0.4,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: '#111',
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  flagIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: '#111',
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 52,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: 'space-between',
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    // position: "absolute",
    bottom: 32,
    right: 16,
    left: 16,
    // flexDirection: "row",
    // justifyContent: "space-between",
    width: SIZES.width - 32,
    alignItems: 'flex-end',
  },
  continueButton: {
    width: (SIZES.width - 32) / 2 - 8,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    position: 'absolute',
    right: 16,
    top: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  switch: {
    marginLeft: 8,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Adjust the size of the switch
  },
  dropdown: {
    height: 50,
    // borderColor:COLORS.grayscale700,
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.grayscale700, // placeholder text color
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000', // selected item text color
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000', // search input text color
  },
});

export default FillYourProfile;
