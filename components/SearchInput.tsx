import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, icons, SIZES} from '../constants';
import {getTimeAgo} from '../utils/date';
import {useTheme} from '../theme/ThemeProvider';

interface SearchInputProps {
  onInputChanged: (text) => void;
  inputValue: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  inputValue,
  onInputChanged,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const {colors, dark} = useTheme();

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
          borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
        },
      ]}>
      <TouchableOpacity>
        <Image
          source={icons.search2}
          resizeMode="contain"
          style={styles.searchIcon}
        />
      </TouchableOpacity>

      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={onInputChanged}
        value={inputValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 12,
    padding: 16,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    // marginVertical: 10,
    backgroundColor: COLORS.greyscale500,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: '#111',
  },
});

export default SearchInput;
