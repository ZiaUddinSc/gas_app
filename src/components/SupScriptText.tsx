import React, {Text, View} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { COLORS } from '../../constants';

type Props = {
  base: string;
  exponent: string;
  eloseBracket?: String;
};

const SuperscriptText = (props: Props) => {
  const {base, exponent, eloseBracket} = props;
  const { dark } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: dark ? COLORS.white : COLORS.grayscale700,
          lineHeight: 28,
        }}>
        {base}
      </Text>
      <Text style={{fontSize: 12, fontWeight: '500', color: dark ? COLORS.white : COLORS.grayscale700}}>
        {exponent}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: dark ? COLORS.white : COLORS.grayscale700,
          lineHeight: 30,
        }}>
        {eloseBracket}
      </Text>
    </View>
  );
};

export default SuperscriptText;
