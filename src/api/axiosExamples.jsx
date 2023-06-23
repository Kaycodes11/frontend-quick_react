import axios from "axios";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com"; // or do this with create method()

// axios instace
const base = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

async function getTodos() {
  const controller = new AbortController();
  try {
    const result = await base.get("/todos", { signal: controller.signal });
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("The api request has cancelled");
    } else {
      console.error(error.message);
    }
  }
}

// on useEffect's cleanup just : return () => controller.abort();

async function axiosPut(apiURL) {
  const controller = new AbortController();

  try {
    // prettier-ignore
    const headers = {
        'Authorization': 'Bearer-token',
        'My-Custom-Header': 'foobar'
    };
    const userId = 1;
    const response = await axios.put(apiURL, userId, {
      // https://axios-http.com/docs/req_config (these are only avaiable to put, post and delete)
      signal: controller.signal,
    });
  } catch (error) {
    console.error(error.message);
  }
}

base.interceptors.request.use(
  (request) => {
    // do what needed here like adding the token
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

base.interceptors.response.use(
  (response) => {
    console.log("got response");
    return response;
  },
  (error) => {
    console.log(error.message);
    if (error.response.status === 404) console.log("NOT FOUND");
    return Promise.reject(error);
  }
);

export { base };

// usage = base.get("/users")
