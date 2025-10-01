import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Avatar = ({ name, size = 40, colors = ['#007AFF', '#4FD6FF'] }) => {
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    let initials = '';
    if (nameParts.length > 0) {
      initials += nameParts[0].charAt(0).toUpperCase();
      if (nameParts.length > 1) {
        initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
      }
    }
    return initials;
  };

  const initials = getInitials(name);

  return (
    <LinearGradient
      colors={colors}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={[styles.text, { fontSize: size / 3.2 }]}>{initials}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize:20
  },
});

export default Avatar;