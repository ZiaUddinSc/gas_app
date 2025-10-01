import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface CardProps {
  style;
  childrenIcon?: any;
  cardHeader?: string;
  cardTextString?: any;
  calculatorValue?: any;
}
const Index = (props: CardProps) => {
  const {style, childrenIcon, cardTextString, cardHeader, calculatorValue} =
    props;
  return (
    <View style={style}>
      {childrenIcon}
      <Text style={{textAlign: 'center', fontWeight: '500', color: 'gray',fontSize:hp('1.5%')}}>
        {cardHeader}{cardTextString}
      </Text>
      <Text style={{textAlign: 'center', fontWeight: '600',fontSize:hp('2%')}}>
        {calculatorValue}
      </Text>
    </View>
  );
};
export default Index;
