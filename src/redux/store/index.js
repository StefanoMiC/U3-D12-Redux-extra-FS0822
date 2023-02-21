// questo file si occupa di creare lo store all'avvio dell'applicazione

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

// import mainReducer from "../reducers";
import cartReducer from "../reducers/cartReducer";
import userReducer from "../reducers/userReducer";
import booksReducer from "../reducers/booksReducer";

const persistConfig = {
  key: "root",
  storage, // identico a storage: storage
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY
    })
  ]
};

// cartReducer e userReducer gestiscono la loro porzione di stato più piccola,
// con combineReducer riportiamo le sezioni (slices) in un'unico macro oggetto globale
// prima di passarlo allo store
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  books: booksReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStore ha bisogno della struttura del nostro store/stato globale, come parametro principale (quindi un reducer)
export const store = configureStore({
  // reducer
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }) // può esserci solo un valore per reducer nello store
});

export const persistor = persistStore(store);
