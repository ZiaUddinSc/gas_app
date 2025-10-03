import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface CartViewProps {
    value: string;
    onPress: () => void;
}

const CartView: React.FC<CartViewProps> = ({
    value,
    onPress
}) => {
    const { dark } = useTheme();

    return (
        <TouchableOpacity
        onPress={onPress}
        style={[styles.container, {
            backgroundColor: dark ? COLORS.dark2 : COLORS.white
        }]}>
        {/* <View
            style={[styles.imageContainer, {
                backgroundColor: dark ? COLORS.dark3 : COLORS.silver
            }]}>
            <Image
                source={image}
                resizeMode='cover'
                style={styles.image}
            />
        </View> */}
        <View style={styles.columnContainer}>
            <View style={styles.topViewContainer}>
                <Text style={[styles.name, {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                }]}>{value}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Image
                        source={icons.delete3}
                        resizeMode='contain'
                        style={styles.heartIcon}
                    />
                </TouchableOpacity>
            </View>
           
          
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: SIZES.width - 32,
        backgroundColor: COLORS.white,
        padding: 6,
        borderRadius: 16,
        marginBottom: 12,
        height: 112,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 16,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: COLORS.silver,
    },
    columnContainer: {
        flexDirection: 'column',
        marginLeft: 12,
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontFamily: "Urbanist Bold",
        color: COLORS.greyscale900,
        marginVertical: 4,
        marginRight: 40,
    },
    location: {
        fontSize: 14,
        fontFamily: "Urbanist Regular",
        color: COLORS.grayscale700,
        marginVertical: 4,
    },
    priceContainer: {
        flexDirection: 'column',
        marginVertical: 4,
    },
    heartIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.red,
        marginLeft: 6,
    },
    topViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SIZES.width - 164,
    },
    bottomViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
    },
    viewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    price: {
        fontSize: 16,
        fontFamily: "Urbanist SemiBold",
        color: COLORS.primary,
        marginRight: 8,
    },
    color: {
        height: 16,
        width: 16,
        borderRadius: 999,
        marginRight: 8,
    },
    qtyContainer: {
        width: 93,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.silver,
        flexDirection: 'row',
    },
    qtyText: {
        fontSize: 18,
        fontFamily: "Urbanist Regular",
        color: COLORS.primary,
    },
    qtyNum: {
        fontSize: 14,
        fontFamily: "Urbanist SemiBold",
        color: COLORS.primary,
        marginHorizontal: 12,
    },
});

export default CartView;