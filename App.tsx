// import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import SplashScreen from './app/screens/SplashScreen';
// import LoginScreen from './app/screens/LoginScreen';
// import HomeScreen from './app/screens/HomeScreen';
// import SalesScreen from './app/screens/SalesScreen';
// import ShortlistScreen from './app/screens/ShortlistScreen';

// const palette = {
//   black: '#020406',
// };

// function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [activeScreen, setActiveScreen] = useState<
//     'home' | 'sales' | 'shortlist'
//   >('home');

//   useEffect(() => {
//     const splashTimer = setTimeout(() => {
//       setShowSplash(false);
//     }, 1800);

//     return () => clearTimeout(splashTimer);
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor={palette.black}
//       />

//       {showSplash ? (
//         <SplashScreen />
//       ) : isLoggedIn ? (
//         activeScreen === 'sales' ? (
//           <SalesScreen
//             onOpenHome={() => setActiveScreen('home')}
//             onOpenShortlist={() => setActiveScreen('shortlist')}
//           />
//         ) : activeScreen === 'shortlist' ? (
//           <ShortlistScreen
//             onOpenHome={() => setActiveScreen('home')}
//             onOpenSales={() => setActiveScreen('sales')}
//           />
//         ) : (
//           <HomeScreen
//             onOpenSales={() => setActiveScreen('sales')}
//             onOpenShortlist={() => setActiveScreen('shortlist')}
//           />
//         )
//       ) : (
//         <LoginScreen
//           onContinue={() => {
//             setIsLoggedIn(true);
//             setActiveScreen('home');
//           }}
//         />
//       )}
//     </SafeAreaProvider>
//   );
// }

// export default App;




















import React, { useCallback, useEffect, useState } from 'react';
import { InteractionManager, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  errorCodes,
  isErrorWithCode,
  pick,
  types,
} from '@react-native-documents/picker';

import SplashScreen from './app/screens/SplashScreen.tsx';
import LoginScreen from './app/screens/LoginScreen.tsx';
import HomeScreen from './app/screens/HomeScreen.tsx';
import SalesScreen from './app/screens/SalesScreen.tsx';
import ShortlistScreen from './app/screens/ShortlistScreen.tsx';
import CompareShortlist from './app/screens/CompareShortlist.tsx';
import ActivityScreen from './app/screens/ActivityScreen.tsx';
import OnlineReviewQueue from './app/screens/OnlineReviewQueue.tsx';
import OwnershipTrackingScreen from './app/screens/OwnershipTrackingScreen.tsx';
import SaleTeamServicesHubScreen from './app/screens/SaleTeamServicesHubScreen.tsx';
import {
  SouthportTycoonAnalysis,
  getDefaultSouthportTycoonAnalysis,
  parseSouthportTycoonCsv,
} from './app/data/southportTycoonAnalysis.ts';

const palette = {
  black: '#020406',
};

type AppScreen =
  | 'home'
  | 'sales'
  | 'shortlist'
  | 'compareShortlist'
  | 'activity'
  | 'liveInspection'
  | 'more'
  | 'servicesHub';

const preloadedScreens: AppScreen[] = [
  'sales',
  'shortlist',
  'activity',
  'more',
  'servicesHub',
];

const CachedHomeScreen = React.memo(HomeScreen);
const CachedSalesScreen = React.memo(SalesScreen);
const CachedShortlistScreen = React.memo(ShortlistScreen);
const CachedCompareShortlist = React.memo(CompareShortlist);
const CachedActivityScreen = React.memo(ActivityScreen);
const CachedOnlineReviewQueue = React.memo(OnlineReviewQueue);
const CachedOwnershipTrackingScreen = React.memo(OwnershipTrackingScreen);
const CachedSaleTeamServicesHubScreen = React.memo(SaleTeamServicesHubScreen);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [analysisRows, setAnalysisRows] = useState<SouthportTycoonAnalysis[]>(
    () => getDefaultSouthportTycoonAnalysis(),
  );
  const [csvImportStatus, setCsvImportStatus] = useState<{
    fileName?: string;
    rowCount: number;
    state: 'sample' | 'loaded' | 'error';
    message?: string;
  }>({
    rowCount: getDefaultSouthportTycoonAnalysis().length,
    state: 'sample',
  });
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');
  const [mountedScreens, setMountedScreens] = useState<Set<AppScreen>>(
    () => new Set(['home']),
  );

  const openScreen = useCallback((screen: AppScreen) => {
    setMountedScreens(previous => {
      if (previous.has(screen)) {
        return previous;
      }

      const next = new Set(previous);
      next.add(screen);
      return next;
    });
    setActiveScreen(screen);
  }, []);

  const openHome = useCallback(() => openScreen('home'), [openScreen]);
  const openSales = useCallback(() => openScreen('sales'), [openScreen]);
  const openShortlist = useCallback(() => openScreen('shortlist'), [openScreen]);
  const openCompareShortlist = useCallback(
    () => openScreen('compareShortlist'),
    [openScreen],
  );
  const openActivity = useCallback(() => openScreen('activity'), [openScreen]);
  const openLiveInspection = useCallback(
    () => openScreen('liveInspection'),
    [openScreen],
  );
  const openMore = useCallback(() => openScreen('more'), [openScreen]);
  const openServicesHub = useCallback(
    () => openScreen('servicesHub'),
    [openScreen],
  );
  const handleLoginContinue = useCallback(() => {
    setIsLoggedIn(true);
    openHome();
  }, [openHome]);

  const handleUploadCsv = useCallback(async () => {
    try {
      const [file] = await pick({
        type: [types.allFiles],
        allowMultiSelection: false,
      });

      const fileName = file.name ?? 'selected file';
      const looksLikeCsv =
        fileName.toLowerCase().endsWith('.csv') ||
        file.type?.toLowerCase().includes('csv') ||
        file.type?.toLowerCase().includes('text');

      if (!looksLikeCsv) {
        setCsvImportStatus({
          rowCount: 0,
          state: 'error',
          message: 'Please select a CSV file exported from Stallion Match.',
        });
        return;
      }

      const csvText = await fetch(file.uri).then(response => response.text());
      const parsedRows = parseSouthportTycoonCsv(csvText);

      if (parsedRows.length === 0) {
        setCsvImportStatus({
          rowCount: 0,
          state: 'error',
          message: 'No valid Southport Tycoon analysis rows found.',
        });
        return;
      }

      setAnalysisRows(parsedRows);
      setCsvImportStatus({
        fileName,
        rowCount: parsedRows.length,
        state: 'loaded',
      });
    } catch (error) {
      if (
        isErrorWithCode(error) &&
        error.code === errorCodes.OPERATION_CANCELED
      ) {
        return;
      }

      setCsvImportStatus({
        rowCount: 0,
        state: 'error',
        message: 'CSV import failed. Please check the file format.',
      });
    }
  }, []);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const preloadTask = InteractionManager.runAfterInteractions(() => {
      setMountedScreens(previous => {
        const next = new Set(previous);
        preloadedScreens.forEach(screen => next.add(screen));
        return next;
      });
    });

    return () => preloadTask.cancel();
  }, [isLoggedIn]);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={palette.black}
      />

      {showSplash ? (
        <SplashScreen />
      ) : isLoggedIn ? (
        <View style={styles.screenHost}>
          {mountedScreens.has('home') ? (
            <View style={activeScreen === 'home' ? styles.activeRoute : styles.hiddenRoute}>
              <CachedHomeScreen
                onOpenSales={openSales}
                onOpenShortlist={openShortlist}
                onOpenActivity={openActivity}
                onOpenMore={openMore}
                onUploadCsv={handleUploadCsv}
                csvImportStatus={csvImportStatus}
                analysisRows={analysisRows}
              />
            </View>
          ) : null}

          {mountedScreens.has('sales') ? (
            <View style={activeScreen === 'sales' ? styles.activeRoute : styles.hiddenRoute}>
              <CachedSalesScreen
                onOpenHome={openHome}
                onOpenShortlist={openShortlist}
                onOpenActivity={openActivity}
                onOpenMore={openMore}
                analysisRows={analysisRows}
              />
            </View>
          ) : null}

          {mountedScreens.has('shortlist') ? (
            <View style={activeScreen === 'shortlist' ? styles.activeRoute : styles.hiddenRoute}>
              <CachedShortlistScreen
                onOpenHome={openHome}
                onOpenSales={openSales}
                onOpenCompare={openCompareShortlist}
                onOpenActivity={openActivity}
                onOpenMore={openMore}
                analysisRows={analysisRows}
              />
            </View>
          ) : null}

          {mountedScreens.has('compareShortlist') ? (
            <View
              style={
                activeScreen === 'compareShortlist'
                  ? styles.activeRoute
                  : styles.hiddenRoute
              }>
              <CachedCompareShortlist
                onOpenHome={openHome}
                onOpenSales={openSales}
                onOpenShortlist={openShortlist}
                onOpenActivity={openActivity}
                onOpenMore={openMore}
                analysisRows={analysisRows}
              />
            </View>
          ) : null}

          {mountedScreens.has('activity') ? (
            <View style={activeScreen === 'activity' ? styles.activeRoute : styles.hiddenRoute}>
              <CachedActivityScreen
                onOpenLiveInspection={openLiveInspection}
                onOpenHome={openHome}
                onOpenSales={openSales}
                onOpenShortlist={openShortlist}
                onOpenMore={openMore}
              />
            </View>
          ) : null}

          {mountedScreens.has('liveInspection') ? (
            <View
              style={
                activeScreen === 'liveInspection'
                  ? styles.activeRoute
                  : styles.hiddenRoute
              }>
              <CachedOnlineReviewQueue
                onBack={openActivity}
                onOpenHome={openHome}
                onOpenSales={openSales}
                onOpenShortlist={openShortlist}
                onOpenActivity={openActivity}
                onOpenMore={openMore}
              />
            </View>
          ) : null}

          {mountedScreens.has('more') ? (
            <View style={activeScreen === 'more' ? styles.activeRoute : styles.hiddenRoute}>
              <CachedOwnershipTrackingScreen
                onOpenHome={openHome}
                onOpenSales={openSales}
                onOpenShortlist={openShortlist}
                onOpenActivity={openActivity}
                onOpenServicesHub={openServicesHub}
              />
            </View>
          ) : null}

          {mountedScreens.has('servicesHub') ? (
            <View
              style={
                activeScreen === 'servicesHub'
                  ? styles.activeRoute
                  : styles.hiddenRoute
              }>
              <CachedSaleTeamServicesHubScreen
                onBack={openMore}
                onOpenHome={openHome}
                onOpenSales={openSales}
                onOpenShortlist={openShortlist}
                onOpenActivity={openActivity}
              />
            </View>
          ) : null}
        </View>
      ) : (
        <LoginScreen onContinue={handleLoginContinue} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screenHost: {
    flex: 1,
    backgroundColor: palette.black,
  },

  activeRoute: {
    flex: 1,
  },

  hiddenRoute: {
    display: 'none',
  },
});

export default App;
