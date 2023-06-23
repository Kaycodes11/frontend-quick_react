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
  // middlware is a function that allows to tap into a disapched action & change how it works [ https://read.reduxbook.com/markdown/part1/05-middleware-and-enhancers.html ]
  // getDefaultMiddleware is useful if you want to add some custom middleware via concat, but also still want to have the default middleware added as well:
  // like here the store will have all the default middleware plus "pokenmonApi.middleware"; arr = []; arr=[1] arr[2] arr.concat(arr1, arr2)
  // Adding the pokemonApi.middleware enables caching, invalidation, polling, & other useful features of `rtk-query
  // NOTE: To add a custom middleware fn to this store, just .concat(pokemonApi.middleware, rateLimiter, throttle, skipApi) & these middleware will intercept/
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // thunk: {extraArgument: myApiService},
      serializableCheck: false,
    }).concat(pokemonApi.middleware),

  devTools: process.env.NODE_ENV !== "production",

  // enhancers are high-order functions that take configureStore and return a new enhanced version of configureStore
  // since it can add some addional capabilites to store, therefore it can change how that store's reducers process data or dispatch behaves [ example: https://stackoverflow.com/questions/67118933/redux-enhancer-example ]
  // https://redux.js.org/usage/configuring-your-store#enhancersmonitorreducerjs
  // enhancers: [],
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
