```tsx
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

import todosReducer, {
  todoAdded,
  todoToggled,
  todoDeleted,
} from "../features/todos/todosSlice";

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: todoAdded,
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

```tsx
// # createListenerMiddleware

const createListenerMiddleware = (options?: CreateMiddlewareOptions) =>
  ListenerMiddlewareInstance;

interface CreateListenerMiddlewareOptions<ExtraArgument = unknown> {
  extra?: ExtraArgument;
  onError?: ListenerErrorHandler;
}

type ListenerErrorHandler = (
  error: unknown,
  errorInfo: ListenerErrorInfo
) => void;

interface ListenerErrorInfo {
  raisedBy: "effect" | "predicate";
}
```

```tsx
// # Listener Middleware Instance

interface ListenerMiddlewareInstance<
  State = unknown,
  Dispatch extends ThunkDispatch<State, unknown, AnyAction> = ThunkDispatch<
    State,
    unknown,
    AnyAction
  >,
  ExtraArgument = unknown
> {
  middleware: ListenerMiddleware<State, Dispatch, ExtraArgument>;
  startListening: (options: AddListenerOptions) => Unsubscribe;
  stopListening: (
    options: AddListenerOptions & UnsubscribeListenerOptions
  ) => boolean;
  clearListeners: () => void;
}
```

```tsx
// # startlistening

const startListening = (options: AddListenerOptions) => UnsubscribeListener;

interface AddListenerOptions {
  // Four options for deciding when the listener will run:

  // 1) Exact action type string match
  type?: string;

  // 2) Exact action type match based on the RTK action creator
  actionCreator?: ActionCreator;

  // 3) Match one of many actions using an RTK matcher
  matcher?: Matcher;

  // 4) Return true based on a combination of action + state
  predicate?: ListenerPredicate;

  // The actual callback to run when the action is matched
  effect: (action: Action, listenerApi: ListenerApi) => void | Promise<void>;
}

type ListenerPredicate<Action extends AnyAction, State> = (
  action: Action,
  currentState?: State,
  originalState?: State
) => boolean;

type UnsubscribeListener = (
  unsubscribeOptions?: UnsubscribeListenerOptions
) => void;

interface UnsubscribeListenerOptions {
  cancelActive?: true;
}

// These are all acceptable

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
  },
  effect,
});

// # stoplistening

const stopListening = (
  options: AddListenerOptions & UnsubscribeListenerOptions
) => boolean;

interface UnsubscribeListenerOptions {
  cancelActive?: true;
}

// Examples:
// 1) Action type string
listenerMiddleware.stopListening({
  type: "todos/todoAdded",
  listener,
  cancelActive: true,
});
// 2) RTK action creator
listenerMiddleware.stopListening({ actionCreator: todoAdded, effect });
// 3) RTK matcher function
listenerMiddleware.stopListening({ matcher, effect, cancelActive: true });
// 4) Listener predicate
listenerMiddleware.stopListening({ predicate, effect });


// Removes all current listener entries. It also cancels all active running instances of those listeners as well.
const clearListeners = () => void;

```

```tsx
// # Listener api

export interface ListenerEffectAPI<
  State,
  Dispatch extends ReduxDispatch<AnyAction>,
  ExtraArgument = unknown
> extends MiddlewareAPI<Dispatch, State> {
  // NOTE: MiddlewareAPI contains `dispatch` and `getState` already

  /**
   * Returns the store state as it existed when the action was originally dispatched, _before_ the reducers ran.
   * This function can **only** be invoked **synchronously**, it throws error otherwise.
   */
  getOriginalState: () => State;
  /**
   * Removes the listener entry from the middleware and prevent future instances of the listener from running.
   * It does **not** cancel any active instances.
   */
  unsubscribe(): void;
  /**
   * It will subscribe a listener if it was previously removed, noop otherwise.
   */
  subscribe(): void;
  /**
   * Returns a promise that resolves when the input predicate returns `true` or
   * rejects if the listener has been cancelled or is completed.
   *
   * The return value is `true` if the predicate succeeds or `false` if a timeout is provided and expires first.
   */
  condition: ConditionFunction<State>;
  /**
   * Returns a promise that resolves when the input predicate returns `true` or
   * rejects if the listener has been cancelled or is completed.
   *
   * The return value is the `[action, currentState, previousState]` combination that the predicate saw as arguments.
   *
   * The promise resolves to null if a timeout is provided and expires first.
   */
  take: TakePattern<State>;
  /**
   * Cancels all other running instances of this same listener except for the one that made this call.
   */
  cancelActiveListeners: () => void;
  /**
   * An abort signal whose `aborted` property is set to `true`
   * if the listener execution is either aborted or completed.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   */
  signal: AbortSignal;
  /**
   * Returns a promise that resolves after `timeoutMs` or
   * rejects if the listener has been cancelled or is completed.
   */
  delay(timeoutMs: number): Promise<void>;
  /**
   * Queues in the next microtask the execution of a task.
   */
  fork<T>(executor: ForkedTaskExecutor<T>): ForkedTask<T>;
  /**
   * Returns a promise that resolves when `waitFor` resolves or
   * rejects if the listener has been cancelled or is completed.
   * @param promise
   */
  pause<M>(promise: Promise<M>): Promise<M>;
  extra: ExtraArgument;
}
```
