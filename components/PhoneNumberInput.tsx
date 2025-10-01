import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";

interface PhoneNumberInputProps {
  defaultCode?: string;
  value?: string;
  onChange?: (text: string, formatted?: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  defaultCode = "UK",
  value = "",
  onChange,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const [phone, setPhone] = useState(value);
  const [formattedPhone, setFormattedPhone] = useState("");

  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phone}
        defaultCode={defaultCode}
        layout="first"
        withShadow
        autoFocus={false}
        onChangeText={(text) => {
          setPhone(text);
          onChange?.(text, formattedPhone);
        }}
        onChangeFormattedText={(text) => {
          setFormattedPhone(text);
          onChange?.(phone, text);
        }}
        countryPickerProps={{ withAlphaFilter: true }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default PhoneNumberInput;
