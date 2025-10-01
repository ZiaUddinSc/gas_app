import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Mail,
  Calendar,
  PoundSterling,
  CheckCircle,
  Printer,
  ArrowLeft,
  Heading,
} from 'lucide-react-native';

import RNPrint from 'react-native-print';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { styles } from './styles';

const SubscriptionCard = ({
  name,
  email,
  type,
  startDate,
  endDate,
  price,
  status,
  onPrint,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.infoRow}>
        <Mail size={hp(2.5)} color="#666" />
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.infoRow}>
        <Calendar size={hp(2.5)} color="#666" />
        <Text style={styles.subscriptionType}>{type}</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {startDate} - {endDate}
        </Text>
      </View>

      <View style={styles.priceContainer}>
        <PoundSterling size={hp(2.8)} color="#4CAF50" />
        <Text style={styles.price}>{price}</Text>
      </View>

      <View
        style={[
          styles.statusContainer,
          {justifyContent: 'space-between', width: wp(88)},
        ]}>
        <View
          style={[
            styles.statusContainer,
            {backgroundColor: status === 'ACTIVE' ? '#E8F5E9' : '#FFEBEE'},
          ]}>
          <CheckCircle
            size={hp(2.2)}
            color={status === 'ACTIVE' ? '#4CAF50' : '#F44336'}
          />
          <Text
            style={[
              styles.status,
              {color: status === 'ACTIVE' ? '#4CAF50' : '#F44336'},
            ]}>
            {status}
          </Text>
        </View>
        <TouchableOpacity onPress={onPrint} style={styles.printButton}>
          <Printer size={hp(4)} color="#3F51B5" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SubscriptionsInvoices = ({navigation}) => {
  const subscriptions = [
    {
      name: 'Bhuiyan Sakib',
      email: 'sakibbhuiyan@yahoo.com',
      type: 'Monthly Subscription',
      startDate: '12th May, 2025',
      endDate: '12th June, 2025',
      price: '8.99',
      status: 'ACTIVE',
    },
    {
      name: 'bhuiyan Sakib',
      email: 'sakibbhuiyan@gmail.com',
      type: 'Monthly Subscription',
      startDate: '9th May, 2025',
      endDate: '9th June, 2025',
      price: '8.99',
      status: 'ACTIVE',
    },
  ];







  const printHTML = async (subscription) => {
    try {
      await RNPrint.print({
        html: `
          <html>
            <head>
              <style>
                body { font-family: Arial; padding: 20px; max-width: 800px; margin: 0 auto; }
                h1 { color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; }
                h2 { color: #555; margin-top: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                th { text-align: left; padding: 8px; background: #f5f5f5; }
                td { padding: 8px; border-bottom: 1px solid #eee; }
                .header-table { width: 100%; margin-bottom: 20px; }
                .header-table td { border: none; padding: 4px 0; }
                .total-row { font-weight: bold; }
                .divider { border-top: 1px dashed #ccc; margin: 20px 0; }
                .company-info { margin-bottom: 20px; }
                .bill-to { margin: 15px 0; }
              </style>
            </head>
            <body>
              <h1>Invoice</h1>
              
              <table class="header-table">
                <tr>
                  <td><strong>Invoice number</strong></td>
                  <td>${Math.random().toString(16).substr(2, 12).toUpperCase()}</td>
                </tr>
                <tr>
                  <td><strong>Date of issue</strong></td>
                  <td>${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                </tr>
              </table>
              
              <div class="divider"></div>
              
              <h2>Gas Engineer App</h2>
              <div class="company-info">United Kingdom</div>
              
              <div class="bill-to">
                <strong>Bill To</strong><br>
                ${subscription.name}<br>
                ${subscription.email}
              </div>
              
              <div class="divider"></div>
              
              <h2>Description</h2>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${subscription.type}</td>
                    <td>1</td>
                    <td>£${subscription.price}</td>
                    <td>£${subscription.price}</td>
                  </tr>
                  <tr>
                    <td colspan="4">${subscription.startDate} - ${subscription.endDate}</td>
                  </tr>
                </tbody>
              </table>
              
              <table class="header-table">
                <tr>
                  <td>Subtotal</td>
                  <td>£${subscription.price}</td>
                </tr>
                <tr class="total-row">
                  <td>Total</td>
                  <td>£${subscription.price}</td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
    } catch (error) {
      console.error('Failed to print:', error);
      Alert.alert('Error', 'Failed to print invoice. Please try again.');
    }
  };




  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="User Subscriptions & Invoices"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {subscriptions.map((sub, index) => (
            <React.Fragment key={index}>
              <SubscriptionCard {...sub} onPrint={() => printHTML(sub)} />
              {index < subscriptions.length - 1 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};



export default SubscriptionsInvoices;
