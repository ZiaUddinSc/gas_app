export const reducer = (state: any, action: any) => {
    const { validationResult, inputId, inputValue } = action;

    const updatedValues = {
        ...state.inputValues,
        [inputId]: inputValue,
    };

    const updatedValidities = {
        ...state.inputValidities,
        [inputId]: validationResult,
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
        if (updatedValidities[key] !== undefined) {
            updatedFormIsValid = false;
            break;
        }
    }

    return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
    };
};

export const CustomerUpdateReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'INPUT_CHANGE': {
        const { validationResult, inputId, inputValue } = action;
  
        const updatedValues = {
          ...state.inputValues,
          [inputId]: inputValue,
        };
  
        const updatedValidities = {
          ...state.inputValidities,
          [inputId]: validationResult,
        };
  
        // Form is valid only if all inputs are true
        const updatedFormIsValid = Object.values(updatedValidities).every(v => v === true);
  
        return {
          inputValues: updatedValues,
          inputValidities: updatedValidities,
          formIsValid: updatedFormIsValid,
        };
      }
  
      case 'SET_FORM': {
        return {
          inputValues: action.inputValues,
          inputValidities: action.inputValidities,
          formIsValid: action.formIsValid,
        };
      }
  
      default:
        return state;
    }
  };