/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

let AppEntryPoint = App;

AppRegistry.registerComponent(appName, () => AppEntryPoint);
