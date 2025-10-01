import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import React, {useState, useEffect} from 'react';
import {
  EmailLogin,
  AddNewAddress,
  AddNewCard,
  AddPromo,
  Address,
  Call,
  CancelOrder,
  CancelOrderPaymentMethods,
  Categories,
  CategoryChair,
  CategoryCupboard,
  CategoryKitchen,
  CategoryLamp,
  CategorySofa,
  CategoryTable,
  CategoryVase,
  ChairDetails,
  ChangeEmail,
  ChangePassword,
  ChangePIN,
  Chat,
  Checkout,
  CheckoutSuccessful,
  ChooseShippingMethods,
  CreateNewPassword,
  CreateNewPIN,
  CupboardDetails,
  CustomerService,
  EditProfile,
  EnterYourPIN,
  Ereceipt,
  FillYourProfile,
  Fingerprint,
  ForgotPasswordEmail,
  ForgotPasswordMethods,
  ForgotPasswordPhoneNumber,
  GetStarted,
  Inbox,
  KitchenDetails,
  LampDetails,
  Login,
  MostPopularProducts,
  MyWishlist,
  Notifications,
  Onboarding,
  OtpVerification,
  PaymentMethods,
  ProductEreceipt,
  ProductReviews,
  Search,
  SelectShippingAddress,
  SettingsHelpCenter,
  SettingsInviteFriends,
  SettingsLanguage,
  SettingsNotifications,
  SettingsPayment,
  SettingsPrivacyPolicy,
  SettingsSecurity,
  Signup,
  SofaDetails,
  TableDetails,
  TopupEreceipt,
  TopupEwalletAmount,
  TopupEwalletMethods,
  TrackOrder,
  TransactionHistory,
  VaseDetails,
  VideoCall,
  Welcome,
  GasCalculator,
  Customers,
  CreateNewCustomer,
  CustomerDetails,
  FillYourProfile2,
  SignatureScreen,
  AddressAddScreen,
  BusinessTypeSelectScreen,
  RegisterOTPVerification,
  EditCustomer,
  BoilerManual,
  BoilerManualModels,
  MyJobs,
  CreateNewJob,
  UpdateAddressScreen,
  CreateNewAddress,
  UpdateOccupiedAddress,
  Profile,
  MyProfile,
  CompanySettings,
  CustomerSelectScreen,
  DateTimePickerScreen
} from '../screens';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        setIsFirstLaunch(false);
      }
      setIsLoading(false); // Set loading state to false once the check is complete
    };

    checkIfFirstLaunch();
  }, []);

  if (isLoading) {
    return null; // Render a loader or any other loading state component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        // replace the second onboaring1 with login in order to make the user not to see the onboarding
        // when login the next time
        initialRouteName={isFirstLaunch ? 'getstarted' : 'getstarted'}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="addnewaddress" component={AddNewAddress} />
        <Stack.Screen name="addnewcard" component={AddNewCard} />
        <Stack.Screen name="addpromo" component={AddPromo} />
        <Stack.Screen name="address" component={Address} />
        <Stack.Screen name="call" component={Call} />
        <Stack.Screen name="cancelorder" component={CancelOrder} />
        <Stack.Screen
          name="cancelorderpaymentmethods"
          component={CancelOrderPaymentMethods}
        />
        <Stack.Screen name="categories" component={Categories} />
        <Stack.Screen name="categorykitchen" component={CategoryKitchen} />
        <Stack.Screen name="changeemail" component={ChangeEmail} />
        <Stack.Screen name="changepassword" component={ChangePassword} />
        <Stack.Screen name="changepin" component={ChangePIN} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="checkout" component={Checkout} />
        <Stack.Screen
          name="checkoutsuccessful"
          component={CheckoutSuccessful}
        />
        <Stack.Screen
          name="chooseshippingmethods"
          component={ChooseShippingMethods}
        />
        <Stack.Screen name="createnewpassword" component={CreateNewPassword} />
        <Stack.Screen name="createnewpin" component={CreateNewPIN} />
        <Stack.Screen name="customerservice" component={CustomerService} />
        <Stack.Screen name="editprofile" component={EditProfile} />
        <Stack.Screen name="enteryourpin" component={EnterYourPIN} />
        <Stack.Screen name="ereceipt" component={Ereceipt} />
        <Stack.Screen name="fillyourprofile" component={FillYourProfile} />
        <Stack.Screen name="fingerprint" component={Fingerprint} />
        <Stack.Screen
          name="forgotpasswordemail"
          component={ForgotPasswordEmail}
        />
        <Stack.Screen
          name="forgotpasswordmethods"
          component={ForgotPasswordMethods}
        />
        <Stack.Screen
          name="forgotpasswordphonenumber"
          component={ForgotPasswordPhoneNumber}
        />
        <Stack.Screen name="inbox" component={Inbox} />
        <Stack.Screen name="kitchendetails" component={KitchenDetails} />
        <Stack.Screen
          name="mostpopularproducts"
          component={MostPopularProducts}
        />
        <Stack.Screen name="mywishlist" component={MyWishlist} />
        <Stack.Screen name="notifications" component={Notifications} />
        <Stack.Screen name="onboarding" component={Onboarding} />
        <Stack.Screen name="otpverification" component={OtpVerification} />
        <Stack.Screen name="paymentmethods" component={PaymentMethods} />
        <Stack.Screen name="productereceipt" component={ProductEreceipt} />
        <Stack.Screen name="productreviews" component={ProductReviews} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen
          name="selectshippingaddress"
          component={SelectShippingAddress}
        />
        <Stack.Screen
          name="settingshelpcenter"
          component={SettingsHelpCenter}
        />
        <Stack.Screen
          name="settingsinvitefriends"
          component={SettingsInviteFriends}
        />
        <Stack.Screen name="settingslanguage" component={SettingsLanguage} />
        <Stack.Screen
          name="settingsnotifications"
          component={SettingsNotifications}
        />
        <Stack.Screen name="settingspayment" component={SettingsPayment} />
        <Stack.Screen
          name="settingsprivacypolicy"
          component={SettingsPrivacyPolicy}
        />
        <Stack.Screen name="settingssecurity" component={SettingsSecurity} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="topreceipt" component={TopupEreceipt} />
        <Stack.Screen
          name="topupewalletamount"
          component={TopupEwalletAmount}
        />
        <Stack.Screen
          name="topupewalletmethods"
          component={TopupEwalletMethods}
        />
        <Stack.Screen name="trackorder" component={TrackOrder} />
        <Stack.Screen
          name="transactionhistory"
          component={TransactionHistory}
        />
        <Stack.Screen name="videocall" component={VideoCall} />
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="categorychair" component={CategoryChair} />
        <Stack.Screen name="categorycupboard" component={CategoryCupboard} />
        <Stack.Screen name="categorylamp" component={CategoryLamp} />
        <Stack.Screen name="categorysofa" component={CategorySofa} />
        <Stack.Screen name="categorytable" component={CategoryTable} />
        <Stack.Screen name="categoryvase" component={CategoryVase} />
        <Stack.Screen name="cupboarddetails" component={CupboardDetails} />
        <Stack.Screen name="lampdetails" component={LampDetails} />
        <Stack.Screen name="sofadetails" component={SofaDetails} />
        <Stack.Screen name="tabledetails" component={TableDetails} />
        <Stack.Screen name="vasedetails" component={VaseDetails} />
        <Stack.Screen name="chairdetails" component={ChairDetails} />
        <Stack.Screen name="getstarted" component={GetStarted} />
        <Stack.Screen name="emaillogin" component={EmailLogin} />
        <Stack.Screen name="gascalculator" component={GasCalculator} />
        <Stack.Screen name="customers" component={Customers} />
        <Stack.Screen name="add-new-customer" component={CreateNewCustomer} />
        <Stack.Screen name="customerdetails" component={CustomerDetails} />
        <Stack.Screen name="fillyourprofile2" component={FillYourProfile2} />
        <Stack.Screen name="SignatureScreen" component={SignatureScreen} />
        <Stack.Screen name="AddressAdd" component={AddressAddScreen} />
        <Stack.Screen name="BusinessTypeSelectScreen" component={BusinessTypeSelectScreen} />
        <Stack.Screen name="registerotpverification" component={RegisterOTPVerification} />
        <Stack.Screen name="editcustomer" component={EditCustomer} />
        <Stack.Screen name="boilermanual" component={BoilerManual} />
        <Stack.Screen name="boilermanualmodels" component={BoilerManualModels} />
        <Stack.Screen name="myjobs" component={MyJobs} />
        <Stack.Screen name="createnewjob" component={CreateNewJob} />
        <Stack.Screen name="updateaddressscreen" component={UpdateAddressScreen} />
        <Stack.Screen name="createnewaddress" component={CreateNewAddress} />
        <Stack.Screen name="updateoccupiedaddress" component={UpdateOccupiedAddress} />
        <Stack.Screen name="(tabs)" component={BottomTabNavigation} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="myprofile" component={MyProfile} />
        <Stack.Screen name="companysettings" component={CompanySettings} />
        <Stack.Screen name="customerselectscreen" component={CustomerSelectScreen} />
        <Stack.Screen name="datetimepickerscreen" component={DateTimePickerScreen} />
        
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default AppNavigation;
