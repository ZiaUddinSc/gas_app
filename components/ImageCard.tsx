import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, ViewStyle } from 'react-native';
import { COLORS, images } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

type CardProps = {
    children?: ReactNode;
    containerStyle?: ViewStyle;
};

const ImageCard: React.FC<CardProps> = ({ children,containerStyle }) => {
    const { dark } = useTheme();

    return (
        <View
            style={[
                styles.container,
                containerStyle,
                {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.primary,
                },
            ]}
        >
           {children}
            <Image source={images.elipseCard as ImageSourcePropType} resizeMode="contain" style={styles.elipseIcon} />
            <Image source={images.rectangleCard as ImageSourcePropType} resizeMode="contain" style={styles.rectangleIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 304,
        height: 200,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 12,
        marginRight: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        fontSize: 12,
        fontFamily: "Urbanist Regular",
        color: 'rgba(255,255,255,.8)',
    },
    icon: {
        width: 40,
        height: 24,
    },
    cardNumber: {
        fontSize: 16,
        fontFamily: "Urbanist Medium",
        color: COLORS.white,
        marginVertical: 32,
    },
    footerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    balance: {
        fontFamily: "Urbanist SemiBold",
        fontSize: 20,
        color: COLORS.white,
    },
    date: {
        fontSize: 14,
        fontFamily: "Urbanist Regular",
        color: 'rgba(255,255,255,.8)',
    },
    elipseIcon: {
        height: 142,
        width: 142,
        position: 'absolute',
        bottom: -22,
        right: 0,
    },
    rectangleIcon: {
        height: 132,
        width: 156,
        position: 'absolute',
        top: -44,
        left: -44,
        zIndex: -999,
    },
});

export default ImageCard;