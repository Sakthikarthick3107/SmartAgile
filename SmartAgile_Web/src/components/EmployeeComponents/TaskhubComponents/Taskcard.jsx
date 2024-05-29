

// import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const Createtask = ({ addTask }) => {
//   const [task, setTask] = useState({
//     id: '',
//     name: '',
//     status: 'todo', // can also be "inprogress" or "completed"
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (task.name.length < 3) {
//       alert('A task must have more than 3 characters'); // You can use toast or any other notification library here
//       return;
//     }

//     const newTask = { ...task, id: uuidv4() };
//     addTask(newTask);
//     setTask({ id: '', name: '', status: 'todo' }); // Reset the task input fields
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
//           value={task.name}
//           onChange={(e) => setTask({ ...task, name: e.target.value })}
//         />
//         <button className="bg-cyan-500 rounded-md h-12 text-white px-4" type="submit">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Createtask;


// import React from 'react'

// const Taskcard = (title, count, onClick ) => {
  
//   return (
//     <div>
//        <div className="task-card card p-4 shadow-lg bg-white rounded-lg">
//     <div className="flex items-center justify-between">
//       <b className="text-lg cursor-pointer" onClick={onClick}>{title}</b>
//       <div className="flex items-center">
//         <span className="bg-gray-400 text-black text-xs px-2 rounded-full">
//           {count}
//         </span>
//       </div>
//     </div>
//   </div>
//     </div>
//   )
// }

// export default Taskcard
import React from 'react';

const TaskCard = ({ employee }) => {
  return (
    <div className="p-4 mb-4 border border-gray-300 rounded shadow">
      <img src={employee.image} alt={employee.username} className="w-16 h-16 rounded-full mb-4" />
      <h2 className="text-xl font-bold">{employee.username}</h2>
      <p>{employee.email}</p>
      <p>{employee.position}</p>
      <p>{employee.role}</p>
      <p>{employee.date_joined}</p>
    </div>
  );
};

export default TaskCard;


