import {
    validateString,
    validateEmail,
    validatePassword,
    validateNumber,
  } from '../ValidationConstraints';
  
  export const validateInput = (inputId: string, inputValue: string): string | undefined => {
    if (
      inputId === 'fullName' ||
      inputId === 'firstName' ||
      inputId === 'lastName' ||
      inputId === 'location' ||
      inputId === 'phoneNumber' ||
      inputId === 'bio' ||
      inputId === 'address' ||
      inputId === 'street' ||
      inputId === 'postalCode' ||
      inputId === 'appartment' ||
      inputId === 'destination' ||
      inputId === 'ageRange' ||
      inputId === 'description' ||
      inputId === 'about' ||
      inputId === 'creditCardHolderName' ||
      inputId === 'addressLine1' ||
      inputId === 'addressLine2'  
    ) {
      return validateString(inputId, inputValue);
    } else if (inputId === 'email' || 
      inputId === 'currentEmail' || 
      inputId === 'newEmail') {
      return validateEmail(inputId, inputValue);
    } else if (
      inputId === 'password' || 
      inputId === 'confirmPassword' || 
      inputId === 'currentPassword' || 
      inputId === 'newPassword' ||
      inputId === 'confirmNewPassword'
      ) {
      return validatePassword(inputId, inputValue);
    } else if (inputId === 'resetToken') {
      return validateString(inputId, inputValue);
    } else if(inputId === 'places') {
      return validateNumber(inputId, inputValue)
    }
  };

  export const validateSignupInput = (inputId: string, inputValue: string, otherValue?: { [key: string]: string }): string | undefined => {
    console.log(inputId,inputValue)
    if (
      inputId === 'fullName' ||
      inputId === 'companyName' ||
      inputId === 'companyRegistration'
     
    ) {
      return validateString(inputId, inputValue);
    } else if (inputId === 'email' || 
      inputId === 'currentEmail' || 
      inputId === 'newEmail') {
      return validateEmail(inputId, inputValue);
    } else if (
      inputId === 'password' || 
      inputId === 'confirmPassword' 
      ) {
      return validatePassword(inputId, inputValue,otherValue);
    } 
  };
  
  // export const validateFormInput = (inputId: string, inputValue: string,  options?: { bussinessValue?: string; isVatRegisterEnabled?: boolean }): string | undefined => {
  //   const { bussinessValue, isVatRegisterEnabled } = options || {};
  //   if (
  //     inputId === 'name' ||
  //     inputId === 'customer_name' 
  //   ) {
  //     return validateString(inputId, inputValue);
  //   } else if (inputId === 'email' || 
  //     inputId === 'currentEmail' || 
  //     inputId === 'newEmail') {
  //     return validateEmail(inputId, inputValue);
  //   } else if (
  //     inputId === 'password' || 
  //     inputId === 'confirmPassword' 
  //     ) {
  //     return validatePassword(inputId, inputValue);
  //   } // ✅ Business-specific rules
  //   else if (bussinessValue === 'Company' && inputId === 'company_registration') {
  //     return validateString(inputId, inputValue); // must not be empty
  //   }
  //   else if (isVatRegisterEnabled && inputId === 'vat_number') {
  //     return validateString(inputId, inputValue); // must not be empty
  //   }
  // };
