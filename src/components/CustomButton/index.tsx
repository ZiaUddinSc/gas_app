import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
interface InputButtonProps {
  style: object;
  textName: any;
  handleSubmit: any;
  buttonTextStyle: object;
}
const Index = (props: InputButtonProps) => {
  const {style, textName, handleSubmit, buttonTextStyle} = props;
  return (
    <TouchableOpacity style={style} onPress={handleSubmit}>
      <Text style={buttonTextStyle}>{textName}</Text>
    </TouchableOpacity>
  );
};
export default Index;
