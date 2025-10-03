import React,{useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomPlacesSearch from '../components/CustomPlacesSearch';
// import {ArrowLeft, MapPin} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CustomerUpdate,CustomerJobAddressUpdate} from '../helper/CustomerHelper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../theme/ThemeProvider';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonFilled from '../components/ButtonFilled';
import ButtonOutlined from '../components/ButtonOutlined';
import Input from '../components/Input';
import MessageModal from '../components/MessageModal';




const UpdateAddressAddScreen = ({route}) => {
  const navigation = useNavigation();
  const [modelOpen, setModelOpen] = useState(false);
  const initialValues = route?.params?.initialValues
  const customerId = route?.params?.customerId;
  const {colors, dark} = useTheme();
  
  const handleUpdateAddress = async (values: any) => {
    const payload = {
      customer_id: customerId,
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      city: values.city,
      state: values.state,
      country: values.country,
      latitude: values.latitude,
      longitude: values.longitude,
      postal_code: values.postal_code,
    };
  let res:any="" 
    if(initialValues?.id){
      res = await CustomerJobAddressUpdate(initialValues?.id, payload)
    }else{
       res = await CustomerUpdate(customerId, payload);

    }
    if (res?.success) {
      setModelOpen(true)
      setTimeout(()=>{
        setModelOpen(false)
        navigation.goBack()
      },1500)
    } else {
      Alert.alert('Error', 'Failed to update address');
    }
  };


  return (
    <KeyboardAvoidingView
      style={{flex: 1,padding: 16, backgroundColor: colors.background}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="Address Lookup" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.formContainer}>
            <Formik
              initialValues={initialValues || {}}
              onSubmit={values => {
               handleUpdateAddress(values)
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
              }) => (
                <>
                  {/* Location Search */}
                  <View style={styles.inputGroup}>
                    <CustomPlacesSearch
                       onSelect={data => {
                        setFieldValue('address_line_1', data.address_line_1);
                        setFieldValue('address_line_2', data.address_line_2);
                        setFieldValue('city', data.city);
                        setFieldValue('country', data.country);
                        setFieldValue('state', data.county);
                        setFieldValue('postal_code', data.postcode);
                        setFieldValue('latitude', data.lat);
                        setFieldValue('longitude', data.lng);
                      }}
                    />
                    
                  </View>

                  {/* Manual Inputs */}
                  {[
                    {key: 'address_line_1', label: 'Address Line 1'},
                    {key: 'address_line_2', label: 'Address Line 2'},
                    {key: 'city', label: 'Town/City'},
                    {key: 'state', label: 'Region/County'},
                    {key: 'postal_code', label: 'Post Code'},
                  ].map(field => (
                    <View style={styles.inputGroup} key={field.key}>
                      <Input
                          value={values[field.key]}
                          onBlur={handleBlur(field.key)}
                          placeholder={field.label}
                          placeholderTextColor="#A0A0A0"
                          style={styles.input}
                          id={field.key}   // ✅ use key, not value
                          onInputChanged={(id, text) => setFieldValue(id, text)}
                      />
                     
                    </View>
                  ))}

                  {/* Save */}
                  <ButtonFilled title="Update Address" onPress={handleSubmit} />
                </>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
        <MessageModal
          open={modelOpen}
          icon={icons.location}
          heading='Success !'
          title='Address updated successfully.'
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flexGrow: 1,
    // paddingHorizontal: wp(4),
    // paddingTop: hp(2),
    // paddingBottom: hp(3),
    // backgroundColor:Color.white,
    // marginBottom:hp(6)
  },

  formContainer: {
    backgroundColor: COLORS.white,
    padding: wp(4),
    borderRadius: wp(1),
    flex: 1,
    // borderWidth: 1,
    // borderColor: borderColor,
    height: hp(100),
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
    paddingBottom: hp(0.5),
  },
  inputGroup: {
    marginTop:hp(2),
    // marginBottom: hp(2),
    justifyContent: 'center',
  },
  label: {
    fontSize: hp(1.8),
    color: COLORS.black,
    marginBottom: hp(0.5),
  },
  required: {
    color: 'red',
  },
  input: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    fontSize: hp(1.8),
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  multilineInput: {
    minHeight: hp(10),
    textAlignVertical: 'top',
  },
  dropdown: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: hp(2),
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: hp(6),
    borderRadius: wp(10),
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    height: hp(6),
    borderRadius: wp(10),
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  cancelButtonText: {
    color: COLORS.black,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  errorText: {
    fontSize: hp(1.4),
    color: COLORS.error,
    marginTop: hp(0.3),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  switchPlaceholder: {
    width: wp(10),
    height: hp(4),
    backgroundColor: '#ccc', // Placeholder for Switch
    borderRadius: wp(2),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  radioGroup: {
    // flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: '#F2F0EF',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    // borderWidth:1
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioOuterActive: {
    borderColor: '#008080',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#008080',
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default UpdateAddressAddScreen;
