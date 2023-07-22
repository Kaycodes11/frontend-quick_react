import { all } from "redux-saga/effects";
import watchTodoSaga from "./features/todos/todos.saga";

export default function* rootSaga() {
  yield all([watchTodoSaga()]);
}
