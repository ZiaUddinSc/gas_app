import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CP12Form from './CP12Form';
import Miscellaneous from '../Miscellaneous';


const FormRenderer = () => {
  const { params } = useRoute();
  const { title, slug } = params;

  const renderForm = () => {
    switch (slug) {
      case 'homeowner_gas_safety_record':
      case 'landlord_gas_safety_record':
      case 'gas_warning_notice':
      case 'gas_service_record':
      case 'gas_breakdown_record':
      case 'gas_boiler_system_commissioning_checklist':
        return <CP12Form title={title} />;

      case 'powerflush_certificate':
      case 'installation_commissioning_record':
      case 'unvented_hot_water_cylinders':
      case 'job_sheet':
        return <Miscellaneous title={title} />;

      default:
        return <Text style={{ padding: 20 }}>Form not found</Text>;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Optional: CustomHeader here with title */}
      {renderForm()}
    </View>
  );
};

export default FormRenderer;
