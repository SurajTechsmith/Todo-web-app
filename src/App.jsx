import React from "react";
import "./App.css";
import Taskform from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo } from "./slice";
import {
  CheckIcon,
  LightningBoltIcon,
  TimerIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import * as Checkbox from "@radix-ui/react-checkbox";
import CircularProgressBar from "./Circularpbar.jsx";
import User from "./assets/corporate-user-icon.png";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todo);

  const completedTasks = todos.filter((task) => task.status === true);
  const percentageCompleted = Math.floor((completedTasks.length / todos.length) * 100) || 0;


  // Calculate number of tasks
  const numberOfTasks = todos.length;

  // Calculate number of tasks with priority high
  const highPriorityTasks = todos.filter((task) => task.priority === "High");
  const numberOfHighPriorityTasks = highPriorityTasks.length;

  return (
    <React.Fragment>
      <nav className="bg-purple text-white p-4 flex justify-between md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
        <div className="text-white text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl ">
          TO-DO List
        </div>
      </nav>
      <div className=" bg-purple-500 p-6  shadow-lg flex items-center justify-between flex-col md:flex-row">
        <div className="text-white">
          <img src={User} alt="user-image" className="rounded-full max-w-20" />
          <h1 className="text-purple-900 text-lg">Hello, user</h1>
        </div>

        <div className="progress-bar-section">
          <CircularProgressBar
            strokeWidth={14}
            sqSize={200}
            percentage={percentageCompleted}
          />
        </div>

        <div className="stats-section text-white flex flex-col items-center">
          <div className="stat-item m-2 flex items-center">
            <span className="mr-1">High</span>
            <LightningBoltIcon className="text-yellow-400" />
            <span className="ml-1">{numberOfHighPriorityTasks}</span>
          </div>
          <div className="stat-item m-2 flex items-center">
            <span className="mr-1">All tasks</span>
            <TimerIcon className="text-green-400" />
            <span className="ml-1">{numberOfTasks}</span>
          </div>
          <Taskform />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-3 bg-slate-100">
  {todos.map((todo) => (
    <div
      key={todo.id}
      className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between mb-4"
    >
      <div className="flex items-center mb-4 space-x-4 flex-col md:flex-row gap-3">
        <div className="flex items-center">
          <Checkbox.Root
            className="hover:bg-violet-300 flex h-6 w-6 data-[state=checked]:bg-green-600 rounded-full appearance-none items-center justify-center border-none bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
            checked={todo.status}
            onCheckedChange={() => {
              dispatch(updateTodo({ id: todo.id, status: !todo.status }));
            }}
            id={`c${todo.id}`}
          >
            <Checkbox.Indicator className="text-white">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <p className={`text-sm font-semibold flex-grow m-2 ${todo.status ? "line-through" : ""}`}>
            {todo.task.slice(0, 30)}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <TimerIcon className="h-4 w-4 text-gray-400" />
          <p className="text-xs">{todo.selectedTime}</p>
        </div>
        <p className={`text-xs ${todo.priority === "High" ? "text-yellow-400" : (todo.priority === "Mid" ? "text-blue-400" : "text-red-400")}`}>
  {todo.priority}
</p>

      </div>
      <div className="flex items-center justify-center text-gray-600 md:justify-between ">
        <div className="flex space-x-2">
          <Taskform edit id={todo.id} />
          <button
            className="text-white bg-red-500 hover:bg-red-600 inline-flex items-center justify-center rounded-md px-3 font-medium leading-none focus:outline-none"
            onClick={() => dispatch(removeTodo(todo.id))}
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </React.Fragment>
  );
}

export default App;
