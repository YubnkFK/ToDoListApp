import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigation/AppNav';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
