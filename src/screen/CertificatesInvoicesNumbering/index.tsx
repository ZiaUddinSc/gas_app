import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FileText, Home, Key, AlertCircle, Wrench, Flame, Droplets, ClipboardList, ArrowLeft } from 'lucide-react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { styles } from './styles';

const NumberingSettingsScreen = ({navigation}) => {
  const documentTypes = [
    { name: 'Quote', icon: <FileText size={hp(2.8)} color="#3b82f6" /> },
    { name: 'Invoice', icon: <FileText size={hp(2.8)} color="#10b981" /> },
    { name: 'CP12 Homeowner Gas Safety Record', icon: <Home size={hp(2.8)} color="#ef4444" /> },
    { name: 'CP12 Landlord Gas Safety Record', icon: <Key size={hp(2.8)} color="#f59e0b" /> },
    { name: 'CP14 Gas Warning Notice', icon: <AlertCircle size={hp(2.8)} color="#ef4444" /> },
    { name: 'Service / Maintenance Record', icon: <Wrench size={hp(2.8)} color="#64748b" /> },
    { name: 'Gas Breakdown Record', icon: <Flame size={hp(2.8)} color="#f97316" /> },
    { name: 'Gas Boiler System Commissioning Checklist', icon: <ClipboardList size={hp(2.8)} color="#8b5cf6" /> },
    { name: 'Powerflush Certificate', icon: <Droplets size={hp(2.8)} color="#06b6d4" /> },
    { name: 'Installation / Commissioning Decommissioning Record', icon: <Wrench size={hp(2.8)} color="#64748b" /> },
    { name: 'Unvented Hot Water Cylinders', icon: <Droplets size={hp(2.8)} color="#06b6d4" /> },
    { name: 'Job Sheet', icon: <ClipboardList size={hp(2.8)} color="#8b5cf6" /> },
  ];

  const [prefixes, setPrefixes] = React.useState(
    documentTypes.reduce((acc, type) => {
      acc[type.name] = '';
      return acc;
    }, {})
  );

  const [numbers, setNumbers] = React.useState(
    documentTypes.reduce((acc, type) => {
      acc[type.name] = '1';
      return acc;
    }, {})
  );

  const handlePrefixChange = (name, value) => {
    setPrefixes({ ...prefixes, [name]: value });
  };

  const handleNumberChange = (name, value) => {
    setNumbers({ ...numbers, [name]: value });
  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log('Prefixes:', prefixes);
    console.log('Numbers:', numbers);
    alert('Settings updated successfully!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
         <CustomHeader
         fontSize={hp(1.7)}
        title="Certificates, Jobs, Quotes, and Invoices Numbering"
        leftIcon={<ArrowLeft  size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
    <View style={styles.container}>
      
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {documentTypes.map((type) => (
          <View key={type.name} style={styles.card}>
            <View style={styles.typeHeader}>
              {type.icon}
              <Text style={styles.typeName}>{type.name}</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Prefix (if required)</Text>
              <TextInput
                style={styles.input}
                value={prefixes[type.name]}
                onChangeText={(text) => handlePrefixChange(type.name, text)}
                placeholder="Enter prefix"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Starting Number</Text>
              <TextInput
                style={styles.input}
                value={numbers[type.name]}
                onChangeText={(text) => handleNumberChange(type.name, text)}
                keyboardType="numeric"
              />
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};



export default NumberingSettingsScreen;