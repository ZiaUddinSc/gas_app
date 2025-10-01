import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screen/SplashScreen/SplashScreen';
import Login from '../screen/Login/Login';
import SignUp from '../screen/SignUp/SignUp';
import WelcomeScreen from '../screen/WelcomeScreen';
import BoilerManuals from '../screen/BoilerManuals/BoilerManuals';
import JobsScreen from '../screen/JobsScreen/JobsScreen';
import CreateJobs from '../screen/CreateJobs/CreateJobs';
import CustomerSelectScreen from '../screen/CreateJobs/CustomerSelectScreen';
import Customers from '../screen/Customers/Customers';
import CustomersCreate from '../screen/CustomersCreate/CustomersCreate';
import Certificate from '../screen/Certificate/Certificate';
import InviteFriendScreen from '../screen/InviteFriendScreen/InviteFriendScreen';
import CP12Form from '../screen/CP12Form/CP12Form';
import AddApplianceScreen from '../screen/CP12Form/AddAppliance';
import CP14AddAppliance from '../screen/CP12Form/CP14AddAppliance';
import SelectItemScreen from '../screen/CP12Form/SelectItemScreen';
import SignatureScreen from '../screen/CP12Form/SignatureScreen';
import ServiceAddAppliance from '../screen/CP12Form/ServiceAddAppliance';
import GasBreakdownAddAppliance from '../screen/CP12Form/GasBreakdownAddAppliance';
import GasBoilerAddAppliance from '../screen/CP12Form/GasBoilerAddAppliance';
import Miscellaneous from '../screen/Miscellaneous';
import PowerflushChecklist from '../screen/Miscellaneous/PowerflushChecklist';
import CompanyInformationForm from '../screen/CompanyInformationForm';
import MyAccount from '../screen/MyAccount';
import ProfileUpdate from '../screen/MyAccount/ProfileUpdate';
import CompanyUsersScreen from '../screen/CompanyUsersScreen';
import AddUserScreen from '../screen/AddUserScreen';
import CompanySettingsScreen from '../screen/CompanySettingsScreen';
import EditRegisteredDetailsScreen from '../screen/CompanySettingsScreen/EditRegisteredDetailsScreen';
import EditCompanyInfoScreen from '../screen/CompanySettingsScreen/EditCompanyInfoScreen';
import EditContactDetailsScreen from '../screen/CompanySettingsScreen/EditContactDetailsScreen';
import EditCompanyAddressScreen from '../screen/CompanySettingsScreen/EditCompanyAddressScreen';
import BankDetailsEditScreen from '../screen/CompanySettingsScreen/BankDetailsEditScreen';
import SubscriptionsInvoices from '../screen/SubscriptionsInvoices';
import CertificatesInvoicesNumbering from '../screen/CertificatesInvoicesNumbering';
import EmailTemplateScreen from '../screen/EmailTemplateScreen';
import JobDetailsScreen from '../screen/JobDetailsScreen';
import CustomerDetailsScreen from '../screen/CustomerDetailsScreen';
import NewJobFromCustomar from '../screen/NewJobFromCustomar';
import JobAddressScreen from '../screen/JobAddressScreen';
import JobAddressList from '../screen/JobAddressList';
import InvoiceScreen from '../screen/Invoice';
import InvoiceJobLink from '../screen/InvoiceJobLink';
import InvoiceCustomerSelect from '../screen/InvoiceCustomerSelect';
import QuoteScreen from '../screen/Quote';
import InvoiceJobAddress from '../screen/InvoiceJobAddress';
import NumberOfJob from '../screen/NumberOfJob/NumberOfJob';
import EditAddressScreen from '../screen/UpdateCustomer/EditAddressScreen/EditAddressScreen';
import EditCustomerContactScreen from '../screen/UpdateCustomer/EditCustomerContactScreen/EditCustomerContactScreen';
import EditCustomaerName from '../screen/UpdateCustomer/EditCustomaerName';
import EditBusinessFieldScreen from '../screen/UpdateCustomer/EditBusinessFieldScreen';
import EditCustomerNoteScreen from '../screen/UpdateCustomer/EditCustomerNoteScreen';
import EditJobAddressFieldScreen from '../screen/JobAddressScreen/EditJobAddressFieldScreen';
import AddCustomerJobAddress from '../screen/AddCustomerJobAddress/';
import AddressAddScreen from '../screen/UpdateCustomer/EditAddressScreen/AddressAddScreen';

import EditJobFieldScreen from '../screen/JobDetailsScreen/EditJobFieldScreen';
import QuotePreviewScreen from '../screen/QuotePreviewScreen';
import QuoteCustomerNoteAdd from '../screen/Quote/QuoteCustomerNoteAdd';
import QuoteEditScreen from '../screen/QuoteEditScreen';
import InvoiceEditScreen from '../screen/InvoiceEditScreen';
import BottomTabs from './BottomTabs';
import InvoicePreviewScreen from '../screen/InvoicePreviewScreen';
import PrioritySelectorScreen from '../screen/CreateJobs/PrioritySelectorScreen';
import JobStatusSelectorScreen from '../screen/CreateJobs/JobStatusSelectorScreen';
import SlotSelectorScreen from '../screen/CreateJobs/SlotSelectorScreen';
import CustomerJobAddrsSelectorScreen from '../screen/CreateJobs/CustomerJobAddrsSelectorScreen';
import TitlePicker from '../components/TitlePicker';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // 👈 Slide animation added here
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="BoilerManuals" component={BoilerManuals} />
      <Stack.Screen name="JobsScreen" component={JobsScreen} />
      <Stack.Screen name="CreateJobs" component={CreateJobs} />
      <Stack.Screen name="Customers" component={Customers} />
      <Stack.Screen name="CustomersCreate" component={CustomersCreate} />
      <Stack.Screen name="Certificate" component={Certificate} />
      <Stack.Screen name="InviteFriendScreen" component={InviteFriendScreen} />
      <Stack.Screen name="CP12Form" component={CP12Form} />
      <Stack.Screen name="AddAppliance" component={AddApplianceScreen} />
      <Stack.Screen name="CP14AddAppliance" component={CP14AddAppliance} />
      <Stack.Screen name="SelectItem" component={SelectItemScreen} />
      <Stack.Screen name="SignatureScreen" component={SignatureScreen} />
      <Stack.Screen
        name="ServiceAddAppliance"
        component={ServiceAddAppliance}
      />
      <Stack.Screen
        name="GasBreakdownAddAppliance"
        component={GasBreakdownAddAppliance}
      />
      <Stack.Screen
        name="GasBoilerAddAppliance"
        component={GasBoilerAddAppliance}
      />
      <Stack.Screen name="Miscellaneous" component={Miscellaneous} />
      <Stack.Screen
        name="PowerflushChecklist"
        component={PowerflushChecklist}
      />
      <Stack.Screen
        name="CompanyInformationForm"
        component={CompanyInformationForm}
      />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
      <Stack.Screen name="CompanyUsersScreen" component={CompanyUsersScreen} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen
        name="CompanySettingsScreen"
        component={CompanySettingsScreen}
      />
      <Stack.Screen
        name="EditRegisteredDetails"
        component={EditRegisteredDetailsScreen}
      />
      <Stack.Screen
        name="EditCompanyInfo"
        component={EditCompanyInfoScreen}
      />
      <Stack.Screen
        name="EditContactDetails"
        component={EditContactDetailsScreen}
      />
      <Stack.Screen
        name="EditCompanyAddress"
        component={EditCompanyAddressScreen}
      />
      <Stack.Screen
        name="BankDetailsEdit"
        component={BankDetailsEditScreen}
      />
      <Stack.Screen
        name="SubscriptionsInvoices"
        component={SubscriptionsInvoices}
      />
      <Stack.Screen
        name="CertificatesInvoicesNumbering"
        component={CertificatesInvoicesNumbering}
      />
      <Stack.Screen
        name="EmailTemplateScreen"
        component={EmailTemplateScreen}
      />
      <Stack.Screen name="JobDetailsScreen" component={JobDetailsScreen} />
      <Stack.Screen
        name="CustomerDetailsScreen"
        component={CustomerDetailsScreen}
      />
      <Stack.Screen name="NewJobFromCustomar" component={NewJobFromCustomar} />
      <Stack.Screen name="JobAddressScreen" component={JobAddressScreen} />
      <Stack.Screen name="JobAddressList" component={JobAddressList} />
      <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <Stack.Screen name="InvoiceJobLink" component={InvoiceJobLink} />
      <Stack.Screen
        name="InvoiceCustomerSelect"
        component={InvoiceCustomerSelect}
      />
      <Stack.Screen name="QuoteScreen" component={QuoteScreen} />
      <Stack.Screen name="InvoiceJobAddress" component={InvoiceJobAddress} />
      <Stack.Screen
        name="EditCustomerContactScreen"
        component={EditCustomerContactScreen}
      />
      <Stack.Screen name="NumberOfJob" component={NumberOfJob} />
      <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} />
      <Stack.Screen name="EditCustomaerName" component={EditCustomaerName} />
      <Stack.Screen
        name="EditBusinessFieldScreen"
        component={EditBusinessFieldScreen}
      />
      <Stack.Screen
        name="EditCustomerNoteScreen"
        component={EditCustomerNoteScreen}
      />
      <Stack.Screen
        name="EditJobAddressFieldScreen"
        component={EditJobAddressFieldScreen}
      />
      <Stack.Screen name="EditJobFieldScreen" component={EditJobFieldScreen} />
      <Stack.Screen name="QuotePreviewScreen" component={QuotePreviewScreen} />
      <Stack.Screen
        name="InvoicePreviewScreen"
        component={InvoicePreviewScreen}
      />
      <Stack.Screen
        name="QuoteCustomerNoteAdd"
        component={QuoteCustomerNoteAdd}
      />
      <Stack.Screen name="QuoteEditScreen" component={QuoteEditScreen} />
      <Stack.Screen
        name="AddCustomerJobAddress"
        component={AddCustomerJobAddress}
      />
      <Stack.Screen name="InvoiceEditScreen" component={InvoiceEditScreen} />
      <Stack.Screen
        name="CustomerSelectScreen"
        component={CustomerSelectScreen}
      />
      <Stack.Screen name="TitlePicker" component={TitlePicker} />
      <Stack.Screen
        name="PrioritySelector"
        component={PrioritySelectorScreen}
      />
      <Stack.Screen
        name="JobStatusSelector"
        component={JobStatusSelectorScreen}
      />
      <Stack.Screen
        name="SlotSelector"
        component={SlotSelectorScreen}
      />
        <Stack.Screen
        name="CustomerJobAddressSelector"
        component={CustomerJobAddrsSelectorScreen}
      />
      <Stack.Screen name="AddressAdd" component={AddressAddScreen} />

      <Stack.Screen name="Dashboard" component={BottomTabs} />
    </Stack.Navigator>
  );
}
