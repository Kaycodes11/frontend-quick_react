```tsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

interface ThunkAPI {
dispatch: Function
getState: Function
extra?: any
requestId: string
signal: AbortSignal
}

// First, create the thunk
 const fetchUserById = createAsyncThunk(
 'users/fetchByIdStatus',
 async (userId, thunkAPI) => {
 const response = await userAPI.fetchById(userId)
 return response.data
 }
 )

// Then, handle actions in your reducers:
 const usersSlice = createSlice({
 name: 'users',
 initialState: { entities: [], loading: 'idle' },
 reducers: {
  // standard reducer logic, with auto-generated action types per reducer
 },
 extraReducers: (builder) => {
 // Add reducers for additional action types here, and handle loading state as needed
 builder.addCase(fetchUserById.fulfilled, (state, action) => {
 // Add user to the state array
 state.entities.push(action.payload)
 })
 },
 })


 // Later, dispatch the thunk as needed in the app
//  dispatch(fetchUserById(123))

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
