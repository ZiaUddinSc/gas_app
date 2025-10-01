import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform,ViewStyle,StyleProp } from 'react-native';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
interface CardProps {
    style?:any;
    onPress: () => void; // Callback function for the onPress event
    icon?: any; 
    cardHeader?: string;
    cardTextString?: any;
    calculatorValue?: any;
  }
  const SquareCardItem = (props: CardProps) => {
    const {style, onPress,icon, cardTextString, cardHeader, calculatorValue} =
      props;
    const { dark } = useTheme();

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {icon ?
       <View style={styles.iconView}>
            <Image
              source={icon}
              resizeMode='contain'
              style={[styles.cardIcon, {
                  tintColor: dark ? COLORS.white : COLORS.black
              }]}
            />
        </View>
        :null
        }
        {!cardHeader  ?
        <Text style={{textAlign: 'center', alignItems:'center',justifyContent:'center', fontWeight: '500', color: dark ? COLORS.white : COLORS.grayscale700,fontSize:15}}>
          {cardTextString}
        </Text>
        :
        <Text style={{textAlign: 'center', alignItems:'center',justifyContent:'center', fontWeight: '500',color: dark ? COLORS.white : COLORS.grayscale700,fontSize:15,lineHeight: 30}}>
          {cardHeader}
        </Text>
        }
        <Text style={{textAlign: 'center',color: dark ? COLORS.white : COLORS.black,  alignItems:'center',justifyContent:'center',fontWeight: '600',fontSize:16}}>
          {calculatorValue}
        </Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    container: {
        width: '32%',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 12,
        height: 100,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
   
    icon: {
        height: 26,
        width: 26,
        marginRight: 16,
    },
    cardIcon: {
      height: 24,
      width: 24,
  },

    iconView:{
      height: 24,
      width: 24,
      alignSelf:'center',
    }
   
});

export default SquareCardItem;