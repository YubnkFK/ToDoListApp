/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED === 'true') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    AppEntryPoint = require('./.storybook').default;
}

AppRegistry.registerComponent(appName, () => AppEntryPoint);
