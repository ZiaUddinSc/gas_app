import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface ButtonOutlinedProps {
    onPress: () => void;
    title: string;
    style?: ViewStyle;
    isLoading?: boolean;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({ onPress, title, style, isLoading = false }) => {
    const { dark } = useTheme();
    return (
        <TouchableOpacity
            style={[
                styles.outlinedButton,
                style,
                {
                    backgroundColor: "transparent",
                    borderColor: dark ? COLORS.white : COLORS.primary,
                },
            ]}
            onPress={onPress}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
                <Text style={[styles.buttonText, { color: dark ? COLORS.white : COLORS.black }]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    outlinedButton: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        backgroundColor: COLORS.primary,
    } as ViewStyle,
    buttonText: {
        fontSize: 18,
        fontFamily: "Urbanist SemiBold",
    } as TextStyle,
});

export default ButtonOutlined;
