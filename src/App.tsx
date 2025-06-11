import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './navigation/AppNav';
import {Provider} from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
