import React, { useEffect } from "react";
import { v4 as UUIDv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = React.useState({
    id: "",
    name: "",
    status: "todo" /* can be also inprogress or called */,
  });

  // get the localStorage at the initial render
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(tasks);

    if (task.name.length <= 3) return toast.error("A task must have more than 3 characters");
    if (task.name.length > 100) return toast.error("A task must not have more than 100 characters");

    // take the new task i.e. task and add it within tasks via setTasks()
    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("You have made a new task successfully");

    // reset task via `setTask()`
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  console.log("tasks: ", tasks);

  return (
    <form onSubmit={handleSubmit}>
      {/*try px-0 vs px-1 just for the cursor distance*/}
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 mt-2 h-12 w-64 px-1"
        onChange={(e) => setTask({ ...task, id: UUIDv4(), name: e.target.value })}
        value={task.name}
      />
      <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create</button>
    </form>
  );
};

export default React.memo(CreateTask);
