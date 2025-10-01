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
  Edit2Icon,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import {
  GetQuoteNumber,
  CreateQuote,
  CreateInvoice,
} from '../../helper/CertificateHelper';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import EditInvoiceItemModal from '../../components/EditInvoiceItemModal copy/EditInvoiceItemModal';
import EditDiscountAmountModal from '../../components/EditDiscountAmountModal/EditDiscountAmountModal';
import {GetData} from '../../helper/CommonHelper';
import Settings from '../../config/settings';
import {PencilIcon} from 'lucide-react-native';
import {GetSignleCustomer} from '../../helper/GetApiHelper';
import AddPaymentModal from '../../components/AddPaymentModal/AddPaymentModal';
const STORAGE_KEY_INVOICE = '@GS_ITEM_LIST_I';
const STORAGE_DISCOUNT_KEY_INVOICE = '@GS_DISCOUNT_VALUE_I';
const STORAGE_PAYMENT_INVOICE = '@GS_PAYMENT_DATA';

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
  payment_method_id: string;
  advance_pay_date: string;
}

const InvoiceScreen = ({navigation, route}) => {
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showItemModal, setShowItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [customer, setCustomer] = useState({});
  const [jobAddesss, setJobAddesss] = useState({});
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showEditDiscountModal, setShowEditDiscountModal] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const [discountData, setDiscountData] = useState<DiscountInfoType>(null);
  const [subTotal, setSubtotal] = useState(0);
  const [totalVat, setTotalVat] = useState(0);
  const [total, setTotal] = useState(0.0);
  const [due, setDue] = useState(0.0);
  const [invoice, setInvoice] = useState('');
  const [lineId, setLineId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [customerNote, setCustomerNote] = useState('');
  const [vatInfo, setVatInfo] = useState<VatInfoType>();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [invoiceAdvance, setInvoiceAdvance] = useState<AdvanceInfoType>();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    GetData(Settings.endpoints.get_invoice_number)
      .then(response => {
        if (response) {
          setInvoice(response?.invoiceNumber);
        }
      })
      .catch(error => alert(error));
  }, []);

  const getVatSatusInfo = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo');
    const parsedUser = jsonValue != null ? JSON.parse(jsonValue) : [];
    if (parsedUser?.id) {
      setUserId(parsedUser?.id)
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

  useEffect(() => {
    getVatSatusInfo();
  }, []);

  const sumItemValue = (items, discount: any, advancePay: any) => {
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
    setDue(total - advancePay?.advance_amount);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || invoiceDate;
    setShowDatePicker(false);
    setInvoiceDate(currentDate);
  };

  //Create Quote
  const onCreateInvioce = async () => {
   
    let propertyId = jobAddesss?.id
      ? jobAddesss?.id
      : selectedJob?.property?.id;
    if (!propertyId) {
      alert('Please Select Job Address');
      return;
    }

    if (lineItems.length > 0) {
      let invoiceData = {
        invoice_id:0,
        job_id: selectedJob?.id,
        customer_id: selectedJob?.customer_id || customer?.id,
        customer_property_id: propertyId,
        non_vat_invoice: vatInfo?.non_vat_status,
        vat_number: vatInfo?.vat_number,

        invoice_number: invoice,
        issued_date: moment(invoiceDate).format('YYYY-MM-DD'),
        invoiceItems: lineItems.length > 0 ? lineItems : [],
        invoiceDiscounts: {
          amount: discountData?.amount || 0,
          vat: discountData?.vat || 0,
        },
        invoiceNotes: customerNote,
        invoiceAdvance: invoiceAdvance,
      };
      console.log(invoiceData)
      let resp = await CreateInvoice(invoiceData);
      if (resp?.success) {
        console.log("Data",resp?.data)
        Toast.show({
          type: 'success',
          text1: 'Job Insertion',
          text2: resp?.message,
          position: 'top',
        });
        AsyncStorage.removeItem(STORAGE_KEY_INVOICE);
        AsyncStorage.removeItem(STORAGE_DISCOUNT_KEY_INVOICE);
        AsyncStorage.removeItem(STORAGE_KEY_INVOICE);
        navigation.navigate('InvoicePreviewScreen', {
          invoice_id: resp?.data?.id,
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
  const getCustomerInfo = async job => {
    let customerInfoResp = await GetSignleCustomer(job?.customer_id);
    if (customerInfoResp?.data?.success) {
      setCustomer(customerInfoResp?.data?.data);
    }
    let full_address = `${job?.property?.address_line_1} ${job?.property?.address_line_2},${job?.property?.city},${job?.property?.state},${job?.property?.postal_code}`;
    job['full_address'] = full_address;
    setJobAddesss(job);
  };

  const saveData = async data => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_INVOICE, JSON.stringify(data));
      setLineItems(data);
      sumItemValue(data, discountData, invoiceAdvance);
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_INVOICE);
      const parsed = jsonValue != null ? JSON.parse(jsonValue) : [];
      setLineItems(parsed);
      const disCountValue = await AsyncStorage.getItem(
        STORAGE_DISCOUNT_KEY_INVOICE,
      );
      const parseDiscount = jsonValue != null ? JSON.parse(disCountValue) : 0.0;
      setDiscountData(parseDiscount);
      const paymentdata = await AsyncStorage.getItem(STORAGE_PAYMENT_INVOICE);
      const parsePayment = jsonValue != null ? JSON.parse(paymentdata) : {};
      setInvoiceAdvance(parsePayment);
      sumItemValue(parsed, parseDiscount, parsePayment);
    } catch (e) {
      console.error('Error loading data:', e);
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
            vat: value.vat,
          }
        : item,
    );
    saveData(newList);
    loadData();
    setLineId(null);
  };

  const onClickLineUpdate = item => {
    setLineId(item.id);
    setEditData(item);
    setShowEditItemModal(true);
    loadData();
  };
  const handleDeleteLineItem = id => {
    const filtered = lineItems.filter(item => item.id !== id);
    saveData(filtered); // update list
    setShowEditItemModal(false); // close modal
    setLineId(null); // clear ID
    loadData();
  };

  useEffect(() => {
    // loadDiscountData();
    loadData();
  }, []);

  const onSaveDiscount = async (value, vatAmount) => {
    if (lineItems.length > 0) {
      try {
        await AsyncStorage.setItem(
          STORAGE_DISCOUNT_KEY_INVOICE,
          JSON.stringify({amount: value, vat: vatAmount}),
        );
        setDiscountData({amount: value, vat: vatAmount}); // Instantly update UI
        setShowDiscountModal(false);
        loadData();
      } catch (e) {
        console.error('Error saving data:', e);
      }
    } else {
      alert('There is no item data');
    }
  };
  const handleDeleteDiscount = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_DISCOUNT_KEY_INVOICE);
      setDiscountData({amount: '0', vat: '0'});
      loadData();
      setShowEditDiscountModal(false);
    } catch (e) {
      console.error('Error removing discount:', e);
    }
  };
  const onSavePayment = async data => {
    if (lineItems.length > 0 && data !== '') {
      try {
        await AsyncStorage.setItem(
          STORAGE_PAYMENT_INVOICE,
          JSON.stringify({
            advance_amount: data?.advance_amount,
            payment_method_id: data?.payment_method_id,
            advance_pay_date: data?.advance_pay_date,
          }),
        );

        setInvoiceAdvance({
          advance_amount: data?.advance_amount,
          payment_method_id: data?.method,
          advance_pay_date: data?.date,
        }); // Instantly update UI
        setShowDiscountModal(false);
        loadData();
      } catch (e) {
        console.error('Error saving data:', e);
      }
    } else {
      alert('There is no item data');
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
            <Text style={styles.label}>INVOICE #</Text>
            <TextInput style={styles.input} value={invoice} editable={false} />
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
                  userId:userId
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

          {discountData === null || discountData !== '0' ? (
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

          <View style={styles.amountBox}>
            <View style={[styles.row]}>
              <Text style={[styles.label, {fontWeight: '400'}]}>Sub Total</Text>
              <Text style={[styles.amount, {fontWeight: '400'}]}>
                £{subTotal?.toFixed(2)}
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
                  <Text style={styles.amount}>
                    {invoiceAdvance?.advance_amount || '£0.00'}
                  </Text>
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
                £{total ? total?.toFixed(2) : '0.00'}
              </Text>
            </View>
            <View style={[styles.row, {}]}>
              <Text style={[styles.label, {fontWeight: '500'}]}>
                Advance Payment
              </Text>
              <Text style={[styles.amount, {fontWeight: '500'}]}>
                £
                {invoiceAdvance?.advance_amount
                  ? invoiceAdvance?.advance_amount?.toFixed(2)
                  : '0.00'}
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
              <Text style={styles.selectText}>
                {invoiceDate.toISOString().split('T')[0]}
              </Text>
              <Calendar size={18} color="#000" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={invoiceDate}
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
                  onSave: updated => {
                    setCustomerNote(updated);
                  },
                })
              }
              style={styles.notesBox}>
              <Text style={styles.selectText}>{customerNote || 'N/A'}</Text>

              <Edit2 size={16} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => onCreateInvioce()}>
            <Text style={styles.saveButtonText}>Create Invoice</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AddPaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSave={data => {
          if (!data) return;

          onSavePayment(data);
          setShowPaymentModal(false);
        }}
        outstanding="12.00"
      />
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

export default InvoiceScreen;
