import React, { useState, useEffect } from 'react';

const Task = () => {
  const [tasks, setTasks] = useState([]);

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
    <div className="flex justify-center top-5 h-screen">
      <span>Task Status - SmartAgile</span>
      {tasks.map((task, index) => (
        <div key={index} className="tasks-grid flex-row gap-5 pl-9 pt-6">
          <div className="card mb-3 task-card top-9 relative rounded-[19px] shadow-lg bg-gray-300 max-w-[550px]">
          <div className="absolute top-6  rounded-full pl-1 pt-7 text-[10px] ">
              Deadline: {task.task_deadline}
            </div>
            <div className="flex items-center mt-6">
              <b className="text-20 font-serif mt-3 ml-[1px]">{task.task_name}</b>
            </div>
            <p className="desc text-[14px] font-serif p-3 mt-7 text-justify">{task.task_desc}</p>
            <hr className='border-t-1 border-black ml-1 mr-1 my-4 '/>
            <span className="priority text-[14px] font-serif rounded-full p-0 pl-1 pr-1  ml-[140px] bg-yellow-300">{task.task_priority}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
