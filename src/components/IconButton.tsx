import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Color from '../theme/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

interface IconButtonProps {
  title: string;
  onPress: () => void;
  icon:any
}

const IconButton: React.FC<IconButtonProps> = ({ title, onPress,icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {/* <Image
        source={icon}
        style={styles.icon}
      /> */}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.white,
    paddingVertical: 12,
    borderWidth: 1,
    // borderColor: Color.borderColor,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginVertical:10,
     marginLeft: wp('2%'),
        marginBottom: wp('2%'),
        borderRadius: wp('10%'),
        width: wp('84%'),
        height: 50,
        marginTop: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    color: Color.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IconButton;
