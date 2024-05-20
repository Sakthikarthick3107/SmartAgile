import React, { useState, useEffect } from 'react';
import Menu from "../../assets/Menu.png";

// Navbar Component
// const Navbar = () => {
//   return (
//     <div className="bg-gray-900 text-white h-16 flex items-center justify-between px-4">
//       <div className="text-xl font-bold">SmartAgile</div>
//       {/* Add your navbar content here */}
//     </div>
//   );
// };

// // Sidebar Component
// const Sidebar = () => {
//   return (
//     <div className="bg-gray-800 text-white w-64 min-h-screen">
//       <div className="p-4">
//         <div className="text-xl font-bold mb-4">Sidebar</div>
//         {/* Add your sidebar content here */}
//       </div>
//     </div>
//   );
// };

// Taskhub Component
const Taskhub = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
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

  const handleStatusChange = (taskIndex, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map((task, index) =>
        index === taskIndex ? { ...task, status: newStatus } : task
      )
    );
    setOpenMenuIndex(null); // Close the menu after selecting an option
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedStatus === 'All') return true;
    return task.status === selectedStatus;
  });

  return (
    <div className="flex h-screen">
   
      
      <div className="flex flex-col flex-grow overflow-y-auto">
      
        
        {/* Main Content */}
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4 mt-4">Task Status - SmartAgile</h1>

          <div className="flex flex-wrap justify-start gap-10">
            {/* Todo section */}
            <div className="card mb-3 task-card relative rounded-[19px] p-2 shadow-lg bg-white ml-4">
              <div className="flex items-center justify-between">
                <b className="text-[16px] ml-3 mt-2 pl-2" onClick={() => handleStatusChange(null, 'Todo')}>Todo</b>
                <div className="flex items-center">
                  <span className="bg-gray-400 text-black text-xs ml-[180px] mr-[10px] px-[4px] rounded-full">
                    {tasks.filter(task => task.status === 'Todo').length}
                  </span>
                </div>
              </div>
            </div>

            {/* In Progress section */}
            <div className="card mb-[19px] task-card relative rounded-[19px] p-2 shadow-lg bg-white max-w-[255px] ml-4">
              <div className="flex items-center justify-between">
                <b className="text-[16px] pl-2" onClick={() => handleStatusChange(null, 'In Progress')}>In_Progress</b>
                <div className="flex items-center">
                  <span className="bg-gray-400 text-black text-xs ml-[120px] mr-[650px] px-[4px] rounded-full">
                    {tasks.filter(task => task.status === 'In Progress').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Completed section */}
            <div className="card mb-[19px] task-card relative rounded-[19px] p-2 shadow-lg bg-white max-w-[255px] ml-4">
              <div className="flex items-center justify-between">
                <b className="text-[16px] pl-2" onClick={() => handleStatusChange(null, 'Completed')}>Completed</b>
                <div className="flex items-center">
                  <span className="bg-gray-400 text-black text-xs px-[4px] ml-[120px] mr-[650px] rounded-full">
                    {tasks.filter(task => task.status === 'Completed').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks section */}
          <div className="flex flex-col">
            {filteredTasks.map((task, index) => (
              <div key={index} className="card mb-3 task-card relative rounded-[19px] ml-4 pt-1 pb-2 shadow-lg bg-white max-w-[255px]">
                <h2 className="text-xl font-bold pt-4 pl-2 mb-2">{task.task_name}</h2>
                <div className="text-sm text-gray-600 pl-3 mb-2">Deadline: {task.task_deadline}</div>
                <p className="text-gray-700 pl-3">{task.task_desc}</p>
                <hr className='border-t-1 border-black ml-1 mr-1 my-4 mt-8' />
               
                <div className="flex justify-between mb-0 mt-1 pl-1 pr-1 relative">
                  <button className="priority text-[14px] font-serif rounded-full p-0 pl-1 pr-1 mt-3 bg-yellow-300">
                    {task.task_priority}
                  </button>
                  <button className='bg-white' onClick={() => toggleMenu(index)}>
                    <img src={Menu} alt="Menu" />
                  </button>
                  {openMenuIndex === index && (
                   <div className="absolute bottom-0 right-0 mb-8 mr-4 bg-white border rounded shadow-lg">
                     <button 
                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                       onClick={() => handleStatusChange(index, 'In Progress')}
                     >
                       In Progress
                     </button>
                     <button 
                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                       onClick={() => handleStatusChange(index, 'Completed')}
                     >
                       Completed
                     </button>
                   </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskhub;