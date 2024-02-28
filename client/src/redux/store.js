import { createStore, } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index';
// import logger from 'redux-logger'


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['router'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer());

export const store = createStore(persistedReducer, {});
export const persistor = persistStore(store);