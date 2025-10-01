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

const GasBreakdownAddAppliance = () => {
  const [formData, setFormData] = useState({
    location: null,
    make: null,
    model: '',
    type: null,
    serialNumber: '',
    gcNumber: '',

    combustionratio: '',
    combustionco: '',
    combustionco2: '',

    applianceISoperationg: null,
    applianceConfirms: null,
    safetyWarningAadvice: null,
    applianceFlueing: null,
    applianceVentilation: null,
    emissionCombustion: null,
    burnerPressureGas: null,
    locationFault: null,
    faultResolved: null,

    partsFitted: null,
    partsFittedDetails: '',
    partsRequired: null,
    partsRequiredDetails: '',

    approvedAudible: null,
    approvedISsafe: null,
    allFunctionalParts: null,
    recommendedAppliance: null,
    magneticSystem: null,
    systemImprovements: null,

    engineerComments: '',
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
  const yesNoOptions = ['Yes', 'No'];
  const testOptions = ['Pass', 'Fail', 'N/A'];
  const ServiceOptions = ['Service', 'Maintenance', 'Call Out'];
  const locationOptions = ['Appliance', 'System'];

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
    navigation.navigate('CP12Form', {applianceData: formData});
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
            <Text
              style={[
                formData.make ? {color: '#222'} : {color: '#888'},
                styles.drop,
              ]}>
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

        {/* Combustion Parformance Reading */}
        <Text style={styles.label}>Combustion Parformance Reading</Text>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>RATIO</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.combustionratio}
              onChangeText={text => handleInputChange('combustionratio', text)}
              placeholder="Ratio"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('combustionratio', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO (PPM)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.combustionco}
              onChangeText={text => handleInputChange('combustionco', text)}
              placeholder="CO (PPM)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('combustionco', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO2 (%)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.combustionco2}
              onChangeText={text => handleInputChange('combustionco2', text)}
              placeholder="CO2 (%)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('combustionco2', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Appliance is operationg correctly */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Appliance is operationg correctly
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('applianceISoperationg', option)
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
                  {formData.applianceISoperationg != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Appliance confirms to corrent safety standards */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Appliance confirms to corrent safety standards
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('applianceConfirms', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceConfirms != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Safety warning/advice notice explained and left */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Safety warning/advice notice explained and left
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('safetyWarningAadvice', option)
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
                  {formData.safetyWarningAadvice != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Appliance flueing is safe */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Appliance flueing is safe</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('applianceFlueing', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceFlueing != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Appliance ventilation is safe */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Appliance ventilation is safe</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('applianceVentilation', option)
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
                  {formData.applianceVentilation != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Emission / Combustion test */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Emission / Combustion test</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('emissionCombustion', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.emissionCombustion != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Burner pressure / Gas rate correct */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Burner pressure / Gas rate correct
          </Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('burnerPressureGas', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.burnerPressureGas != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Location of Fault */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Location of Fault</Text>
          <View style={styles.optionContainer}>
            {locationOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('locationFault', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.locationFault != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Fault resolved */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Fault resolved</Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('faultResolved', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.faultResolved != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Parts fitted this visit */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Parts fitted this visit</Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('partsFitted', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.partsFitted != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* If yes, Enter name of parts */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>If yes, Enter name of parts</Text>
          <TextInput
            style={styles.minput}
            value={formData.partsFittedDetails}
            onChangeText={text => handleInputChange('partsFittedDetails', text)}
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>

        {/*Parts required */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Parts required</Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('partsRequired', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.partsRequired != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* If yes, Enter parts name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>If yes, Enter parts name</Text>
          <TextInput
            style={styles.minput}
            value={formData.partsRequiredDetails}
            onChangeText={text =>
              handleInputChange('partsRequiredDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Approved audible carbon monoxide alarm fitted */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Approved audible carbon monoxide alarm fitted
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('approvedAudible', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.approvedAudible != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Approved is safe */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Approved is safe</Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('approvedISsafe', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.approvedISsafe != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* All functional parts is available */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            All functional parts is available
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('allFunctionalParts', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.allFunctionalParts != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommended appliance replacement */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Recommended appliance replacement
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('recommendedAppliance', option)
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
                  {formData.recommendedAppliance != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Magnetic system filter fitted */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Magnetic system filter fitted</Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('magneticSystem', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.magneticSystem != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* System improvements recommended */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            System improvements recommended
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('systemImprovements', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.systemImprovements != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Magnetic system filter fitted */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Magnetic system filter fitted</Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('magneticSystem', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.magneticSystem != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Engineer Comments */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Engineer Comments</Text>
          <TextInput
            style={styles.minput}
            value={formData.engineerComments}
            onChangeText={text => handleInputChange('engineerComments', text)}
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.csButtonA}>
          <TouchableOpacity
            onPress={() => handleSave()}
            style={[styles.csButton, {backgroundColor: Color.primaryBGColor}]}>
            <Text style={[styles.csBText, {color: '#FFF'}]}>Save</Text>
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
    height: hp(6),
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
    marginBottom: hp(4),
  },
  csButton: {
    padding: wp(3),
    width: wp(94),
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: hp(1),
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Color.primaryBGColor,
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

export default GasBreakdownAddAppliance;
