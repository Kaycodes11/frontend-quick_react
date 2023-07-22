import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Status = "LOADING" | "SUCCESS" | "ERROR" | "IDLE";

export interface TodoState {
  todos: {
    id: string;
    userId: string;
    title: string;
    completed: boolean;
  }[];
  status: Status;
  isLoading?: boolean;
  error?: { message: string } | string;
}

// const ui: TodoState["status"] = {ui:"SUCCESS"}

const initialState: TodoState = {
  status: "IDLE",
  todos: [],
};

// won't be defining action here since it will be solely handle by the Redux Saga
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodosFetch: (state) => {
      state.status = "LOADING";
    },
    // PayloadAction<PayloadDataType, KeyType, MetaType, ErrorType>
    getTodosSuccess: (state, { payload }: PayloadAction<TodoState["todos"]>) => {
      state.status = "SUCCESS";
      state.todos = payload;
    },
    getTodosFail: (state) => {
      state.status = "ERROR";
      state.error = "TodoError: An Error occured when fetching all todos";
    },
  },
});

// now these can be directly as Redux Toolkit action works also could be used within saga to dispatch too
export const { getTodosFetch, getTodosSuccess, getTodosFail } = todosSlice.actions;

export default todosSlice.reducer;
