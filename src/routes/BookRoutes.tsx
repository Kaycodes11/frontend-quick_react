import { Route, Routes } from "react-router-dom";
import { BooksLayout } from "../AppV6";
import BookList from "../pages/BookList";
import Book from "../pages/Book";
import NewBook from "../pages/NewBook";
import NotFound from "../pages/NotFound";

export function BookRoutes() {
  return (
    <Routes>
      <Route element={<BooksLayout />}>
        <Route index element={<BookList />} />
        <Route path=":id" element={<Book />} />
        <Route path="new" element={<NewBook />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
