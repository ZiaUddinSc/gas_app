import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Calendar,
  Edit2,
  PlusCircle,
  Home,
  ArrowLeft,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

import AddInvoiceItemModal from '../../components/AddInvoiceItemModal/AddInvoiceItemModal';
import {styles} from './styles';
import DiscountAmountModal from '../../components/DiscountAmountModal/DiscountAmountModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LineItem from '../../components/Line/LineItem';
import {CreateQuote} from '../../helper/CertificateHelper';
import QuotePreviewScreen from '../QuotePreviewScreen';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {GetData} from '../../helper/CommonHelper';
import Settings from '../../config/settings';
import EditInvoiceItemModal from '../../components/EditInvoiceItemModal copy/EditInvoiceItemModal';
import EditDiscountAmountModal from '../../components/EditDiscountAmountModal/EditDiscountAmountModal';
import {date} from 'yup';
import {PencilIcon} from 'lucide-react-native';
import {GetSignleCustomer} from '../../helper/GetApiHelper';
import AddPaymentModal from '../../components/AddPaymentModal/AddPaymentModal';
interface VatInfoType {
  non_vat_status: string;
  vat_number: string;
}
interface DiscountInfoType {
  amount: string;
  vat: string;
}
interface AdvanceInfoType {
  advance_amount: number;
  payment_method_id: number;
  advance_pay_date: any;
}

const Index = ({navigation, route}) => {
  const invoice_id = route.params?.invoice_id || '';
  const data = route.params?.invoiceData || '';
  console.log('data', data);
  // const data = {
  //   form: {
  //     id: 4,
  //     parent_id: 1,
  //     name: 'Invoice',
  //     slug: 'invoice',
  //     active: 1,
  //     roder: 3,
  //     created_by: 1,
  //     updated_by: null,
  //     created_at: '2025-02-26T18:00:00.000000Z',
  //     updated_at: null,
  //     deleted_at: null,
  //   },
  //   invoice: {
  //     id: 7,
  //     customer_id: 1,
  //     customer_job_id: 35,
  //     job_form_id: 4,
  //     invoice_number: '000001',
  //     issued_date: '1970-01-01',
  //     reference_no: null,
  //     non_vat_invoice: 0,
  //     vat_number: 'GB123456789',
  //     advance_amount: null,
  //     payment_method_id: null,
  //     advance_date: null,
  //     notes: 'This is a sample quote note.',
  //     payment_term: 'PAY WITHIN 30 DAYS',
  //     status: 'Draft',
  //     created_by: 10,
  //     updated_by: null,
  //     created_at: '2025-07-16T12:36:18.000000Z',
  //     updated_at: '2025-07-16T12:36:18.000000Z',
  //     deleted_at: null,
  //     customer: {
  //       id: 1,
  //       title_id: 1,
  //       full_name: 'Zia Uddin',
  //       company_name: 'LCC',
  //       vat_no: '1',
  //       address_line_1: '189',
  //       address_line_2: 'BROMPTON ROAD',
  //       postal_code: 'SW3 1NE',
  //       state: 'ENGLAND',
  //       city: 'LONDON',
  //       country: 'UNITED KINGDOM',
  //       latitude: '51.49806110000001',
  //       longitude: '-0.166261',
  //       note: 'This is test data',
  //       auto_reminder: 1,
  //       created_by: 10,
  //       updated_by: 10,
  //       created_at: '2025-03-25T10:34:07.000000Z',
  //       updated_at: '2025-07-07T14:16:59.000000Z',
  //       deleted_at: null,
  //       customer_full_name: 'Mr Zia Uddin',
  //       full_address: '189 BROMPTON ROAD, LONDON, SW3 1NE',
  //       full_address_html: '189 BROMPTON ROAD,<br/> LONDON, SW3 1NE',
  //       pdf_address: '189 BROMPTON ROAD, LONDON',
  //       full_address_with_html:
  //         '189 BROMPTON ROAD,<br/> LONDON, SW3 1NE, ENGLAND,<br/> UNITED KINGDOM',
  //       contact: {
  //         id: 1,
  //         customer_id: 1,
  //         mobile: '+1234567890',
  //         phone: '+0321-560123',
  //         email: 'updated.email@example.com',
  //         other_email: 'backup.updated@example.com',
  //         created_by: 10,
  //         updated_by: 10,
  //         created_at: '2025-03-25T10:34:07.000000Z',
  //         updated_at: '2025-07-06T06:36:29.000000Z',
  //         deleted_at: null,
  //       },
  //       title: {
  //         id: 1,
  //         name: 'Mr',
  //         active: 1,
  //         created_by: 1,
  //         updated_by: null,
  //         created_at: '2025-03-07T00:00:00.000000Z',
  //         updated_at: null,
  //         deleted_at: null,
  //       },
  //     },
  //     job: {
  //       id: 35,
  //       customer_id: 1,
  //       customer_property_id: 21,
  //       description: 'Quote',
  //       details: 'Job created for 52 CHURCH STREET, MANCHESTER, M4 1PW',
  //       customer_job_priority_id: null,
  //       due_date: '',
  //       customer_job_status_id: null,
  //       reference_no: null,
  //       estimated_amount: null,
  //       status: 'Completed',
  //       created_by: 10,
  //       updated_by: null,
  //       created_at: '2025-07-11T18:13:29.000000Z',
  //       updated_at: '2025-07-11T18:17:34.000000Z',
  //       deleted_at: null,
  //       property: {
  //         id: 21,
  //         customer_id: 16,
  //         address_line_1: '52',
  //         address_line_2: 'CHURCH STREET',
  //         postal_code: 'M4 1PW',
  //         state: 'ENGLAND',
  //         city: 'MANCHESTER',
  //         country: 'UNITED KINGDOM',
  //         latitude: '51.5456959',
  //         longitude: '0.02992440000000001',
  //         note: 'eqeq dfdfw',
  //         occupant_name: '',
  //         occupant_email: null,
  //         occupant_phone: null,
  //         due_date: null,
  //         created_by: 10,
  //         updated_by: 10,
  //         created_at: '2025-05-13T13:22:29.000000Z',
  //         updated_at: '2025-07-09T07:54:20.000000Z',
  //         deleted_at: null,
  //         full_address: '52 CHURCH STREET, MANCHESTER, M4 1PW',
  //         full_address_html: '52 CHURCH STREET,<br/> MANCHESTER, M4 1PW',
  //         pdf_address: '52 CHURCH STREET, MANCHESTER',
  //         full_address_with_html:
  //           '52 CHURCH STREET,<br/> MANCHESTER, M4 1PW, ENGLAND,<br/> UNITED KINGDOM',
  //       },
  //     },
  //     form: {
  //       id: 4,
  //       parent_id: 1,
  //       name: 'Invoice',
  //       slug: 'invoice',
  //       active: 1,
  //       roder: 3,
  //       created_by: 1,
  //       updated_by: null,
  //       created_at: '2025-02-26T18:00:00.000000Z',
  //       updated_at: null,
  //       deleted_at: null,
  //     },
  //     user: {
  //       id: 10,
  //       parent_id: null,
  //       name: 'Bhuiyan Sakib',
  //       email: 'sakibbhuiyan@yahoo.com',
  //       first_login: 0,
  //       role: 'admin',
  //       email_verified_at: null,
  //       google_id: null,
  //       photo: null,
  //       active: null,
  //       gas_safe_id_card: '6543215',
  //       oil_registration_number: 'eeee',
  //       installer_ref_no: null,
  //       created_at: '2025-03-25T10:29:24.000000Z',
  //       updated_at: '2025-07-07T08:39:02.000000Z',
  //       last_login_ip: '161.51.217.49',
  //       last_login_at: '2025-03-25 10:29:24',
  //       photo_url:
  //         'https://app.gascertificate.app/build/assets/200x200-44e1cf33.jpg',
  //       company: {
  //         id: 1,
  //         user_id: 10,
  //         company_name: 'Sakib COMPNAY',
  //         company_email: null,
  //         company_phone: '07931926852',
  //         company_address_line_1: '34',
  //         company_address_line_2: null,
  //         company_postal_code: 'IG8 8HX',
  //         company_state: 'England',
  //         company_city: 'Woodford Green',
  //         company_country: 'United Kingdom',
  //         company_logo: null,
  //         company_registration: null,
  //         business_type: 'Sole trader',
  //         vat_number: null,
  //         display_company_name: 0,
  //         gas_safe_registration_no: '123456',
  //         registration_no: null,
  //         register_body_id: null,
  //         registration_body_for_legionella: null,
  //         registration_body_no_for_legionella: null,
  //         company_web_site: null,
  //         company_tagline: null,
  //         created_at: '2025-03-25T10:30:13.000000Z',
  //         updated_at: '2025-03-25T10:31:04.000000Z',
  //         pdf_address: '34 , Woodford Green, IG8 8HX',
  //         logo_url: false,
  //         full_address: '34 , Woodford Green, IG8 8HX',
  //         full_address_html: '34 ,<br/> Woodford Green, IG8 8HX',
  //         full_address_with_html:
  //           '34 ,<br/> Woodford Green, IG8 8HX, <br/>England, United Kingdom',
  //       },
  //     },
  //     items: [
  //       {
  //         id: 21,
  //         invoice_id: 7,
  //         type: 'Default',
  //         description: 'Invoice Item',
  //         units: 2,
  //         unit_price: 50,
  //         vat_rate: 0,
  //         vat_amount: 0,
  //         created_by: 10,
  //         updated_by: null,
  //         created_at: '2025-07-16T12:36:18.000000Z',
  //         updated_at: '2025-07-16T12:36:18.000000Z',
  //         deleted_at: null,
  //       },
  //       {
  //         id: 22,
  //         invoice_id: 7,
  //         type: 'Default',
  //         description: 'Invoice Item',
  //         units: 10,
  //         unit_price: 20,
  //         vat_rate: 0,
  //         vat_amount: 0,
  //         created_by: 10,
  //         updated_by: null,
  //         created_at: '2025-07-16T12:36:18.000000Z',
  //         updated_at: '2025-07-16T12:36:18.000000Z',
  //         deleted_at: null,
  //       },
  //       {
  //         id: 23,
  //         invoice_id: 7,
  //         type: 'Default',
  //         description: 'Invoice Item',
  //         units: 5,
  //         unit_price: 50,
  //         vat_rate: 0,
  //         vat_amount: 0,
  //         created_by: 10,
  //         updated_by: null,
  //         created_at: '2025-07-16T12:36:18.000000Z',
  //         updated_at: '2025-07-16T12:36:18.000000Z',
  //         deleted_at: null,
  //       },
  //       {
  //         id: 24,
  //         invoice_id: 7,
  //         type: 'Default',
  //         description: 'Invoice Item',
  //         units: 2,
  //         unit_price: 3.600000000000000088817841970012523233890533447265625,
  //         vat_rate: 0,
  //         vat_amount: 0,
  //         created_by: 10,
  //         updated_by: null,
  //         created_at: '2025-07-16T12:36:18.000000Z',
  //         updated_at: '2025-07-16T12:36:18.000000Z',
  //         deleted_at: null,
  //       },
  //       {
  //         id: 25,
  //         invoice_id: 7,
  //         type: 'Discount',
  //         description: 'Invoice Item',
  //         units: 1,
  //         unit_price: 20,
  //         vat_rate: 20,
  //         vat_amount: 4,
  //         created_by: 10,
  //         updated_by: null,
  //         created_at: '2025-07-16T12:36:18.000000Z',
  //         updated_at: '2025-07-16T12:36:18.000000Z',
  //         deleted_at: null,
  //       },
  //     ],
  //   },
  //   pdf_url: 'https://app.gascertificate.app/storage/invoices/35/4/1.pdf',
  // };

  const [invoiceDate, setInvoiceDate] = useState(
    moment(new Date()).format('DD-MM-YYYY'),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [customer, setCustomer] = useState({});
  const [jobAddesss, setJobAddesss] = useState({});
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showEditDiscountModal, setShowEditDiscountModal] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalVat, setTotalVat] = useState(0);
  const [due, setDue] = useState(0);
  const [quote, setQuote] = useState('');
  const [lineId, setLineId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [customerNote, setCustomerNote] = useState('');
  const [discountData, setDiscountData] = useState<DiscountInfoType>(null);
  const [vatInfo, setVatInfo] = useState<VatInfoType>();
  const [invoiceAdvance, setInvoiceAdvance] = useState<AdvanceInfoType>();

  useEffect(() => {
    if (data) {
      setQuote(String(data?.invoice?.invoice_number));
      setSelectedJob(data?.invoice?.job);
      setCustomer(data?.invoice?.customer);
      setJobAddesss(data?.invoice?.job?.property);
      setCustomerNote(data?.invoice?.notes);
      setInvoiceDate(moment(data?.invoice?.issued_date).format('DD-MM-YYYY'));
      if (data?.invoice?.items) {
        let items = data?.invoice?.items;
        const allItemsExceptLast = items.slice(0, -1);
        const lastItemOnly = items[items.length - 1];

        let updatedArray = allItemsExceptLast.map(item => ({
          ...item,
          price: item.unit_price,
          vat: item.vat_rate,
        }));
        let newDiscount = {
          amount: lastItemOnly?.unit_price,
          vat: lastItemOnly?.vat_rate,
        };
        setLineItems(updatedArray);
        setDiscountData(newDiscount);
        sumItemValue(updatedArray, newDiscount);
      }
    }
  }, []);
  const getVatSatusInfo = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo');
    const parsedUser = jsonValue != null ? JSON.parse(jsonValue) : [];
    if (parsedUser?.id) {
      GetData(Settings.endpoints.get_vat_status(parsedUser?.id))
        .then(response => {
          if (response) {
            if (response?.success) {
              setVatInfo(response?.data);
            }
          }
        })
        .catch(error => alert(error));
    }
  };
  const getCustomerInfo = async job => {
    let customerInfoResp = await GetSignleCustomer(job?.customer_id);
    if (customerInfoResp?.data?.success) {
      setCustomer(customerInfoResp?.data?.data);
    }
    let full_address = `${job?.property?.address_line_1} ${job?.property?.address_line_2},${job?.property?.city},${job?.property?.state},${job?.property?.postal_code}`;
    job['full_address'] = full_address;
    setJobAddesss(job);
  };

  useEffect(() => {
    getVatSatusInfo();
  }, []);
  // useEffect(() => {
  //   GetQuoteNumber()
  //     .then(response => {
  //       if (response) {
  //         setQuote(response.quoteNumber);
  //       }
  //     })
  //     .catch(error => alert(error));
  // }, []);

  const sumItemValue = (items, discount: any) => {
    const sumArr = items.reduce((a, b) => a + b.units * b.price, 0);
    const sumVat = items.reduce(
      (a, b) => a + b.units * b.price * (b.vat / 100),
      0,
    );

    setSubtotal(sumArr);
    let discountAmount = 0;
    let vat = 0;
    let discountVat = 0;
    if (discount !== null) {
      discountAmount = parseFloat(discount?.amount);
      vat = parseFloat(discount?.vat);
      discountVat = discountAmount * (vat / 100);
    }
    let vatAfterDiscount = sumVat - discountVat;
    let total = parseFloat(sumArr) + vatAfterDiscount - discountAmount;
    setTotal(total);
    setTotalVat(vatAfterDiscount);
    setDue(total);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = moment(
      selectedDate || invoiceDate,
      'DD-MM-YYYY',
    ).format('DD-MM-YYYY');
    setShowDatePicker(false);
    setInvoiceDate(currentDate);
  };

  const onSavePayment = async data => {
    if (lineItems.length > 0 && data !== '') {
      setInvoiceAdvance({
        advance_amount: data?.advance_amount,
        payment_method_id: data?.method,
        advance_pay_date: data?.date,
      }); // Instantly update UI
      setShowDiscountModal(false);
    } else {
      alert('There is no item data');
    }
  };
  //Create Quote
  const onCreateInvoice = async () => {
    let propertyId = jobAddesss?.id
      ? jobAddesss?.id
      : data?.customer_property_id;
    if (!propertyId) {
      alert('Please Select Job Address');
      return;
    }
    if (lineItems.length > 0) {
      let quoteData = {
        job_id: selectedJob?.id || 0,
        customer_id: selectedJob?.customer_id || customer?.id,
        customer_property_id:
          jobAddesss?.id || selectedJob?.customer_property_id,
        non_vat_quote: vatInfo?.non_vat_status,
        vat_number: data?.vat_number,
        quote_number: quote,
        issued_date: invoiceDate,
        quoteItems: lineItems.length > 0 ? lineItems : [],
        quoteDiscounts: {
          amount: discountData?.amount,
          vat: discountData?.vat,
        },
        quoteNotes: customerNote,
      };

      let resp = await CreateQuote(quoteData);
      if (resp?.success) {
        Toast.show({
          type: 'success',
          text1: 'Job Insertion',
          text2: resp?.message,
          position: 'top',
        });
        navigation.navigate('QuotePreviewScreen', {
          quote_id: resp?.data?.id,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Job Update failed',
          text2: "Job did't update",
          position: 'top',
        });
      }
    } else {
      alert('Please add item');
    }
  };

  // ➕ Add new item
  const addItem = value => {
    if ('description' in value) {
      value['id'] = Date.now();
      const newList = [...lineItems, value];
      saveData(newList);
    } else {
      alert('Enter Description');
    }
  };

  const saveData = async data => {
    try {
      setLineItems(data);
      sumItemValue(data, discountData);
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };

  // ✏️ Update existing item
  const updateLineItem = value => {
    const newList = lineItems.map(item =>
      item.id === lineId
        ? {
            ...item,
            units: value.units,
            description: value.description,
            price: value.price,
          }
        : item,
    );
    saveData(newList);

    setLineId(null);
  };

  const onClickLineUpdate = item => {
    setLineId(item.id);
    setEditData(item);
    setShowEditItemModal(true);
  };
  const handleDeleteLineItem = id => {
    const filtered = lineItems.filter(item => item.id !== id);
    saveData(filtered); // update list
    setShowEditItemModal(false); // close modal
    setLineId(null); // clear ID
  };

  const onSaveDiscount = async (value, vatAmount) => {
    if (lineItems.length > 0) {
      try {
        let newDiscount = {amount: value, vat: vatAmount};
        setDiscountData({amount: value, vat: vatAmount}); // Instantly update UI
        setShowDiscountModal(false);
        sumItemValue(lineItems, newDiscount);
      } catch (e) {
        console.error('Error saving data:', e);
      }
    } else {
      alert('There is no item data');
    }
  };

  const handleDeleteDiscount = async () => {
    try {
      setDiscountAmount(0);

      setShowEditDiscountModal(false);
    } catch (e) {
      console.error('Error removing discount:', e);
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Invoice"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Invoice #</Text>
            <TextInput style={styles.input} value={quote} editable={false} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Linked Job</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() =>
                navigation.navigate('InvoiceJobLink', {
                  onSelect: job => {
                    setSelectedJob(job); // Receive selected job
                    getCustomerInfo(job);
                  },
                })
              }>
              {selectedJob && selectedJob?.description ? (
                <>
                  <Text>{selectedJob?.description}</Text>
                  {/* <Text>{selectedJob?.details}</Text> */}
                </>
              ) : (
                <Text style={styles.selectText}>
                  Click here to select a job
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Customer Details</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() =>
                navigation.navigate('InvoiceCustomerSelect', {
                  onSelect: customer => {
                    setCustomer(customer); // Receive selected job
                    setJobAddesss({});
                    setSelectedJob({});
                  },
                })
              }>
              {(customer && customer?.full_name) ||
              (selectedJob && selectedJob?.customer_name) ? (
                <Text style={styles.selectText}>
                  {customer?.full_name || selectedJob?.customer_name}
                </Text>
              ) : (
                <Text style={styles.selectText}>
                  Click here to select a customer
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {(customer && customer?.full_address) ||
          (selectedJob && selectedJob && selectedJob?.property?.id) ? (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Customer Address</Text>
              <TouchableOpacity style={styles.selectBox}>
                <Text style={styles.selectText}>
                  {customer.full_address || selectedJob?.property?.address}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {(customer && customer.id) ||
          (selectedJob && selectedJob?.customer_name && selectedJob?.id) ? (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Job Address</Text>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() =>
                  navigation.navigate('InvoiceJobAddress', {
                    onSelect: jobAddesss => {
                      setJobAddesss(jobAddesss); // Receive selected job
                    },
                    customerId: customer.id || selectedJob.property?.id,
                  })
                }>
                {(jobAddesss && jobAddesss?.full_address) ||
                selectedJob?.customer?.full_address ? (
                  <Text style={styles.selectText}>
                    {jobAddesss.full_address ||
                      selectedJob?.customer.full_address}
                  </Text>
                ) : (
                  <Text style={styles.selectText}>
                    Click Hear to add job address
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Items</Text>

            {lineItems?.map((lineItem, index) => (
              <LineItem
                description={lineItem?.description}
                unit={lineItem?.units}
                price={lineItem?.price}
                onShow={() => onClickLineUpdate(lineItem)}
                key={index}
              />
            ))}

            <TouchableOpacity
              style={styles.addItemBox}
              onPress={() => setShowItemModal(true)}>
              <Text style={styles.selectText}>Add Item</Text>
              <PlusCircle size={18} color="#000" />
            </TouchableOpacity>
          </View>

          {discountData === null ? (
            <View style={styles.fieldContainer}>
              <TouchableOpacity
                style={styles.addItemBox}
                onPress={() => setShowDiscountModal(true)}>
                <Text style={styles.selectText}>Add Discount</Text>
                <PlusCircle size={18} color="#000" />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View>
                <Text>Discount</Text>
              </View>
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text>
                  £
                  {discountData?.amount
                    ? parseFloat(discountData?.amount)?.toFixed(2)
                    : '0.00'}
                </Text>
                <TouchableOpacity
                  style={{paddingVertical: hp('.5%')}}
                  onPress={() => setShowEditDiscountModal(true)}>
                  <PencilIcon color={'rgb(13, 148, 136)'} size={hp(1.5)} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View
            style={{
              paddingVertical: hp('1%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Text>{data?.invoice?.payment_term}</Text>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text>
                £
                {discountData?.amount
                  ? parseFloat(discountData?.amount)?.toFixed(2)
                  : '0.00'}
              </Text>
              <TouchableOpacity
                style={{paddingVertical: hp('.5%')}}
                onPress={() => setShowEditDiscountModal(true)}>
                <PencilIcon color={'rgb(13, 148, 136)'} size={hp(1.5)} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.amountBox}>
            <View style={[styles.row]}>
              <Text style={[styles.label, {fontWeight: '400'}]}>Sub Total</Text>
              <Text style={[styles.amount, {fontWeight: '400'}]}>
                £{subTotal.toFixed(2)}
              </Text>
            </View>
            <View
              style={[
                styles.row,
                totalVat === 0 ? {borderBottomWidth: 1} : {},
              ]}>
              <Text style={[styles.label, {fontWeight: '400'}]}>Discount</Text>
              <Text style={[styles.amount, {color: 'red', fontWeight: '400'}]}>
                -£
                {discountData?.amount ? discountData?.amount : '0.00' || '0.00'}
              </Text>
            </View>

            <View style={styles.amountBox}>
              <View style={styles.rowBetween}>
                <Text style={styles.label}>Payment To Date</Text>
                <TouchableOpacity
                  style={styles.rowBetween}
                  onPress={() => setShowPaymentModal(true)}>
                  <Text style={styles.amount}>£0.00</Text>
                  <Edit2 size={16} color={'rgb(13, 148, 136)'} />
                </TouchableOpacity>
              </View>
            </View>

            {totalVat ? (
              <View style={[styles.row, {borderBottomWidth: 1}]}>
                <Text style={[styles.label, {fontWeight: '400'}]}>Vat</Text>
                <Text style={[styles.amount, {fontWeight: '400'}]}>
                  £{totalVat?.toFixed(2) || '0.00'}
                </Text>
              </View>
            ) : null}
            <View style={[styles.row, {}]}>
              <Text style={[styles.label, {fontWeight: '500'}]}>Total</Text>
              <Text style={[styles.amount, {fontWeight: '500'}]}>
                £{total ? total.toFixed(2) : '0.00'}
              </Text>
            </View>
            <View style={[styles.row, {}]}>
              <Text style={[styles.label, {fontWeight: '500'}]}>
                Balance Due
              </Text>
              <Text style={[styles.amount, {fontWeight: '500'}]}>
                £{due ? due.toFixed(2) : '0.00'}
              </Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Invoice Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerBox}>
              <Text style={styles.selectText}>{invoiceDate}</Text>
              <Calendar size={18} color="#000" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={moment(invoiceDate, 'DD-MM-YYYY').toDate()}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Notes for Customer</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('QuoteCustomerNoteAdd', {
                  note: customerNote,
                  onSave: updated => setCustomerNote(updated),
                })
              }
              style={styles.notesBox}>
              <Text style={styles.selectText}>{customerNote || 'N/A'}</Text>

              <Edit2 size={16} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => onCreateInvoice()}>
            <Text style={styles.saveButtonText}>Create Invoice</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AddInvoiceItemModal
        visible={showItemModal}
        onClose={() => setShowItemModal(false)}
        onSave={item => {
          if (!item) return;
          addItem(item);
          setShowItemModal(false);
        }}
        isVat={vatInfo?.non_vat_status}
      />
      <AddPaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSave={item => {
          if (!item) return;
          onSavePayment(item);
          setShowPaymentModal(false);
        }}
        outstanding="12.00"
      />
      <EditInvoiceItemModal
        visible={showEditItemModal}
        onClose={() => setShowEditItemModal(false)}
        onSave={item => {
          if (!item) return;

          updateLineItem(item);
          setShowEditItemModal(false);
        }}
        onDeleteItem={handleDeleteLineItem}
        data={editData}
        isVat={vatInfo?.non_vat_status}
      />
      <DiscountAmountModal
        visible={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        onSave={(amount, vatAmount) => {
          onSaveDiscount(amount, vatAmount);
        }}
        isVat={vatInfo?.non_vat_status}
      />
      <EditDiscountAmountModal
        visible={showEditDiscountModal}
        onClose={() => setShowEditDiscountModal(false)}
        onSave={(amount, vatAmount) => {
          onSaveDiscount(amount, vatAmount);
          setShowEditDiscountModal(false);
        }}
        onDelete={handleDeleteDiscount}
        initialValue={discountData}
        isVat={vatInfo?.non_vat_status}
      />
    </View>
  );
};

export default Index;
