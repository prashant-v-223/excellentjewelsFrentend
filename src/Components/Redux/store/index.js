// import { configureStore, combinedReducers } from '@reduxjs/toolkit';
// import auth from '../reducers/auth.slice.js';
// import common from '../reducers/common.slice.js';
// import dashboard from '../reducers/dashboard.slice.js';
// import myAccount from '../reducers/myAccount.slice.js';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// const rootReducer = combinedReducers({
//   auth,
//   common,
//   dashboard,
//   myAccount,
// });

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };
// /* const rootReducer = {
//   auth,
//   common,
//   dashboard,
//   myAccount,
// }; */
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index'; // Assuming you named your rootReducer file rootReducer.js
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['offlineList'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
