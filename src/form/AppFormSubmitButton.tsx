import React from 'react';
import {Button} from 'react-native';
import {useFormikContext} from 'formik';
interface AppFormSubmitButtonProps {
  title: string;
}
const AppFormSubmitButton = ({title}: AppFormSubmitButtonProps) => {
  const {handleSubmit, isValid} = useFormikContext();
  return <Button onPress={handleSubmit} title={title} disabled={!isValid} />;
};
export default AppFormSubmitButton;
