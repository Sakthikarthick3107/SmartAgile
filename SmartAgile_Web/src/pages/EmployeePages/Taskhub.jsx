import React, { useState, useEffect } from 'react';
// import Menu from './path/to/Menu'; // Import the Menu image

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const notificationCount = 3; // Example notification count

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await fetch('http://127.0.0.1:8000/tasks/');
        if (!taskResponse.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const taskData = await taskResponse.json();
        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-4 mt-4">Task Status - SmartAgile</h1>

      {/* To-do section */}
      <div className="card mb-3 task-card relative rounded-[19px] ml-4 pt-1 pb-2 shadow-lg bg-gray-200 max-w-[250px]">
        <div className="flex items-center justify-between">
          <b className="text-[16px] pt-4 pl-2 text-justify ml-[1px]">To-do</b>
          <div className="flex items-center">
            <span className="relative bg-gray-400 text-black text-xs top-2 right-[65px] px-[4px] rounded-full">
              {notificationCount}
            </span>
            {/* <img src={Menu} alt="Menu" className="team1 pr-4 pt-5" /> {/* Align to top-right corner */}
          </div>
        </div>
      </div>

      {/* Tasks section */}
      <div className="flex flex-col">
        {tasks.map((task, index) => (
          <div key={index} className="card mb-3 task-card relative rounded-[19px] ml-4 pt-1 pb-2 shadow-lg bg-gray-200 max-w-[250px]">
            <h2 className="text-xl font-bold pt-4 pl-2 mb-2">{task.task_name}</h2>
            <div className="text-sm text-gray-600 pl-3 mb-2">Deadline: {task.task_deadline}</div>
            <p className="text-gray-700 pl-3">{task.task_desc}</p>
            <hr className='border-t-1 border-black ml-1 mr-1 my-4' />
            <span className="priority text-[14px] font-serif rounded-full p-0 pl-1 mb-7 pr-1 ml-[190px] bg-yellow-300">{task.task_priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;

