import axios from "axios";

const base = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

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
