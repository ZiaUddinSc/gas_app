import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import LinkedJobSelector from '../../components/LinkedJobSelector';
import CustomerSelector from '../../components/CustomerSelector';
import ApplianceAndInspections from '../../components/ApplianceAndInspections';
import SignaturePad from '../../components/SignaturePad';
import DatePicker from '../../components/DatePicker';
import {styles} from './styles';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowLeft, User, ChevronRight, Edit} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {CreateServiceRecord} from '../../helper/NewCertificateHelper';
import {useFormData} from '../../contexts/FormContext';

const CP12Form = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const applianceData = route.params?.applianceData;
 const { titleData, slug } = route.params || {};
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const totalQuestions = 8;
  //   alert(JSON.stringify(route.params));
  const [signature, setSignature] = useState(null);
  const {formData, setFormData,resetFormData} = useFormData();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.signature) {
        setFormData(prev => ({
          ...prev,
          signatureImage: route.params.signature,
        }));
      }
    }, [route.params?.signature]),
  );

  // Job
  const handleJobSelection = job => {
    setFormData(prev => ({
      ...prev,
      selectedJob: job,
    }));
  };

  // Customer
  const handleCustomerlection = customer => {
    setFormData(prev => ({
      ...prev,
      selectedCustomer: {id: customer.id, name: customer.name},
    }));
  };

  const handleCreateServiceRecord = async () => {
    if (!formData.selectedCustomer) {
      Alert.alert('Error', 'Please select a customer');
      return;
    }
    if (!formData.selectedJob) {
      Alert.alert('Error', 'Please select a Link Job');
      return;
    }

    // Format dates to YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // Transform appliance data to match API structure
    const transformApplianceData = (appliance: any) => ({
      appliance_serial: '1', // You may need to generate this
      appliance_location_id: appliance.location?.id.toString(),
      boiler_brand_id: appliance.make?.id.toString(),
      model: appliance.model,
      appliance_type_id: appliance.type?.id.toString(),
      serial_no: appliance.serialNumber,
      gc_no: appliance.gcNumber,
      opt_pressure: appliance.operatingPressure,
      rented_accommodation: appliance.rentedAccommodation,
      type_of_work_carried_out: appliance.typeOfWork?.name || 'Service',
      test_carried_out: appliance.gastest ? 'Pass' : 'Fail',
      is_electricial_bonding: appliance.electricalbonding ? 'Yes' : 'No',
      low_analyser_ratio: appliance.initalratio,
      low_co: appliance.initalco,
      low_co2: appliance.initalco2,
      high_analyser_ratio: appliance.finalratio,
      high_co: appliance.finalco,
      high_co2: appliance.finalco2,
      heat_exchanger: appliance.heatExchanger ? 'Yes' : 'No',
      heat_exchanger_detail: appliance.heatExchangerDetails,
      burner_injectors: appliance.burnerInjectors ? 'Yes' : 'N/A',
      burner_injectors_detail: appliance.burnerInjectorsDetails,
      flame_picture: appliance.flamePicture ? 'Yes' : 'No',
      flame_picture_detail: appliance.flamePictureDetails,
      ignition_detail: appliance.ignitionDetails,
      electrics_detail: appliance.electricsDetails,
      controls_detail: appliance.controlsDetails,
      leak_gas_water_detail: appliance.leaksGasWaterDetails,
      seals_detail: appliance.sealsDetails,
      pipework_detail: appliance.pipeworkDetails,
      fans_detail: appliance.fansDetails,
      fireplace_detail: appliance.fireplaceDetails,
      closure_plate_detail: appliance.closurePlateDetails,
      allowable_location_detail: appliance.allowableLocationDetails,
      boiler_ratio_detail: appliance.boilerRatioDetails,
      stability_detail: appliance.stabilityDetails,
      return_air_ple_detail: appliance.returnAirPlenumDetails,
      ventillation_detail: appliance.ventillationDetails,
      flue_termination_detail: appliance.flueTerminationDetails,
      smoke_pellet_flue_flow_detail: appliance.smokePelletDetails,
      smoke_pellet_spillage_detail: appliance.smokeMatchDetails,
      working_pressure_detail: appliance.workingPressureDetails,
      savety_devices_detail: appliance.safetyDevicesDetails,
      gas_tightness_detail: appliance.gasTightnesstestDetails,
      expansion_vassel_checked_detail: appliance.expansionVasselDetails,
      other_regulations_detail: appliance.otherDetails,
      work_required_note: appliance.necessaryremedialworkrequired,
      appliance_label: 'Appliance 1', // You may need to generate this
      appliance_title: `${appliance.make?.name || ''} ${
        appliance.type?.name || ''
      }`.trim(),
    });

    const payload = {
      certificate_id: null,
      job_id: formData.selectedJob.id,
      customer_id: formData.selectedCustomer.id,
      customer_property_id: formData.selectedJob.customer_property_id,
      inspection_date: formatDate(formData.todayDate),
      next_inspection_date: formData.nextInspectionDate
        ? formatDate(formData.nextInspectionDate)
        : formatDate(
            new Date(
              formData.todayDate.getFullYear() + 1,
              formData.todayDate.getMonth(),
              formData.todayDate.getDate(),
            ),
          ),
      received_by: formData.receivedBy,
      relation_id: formData.relation || '3', // Default to 3 if not provided
      sign: formData.signatureImage,
      appliances: transformApplianceData(formData.applianceData),
    };

    console.log('Final Payload:', payload);

    try {
      const result = await CreateServiceRecord(payload);
      if (result) {
        resetFormData(); // This will now work
        console.log('Success', result);

        Alert.alert('Success', 'Certificate Created!');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to create certificate');
    }
  };

  const {signatureImage, todayDate, nextInspectionDate, receivedBy, relation} =
    formData;

  // Replace setTodayDate with:
  const handleTodayDateChange = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      todayDate: date,
    }));
  };

  // Replace setNextInspectionDate with:
  const handleNextInspectionDateChange = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      nextInspectionDate: date,
    }));
  };

  // Replace setReceivedBy with:
  const handleReceivedByChange = (text: string) => {
    setFormData(prev => ({
      ...prev,
      receivedBy: text,
    }));
  };

  // Replace setRelation with:
  const handleRelationChange = (text: string) => {
    setFormData(prev => ({
      ...prev,
      relation: text,
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title={titleData}
        fontSize={hp(1.8)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {slug === 'homeowner_gas_safety_record' ? (
          <>
            {/* Linked Job */}
            <LinkedJobSelector onSelectJob={handleJobSelection} />

            {/* Customer Details */}

            <CustomerSelector onSelectCustomer={handleCustomerlection} />

            {/* Appliance & Inspections */}

            <ApplianceAndInspections
              onPress={() => navigation.navigate('AddAppliance')}
            />

            {/* Safety Checks */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Safety Checks</Text>
              <View style={styles.safety_content}>
                <Text style={styles.safety_questionsAnswered}>
                  QUESTIONS ANSWERED
                </Text>
                <Text style={[styles.safety_progress]}>
                  {questionsAnswered}/{totalQuestions}
                </Text>
              </View>
            </View>

            {/* Comments */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Comments</Text>
              <View style={styles.safety_content}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Comments'.toUpperCase()}
                </Text>
                <Text style={[styles.safety_progress, {textAlign: 'right'}]}>
                  {questionsAnswered}/4
                </Text>
              </View>
            </View>

            {/* Signature Section */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Signature</Text>
              <View style={styles.safety_content}>
                <DatePicker
                  label="TODAY'S DATE"
                  date={todayDate}
                  onDateChange={handleTodayDateChange} // Updated
                />
              </View>
              <View style={[styles.safety_content, {marginTop: hp(1)}]}>
                <DatePicker
                  label="NEXT INSPECTION DATE"
                  date={nextInspectionDate}
                  onDateChange={handleNextInspectionDateChange} // Updated
                />
              </View>
              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={[styles.inputLabel, {marginBottom: 1}]}>
                  RECEIVED BY
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.input, {padding: 0, width: '90%'}]}
                    value={receivedBy}
                    onChangeText={handleReceivedByChange} // Updated
                    placeholder="Name" // Added placeholder for better UX
                    placeholderTextColor="#7f8c8d"
                  />
                  <User size={20} />
                </View>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Relation'.toUpperCase()}
                </Text>
                <Text style={styles.safety_progress}>N/A</Text>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Signature'.toUpperCase()}
                </Text>
                {/* <SignaturePad signature={signature} setSignature={setSignature} /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignatureScreen')}
                  style={[
                    styles.create_button,
                    {backgroundColor: '#e2e8f0', marginBottom: 0},
                  ]}>
                  <Text
                    style={{color: '#000', fontSize: hp(2), fontWeight: '800'}}>
                    Add Signature
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : slug === 'landlord_gas_safety_record' ? (
          <>
            {/* Linked Job */}
            <LinkedJobSelector onSelectJob={handleJobSelection} />

            {/* Customer Details */}

            <CustomerSelector onSelectCustomer={handleCustomerlection} />

            {/* Appliance & Inspections */}

            <ApplianceAndInspections
              onPress={() => navigation.navigate('AddAppliance')}
            />

            {/* Safety Checks */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Safety Checks</Text>
              <View style={styles.safety_content}>
                <Text style={styles.safety_questionsAnswered}>
                  QUESTIONS ANSWERED
                </Text>
                <Text style={[styles.safety_progress, {textAlign: 'right'}]}>
                  {questionsAnswered}/{totalQuestions}
                </Text>
              </View>
            </View>

            {/* Comments */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Comments</Text>
              <View style={styles.safety_content}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Comments'.toUpperCase()}
                </Text>
                <Text style={[styles.safety_progress, {textAlign: 'right'}]}>
                  {questionsAnswered}/4
                </Text>
              </View>
            </View>

            {/* Signature Section */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Signature</Text>
              <View style={styles.safety_content}>
                <DatePicker
                  label="TODAY'S DATE"
                  date={todayDate}
                  onDateChange={handleTodayDateChange} // Updated
                />
              </View>
              <View style={[styles.safety_content, {marginTop: hp(1)}]}>
                <DatePicker
                  label="NEXT INSPECTION DATE"
                  date={nextInspectionDate}
                  onDateChange={handleNextInspectionDateChange} // Updated
                />
              </View>
              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={[styles.inputLabel, {marginBottom: 1}]}>
                  RECEIVED BY
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.input, {padding: 0}]}
                    value={receivedBy}
                    onChangeText={handleReceivedByChange} // Updated
                    placeholder="Enter Name" // Added placeholder for better UX
                    placeholderTextColor="#7f8c8d"
                  />
                  <User size={20} />
                </View>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Relation'.toUpperCase()}
                </Text>
                <Text style={styles.safety_progress}>N/A</Text>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Signature'.toUpperCase()}
                </Text>
                {/* <SignaturePad signature={signature} setSignature={setSignature} /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignatureScreen')}
                  style={[
                    styles.create_button,
                    {backgroundColor: '#e2e8f0', marginBottom: 0},
                  ]}>
                  <Text
                    style={{color: '#000', fontSize: hp(2), fontWeight: '800'}}>
                    Add Signature
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : slug === 'gas_warning_notice' ? (
          <>
            {/* Linked Job */}
            <LinkedJobSelector onSelectJob={handleJobSelection} />

            {/* Customer Details */}

            <CustomerSelector onSelectCustomer={handleCustomerlection} />

            {/* Appliance & Inspections */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Appliance & Inspections</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CP14AddAppliance')}
                style={[styles.safety_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Appliance'.toUpperCase()}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.safety_progress}>N/A</Text>
                  <ChevronRight size={20} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Signature Section */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Signature</Text>
              <View style={styles.safety_content}>
                <DatePicker
                  label="TODAY'S DATE"
                  date={todayDate}
                  onDateChange={handleTodayDateChange} // Updated
                />
              </View>
              <View style={[styles.safety_content, {marginTop: hp(1)}]}>
                <DatePicker
                  label="NEXT INSPECTION DATE"
                  date={nextInspectionDate}
                  onDateChange={handleNextInspectionDateChange} // Updated
                />
              </View>
              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={[styles.inputLabel, {marginBottom: 1}]}>
                  RECEIVED BY
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.input, {padding: 0}]}
                    value={receivedBy}
                    onChangeText={handleReceivedByChange} // Updated
                    placeholder="Enter Name" // Added placeholder for better UX
                    placeholderTextColor="#7f8c8d"
                  />
                  <User size={20} />
                </View>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Relation'.toUpperCase()}
                </Text>
                <Text style={styles.safety_progress}>N/A</Text>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Signature'.toUpperCase()}
                </Text>
                {/* <SignaturePad signature={signature} setSignature={setSignature} /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignatureScreen')}
                  style={[
                    styles.create_button,
                    {backgroundColor: '#e2e8f0', marginBottom: 0},
                  ]}>
                  <Text
                    style={{color: '#000', fontSize: hp(2), fontWeight: '800'}}>
                    Add Signature
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : slug === 'gas_service_record' ? (
          <>
            {/* Linked Job */}
            <LinkedJobSelector onSelectJob={handleJobSelection} />

            {/* Customer Details */}

            <CustomerSelector onSelectCustomer={handleCustomerlection} />

            {/* Appliance & Inspections */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Appliance & Inspections</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ServiceAddAppliance', {
                    returnTo: 'CP12Form',
                    titleData: titleData,
                  })
                }
                style={[styles.safety_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Appliance'.toUpperCase()}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.safety_progress}>N/A</Text>
                  <ChevronRight size={20} />
                </View>
              </TouchableOpacity>
            </View>
            {/* Signature Section */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Signature</Text>
              <View style={styles.safety_content}>
                <DatePicker
                  label="TODAY'S DATE"
                  date={todayDate}
                  onDateChange={handleTodayDateChange} // Updated
                />
              </View>
              <View style={[styles.safety_content, {marginTop: hp(1)}]}>
                <DatePicker
                  label="NEXT INSPECTION DATE"
                  date={nextInspectionDate}
                  onDateChange={handleNextInspectionDateChange} // Updated
                />
              </View>
              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={[styles.inputLabel, {marginBottom: 1}]}>
                  RECEIVED BY
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.input, {padding: 0}]}
                    value={receivedBy}
                    onChangeText={handleReceivedByChange} // Updated
                    placeholder="Enter Name" // Added placeholder for better UX
                    placeholderTextColor="#7f8c8d"
                  />
                  <User size={20} />
                </View>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Relation'.toUpperCase()}
                </Text>
                <TextInput
                  style={[styles.input, {padding: 0}]}
                  value={relation}
                  onChangeText={handleRelationChange} // Updated
                  placeholder="N/A" // Added placeholder for better UX
                  placeholderTextColor="#7f8c8d"
                />
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Signature'.toUpperCase()}
                </Text>
                {/* <SignaturePad signature={signature} setSignature={setSignature} /> */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SignatureScreen', {
                      returnTo: 'CP12Form',
                      titleData: titleData,
                    })
                  }
                  style={[styles.signatureContainer]}>
                  {/* <Text
                    style={{color: '#000', fontSize: hp(2), fontWeight: '800'}}>
                    Add Signature
                  </Text> */}

                  {signatureImage ? (
                    <Image
                      source={{uri: signatureImage}}
                      style={styles.signatureImage}
                      resizeMode={'contain'}
                    />
                  ) : (
                    <View style={styles.addSignature}>
                      <Edit size={24} color="#555" />
                      <Text style={styles.addSignatureText}>Add Signature</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : slug === 'gas_breakdown_record' ? (
          <>
            {/* Linked Job */}
            <LinkedJobSelector onSelectJob={handleJobSelection} />

            {/* Customer Details */}

            <CustomerSelector onSelectCustomer={handleCustomerlection} />

            {/* Appliance & Inspections */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Appliance & Inspections</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('GasBreakdownAddAppliance')}
                style={[styles.safety_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Appliance'.toUpperCase()}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.safety_progress}>N/A</Text>
                  <ChevronRight size={20} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Signature Section */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Signature</Text>
              <View style={styles.safety_content}>
                <DatePicker
                  label="TODAY'S DATE"
                  date={todayDate}
                  onDateChange={handleTodayDateChange} // Updated
                />
              </View>
              <View style={[styles.safety_content, {marginTop: hp(1)}]}>
                <DatePicker
                  label="NEXT INSPECTION DATE"
                  date={nextInspectionDate}
                  onDateChange={handleNextInspectionDateChange} // Updated
                />
              </View>
              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={[styles.inputLabel, {marginBottom: 1}]}>
                  RECEIVED BY
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.input, {padding: 0}]}
                    value={receivedBy}
                    onChangeText={handleReceivedByChange} // Updated
                    placeholder="Enter Name" // Added placeholder for better UX
                    placeholderTextColor="#7f8c8d"
                  />
                  <User size={20} />
                </View>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Relation'.toUpperCase()}
                </Text>
                <Text style={styles.safety_progress}>N/A</Text>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Signature'.toUpperCase()}
                </Text>
                {/* <SignaturePad signature={signature} setSignature={setSignature} /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignatureScreen')}
                  style={[
                    styles.create_button,
                    {backgroundColor: '#e2e8f0', marginBottom: 0},
                  ]}>
                  <Text
                    style={{color: '#000', fontSize: hp(2), fontWeight: '800'}}>
                    Add Signature
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : slug === 'gas_boiler_system_commissioning_checklist' ? (
          <>
            {/* Linked Job */}
            <LinkedJobSelector onSelectJob={handleJobSelection} />

            {/* Customer Details */}

            <CustomerSelector onSelectCustomer={handleCustomerlection} />

            {/* Appliance & Inspections */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Appliance & Inspections</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('GasBoilerAddAppliance')}
                style={[styles.safety_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Appliance'.toUpperCase()}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.safety_progress}>N/A</Text>
                  <ChevronRight size={20} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Signature Section */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Signature</Text>
              <View style={styles.safety_content}>
                <DatePicker
                  label="TODAY'S DATE"
                  date={todayDate}
                  onDateChange={handleTodayDateChange} // Updated
                />
              </View>
              <View style={[styles.safety_content, {marginTop: hp(1)}]}>
                <DatePicker
                  label="NEXT INSPECTION DATE"
                  date={nextInspectionDate}
                  onDateChange={handleNextInspectionDateChange} // Updated
                />
              </View>
              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={[styles.inputLabel, {marginBottom: 1}]}>
                  RECEIVED BY
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.input, {padding: 0}]}
                    value={receivedBy}
                    onChangeText={handleReceivedByChange} // Updated
                    placeholder="Enter Name" // Added placeholder for better UX
                    placeholderTextColor="#7f8c8d"
                  />
                  <User size={20} />
                </View>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Relation'.toUpperCase()}
                </Text>
                <Text style={styles.safety_progress}>N/A</Text>
              </View>

              <View style={[styles.rece_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Signature'.toUpperCase()}
                </Text>
                {/* <SignaturePad signature={signature} setSignature={setSignature} /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignatureScreen')}
                  style={[
                    styles.create_button,
                    {backgroundColor: '#e2e8f0', marginBottom: 0},
                  ]}>
                  <Text
                    style={{color: '#000', fontSize: hp(2), fontWeight: '800'}}>
                    Add Signature
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}
        <TouchableOpacity
          style={styles.create_button}
          onPress={() => {
            if (titleData === 'Service / Maintenance Record') {
              handleCreateServiceRecord();
            }
          }}>
          <Text style={{color: '#FFF', fontSize: hp(2), fontWeight: '800'}}>
            Create Certificate
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CP12Form;
