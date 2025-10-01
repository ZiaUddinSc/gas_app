import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {PlusCircle} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Radiators = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Radiators</Text>
      <View style={{backgroundColor: '#FFF', padding: 4,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text style={styles.label}>NUMBER OF RADIATORS</Text>
        <Text style={[styles.label,{ color: '#7f8c8d',
        fontSize: hp(2.2),}]}>0</Text>
      </View>

      <View
        style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Radiators</Text>

        <TouchableOpacity style={{}} onPress={() => {}}>
          <PlusCircle size={wp(6)} color="#000" style={styles.addIcon} onPress={onPress}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: wp(2),
    // margin: wp(2),
 
  },
  title: {
    color: '#2c3e50',
    fontSize: hp(1.8),
    fontWeight: '700',
    marginBottom: hp(1),
},
  applianceContainer: {
    marginBottom: hp(2),
  },
  label: {
    color: '#7f8c8d',
    fontSize: hp(1.8),
    marginBottom: hp(1),
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    padding: wp(3),
    fontSize: hp(2),
    color: '#2c3e50',
    borderColor: '#bdc3c7',
    borderWidth: 1,
  },
  addButton: {
    
      backgroundColor: '#FFF',
      marginTop: hp(1),
      padding: wp(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    
  },
  addButtonText: {
    color: '#000',
    fontSize: hp(2),
  },
  addIcon: {
  },
});

export default Radiators;
