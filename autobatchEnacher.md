// [Resource] : https://redux-toolkit.js.org/api/autoBatchEnhancer#basic-usage
/_ A reudx store enahancer that looks for one or more "low priority" dispatched actions & queues a callback to run subscriber notifications on a delay. It then notifies subscribers either when the queued callback runs, or "when the next "normal-priority" action is dispatched", whichever is first. _/

```ts
import {
  createSlice,
  configureStore,
  autoBatchEnhancer,
  prepareAutoBatched,
} from "@reduxjs/toolkit";

interface Todo {
  title: string;
  done: boolean;
}

// Here accepts a payload value, & returns an object with {payload, meta: {[SHOULD_AUTOBATCH]: true}}
// [SHOULD_AUTOBATCH]: true} = "low priority"
const ToodSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        state.push(action.payload);
      },
      prepare: prepareAutoBatched<Todo>(),
    },
  },
});

interface CounterState {
  value: number;
}

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 } as CounterState,
  reducers: {
    incrementBatched: {
      // Batched, low-priority
      reducer(state) {
        state.value += 1;
      },
      // Invoke the `prepareAutoBatched` utility to automatically add the `action.meta[SHOULD_AUTOBATCH]` field the enhancer needs
      prepare: prepareAutoBatched<void>(),
    },
    // Not batched, normal priority
    decrementUnbatched(state) {
      state.value -= 1;
    },
  },
});

const { incrementBatched, decrementUnbatched } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
  enhancers: (existingEnhancers) => {
    // Add the autobatch enhancer to the store setup
    return existingEnhancers.concat(autoBatchEnhancer());
  },
});
```
