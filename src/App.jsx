import React from "react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { HTML5Backend } from "react-dnd-html5-backend";

// to add sorting follow: https://github.dev/coopercodes/ReactDndKitList
function App() {
  const [tasks, setTasks] = React.useState([]);
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center gap-16 pt-32">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
