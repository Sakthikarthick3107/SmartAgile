import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Taskhub = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [selectedStatus, setSelectedStatus] = useState('All'); // State to filter tasks by status

  // Fetch tasks from the backend when the component mounts
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

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const statuses = ['todo', 'inProgress', 'completed']; // Different task statuses

  // Section component to display tasks of a specific status
  const Section = ({ status, tasks, setTasks }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'task',
      drop: (item) => addItemToSection(item.id, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    // Function to update task status when dropped in a section
    const addItemToSection = (id, sectionStatus) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === id ? { ...task, status: sectionStatus } : task
        );

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        return updatedTasks;
      });
    };

    // Filter tasks for this section
    const sectionTasks = tasks.filter((task) => task.status === status);

    return (
      <div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? 'bg-slate-200' : ''}`}>
        <Header text={status} bg="bg-gray-200" count={sectionTasks.length} />
        {sectionTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    );
  };

  // Header component for section title and task count
  const Header = ({ text, bg, count }) => (
    <div className={`${bg} flex text-black items-center h-12 pl-4 rounded-md uppercase text-sm`}>
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );

  // Task component to display individual task details
  const Task = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'task',
      item: { id: task.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    // Function to remove a task
    const handleRemove = (id) => {
      const updatedTasks = tasks.filter((t) => t.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    };

    return (
      <div
        ref={drag}
        className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? 'opacity-20' : 'opacity-100'}`}
      >
        <p>{task.task_name}</p>
        <button className="absolute bottom-1 right-1 text-slate-400" onClick={() => handleRemove(task.id)}>
          Remove
        </button>
      </div>
    );
  };

  // Filter tasks based on the selected status
  const filteredTasks = tasks.filter((task) => selectedStatus === 'All' || task.status === selectedStatus);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 mt-4">Task Status</h1>

            <div className="flex flex-wrap ml-3 justify-start gap-10">
              {statuses.map((status) => (
                <Section key={status} status={status} tasks={tasks} setTasks={setTasks} />
              ))}
            </div>

            <div className="flex flex-col mt-4" draggable>
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="card mb-3 mt-2 task-card relative rounded-[19px] ml-4 pt-1 pb-2 shadow-lg bg-white max-w-[255px]"
                >
                  <h2 className="text-xl font-bold pt-4 pl-2 mb-2">{task.task_name}</h2>
                  <div className="text-sm text-gray-600 pl-3 mb-2">Deadline: {task.task_deadline}</div>
                  <p className="text-gray-700 pl-3">{task.task_desc}</p>
                  <div className="flex justify-between mb-0 mt-1 pl-2 pr-1 relative">
                    <button className="priority text-[14px] font-serif rounded-full p-0 pl-1 pr-1 mt-3 bg-yellow-300">
                      {task.task_priority}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Taskhub;



// import React, { useState, useEffect } from 'react'


// const Taskhub = () => {

//   const [task, setTask] = useState([ ]);

//   console.log(task);

//   const [todo, setTodo] = useState([]);
//   const [inprogress, setInProgress] = useState([]);
//   const [completed, setCompleted] = useState([]);

//   useEffect(() => {
//     const fTodo = task.filter((task) => task.status === "todo");
//     const fInprogress = task.filter((task) => task.status === "inProgress");
//     const fCompleted = task.filter((task) => task.status === "completed");

//     setTodo(fTodo);
//     setInProgress(fInprogress);
//     setCompleted(fCompleted);
//   }, [task]);

//   useEffect(() => {
//         const fetchTasks = async () => {
//           try {
//             const taskResponse = await fetch('http://127.0.0.1:8000/tasks/');
//             if (!taskResponse.ok) {
//               throw new Error('Failed to fetch tasks');
//             }
//             const taskData = await taskResponse.json();
//             setTasks(taskData);
//           } catch (error) {
//             console.error('Error fetching tasks:', error);
//           }
//         };
    
//         fetchTasks();
//       }, []);

//   const statuses = ["todo", "inProgress", "completed"];

//   const Section = ({ status, tasks, setTask, todo, inProgress, completed }) => {

//     const [{ isOver }, drop] = useDrop(() => ({
//       accept: "task",
//       drop:(item) => addItemToSection(item.id),
//       collect: (monitor) => ({
//         isOver: !!monitor.isOver(),
//       }),
//     }));

//     let text = "Todo";
//     let bg = "bg-red-400";
//     let taskToMap = todo;

//     if (status === "inProgress") {
//       text = " In Progress";
//       bg = "bg-purple-400";
//       taskToMap = inProgress;
//     }

//     if (status === "completed") {
//       text = " Completed";
//       bg = "bg-green-400";
//       taskToMap = completed;
//     }

//     const addItemToSection = (id) =>{
//       setTask(prev=>{
//         const nTask = prev.map(t =>{
//           if(t.id === id){
//             return {...t, status:status}
//           }
//           return t;
//         })
        
//         localStorage.setItem("task" , JSON.stringify(nTask))

//         return nTask
//       })
//       console.log("dropped" , id , status);
//     }
    
//     const Header = ({ text, bg, count }) => {
//       return (
//         <>
//           <div
//             className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
//           >
//             {text}
//             <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
//               {count}
//             </div>
//           </div>
//         </>
//       );
//     };
  
//     const Task = ({ task, tasks, setTask }) => {
//       const [{ isDragging }, drag] = useDrag(() => ({
//         type: "task",
//         item:{id:task.id},
//         collect: (monitor) => ({
//           isDragging: !!monitor.isDragging(),
//         }),
//       }));
  
//       console.log(isDragging);
  
//       const handleRemove = (id) => {
//         const updatedTasks = task.filter((t) => t.id !== id);
//         localStorage.setItem("tasks", JSON.stringify(updatedTasks));
//         setTask(updatedTasks);
//       };
//       return (
//         <>
//           <div
//             ref={drag}
//             className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
//               isDragging ? "opacity-20" : "opacity-100"
//             }`}
//           >
//         </>
//     );
//   };




//   return (
//     <div>
//     <div className="flex gap-16">
//         {statuses.map((status, index) => (
//           <Section
//             key={index}
//             status={status}
//             task={task}
//             setTask={setTask}
//             todo={todo}
//             inProgress={inProgress}
//             completed={completed}
//           />
//         ))}
//       </div>
      
//     </div>
//   )
// }

// export default Taskhub
