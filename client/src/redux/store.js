import { configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';  //for light to dark mode
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer=combineReducers({
  user:userReducer,
  theme:themeReducer,   //for light to dark mode
});

const persistConfig={
  key:'root',
  storage,
  version:1,
};
const persistedReducer =persistReducer(persistConfig,rootReducer)



export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>                         //to  prevent the default error. if we can not give the middle means it generate the error
    getDefaultMiddleware({serializableCheck:false}),
});

export const persistor =persistStore(store);