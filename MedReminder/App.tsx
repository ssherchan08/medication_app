import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './src/store';
import Main from './src';

function App(): React.JSX.Element {
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['Selector unknown returned the root state when called']);
  LogBox.ignoreLogs(['Each child in a list should have a unique']);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
