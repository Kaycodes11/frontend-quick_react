import { useParams, useOutletContext } from "react-router-dom";

const Book = () => {
  const { id } = useParams();
  const context = useOutletContext();

  // @ts-ignore
  return <h1>Book id {context.hello}</h1>;
};

export default Book;
