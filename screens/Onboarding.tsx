import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, illustrations, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface Slide {
    id: string;
    image: any;
    darkImage: any;
    title: string;
    subtitle: string;
}

const slides: Slide[] = [
    {
        id: '1',
        image: illustrations.onboarding1,
        darkImage: illustrations.onboarding1Dark,
        title: 'We provide high quality products just for you',
        subtitle: '',
    },
    {
        id: '2',
        image: illustrations.onboarding2,
        darkImage: illustrations.onboarding2Dark,
        title: 'Your satisfaction is our number one priority',
        subtitle: '',
    },
    {
        id: '3',
        image: illustrations.onboarding3,
        darkImage: illustrations.onboarding3Dark,
        title: "Let's fulfill your house needs with Funica right now",
        subtitle: '',
    },
];

const OnboardingScreen: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const listRef = useRef<FlatList>(null);
    const { colors, dark } = useTheme();

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    // Update index when scroll finishes
    const onMomentumScrollEnd = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / SIZES.width);
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            listRef.current?.scrollToOffset({ offset: SIZES.width * nextIndex, animated: true });
        } else {
            navigation.navigate('welcome');
        }
    };

    const renderItem = ({ item }: { item: Slide }) => (
        <View style={styles.slide}>
            <Image source={dark ? item.darkImage : item.image} style={styles.image} resizeMode="contain" />
            <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>{item.subtitle}</Text>
        </View>
    );
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="dark-content" />
            <FlatList
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewConfig.current}
                ref={listRef}
                getItemLayout={(_, index) => ({ length: SIZES.width, offset: SIZES.width * index, index })}
            />
            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot
                            ]}
                        />
                    ))}
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: dark ? COLORS.white : COLORS.primary }]} onPress={handleNext} activeOpacity={0.7}>
                    <Text style={[styles.buttonText, { color: dark ? "#101010" : COLORS.white }]}>{currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slide: {
        width: SIZES.width,
        alignItems: 'center',
        paddingTop: 40,
    },
    image: {
        width: SIZES.width * 0.8,
        height: SIZES.height * 0.5,
    },
    title: {
        fontSize: 36,
        fontFamily: "Urbanist Bold",
        textAlign: 'center',
        marginTop: 30,
        paddingHorizontal: 26,
        color: COLORS.greyscale900,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 14,
        paddingHorizontal: 30,
        color: '#737373',
        fontFamily: "Urbanist Medium"
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: COLORS.primary,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        paddingHorizontal: 60,
        width: SIZES.width - 32,
        alignItems: "center",
        justifyContent: "center",
        height: 48
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Urbanist Bold",
    },
    background: {
        zIndex: -1,
        position: "absolute",
        top: 300
    }
});

export default OnboardingScreen;