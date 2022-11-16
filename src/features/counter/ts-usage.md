<!-- https://redux-toolkit.js.org/usage/usage-with-typescript -->

```tsx
const increment = createAction<number, "increment">("increment");
const decrement = createAction<number, "decrement">("decrement");
createReducer(0, (builder) =>
  builder
    .addCase(increment, (state, action) => {
      // action is inferred correctly here
    })
    .addCase(decrement, (state, action: PayloadAction<string>) => {
      // this would error out
    })
);
```

```tsx
function isNumberValueAction(action: AnyAction): action is PayloadAction<{ value: number }> {
  return typeof action.payload.value === 'number';
}

createReducer({ value: 0 }, builder =>
   builder.addMatcher(isNumberValueAction, (state, action) => {
      state.value += action.payload.value
   })
});
```

```tsx
const slice = createSlice({
  name: "test",
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
  },
});
// now available:
slice.actions.increment(2);
// also available:
slice.caseReducers.increment(0, { type: "increment", payload: 5 });
```

```tsx
type State = number;
const increment: CaseReducer<State, PayloadAction<number>> = (state, action) =>
  state + action.payload;

createSlice({
  name: "test",
  initialState: 0,
  reducers: {
    increment,
  },
});
```

```tsx
/* # defining Action Contents with prepare Callbacks
to add a meta or error property to your action, or customize the payload of your action, 
you have to use the prepare notation.
Using this notation with TypeScript looks like this: */

const blogSlice = createSlice({
  name: "blogData",
  initialState,
  reducers: {
    receivedAll: {
      reducer(
        state,
        action: PayloadAction<Page[], string, { currentPage: number }>
      ) {
        state.all = action.payload;
        state.meta = action.meta;
      },
      prepare(payload: Page[], currentPage: number) {
        return { payload, meta: { currentPage } };
      },
    },
  },
});
```

```tsx
const slice = createSlice({
  name: "test",
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
  },
});

function myCustomMiddleware(action: Action) {
  if (slice.actions.increment.match(action)) {
    // `action` is narrowed down to the type `PayloadAction<number>` here. do something.
  }
}
```

```tsx
// type safety with extraReducers (when using createAsyncThunk or custom slice from elsewhere)
const fetchUserById = createAsyncThunk(
  "users/fetchById",
  // if you type your function argument here
  async (userId: number) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    return (await response.json()) as Returned;
  }
);

interface UsersState {
  entities: [];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  entities: [],
  loading: "idle",
} as UsersState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // fill in primary logic here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
  },
});
```

```tsx
// wrapping createSlice : making a generic reducer for re-usability (alos adding extra features)

interface GenericState<T> {
  data?: T;
  status: "loading" | "finished" | "error";
}

const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
  name = "",
  initialState,
  reducers,
}: {
  name: string;
  initialState: GenericState<T>;
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = "loading";
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload;
        state.status = "finished";
      },
      ...reducers,
    },
  });
};

const wrappedSlice = createGenericSlice({
  name: "test",
  initialState: { status: "loading" } as GenericState<string>,
  reducers: {
    magic(state) {
      state.status = "finished";
      state.data = "hocus pocus";
    },
  },
});
```

```tsx
// createAsyncThunk type
interface MyData {
  // ...
}

const fetchUserById = createAsyncThunk(
  "users/fetchById",
  // Declare the type your function argument here:
  async (userId: number) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    // Inferred return type: Promise<MyData>
    return (await response.json()) as MyData;
  }
);

// the parameter of `fetchUserById` is automatically inferred to `number` here
// and dispatching the resulting thunkAction will return a Promise of a correctly
// typed "fulfilled" or "rejected" action.
const lastReturnedAction = await store.dispatch(fetchUserById(3));
```

```tsx
// Typing the thunkApi Object

// here manually defining the "thunkApi" type

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: unknown;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};

const fetchUserById = createAsyncThunk<
  // Return type of the payload creator
  MyData,
  // First argument to the payload creator
  number,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: State;
    extra: {
      jwt: string;
    };
  }
>("users/fetchById", async (userId, thunkApi) => {
  const response = await fetch(`https://reqres.in/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
    },
  });
  return (await response.json()) as MyData;
});

interface MyKnownError {
  errorMessage: string;
  // ...
}
interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const updateUser = createAsyncThunk<
  // Return type of the payload creator
  MyData,
  // First argument to the payload creator
  UserAttributes,
  // Types for ThunkAPI
  {
    extra: {
      jwt: string;
    };
    rejectValue: MyKnownError;
  }
>("users/update", async (user, thunkApi) => {
  const { id, ...userData } = user;
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
    },
    body: JSON.stringify(userData),
  });
  if (response.status === 400) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue((await response.json()) as MyKnownError);
  }
  return (await response.json()) as MyData;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

// component usage

const handleUpdateUser = async (userData) => {
  const resultAction = await dispatch(updateUser(userData));
  if (updateUser.fulfilled.match(resultAction)) {
    const user = resultAction.payload;
    showToast("success", `Updated ${user.name}`);
  } else {
    if (resultAction.payload) {
      // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
      // Note: this would also be a good place to do any handling that relies on the `rejectedWithValue` payload, such as setting field errors
      showToast("error", `Update failed: ${resultAction.payload.errorMessage}`);
    } else {
      showToast("error", `Update failed: ${resultAction.error.message}`);
    }
  }
};
```

```tsx
// defining a pre-typed createAsyncThunk like this
const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();

// so  now use the createAppAsyncThunk rather than createAsyncThunk method
```
