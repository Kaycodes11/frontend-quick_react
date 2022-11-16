import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import counterReducer from "./features/counter/counterSlice";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/products/productSlice";
import { pokemonApi } from "./services/pokemon";

// configureStore method sets up "thunk middleware by default"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, & other useful features of `rtk-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
// this is the way to get "state type" from store
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// this is the way to get "dispatch type" from store
export type AppDispatch = typeof store.dispatch;

// This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.
