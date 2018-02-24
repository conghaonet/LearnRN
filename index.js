import { AppRegistry } from 'react-native';

// import App from './App';
// AppRegistry.registerComponent('learn-rn', () => App);

// import NaviModule from './NaviModule';
// AppRegistry.registerComponent('learn-rn', () => NaviModule);

// import TryFlexbox from './TryFlexbox';
// AppRegistry.registerComponent('learn-rn', () => TryFlexbox);

// import TryNavigation from './TryNavigation';
// AppRegistry.registerComponent('learn-rn', () => TryNavigation);

import TryFetch from './TryFetch';
//关闭提示：Remote debugger is in a background tab which may cause apps to perform slowly……
console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent('learn-rn', () => TryFetch);
