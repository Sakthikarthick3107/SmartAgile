// import React, { useEffect, useState, useRef } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { useParams, useNavigate } from 'react-router-dom';
// import { Modal, Box, Button } from '@mui/material';

// const ViewTaskEmployee = () => {
//   const [tasks, setTasks] = useState([]);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
//   const [contextMenu, setContextMenu] = useState(null);
//   const { proj_id, user_id } = useParams();
//   const navigate = useNavigate();
//   const contextMenuRef = useRef(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const taskResponse = await fetch(`http://127.0.0.1:8000/tasks/project/user-tasks/${proj_id}/${user_id}/`);
//         if (!taskResponse.ok) {
//           throw new Error("Failed to fetch tasks");
//         }
//         const taskData = await taskResponse.json();
//         const initialTasks = taskData.map((task) => ({ ...task, status: "todo" }));
//         setTasks(initialTasks);
//         localStorage.setItem("tasks", JSON.stringify(initialTasks));
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, [proj_id, user_id]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//         setContextMenu(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const Section = ({ status }) => {
//     const [{ isOver }, drop] = useDrop({
//       accept: "task",
//       drop: (item) => addItemToSection(item.id, status),
//       collect: (monitor) => ({
//         isOver: !!monitor.isOver(),
//       }),
//     });

//     const addItemToSection = (id, sectionStatus) => {
//       setTasks((prevTasks) => {
//         const updatedTasks = prevTasks.map((task) =>
//           task.task_id === id ? { ...task, status: sectionStatus } : task
//         );

//         localStorage.setItem("tasks", JSON.stringify(updatedTasks));

//         return updatedTasks;
//       });
//     };

//     const sectionTasks = tasks.filter((task) => task.status === status);

//     return (
//       <div
//         ref={drop}
//         className={`w-[344px] rounded-md p-2 ml-[60px] mr-[80px] ${isOver ? "bg-slate-200" : ""}`}
//       >
//         <Header text={status} bg="bg-gray-200" count={sectionTasks.length} />
//         {sectionTasks.map((task) => (
//           <Task key={task.task_id} task={task} />
//         ))}
//       </div>
//     );
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const Header = ({ text, bg, count }) => (
//     <div className={`${bg} flex text-black items-center h-12 pl-4 rounded-md uppercase text-sm`}>
//       {text}
//       <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
//         {count}
//       </div>
//     </div>
//   );

//   const Task = ({ task }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: "task",
//       item: { id: task.task_id },
//       collect: (monitor) => ({
//         isDragging: !!monitor.isDragging(),
//       }),
//     });

//     const getPriorityColor = (priority) => {
//       switch (priority) {
//         case "HIGH":
//           return "bg-red-300";
//         case "MED":
//           return "bg-yellow-300";
//         case "LOW":
//           return "bg-green-300";
//         default:
//           return "bg-gray-300";
//       }
//     };

//     const handleContextMenu = (event) => {
//       event.preventDefault();
//       setTaskToDelete(task);
//       setContextMenu(
//         contextMenu === null
//           ? {
//             mouseX: event.clientX - 15 ,
//             mouseY: event.clientY + 10,
//             }
//           : null,
//       );
//     };

//     const handleDeleteConfirmation = async () => {
//       try {
//         await fetch(`http://127.0.0.1:8000/tasks/${taskToDelete.task_id}/`, {
//           method: 'DELETE',
//         });
//         setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskToDelete.task_id));
//         setShowDeleteConfirmation(false);
//         setTaskToDelete(null);
//       } catch (error) {
//         console.error("Error deleting task:", error);
//       }
//     };

//     return (
//       <div
//         ref={drag}
//         onContextMenu={handleContextMenu}
//         className={`relative p-4 mt-8 shadow-md border-2 rounded-md cursor-grab ${
//           isDragging ? "opacity-20" : "opacity-100"
//         }`}
//       >
//         <div className="rounded-lg mb-2 bg-white shadow-none">
//           <p className="text-xl font-bold pt-4 pl-2 mb-2">{task.task_name}</p>
//           <p className="text-sm text-gray-600 pl-3 mb-2 ">{formatDate(task.task_deadline)}</p>
//           <p className="text-gray-700 pl-3">{task.task_desc}</p>

//           <button
//             className={`priority text-[14px] font-serif rounded-full p-0 pl-1 pr-1 mt-3 focus:outline-none ${getPriorityColor(task.task_priority)}`}
//           >
//             {task.task_priority}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const handleDeleteClick = () => {
//     setContextMenu(null);
//     setShowDeleteConfirmation(true);
//   };

//   const handleDeleteConfirmation = async () => {
//     try {
//       await fetch(`http://127.0.0.1:8000/tasks/${taskToDelete.task_id}/`, {
//         method: 'DELETE',
//       });
//       setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskToDelete.task_id));
//       setShowDeleteConfirmation(false);
//       setTaskToDelete(null);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex h-screen">
//         <div className="flex flex-col flex-grow overflow-y-auto">
//           <div className="p-4">
//             <button onClick={() => navigate(-1)} className="text-md mb-4 px-4 py-0 bg-[#4D989D]">Back</button>
//             <h1 className="text-3xl font-bold mb-4 mt-4">Task Status</h1>

//             <div className="flex">
//               <Section status="todo" />
//               <Section status="inProgress" />
//               <Section status="completed" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {contextMenu && (
//         <div
//           ref={contextMenuRef}
//           style={{
//             position: 'absolute',
//             top: contextMenu.mouseY,
//             left: contextMenu.mouseX,
//             backgroundColor: 'white',
//             boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
//             padding: '3px',
//             zIndex: 1000,
//           }}
//           onClick={handleDeleteClick}
//         >
//           <button style={{backgroundColor: 'white',}}>Delete</button>
//         </div>
//       )}

//       <Modal open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
//         <Box sx={{ ...modalStyle, width: 400 }}>
//           <h2 className="font-semibold">Confirm Delete</h2>
//           <p className="mt-2 mb-4">Are you sure you want to delete this task?</p>
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
//             <Button onClick={handleDeleteConfirmation} sx={{ mr: 2 }} color="secondary" variant="contained" style={{ backgroundColor: '#4D989D', color: 'white', fontWeight: 'bold' }}>
//               Delete
//             </Button>
//             <Button onClick={() => setShowDeleteConfirmation(false)} color="primary" variant="contained" style={{ backgroundColor: 'white', color: '#4D989D', fontWeight: 'bold' }}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </DndProvider>
//   );
// };

// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 1,
// };

// export default ViewTaskEmployee;

import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";
import AddTaskTeamMembers from '../AddTask/AddTaskTeamMembers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddIcon from "@mui/icons-material/Add"; // Adjust the import path according to your project structure
// import { useParams, useNavigate } from 'react-router-dom';



const ViewTaskEmployee = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false); // State to manage popup visibility
  const [project, setProject] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null); // Define selectedMember state
 const { proj_id, user_id } = useParams();

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await fetch(`http://127.0.0.1:8000/tasks/project/user-tasks/${proj_id}/${user_id}/`);
       
        if (!taskResponse.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const taskData = await taskResponse.json();
        setTasks(taskData);
        localStorage.setItem("tasks", JSON.stringify(taskData));

        // Categorize tasks
        const todo = taskData.filter(task => task.status === "Todo");
        
        const inProgress = taskData.filter(task => task.status === "Progress");
        
        const completed = taskData.filter(task => task.status === "Completed");
       

        setTodoTasks(todo);
        setInProgressTasks(inProgress);
        setCompletedTasks(completed);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [proj_id]);

  // Fetch project details
  // useEffect(() => {
  //   async function fetchProjectDetails() {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:8000/projects/${proj_id}/`);
  //       const data = await response.json();
  //       setProject(data);
  //     } catch (error) {
  //       console.error('Error fetching project details:', error);
  //     }
  //   }
    
  //   fetchProjectDetails();
  // }, [proj_id]);

  // Function to update task status in the backend
  const updateTaskStatus = async (task_id, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/${task_id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      // Update the task status locally
      const updatedTasks = tasks.map((task) =>
        task.task_id === task_id ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Re-categorize tasks
      const todo = updatedTasks.filter(task => task.status === "Todo");
      
      const inProgress = updatedTasks.filter(task => task.status === "Progress");
      
      const completed = updatedTasks.filter(task => task.status === "Completed");
      

      setTodoTasks(todo);
      setInProgressTasks(inProgress);
      setCompletedTasks(completed);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Section component to display tasks of a specific status
  const Section = ({ status, tasks }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "task",
      drop: (item) => addItemToSection(item.id, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    // Function to update task status when dropped in a section
    const addItemToSection = (id, sectionStatus) => {
      updateTaskStatus(id, sectionStatus);
    };

    return (
      <div
        ref={drop}
        className={`w-[344px] rounded-md p-2 ml-[60px] mr-[80px] ${isOver ? "bg-slate-200" : ""}`}
      >
        <Header text={status} bg="bg-gray-200" count={tasks.length} />
        {tasks.map((task) => (
          <Task key={task.task_id} task={task} />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Header component for section title and task count
  const Header = ({ text, bg, count }) => (
    <div className={`${bg} flex text-black items-center h-12 pl-4 rounded-md uppercase text-sm`}>
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
      {text === "todo" && (
        <AddIcon className="ml-2 cursor-pointer" onClick={() => setShowAddTaskPopup(true)} />
      )}
    </div>
  );

  // Task component to display individual task details
  const Task = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "task",
      item: { id: task.task_id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    // Function to get priority color
    const getPriorityColor = (priority) => {
      switch (priority) {
        case "HIGH":
          return "bg-red-300";
        case "MED":
          return "bg-yellow-300";
        case "LOW":
          return "bg-green-300";
        default:
          return "bg-gray-300";
      }
    };

    return (
      <div
        ref={drag}
        className={`relative p-4 mt-8 shadow-md border-2 rounded-md cursor-grab ${
          isDragging ? "opacity-20" : "opacity-100"
        }`}
      >
        <div className="rounded-lg mb-2 bg-white shadow-none">
          <p className="text-xl font-bold pt-4 pl-2 mb-2">{task.task_name}</p>
          <p className="text-sm text-gray-600 pl-3 mb-2 ">{formatDate(task.task_deadline)}</p>
          <p className="text-gray-700 pl-3">{task.task_desc}</p>
          <button
            className={`priority text-[14px] font-serif rounded-full p-0 pl-1 pr-1 mt-3 focus:outline-none ${getPriorityColor(
              task.task_priority
            )}`}
          >
            {task.task_priority}
          </button>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 mt-4">Task Status</h1>
            <h1>Tasks for Project {proj_id}</h1>
            <div className="flex">
              {/* Sections for different task statuses */}
              <Section status="Todo" tasks={todoTasks} />
              <Section status="Progress" tasks={inProgressTasks} />
              <Section status="Completed" tasks={completedTasks} />
            </div>
          </div>
        </div>
      </div>
      {showAddTaskPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 shadow-lg w-[40%] border border-3 rounded-xl overflow-y-auto max-h-[90%]">
            <div className="text-right">
              <FontAwesomeIcon
                className="px-1.5 cursor-pointer py-1 text-xl text-red-600 border-red-600 border rounded-full"
                icon={faXmark}
                onClick={() => setShowAddTaskPopup(false)}
              />
            </div>
            <AddTaskTeamMembers
              projectId={proj_id}
              projectName={project ? project.proj_name : ''}
              assignedTo={selectedMember ? selectedMember.username : ''}
              assignedId={selectedMember ? selectedMember.id : ''}
            />
          </div>
        </div>
      )}
    </DndProvider>
  );
};

export default ViewTaskEmployee;