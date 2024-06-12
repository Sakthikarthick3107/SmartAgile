// import React, { useCallback, useEffect, useState } from "react";
// // import debounce from 'lodash.debounce';
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const Taskhub = () => {
//   const [tasks, setTasks] = useState([]); // State to store tasks
//   const [selectedStatus, setSelectedStatus] = useState("All"); // State to filter tasks by status

//   // Fetch tasks from the backend when the component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const taskResponse = await fetch("http://127.0.0.1:8000/tasks/");
//         if (!taskResponse.ok) {
//           throw new Error("Failed to fetch tasks");
//         }
//         const taskData = await taskResponse.json();
//         setTasks(taskData);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Load tasks from localStorage when the component mounts
//   useEffect(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       setTasks(JSON.parse(savedTasks));
//     }
//   }, []);

//   const statuses = ["todo", "inProgress", "completed"]; // Different task statuses

//   // Section component to display tasks of a specific status
//   const Section = ({ status, tasks, setTasks }) => {
//     const [{ isOver }, drop] = useDrop({
//       accept: "task",
//       drop: (item) => addItemToSection(item.id, status),
//       collect: (monitor) => ({
//         isOver: !!monitor.isOver(),
//       }),
//     });

//     // Function to update task status when dropped in a section
//     const addItemToSection = (id, sectionStatus) => {
//       setTasks((prevTasks) => {
//         const updatedTasks = prevTasks.map((task) =>
//           task.task_id === id ? { ...task, status: sectionStatus } : task
//         );

//         localStorage.setItem("tasks", JSON.stringify(updatedTasks));

//         return updatedTasks;
//       });
//     };

//     // Filter tasks for this section
//     const sectionTasks = tasks.filter((task) => task.status === status);

//     return (
//       <div
//         ref={drop}
//         className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
//       >
//         <Header text={status} bg="bg-gray-200" count={sectionTasks.length} />
//         {sectionTasks.map((task) => (
//           <Task key={task.task_id} task={task} />
//         ))}
//       </div>
//     );
//   };

//   // Header component for section title and task count
//   const Header = ({ text, bg, count }) => (
//     <div
//       className={`${bg} flex text-black items-center h-12 pl-4 rounded-md uppercase text-sm`}
//     >
//       {text}
//       <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
//         {count}
//       </div>
//     </div>
//   );

//   // Task component to display individual task details
//   const Task = ({ task }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: "task",
//       item: { id: task.task_id },
//       collect: (monitor) => ({
//         isDragging: !!monitor.isDragging(),
//       }),
//     });

//     // Function to remove a task
//     const handleRemove = (id) => {
//       const updatedTasks = tasks.filter((t) => t.task_id !== id);
//       localStorage.setItem("tasks", JSON.stringify(updatedTasks));
//       setTasks(updatedTasks);
//     };

//     return (
//       <div
//         ref={drag}
//         className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
//           isDragging ? "opacity-20" : "opacity-100"
//         }`}
//       >
//         <p>{task.task_name}</p>
//         <button
//           className="absolute bottom-1 right-1 text-slate-400"
//           onClick={() => handleRemove(task.task_id)}
//         >
//           Remove
//         </button>
//       </div>
//     );
//   };

//   // Filter tasks based on the selected status
//   const filteredTasks = tasks.filter(
//     (task) => selectedStatus === "All" || task.status === selectedStatus
//   );

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex h-screen">
//         <div className="flex flex-col flex-grow overflow-y-auto">
//           <div className="p-4">
//             <h1 className="text-3xl font-bold mb-4 mt-4">Task Status</h1>

//             <div className="flex flex-wrap ml-3 justify-start gap-10">
//               {/* Sections for different task statuses */}
//               {statuses.map((status) => (
//                 <Section
//                   key={status}
//                   status={status}
//                   tasks={tasks}
//                   setTasks={setTasks}
//                 />
//               ))}
//             </div>

//             <div className="flex flex-col mt-4">
//               {tasks.map((task) => (
//                 <Task key={task.task_id} task={task} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default Taskhub;
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Taskhub = () => {
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
        // Set all tasks to 'todo' status initially
        const initialTasks = taskData.map((task) => ({ ...task, status: "todo" }));
        setTasks(initialTasks);
        localStorage.setItem("tasks", JSON.stringify(initialTasks));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Section component to display tasks of a specific status
  const Section = ({ status }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "task",
      drop: (item) => addItemToSection(item.id, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    // Function to update task status when dropped in a section
    const addItemToSection = (id, sectionStatus) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.task_id === id ? { ...task, status: sectionStatus } : task
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        return updatedTasks;
      });
    };

    // Filter tasks for this section
    const sectionTasks = tasks.filter((task) => task.status === status);

    return (
      <div
        ref={drop}
        className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
      >
        <Header text={status} bg="bg-gray-200" count={sectionTasks.length} />
        {sectionTasks.map((task) => (
          <Task key={task.task_id} task={task} />
        ))}
      </div>
    );
  };

  // Header component for section title and task count
  const Header = ({ text, bg, count }) => (
    <div
      className={`${bg} flex text-black items-center h-12 pl-4 rounded-md uppercase text-sm`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
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

    // Function to remove a task
    const handleRemove = (id) => {
      const updatedTasks = tasks.filter((t) => t.task_id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    };

    return (
      <div
        ref={drag}
        className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
          isDragging ? "opacity-20" : "opacity-100"
        }`}
      >
        <p>{task.task_name}</p>
        {/* <button
          className="absolute bottom-1 right-1 text-slate-400"
          onClick={() => handleRemove(task.task_id)}
        >
          Remove
        </button> */}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 mt-4">Task Status</h1>

            <div className="flex flex-wrap ml-3 justify-start gap-10">
              {/* Sections for different task statuses */}
              <Section status="todo" />
              <Section status="inProgress" />
              <Section status="completed" />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Taskhub;

