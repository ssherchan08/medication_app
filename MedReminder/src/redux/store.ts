// import {combineReducers, createStore} from 'redux';

// const store = createStore(
//   combineReducers({
//     user: userReducer,
//     calendar: calendarReducer,
//     intakes: intakesReducer,
//   }),
// );

// export default store;

import {configureStore} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; // Import state reconciler

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {rootReducer} from './combinedReducers';

// Configure Redux Persist
const persistConfig = {
  key: 'root2',
  storage: AsyncStorage,
  whitelist: ['user'],
  blacklist: ['intakes'],
  stateReconciler: autoMergeLevel2, // Include only 'user' reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
const persistor = persistStore(store);

export {store, persistor};
