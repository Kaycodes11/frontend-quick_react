```tsx
// file: todos/todosReducer.ts noEmit
import type { Reducer } from "@reduxjs/toolkit";
declare const reducer: Reducer<{}>;
export default reducer;

// file: visibility/visibilityReducer.ts noEmit
import type { Reducer } from "@reduxjs/toolkit";
declare const reducer: Reducer<{}>;
export default reducer;

// file: store.ts
import { configureStore } from "@reduxjs/toolkit";

// We'll use redux-logger just as an example of adding another middleware
import logger from "redux-logger";

// And use redux-batched-subscribe as an example of adding enhancers
import { batchedSubscribe } from "redux-batched-subscribe";

import todosReducer from "./todos/todosReducer";
import visibilityReducer from "./visibility/visibilityReducer";

const reducer = {
  todos: todosReducer,
  visibility: visibilityReducer,
};

const preloadedState = {
  todos: [
    {
      text: "Eat food",
      completed: true,
    },
    {
      text: "Exercise",
      completed: false,
    },
  ],
  visibilityFilter: "SHOW_COMPLETED",
};

const debounceNotify = _.debounce((notify) => notify());

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: [batchedSubscribe(debounceNotify)],
});

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batched subscribe, and devtools enhancers were composed together
```
