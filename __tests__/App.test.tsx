import 'react-native';
import React from 'react';
import App from '../src/App';
import {it, describe, expect} from '@jest/globals';
import renderer, {act} from 'react-test-renderer';

jest.mock('../src/navigation/AppNav', () => ({
  __esModule: true,
  default: () => null,
}));

describe('App', () => {
  it('should render without crashing', () => {
    let tree;
    act(() => {
      tree = renderer.create(<App />);
    });
    expect(tree).toBeTruthy();
  });
});
