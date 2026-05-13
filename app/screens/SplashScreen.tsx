import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const lsLogo = require('../../assets/ls-logo.jpeg') as ImageSourcePropType;

const palette = {
  black: '#020406',
};

function SplashScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, scale]);

  return (
    <SafeAreaView style={styles.splash}>
      <Animated.Image
        source={lsLogo}
        resizeMode="contain"
        style={[
          styles.splashLogo,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.black,
  },

  splashLogo: {
    width: '86%',
    height: 340,
  },
});

export default SplashScreen;