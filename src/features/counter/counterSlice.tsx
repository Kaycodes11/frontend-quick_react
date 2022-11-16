import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../store";

export type CounterState = {
  value: number;
};

// const initialState: CounterState = { value: 0 };

const initialState = { value: 0 } as CounterState;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

// manual thunk (sync / async), here conditionaly dispatching based on current state

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const incrementIfOddNo =
  (value: number) => (dispatch: AppDispatch, getState: RootState) => {
    const currentValue = selectCount(getState);
    console.log(currentValue);
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(value));
    }
  };

export default counterSlice.reducer;
