```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

interface ThunkAPI {
dispatch: Function
getState: Function
extra?: any
requestId: string
signal: AbortSignal
}

// create the thunk as below & to disallow thunk from using the given payload  use condition

 const fetchUserById = createAsyncThunk(
 'users/fetchByIdStatus',
 async (userId, thunkAPI) => {
 const response = await userAPI.fetchById(userId)
 return response.data
 },
 /* to cancel the execution just return false or a Promise that should resoslve to false as the condition return false then thunk won't dispatch any action at all but if still wants to dispatch an action when thunk was canclled via condition then {condition, dispatchConditionRejection: true } */
 condition: (userId, {getState, extra}) => {
  const { users } = getState()
      const fetchStatus = users.requests[userId]
      if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
 }
 );

 const updateUser = createAsyncThunk(
  'users/update',
  async (userData, { rejectWithValue }) => {
    const { id, ...fields } = userData
    try {
      const response = await userAPI.updateById(id, fields)
      return response.data.user
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data)
    }
  }
);

// Then, handle actions in your reducers:
 const usersSlice = createSlice({
 name: 'users',
 initialState: { entities: [], loading: 'idle' },
 reducers: {
  // standard reducer logic, with auto-generated action types per reducer
  userPrepare: {
    reducer(state, action) {
      // after getting the payload modify it as needed
      const {todoId, color} = action.payload;
      state.entities[todoId].color = color;
    },
    prepare(todoId, color) {
      // this is strictly used to modify or customize payload
      return {
        payload: { todoId, color }
      }
    }

  }
 },
 extraReducers: (builder) => {
 // Add reducers for additional action types here, and handle loading state as needed
 builder.addCase(fetchUserById.fulfilled, (state, action) => {
 // Add user to the state array
 state.entities.push(action.payload)
 })
 },
 })


 // Later, dispatch the thunk as needed in the app as dispatch(fetchUserById(123))

# ignore these non-serializable data / state

configureStore({
  //...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
```

```ts
# Real Example: Canceling While Running

// file: store.ts noEmit
import { configureStore } from '@reduxjs/toolkit'
import type { Reducer } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

declare const reducer: Reducer<{}>
const store = configureStore({ reducer })
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

// file: slice.ts noEmit
import { createAsyncThunk } from '@reduxjs/toolkit'
export const fetchUserById = createAsyncThunk(
  'fetchUserById',
  (userId: string) => {
    /* ... */
  }
)

// file: MyComponent.ts
import { fetchUserById } from './slice'
import { useAppDispatch } from './store'
import React from 'react'

function MyComponent(props: { userId: string }) {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    // Dispatching the thunk returns a promise
    const promise = dispatch(fetchUserById(props.userId))
    return () => {
      // `createAsyncThunk` attaches an `abort()` method to the promise
      promise.abort()
    }
  }, [props.userId])
}

# within the action creator file check cacnellation status::

import { createAsyncThunk } from '@reduxjs/toolkit'

const readStream = createAsyncThunk(
  'readStream',
  async (stream: ReadableStream, { signal }) => {
    const reader = stream.getReader()

    let done = false
    let result = ''

    while (!done) {
      if (signal.aborted) {
        throw new Error('stop the work, this has been aborted!')
      }
      const read = await reader.read()
      result += read.value
      done = read.done
    }
    return result
  }
);

# Listening for Abort Events::

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: string, { signal }) => {
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    const response = await axios.get(`https://reqres.in/api/users/${userId}`, {
      cancelToken: source.token,
    })
    return response.data
  }
);

# checking if a Promise Rejection was from an Error or Cancellation

If it was cancelled before execution, meta.condition will be true.
If it was aborted while running, meta.aborted will be true.
If neither of those is true, the thunk was not cancelled, it was simply rejected, either by a Promise rejection or rejectWithValue.
If the thunk was not rejected, both meta.aborted and meta.condition will be undefined.

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI, User } from './userAPI'

const fetchUserById = createAsyncThunk<User, string, {
    state: { users: { loading: string, currentRequestId: string } }
}> (  
  'users/fetchByIdStatus',
  async (userId: string, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().users
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return
    }
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.entities.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = undefined
        }
      })
  },
})

const UsersComponent = () => {
  const { entities, loading, error } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const fetchOneUser = async (userId) => {
    try {
      const user = await dispatch(fetchUserById(userId)).unwrap()
      showToast('success', `Fetched ${user.name}`)
    } catch (err) {
      showToast('error', `Fetch failed: ${err.message}`)
    }
  }

  // render UI here
};


// file: store.ts noEmit
import { configureStore } from '@reduxjs/toolkit'
import type { Reducer } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import usersReducer from './user/slice'

const store = configureStore({ reducer: { users: usersReducer } })
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>

// file: user/userAPI.ts noEmit

export declare const userAPI: {
  updateById<Response>(id: string, fields: {}): { data: Response }
}

// file: user/slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'
import type { AxiosError } from 'axios'

// Sample types that will be used
export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

interface UpdateUserResponse {
  user: User
  success: boolean
}

export const updateUser = createAsyncThunk<
  User,
  { id: string } & Partial<User>,
  {
    rejectValue: ValidationErrors
  }
>('users/update', async (userData, { rejectWithValue }) => {
  try {
    const { id, ...fields } = userData
    const response = await userAPI.updateById<UpdateUserResponse>(id, fields)
    return response.data.user
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data)
  }
})

interface UsersState {
  error: string | null | undefined
  entities: Record<string, User>
}

const initialState = {
  entities: {},
  error: null,
} as UsersState

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error.message
      }
    })
  },
})

export default usersSlice.reducer

// file: externalModules.d.ts noEmit

declare module 'some-toast-library' {
  export function showToast(type: string, message: string)
}

// file: user/UsersComponent.ts

import React from 'react'
import { useAppDispatch } from '../store'
import type { RootState } from '../store'
import { useSelector } from 'react-redux'
import { updateUser } from './slice'
import type { User } from './slice'
import type { FormikHelpers } from 'formik'
import { showToast } from 'some-toast-library'

interface FormValues extends Omit<User, 'id'> {}

const UsersComponent = (props: { id: string }) => {
  const { entities, error } = useSelector((state: RootState) => state.users)
  const dispatch = useAppDispatch()

  // This is an example of an onSubmit handler using Formik meant to demonstrate accessing the payload of the rejected action
  const handleUpdateUser = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const resultAction = await dispatch(updateUser({ id: props.id, ...values }))
    if (updateUser.fulfilled.match(resultAction)) {
      // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
      const user = resultAction.payload
      showToast('success', `Updated ${user.first_name} ${user.last_name}`)
    } else {
      if (resultAction.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, those types will be available here.
        formikHelpers.setErrors(resultAction.payload.field_errors)
      } else {
        showToast('error', `Update failed: ${resultAction.error}`)
      }
    }
  }

  // render UI here
}




```

# REFERENCE: https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/checkpoint-9-createSlice/?from-embed
