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

const GasBoilerAddAppliance = () => {
  const [formData, setFormData] = useState({
    make: null,
    model: '',
    applianceSerialNumber: '',
    TtimeANDtemperature: null,
    gcNumber: '',
    timeANDTemperatureradeo: null,
    heatingZoneValves: null,
    heatingWaterZoneValves: null,
    thermosticRadiatorValves: null,
    automaticBypassSystem: null,
    boilerInterlock: null,
    systemHasBeenFlushed: null,
    cleanerWasUsed: '',
    inhibitorWasUsedQuentity: '',
    inhibitorWasUsedLiters: '',
    primaryWaterSystemInstalled: null,
    gasRate: '',
    gasRateunit: null,
    factorysetting: null,
    burneroperating: null,
    burneroperatingUnit: null,
    flowtemperature: '',
    returntemperature: '',
    installationinhardwater: null,
    manufacturerscalereducer: null,
    scalereducer: null,
    domesticgasRate: '',
    domesticgasRateunit: null,
    domesticburneroperating: null,
    domesticburneroperatingUnit: null,
    coldWaterTem: '',
    watercheckedoutlet: null,
    Waterflowrate: '',
    manufacturerinstructionsBS5546: null,
    pintoftermination: null,
    methodOFdisposal: null,

    minratio: '',
    minco: '',
    minco2: '',
    maxratio: '',
    maxco: '',
    maxco2: '',

    hotwatersystemcomplies: null,
    boilerssociatedmanufacturer: null,
    boilersystemcontrolscustomer: null,
    manufacturerexplainedcustomer: null,
    applycertificate: null,
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
  const timeANDTemperatureOptions = [
    'Cylinder thermostat and programmer/timer',
    'Combination boiler',
  ];
  const fittedOptions = ['Fitted', 'Not Required'];
  const boilerInterlockOptions = ['Provided', 'Not Provided'];
  const gasRateunitOptions = ['m3/hr', 'ft3/hr'];
  const burneroperatingUnitOptions = ['mbar', 'kW/h', 'Btu/h'];
  const pintOFterminationOptions = ['Internal', 'External', 'N/A'];
  const methodOFdisposalOptions = ['Gravity', 'Pumped', 'N/A'];
  const applycertificateOptions = ['Applicable', 'Not Applicable'];

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
              {formData.make ? formData.make.name : 'Search Here ....'}
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

        {/* Appliance Serial Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Appliance Serial Number</Text>
          <TextInput
            style={styles.input}
            value={formData.applianceSerialNumber}
            onChangeText={text =>
              handleInputChange('applianceSerialNumber', text)
            }
            placeholder="Serial Number"
            placeholderTextColor="#888"
          />
        </View>

        {/* Ttime and temperature control to heating Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Ttime and temperature control to heating
          </Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.type,
                onSelect: item =>
                  handleInputChange('TtimeANDtemperature', item),
                title: 'Ttime and temperature control to heating',
              })
            }>
            <Text style={styles.drop}>
              {formData.TtimeANDtemperature
                ? formData.TtimeANDtemperature.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        {/* Time and temperature control to hot water */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Time and temperature control to hot water
          </Text>
          <View style={styles.optionContainer}>
            {timeANDTemperatureOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('timeANDTemperatureradeo', option)
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
                  {formData.timeANDTemperatureradeo != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Heating zone valves */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Heating zone valves</Text>
          <View style={styles.optionContainer}>
            {fittedOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('heatingZoneValves', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.heatingZoneValves != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Hot water zone valves */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Hot water zone valves</Text>
          <View style={styles.optionContainer}>
            {fittedOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('heatingWaterZoneValves', option)
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
                  {formData.heatingWaterZoneValves != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Thermostic radiator valves  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Thermostic radiator valves</Text>
          <View style={styles.optionContainer}>
            {fittedOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('thermosticRadiatorValves', option)
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
                  {formData.thermosticRadiatorValves != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Automatic bypass to system  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Automatic bypass to system</Text>
          <View style={styles.optionContainer}>
            {fittedOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('automaticBypassSystem', option)
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
                  {formData.automaticBypassSystem != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Boiler interlock  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Boiler interlock</Text>
          <View style={styles.optionContainer}>
            {boilerInterlockOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('boilerInterlock', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.boilerInterlock != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          All System
        </Text>

        {/* The system has been flushed and cleaned in accordance with BS7593 and boiler manufacturer's instructions  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            The system has been flushed and cleaned in accordance with BS7593
            and boiler manufacturer's instructions
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('systemHasBeenFlushed', option)
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
                  {formData.systemHasBeenFlushed != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* What cleaner was used? Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>What cleaner was used?</Text>
          <TextInput
            style={styles.input}
            value={formData.cleanerWasUsed}
            onChangeText={text => handleInputChange('cleanerWasUsed', text)}
            placeholder="Cleaner Name"
            placeholderTextColor="#888"
          />
        </View>
        {/* What inhibitor was used? */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>What inhibitor was used?</Text>
          <TextInput
            style={styles.input}
            value={formData.inhibitorWasUsedQuentity}
            onChangeText={text =>
              handleInputChange('inhibitorWasUsedQuentity', text)
            }
            placeholder="Quentity"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={formData.inhibitorWasUsedLiters}
            onChangeText={text =>
              handleInputChange('inhibitorWasUsedLiters', text)
            }
            placeholder="Liters"
            placeholderTextColor="#888"
          />
        </View>

        {/* Has a primary water system filter been installed  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Has a primary water system filter been installed
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('primaryWaterSystemInstalled', option)
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
                  {formData.primaryWaterSystemInstalled != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          Central Hot Water Mode
        </Text>
        {/* Gas Rate */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gas Rate</Text>
          <TextInput
            style={styles.input}
            value={formData.gasRate}
            onChangeText={text => handleInputChange('gasRate', text)}
            placeholder="Ratio"
            placeholderTextColor="#888"
          />
        </View>

        {/*Gas rate unit  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Gas rate unit</Text>
          <View style={styles.optionContainer}>
            {gasRateunitOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('gasRateunit', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.gasRateunit != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*Central heating output left at factory setting  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Central heating output left at factory setting
          </Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('factorysetting', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.factorysetting != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/*Burner operating pressure (or intel pressure) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Burner operating pressure (or intel pressure)
          </Text>
          <TextInput
            style={styles.input}
            value={formData.burneroperating}
            onChangeText={text => handleInputChange('burneroperating', text)}
            placeholder="Burner pressure "
            placeholderTextColor="#888"
          />
        </View>

        {/*Burner operating pressure (or intel pressure) Unit  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Burner operating pressure (or intel pressure) Unit
          </Text>
          <View style={styles.optionContainer}>
            {burneroperatingUnitOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('burneroperatingUnit', option)
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
                  {formData.burneroperatingUnit != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/*Central heating flow temperature) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Central heating flow temperature</Text>
          <TextInput
            style={styles.input}
            value={formData.flowtemperature}
            onChangeText={text => handleInputChange('flowtemperature', text)}
            placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        {/*Central heating return temperature */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Central heating return temperature</Text>
          <TextInput
            style={styles.input}
            value={formData.returntemperature}
            onChangeText={text => handleInputChange('returntemperature', text)}
            placeholder=""
            placeholderTextColor="#888"
          />
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          Combination boilers only
        </Text>

        {/*Is the installation in a hard water area (above 200ppm) */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Is the installation in a hard water area (above 200ppm)
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('installationinhardwater', option)
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
                  {formData.installationinhardwater != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*If yes and if required by the manufacturer, has the water scale reducer been fitted?*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            If yes and if required by the manufacturer, has the water scale
            reducer been fitted?
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('manufacturerscalereducer', option)
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
                  {formData.manufacturerscalereducer != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*What type of scale reducer been fitted?*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            What type of scale reducer been fitted?
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('scalereducer', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.scalereducer != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          Domestic hot water mode
        </Text>

        {/* Gas Rate */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gas Rate</Text>
          <TextInput
            style={styles.input}
            value={formData.domesticgasRate}
            onChangeText={text => handleInputChange('domesticgasRate', text)}
            placeholder="Ratio"
            placeholderTextColor="#888"
          />
        </View>

        {/*Gas rate unit  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Gas rate unit</Text>
          <View style={styles.optionContainer}>
            {gasRateunitOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('domesticgasRateunit', option)
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
                  {formData.domesticgasRateunit != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/*Burner operating pressure (or intel pressure) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Burner operating pressure (or intel pressure)
          </Text>
          <TextInput
            style={styles.input}
            value={formData.domesticburneroperating}
            onChangeText={text =>
              handleInputChange('domesticburneroperating', text)
            }
            placeholder="Burner pressure "
            placeholderTextColor="#888"
          />
        </View>

        {/*Burner operating pressure (or intel pressure) Unit  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Gas rate Unit</Text>
          <View style={styles.optionContainer}>
            {burneroperatingUnitOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('domesticburneroperatingUnit', option)
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
                  {formData.domesticburneroperatingUnit != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/*Cold water intel temperature */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cold water intel temperature</Text>
          <TextInput
            style={styles.input}
            value={formData.coldWaterTem}
            onChangeText={text => handleInputChange('coldWaterTem', text)}
            placeholder=""
            placeholderTextColor="#888"
          />
        </View>

        {/*Hot water has been checked at all outlet  */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            Hot water has been checked at all outlet
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('watercheckedoutlet', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.watercheckedoutlet != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/*Water flow rate */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Water flow rate</Text>
          <TextInput
            style={styles.input}
            value={formData.Waterflowrate}
            onChangeText={text => handleInputChange('Waterflowrate', text)}
            placeholder=""
            placeholderTextColor="#888"
          />
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          Condensing Boilers Only
        </Text>

        {/*The condensate drain has been installed in accordance with the manufacturer's instructions and/or BS5546/BS6798*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            The condensate drain has been installed in accordance with the
            manufacturer's instructions and/or BS5546/BS6798
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('manufacturerinstructionsBS5546', option)
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
                  {formData.manufacturerinstructionsBS5546 != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*Pint of termination*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Pint of termination</Text>
          <View style={styles.optionContainer}>
            {pintOFterminationOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('pintoftermination', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.pintoftermination != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*Method of disposal*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Method of disposal</Text>
          <View style={styles.optionContainer}>
            {methodOFdisposalOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('methodOFdisposal', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.methodOFdisposal != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          All Installations
        </Text>

        {/* Min Readings */}
        <Text style={styles.label}>Min Readings</Text>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>RATIO</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.minratio}
              onChangeText={text => handleInputChange('minratio', text)}
              placeholder="Ratio"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('minratio', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO (PPM)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.minco}
              onChangeText={text => handleInputChange('minco', text)}
              placeholder="CO (PPM)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('minco', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO2 (%)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.minco2}
              onChangeText={text => handleInputChange('minco2', text)}
              placeholder="CO2 (%)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('minco2', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Max Readings */}
        <Text style={styles.label}>Max Readings</Text>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>RATIO</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.maxratio}
              onChangeText={text => handleInputChange('maxratio', text)}
              placeholder="Ratio"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('maxratio', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO (PPM)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.maxco}
              onChangeText={text => handleInputChange('maxco', text)}
              placeholder="CO (PPM)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('maxco', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO2 (%)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.maxco2}
              onChangeText={text => handleInputChange('maxco2', text)}
              placeholder="CO2 (%)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('maxco2', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*The heating and hot water system complies with the appropriate Building Regulations
         */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            The heating and hot water system complies with the appropriate
            Building Regulations
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('hotwatersystemcomplies', option)
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
                  {formData.hotwatersystemcomplies != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*The boiler and associated products have been installed and commissioned in accordance with the manufacturer's instructions*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            The boiler and associated products have been installed and
            commissioned in accordance with the manufacturer's instructions
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('boilerssociatedmanufacturer', option)
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
                  {formData.boilerssociatedmanufacturer != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*The operation of the boiler system controls have been demonstrated to and understood by the customer*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
            The operation of the boiler system controls have been demonstrated
            to and understood by the customer
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('boilersystemcontrolscustomer', option)
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
                  {formData.boilersystemcontrolscustomer != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*The manufacturer's literature, including Benchmark Checklist and Service Record, has been explained and left with the customer*/}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
          The manufacturer's literature, including Benchmark Checklist and Service Record, has been explained and left with the customer
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('manufacturerexplainedcustomer', option)
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
                  {formData.manufacturerexplainedcustomer != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>



        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          Next Inspection
        </Text>

 {/*Does the next inspection apply to this certificate?*/}
 <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>
          Does the next inspection apply to this certificate?
          </Text>
          <View style={styles.optionContainer}>
            {applycertificateOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('applycertificate', option)
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
                  {formData.applycertificate != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.optiontitlelast}>
          If "Not Applicable" selected for this option, this inspection date will not be displayed on this certificate and the reminder for this certificate will not be scheduled.
          </Text>
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
  optiontitlelast: {
    color: '#2c3e50',
    fontSize: hp(1.5),
    fontWeight: '400',
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

export default GasBoilerAddAppliance;
