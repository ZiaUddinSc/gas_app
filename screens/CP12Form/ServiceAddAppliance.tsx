import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ArrowLeft, ChevronDown} from 'lucide-react-native';
import Color from '../../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {useFormData} from '../../contexts/FormContext';

const ServiceAddAppliance = () => {
  const route = useRoute();
  const titleData = route.params?.titleData;
  const navigation = useNavigation();
  const {formData, setFormData} = useFormData();

  // Initialize appliance data if not exists
  useEffect(() => {
    if (!formData.applianceData) {
      setFormData(prev => ({
        ...prev,
        applianceData: {
          location: null,
          make: null,
          model: '',
          type: null,
          serialNumber: '',
          gcNumber: '',
          operatingPressure: '',
          rentedAccommodation: null,
          typeOfWork: null,
          gastest: null,
          electricalbonding: null,
          initalratio: '',
          initalco: '',
          initalco2: '',
          finalratio: '',
          finalco: '',
          finalco2: '',
          heatExchanger: null,
          heatExchangerDetails: '',
          burnerInjectors: null,
          burnerInjectorsDetails: '',
          flamePicture: null,
          flamePictureDetails: '',
          ignition: null,
          ignitionDetails: '',
          electrics: null,
          electricsDetails: '',
          controls: null,
          controlsDetails: '',
          leaksGasWater: null,
          leaksGasWaterDetails: '',
          seals: null,
          sealsDetails: '',
          pipework: null,
          pipeworkDetails: '',
          fans: null,
          fansDetails: '',
          fireplace: null,
          fireplaceDetails: '',
          closurePlate: null,
          closurePlateDetails: '',
          allowableLocation: null,
          allowableLocationDetails: '',
          boilerRatio: null,
          boilerRatioDetails: '',
          stability: null,
          stabilityDetails: '',
          returnAirPlenum: null,
          returnAirPlenumDetails: '',
          ventillation: null,
          ventillationDetails: '',
          flueTermination: null,
          flueTerminationDetails: '',
          smokePellet: null,
          smokePelletDetails: '',
          smokeMatch: null,
          smokeMatchDetails: '',
          workingPressure: null,
          workingPressureDetails: '',
          safetyDevices: null,
          safetyDevicesDetails: '',
          gasTightnesstest: null,
          gasTightnesstestDetails: '',
          expansionVassel: null,
          expansionVasselDetails: '',
          other: null,
          otherDetails: '',
          installationANDappliance: null,
          manufacturersInstructions: null,
          necessaryremedialworkrequired: ''
        }
      }));
    }
  }, []);

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
  };

  const booleanOptions = ['Yes', 'No', 'N/A'];
  const yesNoOptions = ['Yes', 'No'];
  const testOptions = ['Pass', 'Fail', 'N/A'];
  const ServiceOptions = ['Service', 'Maintenance', 'Call Out'];

  const openSearchableDropdown = (params: {
    items: any[];
    onSelect: (item: any) => void;
    title: string;
  }) => {
    navigation.navigate('SelectItem', params);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      applianceData: {
        ...prev.applianceData,
        [field]: value === 'N/A' ? 'N/A' : value
      }
    }));
  };

  const handleSave = useCallback(() => {
    navigation.navigate('CP12Form', {titleData});
  }, [navigation, titleData]);

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
              {formData.applianceData?.location?.name || 'Please Select'}
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
                formData.applianceData?.make ? {color: '#222'} : {color: '#888'},
                styles.drop,
              ]}>
              {formData.applianceData?.make?.name || 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

        {/* Model Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            value={formData.applianceData?.model || ''}
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
              {formData.applianceData?.type?.name || 'Please Select'}
            </Text>
            <ChevronDown size={18} />
          </TouchableOpacity>
        </View>

   
         {/* Serial Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Serial Number</Text>
          <TextInput
            style={styles.input}
            value={formData.applianceData?.serialNumber || ''}
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
            value={formData.applianceData?.gcNumber || ''}
            onChangeText={text => handleInputChange('gcNumber', text)}
            placeholder="GC Number"
            placeholderTextColor="#888"
          />
        </View>

        {/* Operating Pressure Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Operating Pressure (mbar) or Heat Input (KW/h) or (BTU/h)
          </Text>
          <TextInput
            style={styles.input}
            value={formData.applianceData?.operatingPressure}
            onChangeText={text => handleInputChange('operatingPressure', text)}
            placeholder="Operating Pressure"
            placeholderTextColor="#888"
          />
        </View>

        {/* Rented Accommodation Section */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>Rented Accommodation</Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() =>
                  handleInputChange('rentedAccommodation', option)
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
                  {formData.applianceData?.rentedAccommodation != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Type of Work Carried OutSection */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>Type of Work Carried Out</Text>
          <View style={styles.optionContainer}>
            {ServiceOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('typeOfWork', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.typeOfWork != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* If a gas test has been carried out, was this a pass or fail */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
            If a gas test has been carried out, was this a pass or fail
          </Text>
          <View style={styles.optionContainer}>
            {testOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('gastest', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.gastest != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Is electrical bonding (where required satisfactory) */}
        <View style={styles.simple_container}>
          <Text style={styles.optiontitle}>
            Is electrical bonding (where required satisfactory)
          </Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('electricalbonding', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.electricalbonding != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Initial Combustion Analyser Readings */}
        <Text style={styles.label}>
          Initial (Low) Combustion Analyser Readings
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>RATIO</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.applianceData?.initalratio}
              onChangeText={text => handleInputChange('initalratio', text)}
              placeholder="Ratio"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('initalratio', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO (PPM)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.applianceData?.initalco}
              onChangeText={text => handleInputChange('initalco', text)}
              placeholder="CO (PPM)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('initalco', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO2 (%)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.applianceData?.initalco2}
              onChangeText={text => handleInputChange('initalco2', text)}
              placeholder="CO2 (%)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('initalco2', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Final (high) Combustion Analyser Reading */}
        <Text style={[styles.label, {marginTop: 10}]}>
          Final (high) Combustion Analyser Reading
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>RATIO</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.applianceData?.finalratio}
              onChangeText={text => handleInputChange('finalratio', text)}
              placeholder="Ratio"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('finalratio', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO (PPM)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.applianceData?.finalco}
              onChangeText={text => handleInputChange('finalco', text)}
              placeholder="CO (PPM)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('finalco', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainerRow}>
            <Text style={styles.label}>CO2 (%)</Text>
            <TextInput
              style={styles.valueInput}
              value={formData.applianceData?.finalco2}
              onChangeText={text => handleInputChange('finalco2', text)}
              placeholder="CO2 (%)"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.naButton}
              onPress={() => handleInputChange('finalco2', 'N/A')}>
              <Text style={styles.naButtonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Heat Exchanger */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Heat Exchanger</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('heatExchanger', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.heatExchanger != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Details of Faults Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Heat Exchanger: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.heatExchangerDetails}
            onChangeText={text =>
              handleInputChange('heatExchangerDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>



        {/* Burner / Injectors */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Burner / Injectors</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('burnerInjectors', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.burnerInjectors != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Burner / Injectors: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Burner / Injectors: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.burnerInjectorsDetails}
            onChangeText={text =>
              handleInputChange('burnerInjectorsDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>


        {/* Flame Picture */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Flame Picture</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('flamePicture', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.flamePicture != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Flame Picture: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Flame Picture: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.flamePictureDetails}
            onChangeText={text =>
              handleInputChange('flamePictureDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Ignition */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Ignition</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('ignition', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.ignition != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ignition: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Ignition: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.ignitionDetails}
            onChangeText={text =>
              handleInputChange('ignitionDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Electrics */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Electrics</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('electrics', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.electrics != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Electrics: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Electrics: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.electricsDetails}
            onChangeText={text =>
              handleInputChange('electricsDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Controls */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Controls</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('controls', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.controls != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Controls: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Controls: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.controlsDetails}
            onChangeText={text =>
              handleInputChange('controlsDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Leaks Gas / Water */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Leaks Gas / Water</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('leaksGasWater', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.leaksGasWater != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Leaks Gas / Water: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Leaks Gas / Water: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.leaksGasWaterDetails}
            onChangeText={text =>
              handleInputChange('leaksGasWaterDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Seals */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Seals</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('seals', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.seals != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Seals: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Seals: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.sealsDetails}
            onChangeText={text =>
              handleInputChange('sealsDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Pipework */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Pipework</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('pipework', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.pipework != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pipework: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Pipework: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.pipeworkDetails}
            onChangeText={text =>
              handleInputChange('pipeworkDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Fans */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Fans</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('fans', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.fans != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fans: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Fans: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.fansDetails}
            onChangeText={text =>
              handleInputChange('fansDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Fireplace */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Fireplace</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('fireplace', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.fireplace != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fireplace: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Fireplace: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.fireplaceDetails}
            onChangeText={text =>
              handleInputChange('fireplaceDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Closure Plate & PRS10 Tape */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Closure Plate & PRS10 Tape</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('closurePlate', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.closurePlate != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Closure Plate & PRS10 Tape: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Closure Plate & PRS10 Tape: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.closurePlateDetails}
            onChangeText={text =>
              handleInputChange('closurePlateDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Allowable Location */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Allowable Location</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('allowableLocation', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.allowableLocation != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Allowable Location: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Allowable Location: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.allowableLocationDetails}
            onChangeText={text =>
              handleInputChange('allowableLocationDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Boiler Ratio */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Boiler Ratio</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('boilerRatio', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.boilerRatio != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Boiler Ratio: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Boiler Ratio: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.boilerRatioDetails}
            onChangeText={text =>
              handleInputChange('boilerRatioDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Stability */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Stability</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('stability', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.stability != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stability: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Stability: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.stabilityDetails}
            onChangeText={text =>
              handleInputChange('stabilityDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Return Air / Plenum */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Return Air / Plenum</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('returnAirPlenum', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.returnAirPlenum != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Return Air / Plenum: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Return Air / Plenum: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.returnAirPlenumDetails}
            onChangeText={text =>
              handleInputChange('returnAirPlenumDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Ventillation */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Ventillation</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('ventillation', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.ventillation != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ventillation: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Ventillation: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.ventillationDetails}
            onChangeText={text =>
              handleInputChange('ventillationDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Flue Termination */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Flue Termination</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('flueTermination', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.flueTermination != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Flue Termination: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Flue Termination: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.flueTerminationDetails}
            onChangeText={text =>
              handleInputChange('flueTerminationDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Smoke Pellet Flue Flow Test */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Smoke Pellet Flue Flow Test</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('smokePellet', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.smokePellet != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Smoke Pellet Flue Flow Test: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Smoke Pellet Flue Flow Test: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.smokePelletDetails}
            onChangeText={text =>
              handleInputChange('smokePelletDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Smoke Match Spillage Test */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Smoke Match Spillage Test</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('smokeMatch', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.smokeMatch != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Smoke Match Spillage Test: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Smoke Match Spillage Test: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.smokeMatchDetails}
            onChangeText={text =>
              handleInputChange('smokeMatchDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Working Pressure */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Working Pressure</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('workingPressure', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.workingPressure != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Working Pressure: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Working Pressure: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.workingPressureDetails}
            onChangeText={text =>
              handleInputChange('workingPressureDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Safety Devices */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Safety Devices</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('safetyDevices', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.safetyDevices != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Safety Devices: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Safety Devices: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.safetyDevicesDetails}
            onChangeText={text =>
              handleInputChange('safetyDevicesDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Gas Tightness test performed */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Gas Tightness test performed</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('gasTightnesstest', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.gasTightnesstest != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gas Tightness test performed: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Gas Tightness test performed: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.gasTightnesstestDetails}
            onChangeText={text =>
              handleInputChange('gasTightnesstestDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Expansion Vassel checked / recharged? */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Expansion Vassel checked / recharged?</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('expansionVassel', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.expansionVassel != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Expansion Vassel checked / recharged?: Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Expansion Vassel checked / recharged?: Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.expansionVasselDetails}
            onChangeText={text =>
              handleInputChange('expansionVasselDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>
        {/* Other (regulations etc.) */}
        <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Other (regulations etc.)</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('other', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.other != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Other (regulations etc.): Defects found / remedial action taken Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Other (regulations etc.): Defects found / remedial action taken
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.otherDetails}
            onChangeText={text =>
              handleInputChange('otherDetails', text)
            }
            placeholder="Details"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
          />
        </View>

                {/* Is the Installation and appliance safe to use? */}
                <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Is the Installation and appliance safe to use?</Text>
          <View style={styles.optionContainer}>
            {booleanOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('installationANDappliance', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.installationANDappliance != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
                {/*Has the installation been carried out to the relevant standard / manufacturers instructions? */}
                <View style={[styles.simple_container, {marginTop: 8}]}>
          <Text style={styles.optiontitle}>Has the installation been carried out to the relevant standard / manufacturers instructions?</Text>
          <View style={styles.optionContainer}>
            {yesNoOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleInputChange('manufacturersInstructions', option)}>
                <Text style={styles.optionText}>{option}</Text>
                <View
                  style={[
                    styles.radioIcon,
                    {
                      backgroundColor: Color.primaryBGColor,
                      borderRadius: wp(4),
                    },
                  ]}>
                  {formData.applianceData?.manufacturersInstructions != option && (
                    <View style={styles.radioIconS} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

                {/* Necessary remedial work required */}
                <View style={styles.inputContainer}>
          <Text style={styles.label}>
          Necessary remedial work required
          </Text>
          <TextInput
            style={styles.minput}
            value={formData.applianceData?.necessaryremedialworkrequired}
            onChangeText={text =>
              handleInputChange('necessaryremedialworkrequired', text)
            }
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

export default ServiceAddAppliance;
