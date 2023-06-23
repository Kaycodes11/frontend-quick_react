# [REFERENCE]: https://redux-toolkit.js.org/usage/usage-with-typescript
# [REFERENCE]: https://redux-toolkit.js.org/rtk-query/usage-with-typescript

# [ READ ]: https://redux.js.org/tutorials/fundamentals/part-6-async-logic

# [ READ]: https://redux.js.org/usage/structuring-reducers/normalizing-state-shape

# [ READ ]: https://redux-toolkit.js.org/api/createSelector (memoize the state values)

# [ READ ]: https://redux-toolkit.js.org/api/matching-utilities

## isAllOf - returns true when all of the conditions are met, takes Action, Slice, AsyncThunk

it will return a type guard function that return true if all of the provided functions match

## isAnyOf - returns true when any of the condtions met: behaves same way as "isAllOf"

<b>isAsyncThunkAction<b> - accepts one or more action creators and returns true when all match
isPending - accepts one or more action creators and returns true when all match
isFulfilled - accepts one or more action creators and returns true when all match
isRejected - accepts one or more action creators and returns true when all match
isRejectedWithValue - accepts one or more action creators and returns true when all match

```ts

# This is the example without matching utility::

import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Data {
  isInteresting: boolean;
  isSpecial: boolean;
}

interface Special extends Data {
  isSpecial: true;
}

interface Interesting extends Data {
  isInteresting: true;
}

// this takes action as parameter and return boolean
function isSpecial(action: PayloadAction<Data>): action is PayloadAction<Special> {
  return action.payload.isSpecial;
}
// this takes action as parameter and return boolean
function isInteresting(action: PayloadAction<Data>): action is PayloadAction<Interesting> {
  return action.payload.isInteresting;
}

interface ExampleState {
  isSpecial: boolean;
  isInteresting: boolean;
}

const initialState = {
  isSpecial: false,
  isInteresting: false,
} as ExampleState;

export const isSpecialAndInterestingThunk = createAsyncThunk("isSpecialAndInterestingThunk", () => {
  return {
    isSpecial: true,
    isInteresting: true,
  };
});

// This has unnecessary complexity
const loadingReducer = createReducer(initialState, (builder) => {
  builder.addCase(isSpecialAndInterestingThunk.fulfilled, (state, action) => {
    if (isSpecial(action)) {
      state.isSpecial = true;
    }
    if (isInteresting(action)) {
      state.isInteresting = true;
    }
  });
});

# Refactoring the same with isAllOf()

import { createReducer, isAllOf } from '@reduxjs/toolkit'
import {
  isSpecialAndInterestingThunk,
  initialState,
  isSpecial,
  isInteresting,
} from '@virtual/matchers' // This is a fake pkg that provides the types shown above
import type { Data } from '@virtual/matchers' // This is a fake pkg that provides the types shown above

const loadingReducer = createReducer(initialState, (builder) => {
    /* here isSpecialAndInterestingThunk.fulfilled returns isSpecial whose value is true thus no need to check with if before assigning state.isSpecial = true; if it is false it won't assign value */
  builder
    .addMatcher(
      isAllOf(isSpecialAndInterestingThunk.fulfilled, isSpecial),
      (state, action) => {
        state.isSpecial = true
      }
    )
    .addMatcher(
      isAllOf(isSpecialAndInterestingThunk.fulfilled, isInteresting),
      (state, action) => {
        state.isInteresting = true
      }
    )
});

#  Using isAllOf matchers as a TypeScript Type guard

import { isAllOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { isSpecial, isInteresting } from '@virtual/matchers' // This is a fake pkg that provides the types shown above
import type { Data } from '@virtual/matchers' // This is a fake pkg that provides the types shown above

const isSpecialAndInteresting = isAllOf(isSpecial, isInteresting);

function someFunction(action: PayloadAction<Data>) {
  if (isSpecialAndInteresting(action)) {
    // "action" will be correctly typed as: `PayloadAction<Special> & PayloadAction<Interesting>`
  }
}

#  Using isAnyOf matchers as a TypeScript Type guard

import { isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Data, isSpecial, isInteresting } from '@virtual/matchers' // this is a fake pkg that provides the types shown above

const isSpecialOrInteresting = isAnyOf(isSpecial, isInteresting)

function someFunction(action: PayloadAction<Data>) {
  if (isSpecialOrInteresting(action)) {
    // "action" will be correctly typed as:
    // `PayloadAction<Special> | PayloadAction<Interesting>`
  }
}

# practical example: https://codesandbox.io/s/redux-toolkit-matchers-example-e765q

```
