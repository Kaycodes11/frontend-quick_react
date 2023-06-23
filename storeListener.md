# Listener is a "middleware function" that runs on based on dispatched actions or store changes, it gets dispatch and getState by default

# [ FURTHER READ: https://redux-toolkit.js.org/api/createListenerMiddleware]

```ts
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import todosReducer, { todoAdded, todoToggled, todoDeleted } from "../features/todos/todosSlice";

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

/* Listeners can be defined statically by calling listenerMiddleware.startListening() during setup,
or added & removed dynamically at runtime with special dispatch(addListener()) * dispatch(removeListener()) actions. */

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: todoAdded,
//   take:Cancels all other running instances of this same listener except for the one that made this call
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log("Todo added: ", action.payload.text);

    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    // Run async logic
    const data = await fetchData();

    // Pause until action dispatched or state changed
    if (await listenerApi.condition(matchSomeAction)) {
      // Use the listener API methods to dispatch, get state,
      // unsubscribe the listener, start child tasks, and more
      listenerApi.dispatch(todoAdded("Buy pet food"));

      // Spawn "child tasks" that can do more work and return results
      const task = listenerApi.fork(async (forkApi) => {
        // Can pause execution
        await forkApi.delay(5);
        // Complete the child by returning a value
        return 42;
      });

      const result = await task.result;
      // Unwrap the child result in the listener
      if (result.status === "ok") {
        // Logs the `42` result value that was returned
        console.log("Child succeeded: ", result.value);
      }
    }
  },
});

# When does the "Listener" run and based on what comparisons ?

/* You must provide exactly one of the four options for deciding when the listener will run: "type, actionCreator, matcher, or predicate". "Every time an action is dispatched", The "Listner" will check whether it should run based on one of following four ways  mentioned below
 */

// 1) Action type string
listenerMiddleware.startListening({ type: "todos/todoAdded", effect });
// 2) RTK action creator
listenerMiddleware.startListening({ actionCreator: todoAdded, effect });
// 3) RTK matcher function
listenerMiddleware.startListening({
  matcher: isAnyOf(todoAdded, todoToggled),
  effect,
});
// 4) Listener predicate
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    // return true when the listener should run
    /* predicate option actually allows matching solely against state-related checks, such as "did state.x change" or "the current value of state.x matches some criteria", regardless of the actual action. */
  },
  effect,
});

# Unsubscribe listener:

// 1) Action type string
listenerMiddleware.stopListening({
  type: 'todos/todoAdded',
  listener,
  cancelActive: true,
})
// 2) RTK action creator
listenerMiddleware.stopListening({ actionCreator: todoAdded, effect })
// 3) RTK matcher function
listenerMiddleware.stopListening({ matcher, effect, cancelActive: true })
// 4) Listener predicate
listenerMiddleware.stopListening({ predicate, effect })

# clearListeners::

const clearListeners = () => void;

# dispatch action with listern as below::

// Here, provide `predicate` or any of the other comparison options
const subscribe = store.dispatch(addListener({ predicate, effect })); // usual = dispatch(effect)

/* Returns true if the listener entry has been removed, false if no subscription matching the input provided has been found. */

const wasRemoved = store.dispatch(
  removeListener({ predicate, effect, cancelActive: true })
);

store.dispatch(clearAllListeners());


# TypeScript defination for listener::

import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './store'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>



# Store

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
```
