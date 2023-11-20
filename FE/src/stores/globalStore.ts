import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import usersSlice from './users.slice';
import ordenesSlice from './ordenes.slice';
import productoSlice from './productos.slice';

const persistRootConfig = {
    key: 'root',
    storage: storageSession
};
const rootReducers = combineReducers({
    users: usersSlice,
    ordenes: ordenesSlice,
    productos: productoSlice
});
const persistedReducer = persistReducer(persistRootConfig, rootReducers);
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});
const persistor = persistStore(store);

export {
    store,
    persistor
};
