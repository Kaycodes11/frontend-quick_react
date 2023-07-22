import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import createSagaMiddleware from "redux-saga";
import TodoReducer from "./features/todos/todos.slice";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import rootSaga from "./rootSaga";

// # how to setup redux toolkit + redux saga (with typescript): https://stackoverflow.com/questions/70793812/how-to-configure-redux-sagas-with-redux-toolkit-and-typescript

const sageMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { todos: TodoReducer },
  // or, just middleware: [saga]
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // to exlucde a middleware e.g. Thunk; just assign false value: https://redux-toolkit.js.org/api/getDefaultMiddleware#api-reference
      thunk: false,
      serializableCheck: false,
    })
      // .prepend(TypedMiddleware,  untypedMiddleware as Middleware<(action: Action<'specialAction'>) => number, RootState>)
      .concat(sageMiddleware),

  // correctly typed middleware can be be directly used like here e.g. TypedMiddleware, for untypedMiddleware: type must be enforced

  // devTools: process.env.NODE_ENV !== "production",
});

// initialize saga
sageMiddleware.run(rootSaga)

// optional, but required for refetchOnFocus/refetchOnReconnect
// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself as below:

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* Rather than importing `type RootState` for `useSelector()` & `type AppDispatch` for `useDispatch` again & again 
 within components (thus repeating), better to make the "typed version of useSelector & useDispatch" */

// that's what done here, now use these throughout the app instead of plain `useDispatch` & `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
