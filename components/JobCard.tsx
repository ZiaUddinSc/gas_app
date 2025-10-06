import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const JobCard = () => {
  return (
    <View style={styles.card}>
      {/* Left Vertical Line */}
      <View style={styles.leftLine} />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Top Row */}
        <View style={styles.headerRow}>
          <Text style={styles.jobName}>Job Name</Text>
          {/* <Text style={styles.price}>£70.00</Text> */}
        </View>

        {/* Customer Section */}
        <View style={styles.customerRow}>
          <View style={styles.avatar}
          >
          <Text style={{color:'white',fontWeight:'700'}}>BS</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>Customer Name</Text>
            <Text style={styles.jobAddress}>Job Address</Text>
          </View>
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
      <Text style={styles.amount}>£70.00</Text>
        <Text style={styles.time}>7:00 PM</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Ongoing</Text>
        </View>
      </View>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    // height:120,
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderBottomColor:'#CBCBCB',
    borderBottomWidth:0.5,
    // marginHorizontal: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
    alignItems: 'center',
  },
  leftLine: {
    width: 3,
    backgroundColor: '#CC6799', // green line
    borderRadius: 2,
    marginRight: 12,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobName: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor:COLORS.black,
    justifyContent:'center',
    alignItems:'center',
    marginRight: 8,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '500',
  },
  jobAddress: {
    fontSize: 13,
    color: '#777',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  amount: {
    fontSize: 13,
    color: COLORS.black,
    marginBottom: 4,
    fontWeight:'700'
  },
  statusBadge: {
    width:120,
    backgroundColor: '#91979F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    justifyContent:'center',
    alignItems:'center'
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
