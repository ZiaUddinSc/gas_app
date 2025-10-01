import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ImageSourcePropType } from 'react-native';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import Ionicons from "react-native-vector-icons/Ionicons";

type BoilerManualListProps = {
    onPress: () => void;
    title: string;
    icon: any;
    description?: string;
};

const BoilerManualListItem: React.FC<BoilerManualListProps> = ({
    onPress,
    title,
    icon,
}) => {
    const { dark } = useTheme();
    return (
        <TouchableOpacity style={[styles.notificationItem, {
          backgroundColor: dark ? COLORS.dark2 : '#F5F5F5',
        }]}
        onPress={onPress}
        >
          <View style={[styles.iconContainer]}>
             <Image
                    source={{ uri: icon }}
                    resizeMode='contain'
                    style={styles.image}
                />
          </View>
          <View>
            <Text style={[styles.notificationTitle, {
              color: dark ? COLORS.white : COLORS.greyscale900,
            }]}>{title}</Text>
            {/* <Text style={[styles.notificationDescription, {
              color: dark ? COLORS.grayscale400 : 'gray',
            }]}>{description}</Text> */}
          </View>
        </TouchableOpacity>
      );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        height: 76,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
      },
      iconContainer: {
        // backgroundColor: '#000',
        // borderRadius: 999,
        marginRight:10,
        height: 68,
        width: 40,
        alignItems: "center",
        justifyContent: "center"
      },
      notificationTitle: {
        fontFamily: 'Urbanist Bold',
        fontSize: 18,
        color: COLORS.greyscale900,
        marginBottom: 6
      },
      notificationDescription: {
        color: 'gray',
        fontSize: 14,
        fontFamily: "Urbanist Medium"
      },
      image: {
        height: 68,
        width: 40,
    },
});

export default BoilerManualListItem;