import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Main from './src';
import {store, persistor} from './src/redux/store';

function App(): React.JSX.Element {
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['Selector unknown returned the root state when called']);
  LogBox.ignoreLogs(['Each child in a list should have a unique']);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Main />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
