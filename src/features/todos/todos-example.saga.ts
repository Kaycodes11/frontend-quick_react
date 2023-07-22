import { put, call } from "redux-saga/effects";

/*
rather than using store's dispatch, create a plain JavaScript object to instruct the middleware that we
need to dispatch some action, and then let middleware perform the real dispatch. it helps to test.

[How to perform testing on dispatched action]: https://redux-saga.js.org/docs/basics/DispatchingActions


# Saga helpers: To spawn a new task/tasks via prvided helper methods by saga when some specific action dispatched
[Explain]: When some specific actions dispatched, saga provides some helper methods to spawn a new task or tasks (i.e. to run yield again once or multiple times)



*/

// this fetchProductsApi returns a promise
function fetchProductsApi() {
  return fetch("https://jsonplaceholder.typicode.com/todos/4")
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi);
  if (response) yield put({ type: "PRODUCTS_RECEIVED", products: response });
  else yield put({ type: "PRODUCTS_REQUEST_FAILED", error });
}

function* fetchTodos() {
  try {
    // const todos = yield.call(Api.fetch, "/products")
    // now as said rather using store's dispatch, let saga's put() handle it: put() will create & yield a dispatch effect
    // yield put({type: 'FETCH_TODOS', todos})
  } catch (error) {
    yield put({ type: "FETCH_TODOS_ERROR_OCCURED", error });
  }
}
