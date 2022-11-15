async function fetchGet(apiURL) {
  try {
    const controller = new AbortController();
    const headers = { "Content-Type": "application/json" };
    const response = await fetch(apiURL, { headers, signal: controller.signal });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchPost(apiURL) {
  try {
    // prettier-ignore
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer-Token",
        "My-Header": "foobar",
      },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    const response = fetch(apiURL, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchPut(apiURL, id) {
  try {
    // prettier-ignore
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer-Token",
        "My-Header": "foobar",
      },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    const response = fetch(`${apiURL}/${id}`, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchDelete(apiURL, id) {
  try {
    // prettier-ignore
    // const requestOptions = {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer-Token",
    //     "My-Header": "foobar",
    //   },
    // };
    const response = fetch(`${apiURL}/${id}`, {method: "DELETE"});
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export { fetchGet, fetchPost, fetchPut, fetchDelete };
