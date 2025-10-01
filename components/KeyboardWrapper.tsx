import React, {useRef, useEffect} from 'react';
import {
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Keyboard,
  StyleProp,
  KeyboardAvoidingView,
  ViewStyle,
  View
} from 'react-native';
import {COLORS, images} from '../constants';
import {useTheme} from '../theme/ThemeProvider';

type KeyBoardProps = {
  children: React.ReactNode;
  headerComponent?: React.ReactNode; // ✅ allow any header
  style?: StyleProp<ViewStyle>;
  offset?: number; // override keyboardVerticalOffset
  contentContainerStyle?: StyleProp<ViewStyle>; // style for ScrollView content
  bottomComponent?: React.ReactNode;
  scrollProps?: ScrollViewProps;
};

const KeyboardWrapper: React.FC<KeyBoardProps> = ({
  children,
  headerComponent,
  style,
  offset = 20,
  contentContainerStyle,
  bottomComponent,
  scrollProps,
}) => {
  const {dark} = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 50); // ⏱ tiny delay avoids initial flicker
      });
    
      const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      });
    
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
  }, []);
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 20}
      >
        {headerComponent && <View>{headerComponent}</View>}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={contentContainerStyle}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false} // 👈 prevents flicker
        {...scrollProps} // allow overriding/adding scroll props
      >
        {children}
      </ScrollView>
      {bottomComponent && <View style={styles.bottom}>{bottomComponent}</View>}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
    flex: { flex: 1 },
    flexGrow: { flexGrow: 1 },
    bottom: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
export default KeyboardWrapper;
