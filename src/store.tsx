import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { pokemonApi } from "./services/pokemon";
import { counterSlice } from "./features/counter/counterSlice";
import usersSlice from "./features/userSlice";
import booksSlice from "./features/book";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "./services/post";

// combineReducers takes/lists all the reducers as key-value pair
const rootReducer = combineReducers({
  // add the generated reducer as a specific top-level slice
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  counter: counterSlice.reducer,
  users: usersSlice.reducer,
  books: booksSlice.reducer,
});

// basically provide some data before (from server/local) to the required reducer keeping the same data shape

// const preloadedState = {
//     users: [
//         {
//             name: "james",
//             age: 11
//         },
//         {
//             name: "jones",
//             age: 14
//         },
//     ],
//     visibilityFilter: 'SHOW_COMPLETED',
// }
//
// const store = configureStore({
//     reducer: rootReducer,
//     devTools: process.env.NODE_ENV !== 'production',
//     preloadedState,
// })

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    // devTools: !process.env.REACT_APP_IS_PROD,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features from `rtk-query`
      getDefaultMiddleware().concat(pokemonApi.middleware, postApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// AppStore.dispatch(user.actions.setUserName(`john`))
// AppStore.dispatch(counter.actions.multiply(2))

// compose function build from left to right

// https://redux-toolkit.js.org/usage/usage-with-typescript
