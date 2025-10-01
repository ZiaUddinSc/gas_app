import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import LottieView from 'lottie-react-native';

const LottieLoader = ({visible = false}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <LottieView
          source={require('./../assets/animations/loader.json')}
          autoPlay
          loop
          style={styles.loader}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Transparent dark bg
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 300,
    height: 300,
  },
});

export default LottieLoader;
