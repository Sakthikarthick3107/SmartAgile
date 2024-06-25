import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";
import AddTaskTeamMembers from '../AddTask/AddTaskTeamMembers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddIcon from "@mui/icons-material/Add"; // Adjust the import path according to your project structure

const SManageTask = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false); // State to manage popup visibility
  const { proj_id } = useParams();
  const [project, setProject] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null); // Define selectedMember state

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await fetch(`http://127.0.0.1:8000/tasks/project/${proj_id}/`);
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
  }, [proj_id]);

  // Fetch project details
  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/projects/${proj_id}/`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }
    
    fetchProjectDetails();
  }, [proj_id]);

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
        className={`w-[344px] rounded-md p-2 ml-[60px] mr-[80px] ${isOver ? "bg-slate-200" : ""}`}
      >
        <Header text={status} bg="bg-gray-200" count={sectionTasks.length} />
        {/* {status === "todo" && (
          <AddIcon className="ml-2 cursor-pointer" onClick={() => setShowAddTaskPopup(true)} />
        )} */}
        {sectionTasks.map((task) => (
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
              <Section status="todo" />
              <Section status="inProgress" />
              <Section status="completed" />
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

export default SManageTask;


