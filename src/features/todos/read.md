# spawning a new task vs spawing a new saga

```ts
// Worker Task or Saga: if fork() used then it's to create new "Worker Threads" / "Worker Saga"
export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.url);
    yield put({ type: "FETCH_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}

// Watcher Saga
function* watchFetchTodos() {
  // now for every request saga helper "takeEvery" will "spawn a new task"
  yield takeEvery("FETCH_TODOS", fetchTodos);
}

// # Watcher Saga for multiple sagas
export default function* rootSaga() {
  // so, if multiple actions dispatched e.g. "FETCH_USERS" that'll spawn new saga for each dispatch
  yield takeEvery("FETCH_USERS", fetchUsers);
  yield takeEvery("CREATE_USER", createUser);
}
```

# put() could be used to dispatch to store or to other "Worker Sagas" or "channel"

# Here , Redux Saga mimic Thunk Api

```ts
import { call, put, takeEvery } from "redux-saga/effects";
import Api from "./path/to/api";

export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.url);
    yield put({ type: "FETCH_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}

// so everytime "FETCH_REQUESTED" dispatched; it'll go to fetchData & do everything within fetchData

/* takeEvery() allows multiple fetchData instances to be started concurrently. At a given moment, we can start a new fetchData task while there are still one or more previous fetchData tasks which have not yet terminated. */
function* watchFetchData() {
  yield takeEvery("FETCH_REQUESTED", fetchData);
}

[NOTE]: When the action dispatched, spawning a new tasks or tasks mean `to run the Worker saga` once or multiple time based on the instruction from its `Watcher Saga` through the `saga helpers`.

/* If we want to only get the response of the latest request fired (e.g. to always display the latest version of data) we can use the `takeLatest` */

/*
Unlike takeEvery, takeLatest allows only one fetchData task to run at any moment. And it will be the latest started task. If a previous task is still running when another fetchData task is started, the previous task will be automatically cancelled.
*/

function* watchFetchData() {
  yield takeEvery("FETCH_REQUESTED", fetchData);
}

// Watcher Sage: Here it is watching multiple sagas

export default function* rootSaga() {
  // so wherever rootSaga intialized/invokded; it won't run below yield statements: it'll be {<suspended>}
  // now, when "FETCH_USERS" action dispatched; it'll only run that : it won't go next yield & execute it
  yield takeEvery("FETCH_USERS", fetchUsers);
  yield takeEvery("CREATE_USER", createUser);
}
```

# To queue the async side effects of the dispatched actions; "use actionChannel"

```ts

// so, if four action dispatched (same or different actions); then do first, when first done, start second

import { take, actionChannel, call, ... } from 'redux-saga/effects'

// Watcher Saga
function* watchRequests() {
  // 1- Create a channel `for all the incoming dispatched actions` on "REQUEST"
  // [NOTE]: actionChannel buffers requests if saga is not ready ( blocked via call method() from prev )

  // by default `actionChannel` buffers all incoming messages from all requests, to limit to 5
  // NOTE: event channel (e.g. actionChannel) emits a message whenever a request is received
  const requestChan = yield actionChannel('REQUEST', buffers.sliding(5)); // only most recent five items

  const requestChan = yield actionChannel('REQUEST'); // default without any limit
  /*
  [Suppose if there are two requests at the same time on this dispatched action i.e. "REQUEST" ]

  FIRST ("REQUEST"): so it enter while loop, do whatever in it, then pauses
  SECOND ("REQUEST"): as the next request comes to requestChan; loop runs again then pauses
*/

  while (true) {
    // 2- take from the channel : take() used to refer specific actions & (here i.e. specific channel)
    // [NOTE]: take() will block until a message is available from channel for the current request ↓

    // [when and how loop stops]: so, if there's no current request take() won't run, thus loop will exit

    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call: until whatever call invokes not done, it'll be blocked

    /* [NOTE]: The important thing to note is how we're using a blocking call. The Saga will remain blocked until call(handleRequest) returns. But meanwhile, if other REQUEST actions are dispatched while the Saga is still blocked, they will queued internally by requestChan. When the Saga resumes from call(handleRequest) and executes the next yield take(requestChan), the take will resolve with the queued message. */

    yield call(handleRequest, payload)
  }
}

// Working Saga
function* handleRequest(payload) {
    yield takeEvery("REQUEST", watchRequests);
 }

```

# eventChannel is a factory function that makes a channels but for `events outside of Redux store`

```ts
import { eventChannel, END } from "redux-saga";

function countdown(secs) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        // this causes the channel to close
        emitter(END);
      }
    }, 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}

export function* saga() {
  // untill call done with whatever it is invoked with; it will be blocked;
  const chan = yield call(countdown, value);
  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      let seconds = yield take(chan);
      console.log(`countdown: ${seconds}`);
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
      console.log("countdown cancelled");
    } else {
      console.log("countdown terminated");
    }
  }
}
// An example with socket.io

import { take, put, call, apply, delay } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { createWebSocketConnection } from "./socketConnection";

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel((emit) => {
    const pingHandler = (event) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event.payload);
    };

    const errorHandler = (errorEvent) => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason));
    };

    // setup the subscription
    socket.on("ping", pingHandler);
    socket.on("error", errorHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off("ping", pingHandler);
    };

    return unsubscribe;
  });
}

// reply with a `pong` message by invoking `socket.emit('pong')`
function* pong(socket) {
  yield delay(5000);
  yield apply(socket, socket.emit, ["pong"]); // call `emit` as a method with `socket` as context
}

export function* watchOnPings() {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      const payload = yield take(socketChannel);
      yield put({ type: INCOMING_PONG_PAYLOAD, payload });
      yield fork(pong, socket);
    } catch (err) {
      console.error("socket error:", err);
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      // socketChannel.close()
    }
  }
}
// eventChannel is not buffered by default, manage buffer -> https://redux-saga.js.org/docs/api#buffers
```

# Using channels to communicate between Sagas​

```ts
// To handle multiple requests simultaneously without limit on the number of worker tasks executing concurrently. Then, we used the actionChannel effect to limit the concurrency to one task at a time

import { take, fork, ... } from 'redux-saga/effects'

function* watchRequests() {
  while (true) {
    const {payload} = yield take('REQUEST');
    /* as the n e.g. 4 request comes fork() will be spawing that many taks & executing concurrently (here no of. request can't be limited) unlike activeChannels */

    // not one by one like activeChannels or how actionChannel event allows to limit no. of requests

    yield fork(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }

/* [Requirement]: maximum of three tasks executing at the same time; if there are less than three tasks executing, we process the request immediately, otherwise we queue the task and wait for one of the three slots to become free. */

import { channel } from 'redux-saga'
import { take, fork } from 'redux-saga/effects'

// Watcher Saga
function* watchRequests() {
  /* create a channel to queue incoming requests: as requests're received their coresponding messages're buffered by default when using `channel method` */
  const chan = yield call(channel);



  // create 3 worker 'threads': here fork() creates three new "Worker Sagas" or "Worker Threads"

  /* and now all forked sagas have access to the "channel" */
  for (var i = 0; i < 3; i++) {
    yield fork(handleRequest, chan);
  }

  /*
  1. watchRequests will use this channel to dispatch work to the three worker sagas.
  2. On each `REQUEST` action the Saga will put the payload on the channel.
  3. The payload will then be taken by any free worker.
  4. Otherwise it will be queued by the channel until a worker Saga is ready to take it.
  */
  while (true) {
    const {payload} = yield take('REQUEST'); // here just taking requst for specific "REQUEST"
    yield put(chan, payload);
  }
}

// Worker Saga : put() could be used to dispatch to store or to other "Worker Sagas"

/*
[ How does "Worker Saga or Worker thread" achieve concurrency on multiple requests ? ]
0. first, create channel to queue all the incoming requests (request received -> emit message -> message buffered and it repeats for all the other subsequent requests [regardless of how many])

1. All the three workers run a typical while loop.


2. On each iteration, "a worker will take the next request", or "will block until a message is available from the next request". Now, if there's no message from next request it will stop loop and exit.

[Note]: this mechanism provides an automatic load-balancing between the 3 workers. Rapid workers are not slowed down by slow workers.
*/
function* handleRequest(chan) {
  while (true) {
    const payload = yield take(chan)
    // process the request
  }
}
```

# Using the multicastChannel to communicate with different workers

```ts
// What if we needed to put an action to a channel and have several different workers consuming it?
// [Usage]: when needed get different data on the same disaptched action then `multicastChannel`

import { multicastChannel } from "redux-saga";
import { take, fork, call, put } from "redux-saga/effects";

function* watchRequests() {
  // create a multicastChannel to queue incoming requests
  const channel = yield call(multicastChannel);

  // forking two different workers
  yield fork(logWorker, channel); // two diffrente worker sagas for the same action "REQUEST"
  yield fork(mainWorker, channel); // two diffrente worker sagas for the same action "REQUEST"

  while (true) {
    const { payload } = yield take("REQUEST");
    yield put(channel, payload);
  }
}

function* logWorker(channel) {
  while (true) {
    // Pattern '*' for simplicity
    const payload = yield take(channel, "*");
    // Log the request somewhere..
    console.log("logWorker:", payload);
  }
}

function* mainWorker(channel) {
  while (true) {
    // Pattern '*' for simplicity
    const payload = yield take(channel, "*");
    // Process the request
    console.log("mainWorker", payload);
  }
}
```

# composing sagas

```ts

function* fetchPosts() {
  yield put(actions.requestPosts())
  const products = yield call(fetchApi, '/products')
  yield put(actions.receivePosts(products))
}

function* watchFetch() {
  while (yield take('FETCH_POSTS')) {
    yield call(fetchPosts) // waits for the fetchPosts task to terminate: this is just a fn (not worker)
  }
  // or
  while (true) {
    const {payload} = yield take('FETCH_POSTS');
    yield call(fetchPosts) // waits for the fetchPosts task to terminate: this is just a fn (not worker)
  }
}


// # Yielding to an array of nested generators will start all the sub-generators in parallel, wait for them to finish, then resume with all the results
function* mainSaga(getState) {
  const results = yield all([call(task1), call(task2), ...])
  yield put(showResults(results))
}

// For example, you may want the user to finish some game in a limited amount of time:
function* game(getState) {
  let finished
  while (!finished) {
    // has to finish in 60 seconds
    const {score, timeout} = yield race({
      score: call(play, getState),
      timeout: delay(60000)
    })

    if (!timeout) {
      finished = true
      yield put(showScore(score))
    }
  }
}

```

# Fork Model

```ts
// # Attached Forks

import { fork, call, put, delay } from "redux-saga/effects";
import api from "./somewhere/api"; // app specific
import { receiveData } from "./somewhere/actions"; // app specific

// Worker Task terminated when it is done
function* fetchAll() {
  // before with just fork
  const task1 = yield fork(fetchResource, "users");
  const task2 = yield fork(fetchResource, "comments");
  yield delay(1000);

  // attached fork: executes all tasks parallelly via all()
  yield all([call(fetchResource, "users"), call(fetchResource, "comments"), delay(1000)]);

  /* In fact, attached forks share the same semantics with the parallel Effect:
    1. We're executing tasks in parallel
    2. The parent (yield call from fetchResource below) will terminate after all launched tasks terminate

  # Occured Error in attached fork is like Promise.all(): if one fails so is the others

  So for example if call(fetchResource, 'users') raises an uncaught error, the parallel Effect will cancel the 2 other tasks (if they are still pending) then aborts itself with the same error from the failed call.  
*/
}

function* fetchResource(resource) {
  /*  
  call(fetchAll) will terminate after:
  
  The fetchAll body itself terminates, this means all 3 effects are performed. Since fork effects are non blocking, the task will block on delay(1000).
  
  The 2 forked tasks terminate, i.e. after fetching the required resources
  
  So the whole task will block until a delay of 1000 millisecond passed and both task1 and task2 finished their business.

  Say for example, the delay of 1000 milliseconds elapsed and the 2 tasks haven't yet finished, then fetchAll will still wait for all forked tasks to finish before terminating the whole task.

  solution: fetchAll saga could be rewritten using the parallel Effect
*/
  const { data } = yield call(api.fetch, resource);
  yield put(receiveData(data));
}

function* main() {
  try {
    yield call(fetchAll);
  } catch (error: any) {
    // handle fetchAll errors here
  }
}
```

# Racing Effects

```ts
import { race, take, call } from 'redux-saga/effects'

// # fetch an api with time limit: loser resonsese are automatically cancelled

import { race, call, put, delay } from 'redux-saga/effects'

function* fetchPostsWithTimeout() {
  const {posts, timeout} = yield race({
    posts: call(fetchApi, '/posts'),
    timeout: delay(1000)
  })

  if (posts)
    yield put({type: 'POSTS_RECEIVED', posts})
  else
    yield put({type: 'TIMEOUT_ERROR'})
}

// # There're 2 UI buttons, while "START_BACKGROUND_TASK" working, cancel it by dispatching "CANCEL_TASK"
function* backgroundTask() {
  while (true) { ... }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
```

# Task cancelation

```ts
import { take, put, call, fork, cancel, cancelled, delay } from "redux-saga/effects";
import { someApi, actions } from "somewhere";

function* bgSync() {
  try {
    while (true) {
      yield put(actions.requestStart());
      const result = yield call(someApi);
      yield put(actions.requestSuccess(result));
      yield delay(5000);
    }
  } finally {
    if (yield cancelled()) yield put(actions.requestFailure("Sync cancelled!"));
  }
}

function* main() {
  while (yield take("START_BACKGROUND_SYNC")) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync);

    // wait for the user stop action to be dispatched i.e. "STOP_BACKGROUND_SYNC"
    yield take("STOP_BACKGROUND_SYNC");
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask);
  }
}
```

[Further read as needed]: https://redux-saga.js.org/docs/api/