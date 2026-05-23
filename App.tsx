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
import {
  InteractionManager,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  errorCodes,
  isErrorWithCode,
  keepLocalCopy,
  pick,
  types,
} from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import * as XLSX from 'xlsx';

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
  'more',
];

const spreadsheetMimeTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

const genericFileMimeTypes = [
  'application/octet-stream',
  'application/zip',
  'binary/octet-stream',
];

const importPickerTypes = [
  types.csv,
  types.xls,
  types.xlsx,
  types.allFiles,
].flat();

const uploadLogPrefix = '[LotScope upload]';

type PickedImportFile = {
  uri: string;
  name: string | null;
  type: string | null;
  nativeType: string | null;
  convertibleToMimeTypes?: Array<{
    extension: string | null;
    mimeType: string;
  }> | null;
};

function normalizePickedFilePart(value?: string | null): string {
  if (!value) {
    return '';
  }

  try {
    return decodeURIComponent(value).toLowerCase();
  } catch {
    return value.toLowerCase();
  }
}

function getFileIdentity(file: PickedImportFile): string {
  return [
    normalizePickedFilePart(file.name),
    normalizePickedFilePart(file.type),
    normalizePickedFilePart(file.nativeType),
    normalizePickedFilePart(file.uri),
  ].join(' ');
}

function looksLikeCsvFile(fileIdentity: string): boolean {
  return (
    fileIdentity.includes('.csv') ||
    fileIdentity.includes('csv') ||
    fileIdentity.includes('comma-separated') ||
    fileIdentity.includes('public.comma-separated') ||
    fileIdentity.includes('text/plain')
  );
}

function looksLikeSpreadsheetFile(fileIdentity: string): boolean {
  return (
    fileIdentity.includes('.xlsx') ||
    fileIdentity.includes('.xls') ||
    fileIdentity.includes('.xlsm') ||
    fileIdentity.includes('.xlsb') ||
    fileIdentity.includes('.ods') ||
    spreadsheetMimeTypes.some(mimeType => fileIdentity.includes(mimeType)) ||
    fileIdentity.includes('spreadsheet') ||
    fileIdentity.includes('excel') ||
    fileIdentity.includes('sheet')
  );
}

function hasGenericFileType(fileIdentity: string): boolean {
  return genericFileMimeTypes.some(mimeType => fileIdentity.includes(mimeType));
}

function hasKnownNonImportExtension(fileIdentity: string): boolean {
  return /\.(?!csv|xlsx?|xlsm|xlsb|ods)([a-z0-9]{2,5})(?:$|[?#\s/])/.test(
    fileIdentity,
  );
}

function logUploadStep(message: string, details?: unknown) {
  if (details === undefined) {
    console.log(uploadLogPrefix, message);
    return;
  }

  console.log(uploadLogPrefix, message, details);
}

function logUploadWarning(message: string, details?: unknown) {
  if (details === undefined) {
    console.warn(uploadLogPrefix, message);
    return;
  }

  console.warn(uploadLogPrefix, message, details);
}

function getUploadErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function base64ToBytes(base64: string): Uint8Array {
  const cleanBase64 = base64.replace(/[\r\n\s]/g, '');
  const padding = cleanBase64.endsWith('==')
    ? 2
    : cleanBase64.endsWith('=')
      ? 1
      : 0;
  const byteLength = Math.floor((cleanBase64.length * 3) / 4) - padding;
  const bytes = new Uint8Array(byteLength);
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let byteIndex = 0;

  for (let index = 0; index < cleanBase64.length; index += 4) {
    const encoded1 = alphabet.indexOf(cleanBase64[index]);
    const encoded2 = alphabet.indexOf(cleanBase64[index + 1]);
    const encoded3 =
      cleanBase64[index + 2] === '=' ? 0 : alphabet.indexOf(cleanBase64[index + 2]);
    const encoded4 =
      cleanBase64[index + 3] === '=' ? 0 : alphabet.indexOf(cleanBase64[index + 3]);
    const chunk =
      encoded1 * 262144 + encoded2 * 4096 + encoded3 * 64 + encoded4;

    if (byteIndex < byteLength) {
      bytes[byteIndex] = Math.floor(chunk / 65536) % 256;
      byteIndex += 1;
    }

    if (byteIndex < byteLength) {
      bytes[byteIndex] = Math.floor(chunk / 256) % 256;
      byteIndex += 1;
    }

    if (byteIndex < byteLength) {
      bytes[byteIndex] = chunk % 256;
      byteIndex += 1;
    }
  }

  return bytes;
}

function bytesToArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
}

function getFileLogDetails(file: PickedImportFile) {
  return {
    name: file.name,
    type: file.type,
    nativeType: file.nativeType,
    uriPrefix: file.uri.slice(0, 40),
    convertibleToMimeTypes: file.convertibleToMimeTypes,
  };
}

function getVirtualFileConversionType(file: PickedImportFile): string | undefined {
  const convertibleTypes = file.convertibleToMimeTypes ?? [];
  const csvType = convertibleTypes.find(type =>
    normalizePickedFilePart(type.mimeType).includes('csv'),
  );
  const spreadsheetType = convertibleTypes.find(type => {
    const identity = `${normalizePickedFilePart(type.mimeType)} ${normalizePickedFilePart(type.extension)}`;
    return looksLikeSpreadsheetFile(identity);
  });

  const conversionType = csvType?.mimeType ?? spreadsheetType?.mimeType;

  logUploadStep('virtual conversion type selected', {
    conversionType,
    convertibleCount: convertibleTypes.length,
  });

  return conversionType;
}

async function fetchLocalPickedFileCopy(
  file: PickedImportFile,
): Promise<string | null> {
  logUploadStep('attempting local copy fallback');

  const [copy] = await keepLocalCopy({
    files: [
      {
        uri: file.uri,
        fileName: file.name ?? 'stallion-match-import.csv',
        convertVirtualFileToType: getVirtualFileConversionType(file),
      },
    ],
    destination: 'cachesDirectory',
  });

  if (copy.status === 'success') {
    logUploadStep('local copy succeeded', {
      localUriPrefix: copy.localUri.slice(0, 40),
    });
    return copy.localUri;
  }

  logUploadWarning('local copy failed', copy.copyError);
  return null;
}

async function readUriWithXhr(uri: string): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', uri, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      if (request.status === 0 || (request.status >= 200 && request.status < 300)) {
        logUploadStep('xhr read succeeded', {
          status: request.status,
          byteLength: request.response?.byteLength ?? 0,
        });
        resolve(request.response);
      } else {
        reject(new Error(`File read failed with status ${request.status}`));
      }
    };
    request.onerror = () => {
      logUploadWarning('xhr read failed');
      reject(new Error('File read failed'));
    };
    request.send();
  });
}

async function readUriBytes(uri: string): Promise<ArrayBuffer> {
  try {
    logUploadStep('reading uri with xhr', {uriPrefix: uri.slice(0, 40)});
    return await readUriWithXhr(uri);
  } catch (error) {
    logUploadWarning('xhr read fallback triggered', getUploadErrorMessage(error));
    try {
      logUploadStep('reading uri with fetch', {uriPrefix: uri.slice(0, 40)});
      const buffer = await fetch(uri).then(response => response.arrayBuffer());
      logUploadStep('fetch read succeeded', {byteLength: buffer.byteLength});
      return buffer;
    } catch (fetchError) {
      logUploadWarning('fetch read fallback triggered', getUploadErrorMessage(fetchError));
      logUploadStep('reading uri with react-native-fs', {
        uriPrefix: uri.slice(0, 40),
      });
      const base64 = await RNFS.readFile(uri, 'base64');
      const bytes = base64ToBytes(base64);
      logUploadStep('react-native-fs read succeeded', {
        byteLength: bytes.length,
      });
      return bytesToArrayBuffer(bytes);
    }
  }
}

async function readPickedFileBytes(file: PickedImportFile): Promise<ArrayBuffer> {
  try {
    return await readUriBytes(file.uri);
  } catch (error) {
    logUploadWarning('direct uri read failed', getUploadErrorMessage(error));
    const localUri = await fetchLocalPickedFileCopy(file);

    if (localUri) {
      try {
        return await readUriBytes(localUri);
      } catch (copyError) {
        logUploadWarning(
          'local copy read failed',
          getUploadErrorMessage(copyError),
        );
        // Preserve the original picker URI failure because it is usually the
        // more useful signal on devices where local copies cannot be made.
      }
    }

    throw error;
  }
}

function arrayBufferToBytes(buffer: ArrayBuffer): Uint8Array {
  return new Uint8Array(buffer);
}

function looksLikeSpreadsheetBytes(bytes: Uint8Array): boolean {
  const isZipWorkbook =
    bytes.length >= 4 &&
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x03 &&
    bytes[3] === 0x04;
  const isLegacyWorkbook =
    bytes.length >= 8 &&
    bytes[0] === 0xd0 &&
    bytes[1] === 0xcf &&
    bytes[2] === 0x11 &&
    bytes[3] === 0xe0;

  return isZipWorkbook || isLegacyWorkbook;
}

function decodeUtf8(bytes: Uint8Array): string {
  let output = '';
  let index = 0;

  while (index < bytes.length) {
    const byte = bytes[index];

    if (byte < 0x80) {
      output += String.fromCharCode(byte);
      index += 1;
    } else if (byte >= 0xc0 && byte < 0xe0) {
      output += String.fromCharCode(
        (byte % 32) * 64 + (bytes[index + 1] % 64),
      );
      index += 2;
    } else if (byte >= 0xe0 && byte < 0xf0) {
      output += String.fromCharCode(
        (byte % 16) * 4096 +
          (bytes[index + 1] % 64) * 64 +
          (bytes[index + 2] % 64),
      );
      index += 3;
    } else {
      index += 1;
    }
  }

  return output.replace(/^\uFEFF/, '');
}

function parseCsvBytes(bytes: Uint8Array): SouthportTycoonAnalysis[] {
  logUploadStep('attempting csv parse', {byteLength: bytes.length});
  const rows = parseSouthportTycoonCsv(decodeUtf8(bytes));
  logUploadStep('csv parse finished', {rowCount: rows.length});
  return rows;
}

function parseSpreadsheetBytes(buffer: ArrayBuffer): SouthportTycoonAnalysis[] {
  logUploadStep('attempting spreadsheet parse', {byteLength: buffer.byteLength});
  const workbook = XLSX.read(buffer, {type: 'array'});

  logUploadStep('spreadsheet workbook opened', {
    sheetNames: workbook.SheetNames,
  });

  for (const sheetName of workbook.SheetNames) {
    const csvText = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName], {
      blankrows: false,
    });
    const parsedRows = parseSouthportTycoonCsv(csvText);

    logUploadStep('spreadsheet sheet parsed', {
      sheetName,
      csvLength: csvText.length,
      rowCount: parsedRows.length,
    });

    if (parsedRows.length > 0) {
      return parsedRows;
    }
  }

  return [];
}

async function parsePickedImportFile(
  file: PickedImportFile,
): Promise<SouthportTycoonAnalysis[] | null> {
  const fileIdentity = getFileIdentity(file);
  const isCsv = looksLikeCsvFile(fileIdentity);
  const isSpreadsheet = looksLikeSpreadsheetFile(fileIdentity);
  const shouldTryUnknownFile =
    !hasKnownNonImportExtension(fileIdentity) || hasGenericFileType(fileIdentity);

  logUploadStep('file classification', {
    isCsv,
    isSpreadsheet,
    shouldTryUnknownFile,
    fileIdentitySample: fileIdentity.slice(0, 180),
  });

  if (!isCsv && !isSpreadsheet && !shouldTryUnknownFile) {
    logUploadWarning('file rejected before reading');
    return null;
  }

  const buffer = await readPickedFileBytes(file);
  const bytes = arrayBufferToBytes(buffer);
  const spreadsheetBySignature = looksLikeSpreadsheetBytes(bytes);

  logUploadStep('file bytes loaded', {
    byteLength: bytes.length,
    spreadsheetBySignature,
    firstBytes: Array.from(bytes.slice(0, 8)),
  });

  if (isSpreadsheet || spreadsheetBySignature) {
    try {
      const spreadsheetRows = parseSpreadsheetBytes(buffer);

      if (spreadsheetRows.length > 0 || isSpreadsheet) {
        return spreadsheetRows;
      }
    } catch (error) {
      logUploadWarning(
        'spreadsheet parse failed, trying csv fallback',
        getUploadErrorMessage(error),
      );
      // Some virtual spreadsheet providers export CSV even when the picked
      // document identity still looks like XLSX, so continue to CSV parsing.
    }
  }

  const csvRows = parseCsvBytes(bytes);

  if (csvRows.length > 0 || isCsv) {
    return csvRows;
  }

  try {
    return parseSpreadsheetBytes(buffer);
  } catch (error) {
    logUploadWarning('final spreadsheet parse failed', getUploadErrorMessage(error));
    return csvRows;
  }
}

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
    () => [],
  );
  const [csvImportStatus, setCsvImportStatus] = useState<{
    fileName?: string;
    rowCount: number;
    state: 'sample' | 'loaded' | 'error';
    message?: string;
  }>({
    rowCount: 0,
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
      logUploadStep('picker opening', {types: importPickerTypes});
      const [file] = await pick({
        type: importPickerTypes,
        allowMultiSelection: false,
        allowVirtualFiles: true,
      });

      const fileName = file.name ?? 'selected file';
      logUploadStep('file picked', getFileLogDetails(file));
      const parsedRows = await parsePickedImportFile(file);

      if (parsedRows === null) {
        logUploadWarning('import stopped: unsupported file type');
        setCsvImportStatus({
          rowCount: 0,
          state: 'error',
          message: 'Please select a CSV or XLSX file exported from Stallion Match.',
        });
        return;
      }

      if (parsedRows.length === 0) {
        logUploadWarning('import stopped: no mappable rows found');
        setCsvImportStatus({
          rowCount: 0,
          state: 'error',
          message: 'No valid Southport Tycoon analysis rows found.',
        });
        return;
      }

      setAnalysisRows(parsedRows);
      logUploadStep('import succeeded', {
        fileName,
        rowCount: parsedRows.length,
        firstLot: parsedRows[0]?.lotNumber,
      });
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
        logUploadStep('picker cancelled');
        return;
      }

      logUploadWarning('import failed with exception', getUploadErrorMessage(error));
      setCsvImportStatus({
        rowCount: 0,
        state: 'error',
        message: 'File import failed. Please check the CSV format.',
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
                onOpenActivity={openServicesHub}
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
                onOpenActivity={openServicesHub}
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
                onOpenActivity={openServicesHub}
                onOpenTeam={openServicesHub}
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
                onOpenActivity={openServicesHub}
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
                onOpenActivity={openServicesHub}
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
                onOpenActivity={openServicesHub}
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
                onOpenActivity={openServicesHub}
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
