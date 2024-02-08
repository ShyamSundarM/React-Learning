import { Action, configureStore } from "@reduxjs/toolkit";
import authSlice, { AuthStateType } from "./auth-slice";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { User } from "../context/app-context";
import CryptoJS from "crypto-js";
import dbConfigSlice, { DbConfigType } from "./db-config-slice";

const initialState = { count: 0 };
interface State {
  count: number;
}

const encrypt = createTransform(
  (inboundState: string, key) => {
    if (!inboundState) return inboundState;
    const cryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      "secret key 123"
    );

    return cryptedText.toString();
  },
  (outboundState: string, key) => {
    if (!outboundState) return outboundState;
    const bytes = CryptoJS.AES.decrypt(outboundState, "secret key 123");
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  }
);
const persistConfig: PersistConfig<AuthStateType, any, any, any> = {
  key: "root",
  storage,
  transforms: [encrypt],
};

const dbPersistConfig: PersistConfig<DbConfigType, any, any, any> = {
  key: "configs",
  storage,
  transforms: [encrypt],
};

const reducerFn = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
  }
  return state;
};
const store = configureStore({
  reducer: {
    //test: persistReducer(persistConfig, reducerFn),
    auth: persistReducer(persistConfig, authSlice.reducer),
    dbConfig: persistReducer(dbPersistConfig, dbConfigSlice.reducer),
  },
  middleware: (middleware) => middleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
