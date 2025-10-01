// src/contexts/FormContext.tsx
import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';


interface FormData {
  selectedJob: {id: number; name: string; customer_property_id: number} | null;
  selectedCustomer: {id: number; name: string} | null;
  applianceData: any; 
   signatureImage: any;
  todayDate: Date;
  nextInspectionDate: Date;
  receivedBy: string;
  relation: string;
}
interface FormContextType {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  resetFormData: () => void;
}

const FormContext = createContext<FormContextType>({
  formData: {
    selectedJob: null,
    selectedCustomer: null,
    applianceData: null,
     todayDate: new Date(),
    nextInspectionDate: null,
    relation: '',
    signatureImage: null,
    receivedBy:''
  },
  setFormData: () => {},
resetFormData: () => {} // Add this
});

export const FormProvider = ({children}) => {
  const [formData, setFormData] = useState(initialFormState);

  const resetFormData = () => {
    setFormData(initialFormState);
  };

  return (
    <FormContext.Provider value={{formData, setFormData,resetFormData}}>
      {children}
    </FormContext.Provider>
  );
};

const initialFormState = {
  selectedJob: null,
  selectedCustomer: null,
  todayDate: new Date(),
  nextInspectionDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  relation: '',
  signatureImage: null,
  receivedBy: '',
  applianceData: {
    
  }
};

export const useFormData = () => useContext(FormContext);
