import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import {ArrowLeft, ChevronDown} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const CP14AddAppliance = () => {
  const [formData, setFormData] = useState({
    location: null,
    make: null,
    model: '',
    type: null,
    serialNumber: '',
    gcNumber: '',
    operatingPressure: '',
    classifications: null,
    gasEscapeIssue: null,
    pipeworkIssue: null,
    ventilationIssue: null,
    meterIssue: null,
    chimneyFlueIssue: null,
    detailsOFFaults: '',
    actionTaken: '',
    actionsRequired: '',
    
    reportedtoHSE1: null,
    reportedtoHSE2: null,
    thegasuser: null,
    
  });
  const navigation = useNavigation();

  const dropdownOptions = {
    location: [
      {id: 1, name: 'Location A'},
      {id: 2, name: 'Location B'},
      {id: 3, name: 'Location C'},
    ],
    make: [
      {id: 101, name: 'Make X'},
      {id: 102, name: 'Make Y'},
      {id: 103, name: 'Make Z'},
    ],
    type: [
      {id: 301, name: 'Type P'},
      {id: 302, name: 'Type Q'},
      {id: 303, name: 'Type R'},
    ],
    flueType: [
      {id: 401, name: 'Flue Type 1'},
      {id: 402, name: 'Flue Type 2'},
      {id: 403, name: 'Flue Type 3'},
    ],
  };

  const booleanOptions = ['Yes', 'No', 'N/A'];
  const testOptions = ['Yes', 'No'];

  const openSearchableDropdown = (params: {
    items: any[];
    onSelect: (item: any) => void;
    title: string;
  }) => {
    navigation.navigate('SelectItem', params);
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    let newValue = value;
    if (value === 'N/A') {
      newValue = 'N/A';
    }
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSave = useCallback(() => {
    navigation.navigate('CP12Form', { applianceData: formData });
}, [navigation, formData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Add Appliance"
         fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Location Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('location', item),
                title: 'Locations',
              })
            }>
            <Text style={styles.drop}>
              {formData.location ? formData.location.name : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        {/* Make Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Make</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.make,
                onSelect: item => handleInputChange('make', item),
                title: 'Makes',
              })
            }>
            <Text style={[formData.make ? {color: '#222'} : {color: '#888'},styles.drop]}>
              {formData.make ? formData.make.name : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        {/* Model Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            value={formData.model}
            onChangeText={text => handleInputChange('model', text)}
            placeholder="Models"
            placeholderTextColor="#888"
          />
        </View>

        {/* Type Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.type,
                onSelect: item => handleInputChange('type', item),
                title: 'Types',
              })
            }>
            <Text style={styles.drop}>
            {formData.type ? formData.type.name : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        {/* Serial Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Serial Number</Text>
          <TextInput
            style={styles.input}
            value={formData.serialNumber}
            onChangeText={text => handleInputChange('serialNumber', text)}
            placeholder="Serial Number"
            placeholderTextColor="#888"
          />
        </View>

        {/* GC Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>GC Number</Text>
          <TextInput
            style={styles.input}
            value={formData.gcNumber}
            onChangeText={text => handleInputChange('gcNumber', text)}
            placeholder="GC Number"
            placeholderTextColor="#888"
          />
        </View>

        {/* Flue Type Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Classifications</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.flueType,
                onSelect: item => handleInputChange('classifications', item),
                title: 'Classifications',
              })
            }>
            <Text style={styles.drop}>
            {formData.classifications ? formData.classifications.name : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

       

        {/* Gas Escape Issue */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>Gas Escape Issue</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('gasEscapeIssue', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.gasEscapeIssue != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      

        {/* pipeworkIssue Section */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>Pipework Issue</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('pipeworkIssue', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.pipeworkIssue != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* ventilationIssue Section */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>Ventilation Issue</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('ventilationIssue', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.ventilationIssue != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* meterIssue Section */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>Meter Issue</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('meterIssue', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.meterIssue != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* chimneyFlueIssue Section */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>Chimney Flue Issue</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('chimneyFlueIssue', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.chimneyFlueIssue != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      

{/* Details of Faults Input */}
<View style={styles.inputContainer}>
          <Text style={styles.label}>Details of Faults</Text>
          <TextInput
            style={styles.minput}
            value={formData.detailsOFFaults}
            onChangeText={text => handleInputChange('detailsOFFaults', text)}
            placeholder="Details of Faults"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>

{/* Action Taken Input */}
<View style={styles.inputContainer}>
          <Text style={styles.label}>Action Taken</Text>
          <TextInput
            style={styles.minput}
            value={formData.actionTaken}
            onChangeText={text => handleInputChange('actionTaken', text)}
            placeholder="Action Taken"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>

{/* Actions Required Input */}
<View style={styles.inputContainer}>
          <Text style={styles.label}>Action Taken</Text>
          <TextInput
            style={styles.minput}
            value={formData.actionsRequired}
            onChangeText={text => handleInputChange('actionsRequired', text)}
            placeholder="Actions Required"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>




        {/* Reported to HSE under RIDDOR 11(1) (Gas Incident)*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Reported to HSE under RIDDOR 11(1) (Gas Incident)</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('reportedtoHSE1', option)
                }>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.reportedtoHSE1 != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Reported to HDE under RIDDOR 1(2) (Dangerous Gas Fitting) */}
        <View style={[styles.simple_container]}>
          <Text style={styles.optiontitle}>Reported to HDE under RIDDOR 1(2) (Dangerous Gas Fitting)</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('reportedtoHSE2', option)
                }>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.reportedtoHSE2 != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* The gas user was not present at the time of this visit and where appropriate, (an IMMEDIATELY DENGEROUS (ID) or AT RISK (AR) solution) the installation has been made safe and this notice left on the premisies. */}
        <View style={[styles.simple_container]}>
          <Text style={styles.optiontitle}>The gas user was not present at the time of this visit and where appropriate, (an IMMEDIATELY DENGEROUS (ID) or AT RISK (AR) solution) the installation has been made safe and this notice left on the premisies.</Text>
          <View style={styles.optionContainer}>
            {testOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('thegasuser', option)
                }>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.thegasuser != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
       
        <View style={styles.csButtonA}>
          
          <TouchableOpacity onPress={() => handleSave()} style={[styles.csButton,{backgroundColor: Color.primaryBGColor,}]}>
            <Text style={[styles.csBText,{color:'#FFF'}]}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.primaryBGColor,
    // paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : null,
  },
  container: {
    backgroundColor: '#FFF',
    padding: wp(3),
  },
  title: {
    color: '#2c3e50',
    fontSize: hp(2.4),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },
  inputContainer: {
    marginBottom: hp(2),
  },
  label: {
    color: '#222',
    fontSize: hp(2.1),
    marginBottom: hp(1),
  },
  drop: {
    color: '#7f8c8d',
    fontSize: hp(2),
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: wp(2.2),
    fontSize: hp(2),
    height:hp(6),
    color: '#2c3e50',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    height: hp(100),
    width: wp(100),
    paddingBottom: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    maxHeight: '70%',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.5),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: hp(0.5),
    marginBottom: hp(1),
  },
  searchInput: {
    flex: 1,
    paddingVertical: hp(1),
    fontSize: hp(2),
    color: '#222',
  },
  searchIcon: {
    marginRight: wp(2.5),
  },
  closeButton: {
    padding: wp(1.2),
    marginRight: -wp(1.2),
  },
  item: {
    backgroundColor: '#FFF',
  },
  itemText: {
    padding: wp(4),
    fontSize: hp(2),
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  emptyText: {
    padding: wp(4),
    fontSize: hp(2),
    color: '#888',
    textAlign: 'center',
  },
  displayValue: {
    marginTop: hp(1),
    fontSize: hp(1.6),
    color: '#555',
  },
  simple_container: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: wp(2),
    marginBottom: hp(2),
  },
  optiontitle: {
    color: '#2c3e50',
    fontSize: hp(1.8),
    fontWeight: '700',
    marginBottom: hp(2),
  },
  optionContainer: {
    flexDirection: 'column',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: wp(3),
    marginBottom: hp(1.5),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    color: '#2c3e50',
    fontSize: hp(2),
  },
  selectedOption: {
    backgroundColor: '#e0f7fa',
    borderColor: '#26a69a',
  },
  radioIcon: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(4),
    backgroundColor: '#26a69a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIconS: {
    height: wp(4),
    width: wp(4),
    borderRadius: wp(2),
    backgroundColor: 'white',
  },
  sectionTitle: {
    color: '#2c3e50',
    fontSize: hp(2),
    fontWeight: 'bold',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  rowContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginBottom: hp(2),
    alignItems: 'center',
  },
  inputContainerRow: {
    width: wp(100),
    alignItems: 'center',
  },
  valueInput: {
    backgroundColor: '#FFF',

    padding: wp(2.2),
    fontSize: hp(1.7),
    color: '#2c3e50',
    borderColor: '#64758b',

    width: wp(94),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  naButton: {
    backgroundColor: '#64758b',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    paddingVertical: hp(1),
    alignSelf: 'center',
    width: wp(94),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#64758b',
    borderWidth: 1,
    marginBottom: 5,
  },
  naButtonText: {
    color: '#FFF',
    fontSize: hp(1.6),
  },
  csButtonA: {
    width: wp(94),
    marginBottom:hp(4)
  },
  csButton: {
    padding: wp(3),
    width: wp(94),
    alignItems: 'center',
    justifyContent: 'center',
    
    marginBottom: hp(1),
    borderWidth:0.5,
    borderRadius:5,
    borderColor:Color.primaryBGColor,
  },
  csBText: {
    fontSize: hp(2),
    fontWeight: '700',
    color: Color.primaryBGColor,
  },
  minput: {
    borderWidth: 1,
    borderColor: Color.borderColor || '#ccc', // Use your color or a default
    borderRadius: wp('1%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    fontSize: wp('4%'),
    minHeight: hp('10%'), // Minimum height for multiline
    textAlignVertical: 'top', // Ensure text starts from the top in multiline
    backgroundColor: 'white', // Optional background color
  },
});

export default CP14AddAppliance;
