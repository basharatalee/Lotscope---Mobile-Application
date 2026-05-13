import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './app/screens/SplashScreen';
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';

const palette = {
  black: '#020406',
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={palette.black}
      />

      {showSplash ? (
        <SplashScreen />
      ) : isLoggedIn ? (
        <HomeScreen />
      ) : (
        <LoginScreen onContinue={() => setIsLoggedIn(true)} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
