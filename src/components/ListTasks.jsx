import React from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import { v4 as uuidV4 } from "uuid";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = React.useState([]);
  const [inProgress, setInProgress] = React.useState([]);
  const [closed, setClosed] = React.useState([]);

  React.useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInprogress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");

    setTodos(fTodos);
    setInProgress(fInprogress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status) => (
        <Section
          key={uuidV4()}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos; // by default it has `todos` value

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  } else if (status === "closed") {
    text = "Closed";
    bg = "bg-red-500";
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    // console.log("dropped: ", id, status);
    setTasks((prev) => {
      console.log("PREV: ", prev);
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast("Task status changed", {icon: "😮‍💨"})

      return mTasks;
    });
  };

  return (
    <div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task} />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    // To allow the text have some space around its left used pl-4
    <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // console.log("isDragging: ", isDragging);

  const handleRemove = (taskId) => {
    console.log(taskId);
    const fTasks = tasks.filter((task) => {
      if (task.id !== taskId) return true;
      return false;
    });

    // save the filtered array to localStorage
    localStorage.setItem("tasks", JSON.stringify(fTasks));

    setTasks(fTasks);
    toast("Task Removed", { icon: "💀" });
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      {task.name}
      <button
        className="absolute bottom-1 right-1 text-slate-500"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};
