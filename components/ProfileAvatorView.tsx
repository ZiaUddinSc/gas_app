import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface AvatorProps {
    name: string;
}

const ProfileAvatorView: React.FC<AvatorProps> = ({
    name
}) => {
    const { dark } = useTheme();

    return (
        <View style={styles.avatarContainer}>
        <View  style={[styles.avatar,{backgroundColor: dark ? COLORS.white : COLORS.black}]}>
            <Text style={[{justifyContent:'center',fontSize:25,fontWeight:'700',alignItems:'center'},
            {color: dark ? COLORS.black : COLORS.white}]}>{name}</Text>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        marginVertical: 12,
        alignItems: 'center',
        width: 130,
        height: 130,
        borderRadius: 65,
      },
      avatar: {
        justifyContent:'center',
        alignItems:'center',
        height: 130,
        width: 130,
        borderRadius: 65,
      },
});

export default ProfileAvatorView;