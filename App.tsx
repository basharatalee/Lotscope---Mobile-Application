import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './app/screens/SplashScreen';
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import SalesScreen from './app/screens/SalesScreen';

const palette = {
  black: '#020406',
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'sales'>('home');

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
        activeScreen === 'sales' ? (
          <SalesScreen onOpenHome={() => setActiveScreen('home')} />
        ) : (
          <HomeScreen onOpenSales={() => setActiveScreen('sales')} />
        )
      ) : (
        <LoginScreen
          onContinue={() => {
            setIsLoggedIn(true);
            setActiveScreen('home');
          }}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;
