import React from 'react';
import {act, create} from 'react-test-renderer';
import HomeScreen from '../src/screens/HomeScreen';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../src/hook/useTodos.ts', () => ({
  useTodos: () => ({
    todos: [{id: '1', title: 'Tarea 1'}],
    loading: false,
    error: null,
  }),
}));

jest.mock('../src/components/CustomGrid', () => 'CustomGrid');

describe('HomeScreen', () => {
  it('should render correctly', () => {
    let tree;
    act(() => {
      tree = create(<HomeScreen />);
    });

    expect(tree).toBeTruthy();
  });
});
