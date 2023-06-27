import {
  Link,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home";
import Data from "./pages/Data";
import NotFound from "./pages/NotFound";
import NewBook from "./pages/NewBook";
import Book from "./pages/Book";
import BookList from "./pages/BookList";
import { BookRoutes } from "./routes/BookRoutes";

export default function App() {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Routes>
  //       <Route path="/" element={<RootLayout />}>
  //         <Route index element={<Home />} />
  //         <Route path="/data" element={<Data />} />
  //       </Route>
  //     </Routes>
  //   )
  // );

  // return (
  //   <div>
  //     <RouterProvider router={router} />
  //   </div>
  // );

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/data" element={<Data />} />
      </Route>
      <Route path="/books" element={<BooksLayout />}>
        <Route index element={<BookList />} />
        <Route path=":id" element={<Book />} />
        <Route path="new" element={<NewBook />} />
      </Route>
      {/* If needed to put all Book routes on its own separate then use below */}
      {/* <Route path="/books/*" element={<BookRoutes />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// best example : https://blog.webdevsimplified.com/2022-07/react-router/
const RootLayout = () => {
  return (
    <>
      {/* This below div is to render the shared UI for all of its child routes */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/data">Data</Link>
      </div>

      {/*<Outlet /> is placeholder component and it will render whichever child routes is now active */}
      <main className="child-route-render-here">
        <Outlet />
      </main>
    </>
  );
};

export const BooksLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/books/1">Book 1</Link>
          </li>
          <li>
            <Link to="/books/2">Book 2</Link>
          </li>
          <li>
            <Link to="/books/new">New Book</Link>
          </li>
        </ul>
      </nav>
      <Outlet context={{ hello: "world" }} />
    </>
  );
};
