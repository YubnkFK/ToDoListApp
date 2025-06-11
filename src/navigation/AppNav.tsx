import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import FormCreate from '../screens/FormCreate';
import FormEdit from '../screens/FormEdit';

export type RootStackParamList = {
  Home: undefined;
  FormCreate: undefined;
  FormEdit: {Id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNav: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'To-Do List', headerShown: true}}
      />
      <Stack.Screen name="FormCreate" component={FormCreate} />
      <Stack.Screen name="FormEdit" component={FormEdit} />
    </Stack.Navigator>
  );
};

export default AppNav;
