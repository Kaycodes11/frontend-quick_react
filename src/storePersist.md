```ts
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [SetTransform],
  // blacklist any api made with RTK Query when using Redux-persist like below
  blacklist: [pokemonApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// To customize or modify the state object before it goes to be persisted & rehydrated in storage

/* As the state objects get persisted then serialized with JSON.stringify() so if any of state object is not mappeable to JSON object like if it has Set then it will become "{}" when serialized so transform & also do any other customization before the required state object gets pesisted into the mentioned storage (here localStorage which is by default for web) */

const SetTransform = createTransform(
  // transforming state before it goes to be serialized and persisted
  (inboundState, key) => {
    // convering mySet to an arry (since array is serializable)
    return { ...inboundState, mySet: [...inboundState.mySet] };
  },
  // transfsormed state being rehydrated
  (outboundState, key) => {
    // now convert mySet back to Set
    return { ...outboundState, mySet: new Set(outboundState.mySet) };
  },

  // define which reducer or reducers this "setTransform" should be called for
  { whiteList: ["someReducer"] }
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
```
