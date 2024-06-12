import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

const SManageTask = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await fetch("http://127.0.0.1:8000/tasks/");
        if (!taskResponse.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const taskData = await taskResponse.json();
        setTasks(taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

const Board = ({ tasks, setTasks }) => {
  const columns = {
    todo: "TODO",
    doing: "In progress",
    done: "Complete",
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskId));
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {Object.entries(columns).map(([columnKey, title]) => (
        <Column
          key={columnKey}
          title={title}
          column={columnKey}
          tasks={tasks}
          setTasks={setTasks}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
      <BurnBarrel />
    </div>
  );
};

const Column = ({ title, column, tasks, setTasks, handleDeleteTask }) => {
  const columnTasks = tasks.filter((task) => task.status.toLowerCase() === column);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    const updatedTasks = tasks.map((task) =>
      task.task_id === taskId ? { ...task, status: column } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div
      className="w-64 flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {columnTasks.map((task) => (
        <Task
          key={task.task_id}
          task={task}
          handleDragStart={handleDragStart}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
};

const Task = ({ task, handleDragStart, handleDeleteTask }) => {
  return (
    <motion.div
      className="bg-gray-100 p-3 rounded-lg mb-3 cursor-move"
      draggable
      onDragStart={(e) => handleDragStart(e, task.task_id)}
    >
      <p className="text-sm">{task.task_name}</p>
      <button
        className="text-red-500 mt-1 flex items-center"
        onClick={() => handleDeleteTask(task.task_id)}
      >
        <FiTrash className="mr-1" />
        Delete
      </button>
    </motion.div>
  );
};

const BurnBarrel = () => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // Handle deleting task
  };

  return (
    <div
      className="w-64 h-64 bg-red-500 rounded-lg flex items-center justify-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <FaFire className="text-5xl text-white" />
    </div>
  );
};

export default SManageTask;
