//  https://bobbyhadz.com/blog/typescript-http-request-axios
// medium.com/stackanatomy/integrating-axios-with-react-hooks-f3caccee83b3

import axios from "axios";
import type { AxiosInstance } from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

// export default function Api() {
//   const token = "sample";

//   const api: AxiosInstance = axios.create({
//     baseURL: "https://jsonplaceholder.typicode.com",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     transformRequest: [
//       (data) => {
//         return JSON.stringify(data);
//       },
//     ],
//     transformResponse: [
//       (data) => {
//         return JSON.parse(data);
//       },
//     ],
//   });

//   return api;
// }

// to use : import Api from ".." then Api.post

axios.interceptors.request.use((req) => {
  console.log(req.headers);
  return req;
});

axios.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response) return Promise.reject(err.response.data);
    if (err.request) return Promise.reject(err.request);
    return Promise.reject(err.message);
  }
);

// usage : axios<User>({method: "POST", url: "/api/v1/auth/login", data: login})

// ## cancel ongoing subscription/requst with fetch and aboutcontroller

/*
const [users, setUsers] = React.useState()
React.useEffect(() => {
  const abourController = new AbortController()
  const signal = abourController.signal

  fetch(RANDOM_USERAPI, {signal}).then(results => results.json()).then(data => SetUsers(data))

  return function cleanup () {
    // canncel ongoing subcription/request like this
    abortController.abort()
  }




}, [])


*/

// export default function AxiosHooksComponent() {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();

//     const loadData = () => {
//       try {
//         axios
//           .get(RANDOM_USER_API, { cancelToken: source.token })
//           .then((data) => {
//             setUser(data.data);
//           });
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log("cancelled");
//         } else {
//           throw error;
//         }
//       }
//     };

//     loadData();
//     return () => {
//       //console.log("cleaning");
//       source.cancel();
//     };
//   }, []);

//   return (
//     <div>
//       <h4>Hooks</h4>
//       {user === null ? (
//         <p>Loading Hooks Data ...</p>
//       ) : (
//         <pre>{JSON.stringify(user, null, 4)}</pre>
//       )}
//     </div>
//   );
// }
