import '@testing-library/jest-native';
// import { expect } from '@jest/globals';
require('@testing-library/jest-native/extend-expect');


jest.mock('react-native-gesture-handler', () => ({
    ScrollView: 'ScrollView',
    PanGestureHandler: 'PanGestureHandler',
    GestureHandlerRootView: 'GestureHandlerRootView',
}));

jest.mock('@react-navigation/native', () => ({
    NavigationContainer: ({ children }) => children,
}));

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    SafeAreaProvider: ({ children }) => children,
}));

// Mock para fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
        status: 200,
    }),
);

jest.useFakeTimers();
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
