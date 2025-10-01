import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

interface AnimatedTextProps {
  text: string;
  interval?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, interval = 150 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(''); 

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        const nextChar = text.charAt(currentIndex);
        setDisplayedText(prev => prev + nextChar);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [text, interval]);

  return <Text style={styles.title}>{displayedText}</Text>;
};

export default AnimatedText;
