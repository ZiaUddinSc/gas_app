import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import LinkedJobSelector from '../../components/LinkedJobSelector';
import CustomerSelector from '../../components/CustomerSelector';
import ApplianceAndInspections from '../../components/ApplianceAndInspections';
import SignaturePad from '../../components/SignaturePad';
import DatePicker from '../../components/DatePicker';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ArrowLeft, User, ChevronRight} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import Radiators from '../../components/Radiators';
import FileUpload from '../../components/FileUpload/FileUpload';

const Miscellaneous = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const applianceData = route.params?.applianceData;
  const titleData = route.params?.titleData;
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const totalQuestions = 8;
  //   alert(JSON.stringify(route.params));
  const [signature, setSignature] = useState(null);
  const [todayDate, setTodayDate] = useState(new Date());
  const [nextInspectionDate, setNextInspectionDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  );
  const [receivedBy, setReceivedBy] = useState('Mr. John Doe');

  const handleJobSelection = job => {
    setSelectedJob(job);
    console.log('Selected Job:', job);
  };
  const handleCustomerlection = item => {
    setSelectedJob(item);
    console.log('Selected Customer:', item);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title={titleData}
        fontSize={hp(1.6)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {titleData === 'Powerflush Certificate' ? (
          <>
            {/* Linked Job */}
            <LinkedJobSelector onSelectJob={handleJobSelection} />

            {/* Customer Details */}

            <CustomerSelector onSelectCustomer={handleCustomerlection} />

            {/* Powerflush Checklist */}
            <View
              style={[
                styles.safety_container,
                {marginTop: 0, marginBottom: hp(1)},
              ]}>
              <Text style={styles.title}>Powerflush Checklist</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PowerflushChecklist')}
                style={[styles.safety_content, {marginTop: hp(1)}]}>
                <Text style={styles.safety_questionsAnswered}>
                  {'Question Answered'.toUpperCase()}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.safety_progress}>0/45</Text>
                  <ChevronRight size={20} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Radiators */}

            <Radiators
             onPress={() => {}}
              />

            {/* Signature Section */}
            <View style={styles.safety_container}>
              <Text style={styles.title}>Signature</Text>
              <View style={styles.safety_content}>
                <DatePicker
                  label="TODAY'S DATE"
                  date={todayDate}
                  onDateChange={setTodayDate}
                />
              </View>
              <View style={[styles.safety_content, {marginTop: hp(1)}]}>
                <DatePicker
                  label="NEXT INSPECTION DATE"
                  date={nextInspectionDate}
                  onDateChange={setNextInspectionDate}
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
                    value=""
                    onChangeText={setReceivedBy} // Update state on text change
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
        ) : titleData === 'Installation / Commissioning Decommissioning Record' ? (
          <>
            {/* Linked Job */}
            <LinkedJobSelector onSelectJob={handleJobSelection} />

            {/* Customer Details */}

            <CustomerSelector onSelectCustomer={handleCustomerlection} />

            {/* Powerflush Checklist */}
            <View
              style={[
                styles.safety_container,
                {marginTop: 0, marginBottom: hp(1)},
              ]}>
              <Text style={styles.title}>Appliance & Inspection</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('')}
                style={[styles.safety_content, {marginTop: hp(1)}]}>
                <Text style={[styles.safety_questionsAnswered,{fontSize:hp(1.6)}]}>
                  {'Commissioning / Decommissioning Record'.toUpperCase()}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.safety_progress}>0/5</Text>
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
                  onDateChange={setTodayDate}
                />
              </View>
              <View style={[styles.safety_content, {marginTop: hp(1)}]}>
                <DatePicker
                  label="NEXT INSPECTION DATE"
                  date={nextInspectionDate}
                  onDateChange={setNextInspectionDate}
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
                    value=""
                    onChangeText={setReceivedBy} // Update state on text change
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
        ) : titleData === 'Unvented Hot Water Cylinders' ? (
          <>
          {/* Linked Job */}
          <LinkedJobSelector onSelectJob={handleJobSelection} />

          {/* Customer Details */}

          <CustomerSelector onSelectCustomer={handleCustomerlection} />

          {/* Powerflush Checklist */}
          <View
            style={[
              styles.safety_container,
              {marginTop: 0, marginBottom: hp(1)},
            ]}>
            <Text style={styles.title}>Appliance & Inspection</Text>
            <TouchableOpacity
              // onPress={() => navigation.navigate('')}
              style={[styles.safety_content, {marginTop: hp(1)}]}>
              <Text style={[styles.safety_questionsAnswered,]}>
                {'Unvented Hot Water System'.toUpperCase()}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.safety_progress}>0/5</Text>
                <ChevronRight size={20} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigation.navigate('')}
              style={[styles.safety_content, {marginTop: hp(1)}]}>
              <Text style={[styles.safety_questionsAnswered,]}>
                {'Inspection Record'.toUpperCase()}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.safety_progress}>0/22</Text>
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
                onDateChange={setTodayDate}
              />
            </View>
            <View style={[styles.safety_content, {marginTop: hp(1)}]}>
              <DatePicker
                label="NEXT INSPECTION DATE"
                date={nextInspectionDate}
                onDateChange={setNextInspectionDate}
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
                  value=""
                  onChangeText={setReceivedBy} // Update state on text change
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
        ) : titleData === 'Job Sheet' ? (
          <>
          {/* Linked Job */}
          <LinkedJobSelector onSelectJob={handleJobSelection} />

          {/* Customer Details */}

          <CustomerSelector onSelectCustomer={handleCustomerlection} />

          {/* Powerflush Checklist */}
          <View
            style={[
              styles.safety_container,
              {marginTop: 0, marginBottom: hp(1)},
            ]}>
            <Text style={styles.title}>Job Details & Documents</Text>
            <TouchableOpacity
              // onPress={() => navigation.navigate('')}
              style={[styles.safety_content, {marginTop: hp(1)}]}>
              <Text style={[styles.safety_questionsAnswered,]}>
                {'Job Sheet'.toUpperCase()}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.safety_progress}>0/5</Text>
                <ChevronRight size={20} />
              </View>
            </TouchableOpacity>

            
            <FileUpload/>
            
          </View>

          
          {/* Signature Section */}
          <View style={styles.safety_container}>
            <Text style={styles.title}>Signature</Text>
            <View style={styles.safety_content}>
              <DatePicker
                label="TODAY'S DATE"
                date={todayDate}
                onDateChange={setTodayDate}
              />
            </View>
            <View style={[styles.safety_content, {marginTop: hp(1)}]}>
              <DatePicker
                label="NEXT INSPECTION DATE"
                date={nextInspectionDate}
                onDateChange={setNextInspectionDate}
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
                  value=""
                  onChangeText={setReceivedBy} // Update state on text change
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
        ) : null}

        <TouchableOpacity style={styles.create_button}>
          <Text style={{color: '#FFF', fontSize: hp(2), fontWeight: '800'}}>
            Create Certificate
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Miscellaneous;
