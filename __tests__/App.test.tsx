/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-native-documents/picker', () => ({
  errorCodes: {
    OPERATION_CANCELED: 'OPERATION_CANCELED',
  },
  isErrorWithCode: (error: {code?: string}) => Boolean(error?.code),
  keepLocalCopy: jest.fn(),
  pick: jest.fn(),
  types: {
    allFiles: '*/*',
    csv: 'text/csv',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
}));

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
}));

jest.mock('xlsx', () => ({
  read: jest.fn(),
  utils: {
    sheet_to_csv: jest.fn(),
  },
}));

jest.mock('@react-native-vector-icons/fontawesome6', () => {
  return function MockFontAwesome6({ name }: { name: string }) {
    const { Text } = require('react-native');
    return <Text>{name}</Text>;
  };
});

test('renders correctly', async () => {
  jest.useFakeTimers();
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  await ReactTestRenderer.act(() => {
    jest.advanceTimersByTime(2200);
  });

  await ReactTestRenderer.act(() => {
    renderer?.unmount();
  });
  jest.useRealTimers();
});
