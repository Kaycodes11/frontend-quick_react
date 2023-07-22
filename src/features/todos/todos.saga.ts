import { call, put, takeEvery } from "redux-saga/effects";
import { getTodosSuccess, getTodosFail } from "./todos.slice";

function fetchTodos() {
  return fetch("https://jsonplaceholder.typicode.com/todos");
}

// Worker task or Worker saga: (take action or actions here as needed & dispatch to reducer via put)
function* workGetTodosFetch() {
  try {
    // @ts-expect-error https://stackoverflow.com/questions/66922379/yield-expression-implicitly-results-in-an-any-type-because-its-containing-ge
    const todos = yield call(fetchTodos);
    // @ts-expect-error basically ts here infert type `any` for todos and todosResult thus this ts-error
    const todosResult = yield todos.json();
    const limitedTodos =
      todosResult.length && Array.isArray(todosResult) && todosResult.slice(0, 10);
    yield put(getTodosSuccess(limitedTodos));
  } catch (error: any) {
    yield put(getTodosFail());
  }
}

// Watcher Saga
function* watchTodoSaga() {
  yield takeEvery("todos/getTodosFetch", workGetTodosFetch);
}

export default watchTodoSaga;
