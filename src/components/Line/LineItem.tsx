import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {PencilIcon} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  description: string;
  unit?: string;
  price: string;
  onShow: any;
  key: number;
};

const LineItem = (props: Props) => {
  return (
    <View style={styles.LineItemAddRow} key={props?.key}>
      <View style={styles.lineDescription}>
        <Text>{props?.description}</Text>
      </View>
      <TouchableOpacity style={styles.unitsPrice} onPress={props.onShow}>
        <Text>
          {props?.unit
            ? `${props?.unit} x £${parseFloat(props?.price).toFixed(2)}`
            : `£${
                props?.price !== null
                  ? parseFloat(props?.price).toFixed(2)
                  : 0.0
              }`}
          {props?.price ? (
            <PencilIcon color={'rgb(13, 148, 136)'} size={hp(1.5)} />
          ) : null}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LineItem;

const styles = StyleSheet.create({
  //Line Item Add row
  LineItemAddRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    paddingVertical: hp('1%'),
  },
  lineDescription: {},
  unitsPrice: {},
});
