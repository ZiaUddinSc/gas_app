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

const PowerflushChecklist = () => {
  const [formData, setFormData] = useState({
    typeOfSystem: null,
    boiler: null,
    radiators: '',
    pipework: '',
    typeOfBoiler: null,
    locationOfBoiler: null,
    serialNumber: '',
    typeOfWaterCylinder: null,
    typeOfPipework: null,
    twinentryradiator: null,
    allradiatorscompletely: null,
    circulationAllRadiators: null,
    soundPowerFlush: null,
    locationCirculator: null,
    numberOfRadiators: '',
    radiatorType: null,
    gettingWarm: null,
    TRVfitted: null,
    signsNeglectLeak: null,
    thermosticRadiatorOpen: null,
    numberOfValves: '',
    location: null,
    locationInput: '',
    checked: null,
    condition: '',
    runFromBottomRadiator: null,
    systemWaterBeforePowerFlush: null,
    systemWaterAfterPowerFlush: [
      { pH: '', chloride: '', hardness: '', Inhibitor: '' },
      { pH: '', chloride: '', hardness: '', Inhibitor: '' },
      { pH: '', chloride: '', hardness: '', Inhibitor: '' },
    ],
    mainsWater: '',
    waterBeforeFlush: '',
    waterAfterFlush: '',
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
  const locationOptions = ['Airing Cupboard', 'Elsewhere'];
  const testOptions = ['Pass', 'Fail', 'N/A'];

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

  const handleInputChangeTable = (rowIndex: number, columnName: string, value: string) => {
    setFormData(prevFormData => {
      const updatedSystemWaterData = prevFormData.systemWaterAfterPowerFlush.map((item, index) => {
        if (index === rowIndex) {
          return { ...item, [columnName]: value };
        }
        return item;
      });

      return { ...prevFormData, systemWaterAfterPowerFlush: updatedSystemWaterData };
    });
  };

  const handleSave = useCallback(() => {
    navigation.navigate('Miscellaneous', {applianceData: formData});
  }, [navigation, formData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Powerflush Checklist"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Location Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type of System</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('typeOfSystem', item),
                title: 'Type of System',
              })
            }>
            <Text style={styles.drop}>
              {formData.typeOfSystem
                ? formData.typeOfSystem.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          Age of System
        </Text>

        {/* boiler Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Boiler</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('boiler', item),
                title: 'Boiler',
              })
            }>
            <Text style={styles.drop}>
              {formData.boiler ? formData.boiler.name : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        {/* Radiators Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Radiators</Text>
          <TextInput
            style={styles.input}
            value={formData.radiators}
            onChangeText={text => handleInputChange('radiators', text)}
            placeholder="Radiators"
            placeholderTextColor="#888"
          />
        </View>
        {/* Pipework Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pipework</Text>
          <TextInput
            style={styles.input}
            value={formData.pipework}
            onChangeText={text => handleInputChange('pipework', text)}
            placeholder="Pipework"
            placeholderTextColor="#888"
          />
        </View>

        {/* Type of boiler Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type of boiler</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('typeOfBoiler', item),
                title: 'Type of boiler',
              })
            }>
            <Text style={styles.drop}>
              {formData.typeOfBoiler
                ? formData.typeOfBoiler.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>
        {/* Location of Boiler Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location of Boiler</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('locationOfBoiler', item),
                title: 'Location of Boiler',
              })
            }>
            <Text style={styles.drop}>
              {formData.locationOfBoiler
                ? formData.locationOfBoiler.name
                : 'Please Select'}
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

        {/* Type of Water Cylinder Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type of Water Cylinder</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item =>
                  handleInputChange('typeOfWaterCylinder', item),
                title: 'Type of Water Cylinder',
              })
            }>
            <Text style={styles.drop}>
              {formData.typeOfWaterCylinder
                ? formData.typeOfWaterCylinder.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>
        {/* Type of Pipework Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type of Pipework</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('typeOfPipework', item),
                title: 'Type of Pipework',
              })
            }>
            <Text style={styles.drop}>
              {formData.typeOfPipework
                ? formData.typeOfPipework.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          If microbore system
        </Text>

        {/* Are twin entry radiator valves fitted */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
            Are twin entry radiator valves fitted
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('twinentryradiator', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.twinentryradiator != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* If so, are all radiators completely warm when boiler fired */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
            If so, are all radiators completely warm when boiler fired
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('allradiatorscompletely', option)
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
                  {formData.allradiatorscompletely != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          If single pipe system
        </Text>

        {/* Is there circulation (heat) to all radiators */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
            Is there circulation (heat) to all radiators
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('circulationAllRadiators', option)
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
                  {formData.circulationAllRadiators != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
          If elderly steel pipework
        </Text>

        {/* Is system sufficiently sound to power flush */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
            Is system sufficiently sound to power flush
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('soundPowerFlush', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.soundPowerFlush != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location of system circulator pump Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location of system circulator pump</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('locationCirculator', item),
                title: 'Location of system circulator pump',
              })
            }>
            <Text style={styles.drop}>
              {formData.locationCirculator
                ? formData.locationCirculator.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        {/* Number of radiators Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of radiators</Text>
          <TextInput
            style={styles.input}
            value={formData.numberOfRadiators}
            onChangeText={text => handleInputChange('numberOfRadiators', text)}
            placeholder="Number of radiators"
            placeholderTextColor="#888"
          />
        </View>


         {/* Radiator Type Dropdown */}
         <View style={styles.inputContainer}>
          <Text style={styles.label}>Radiator Type</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('radiatorType', item),
                title: 'Radiator Type',
              })
            }>
            <Text style={styles.drop}>
              {formData.radiatorType
                ? formData.radiatorType.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>



         {/* Are they getting warm */}
         <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
          Are they getting warm
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('gettingWarm', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.gettingWarm != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
         {/* Are TRV's fitted */}
         <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
          Are TRV's fitted
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('TRVfitted', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.TRVfitted != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
         {/* Any obvious signs of neglect/leak */}
         <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
          Any obvious signs of neglect/leak
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('signsNeglectLeak', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.signsNeglectLeak != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
         {/* Do all thermostic radiator valves (TRV's) open fully */}
         <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
          Do all thermostic radiator valves (TRV's) open fully
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('thermosticRadiatorOpen', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.thermosticRadiatorOpen != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
         All there zone valves / Where are they located
        </Text>


        {/* Number of valves Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of valves</Text>
          <TextInput
            style={styles.input}
            value={formData.numberOfValves}
            onChangeText={text => handleInputChange('numberOfValves', text)}
            placeholder="Number of valves"
            placeholderTextColor="#888"
          />
        </View>

        {/* Location */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
          Location
          </Text>
          <View style={styles.optionContainer}>
            {locationOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('location', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.location != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
         F & E Tank
        </Text>


        {/* Location Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={formData.locationInput}
            onChangeText={text => handleInputChange('locationInput', text)}
            placeholder="Location"
            placeholderTextColor="#888"
          />
        </View>

        {/* Checked */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
          Checked
          </Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('checked', option)}>
                <Text style={styles.optionText}>{option}</Text>

                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.checked != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>


         {/* Condition Input */}
         <View style={styles.inputContainer}>
          <Text style={styles.label}>Condition</Text>
          <TextInput
            style={styles.input}
            value={formData.condition}
            onChangeText={text => handleInputChange('condition', text)}
            placeholder="Condition"
            placeholderTextColor="#888"
          />
        </View>

        {/* Color of heating system water, as run from bottom of radiator Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Color of heating system water, as run from bottom of radiator</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('runFromBottomRadiator', item),
                title: 'Color of heating system water, as run from bottom of radiator',
              })
            }>
            <Text style={styles.drop}>
              {formData.runFromBottomRadiator
                ? formData.runFromBottomRadiator.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>
        {/* Visual inspection of system water before PowerFlush Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Visual inspection of system water before PowerFlush</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              openSearchableDropdown({
                items: dropdownOptions.location,
                onSelect: item => handleInputChange('systemWaterBeforePowerFlush', item),
                title: 'Visual inspection of system water before PowerFlush',
              })
            }>
            <Text style={styles.drop}>
              {formData.systemWaterBeforePowerFlush
                ? formData.systemWaterBeforePowerFlush.name
                : 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        <View style={styles.tableContainer}>
      <View style={styles.headerRow}>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Test Parameter</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>pH</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>chloride (ppm)</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Hardness</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Inhibitor (ppm molybdate)</Text>
        </View>
      </View>

      <View style={styles.dataRow}>
        <View style={styles.labelCell}>
          <Text style={styles.labelText}>Mains water</Text>
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[0].pH}
            onChangeText={(text) => handleInputChangeTable(0, 'pH', text)}
            placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[0].chloride}
            onChangeText={(text) => handleInputChangeTable(0, 'chloride', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[0].hardness}
            onChangeText={(text) => handleInputChangeTable(0, 'hardness', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[0].Inhibitor}
            onChangeText={(text) => handleInputChangeTable(0, 'Inhibitor', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
      </View>

      <View style={styles.dataRow}>
        <View style={styles.labelCell}>
          <Text style={styles.labelText}>System water before PowerFlush</Text>
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[1].pH}
            onChangeText={(text) => handleInputChangeTable(1, 'pH', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[1].chloride}
            onChangeText={(text) => handleInputChangeTable(1, 'chloride', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[1].hardness}
            onChangeText={(text) => handleInputChangeTable(1, 'hardness', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[1].Inhibitor}
            onChangeText={(text) => handleInputChangeTable(1, 'Inhibitor', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
      </View>

      <View style={styles.dataRow}>
        <View style={styles.labelCell}>
          <Text style={styles.labelText}>System water after PowerFlush</Text>
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[2].pH}
            onChangeText={(text) => handleInputChangeTable(2, 'pH', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[2].chloride}
            onChangeText={(text) => handleInputChangeTable(2, 'chloride', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[2].hardness}
            onChangeText={(text) => handleInputChangeTable(2, 'hardness', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputCell}>
          <TextInput
            style={styles.tableinput}
            value={formData.systemWaterAfterPowerFlush[2].Inhibitor}
            onChangeText={(text) => handleInputChangeTable(2, 'Inhibitor', text)}
             placeholder=""
            placeholderTextColor="#888"
          />
        </View>
      </View>
    </View>

    <Text
          style={[styles.optiontitle, {fontSize: hp(3), paddingLeft: wp(3)}]}>
        TDS Readings
        </Text>

          {/* Mains Water Input */}
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Mains Water</Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          <TextInput
            style={[styles.input,{width:wp(78)}]}
            value={formData.mainsWater}
            onChangeText={text => handleInputChange('mainsWater', text)}
            placeholder="Mains Water"
            placeholderTextColor="#888"
          />
          <View style={styles.inputtype}><Text style={styles.label}>ppm</Text></View>
          </View>
        </View>
          {/* System water before flush */}
          <View style={styles.inputContainer}>
          <Text style={styles.label}>System water before flush</Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          <TextInput
           style={[styles.input,{width:wp(78)}]}
            value={formData.waterBeforeFlush}
            onChangeText={text => handleInputChange('waterBeforeFlush', text)}
            placeholder="System water before flush"
            placeholderTextColor="#888"
          />
          <View style={styles.inputtype}><Text style={styles.label}>ppm</Text></View>
          </View>
        </View>
          {/*System water after flush */}
          <View style={styles.inputContainer}>
          <Text style={styles.label}>System water after flush</Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          <TextInput
            style={[styles.input,{width:wp(78)}]}
            value={formData.waterAfterFlush}
            onChangeText={text => handleInputChange('waterAfterFlush', text)}
            placeholder="System water after flush"
            placeholderTextColor="#888"
          />
          <View style={styles.inputtype}><Text style={styles.label}>ppm</Text></View>
          </View>
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
  inputtype: {
    backgroundColor: '#e2e8f0',
    borderRadius: 5,
    padding: wp(2.2),
    height: hp(6),
    borderColor: '#e2e8f0',
  
    alignItems: 'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    width:wp(15)
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
  tableContainer: {
    flex: 1,
    padding: 10,
    width: '100%'
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText:{
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labelCell: {
    flex: 2,
    padding: 10,
    textAlign: 'left',
  },
   labelText:{
    textAlign: 'left',
  },
  inputCell: {
    flex: 1,
    padding: 5,
  },
  tableinput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
  },
});

export default PowerflushChecklist;
