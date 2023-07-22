import { useAppDispatch, useAppSelector } from "../../store";
import { getTodosFetch, getTodosFail } from "./todos.slice";

const Todos = () => {
  const dispatch = useAppDispatch();
  const { todos, status } = useAppSelector((state) => state.todos);

  console.group("todos ", todos);
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem", cursor: "pointer" }}>
      <button disabled={status === "LOADING"} onClick={() => dispatch(getTodosFetch())}>
        Get Todos <span style={{ marginLeft: "0.2rem" }}>*{status}</span>
      </button>
      <button onClick={() => dispatch(getTodosFail())} >Todos Error (Manual)</button>
    </div>
  );
};

export default Todos;
