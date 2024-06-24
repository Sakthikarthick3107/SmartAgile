import React, { useEffect, useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Box, Button } from '@mui/material';

const Taskhub = () => {
  const [tasks, setTasks] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const { proj_id, user_id } = useParams();
  const navigate = useNavigate();
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await fetch(`http://127.0.0.1:8000/tasks/projects/user-task-data/1/6/`);
        if (!taskResponse.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const taskData = await taskResponse.json();
        const initialTasks = taskData.map((task) => ({ ...task, status: "todo" }));
        setTasks(initialTasks);
        localStorage.setItem("tasks", JSON.stringify(initialTasks));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [proj_id, user_id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Section = ({ status }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "task",
      drop: (item) => addItemToSection(item.id, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    const addItemToSection = (id, sectionStatus) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.task_id === id ? { ...task, status: sectionStatus } : task
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        return updatedTasks;
      });
    };

    const sectionTasks = tasks.filter((task) => task.status === status);

    return (
      <div
        ref={drop}
        className={`w-[344px] rounded-md p-2 ml-[60px] mr-[80px] ${isOver ? "bg-slate-200" : ""}`}
      >
        <Header text={status} bg="bg-gray-200" count={sectionTasks.length} />
        {sectionTasks.map((task) => (
          <Task key={task.task_id} task={task} />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const Header = ({ text, bg, count }) => (
    <div className={`${bg} flex text-black items-center h-12 pl-4 rounded-md uppercase text-sm`}>
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );

  const Task = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "task",
      item: { id: task.task_id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

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

    const handleContextMenu = (event) => {
      event.preventDefault();
      setTaskToDelete(task);
      setContextMenu(
        contextMenu === null
          ? {
            mouseX: event.clientX - 15 ,
            mouseY: event.clientY + 10,
            }
          : null,
      );
    };

    const handleDeleteConfirmation = async () => {
      try {
        await fetch(`http://127.0.0.1:8000/tasks/${taskToDelete.task_id}/`, {
          method: 'DELETE',
        });
        setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskToDelete.task_id));
        setShowDeleteConfirmation(false);
        setTaskToDelete(null);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };

    return (
      <div
        ref={drag}
        onContextMenu={handleContextMenu}
        className={`relative p-4 mt-8 shadow-md border-2 rounded-md cursor-grab ${
          isDragging ? "opacity-20" : "opacity-100"
        }`}
      >
        <div className="rounded-lg mb-2 bg-white shadow-none">
          <p className="text-xl font-bold pt-4 pl-2 mb-2">{task.task_name}</p>
          <p className="text-sm text-gray-600 pl-3 mb-2 ">{formatDate(task.task_deadline)}</p>
          <p className="text-gray-700 pl-3">{task.task_desc}</p>

          <button
            className={`priority text-[14px] font-serif rounded-full p-0 pl-1 pr-1 mt-3 focus:outline-none ${getPriorityColor(task.task_priority)}`}
          >
            {task.task_priority}
          </button>
        </div>
      </div>
    );
  };

  const handleDeleteClick = () => {
    setContextMenu(null);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/tasks/${taskToDelete.task_id}/`, {
        method: 'DELETE',
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskToDelete.task_id));
      setShowDeleteConfirmation(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="p-4">
            <button onClick={() => navigate(-1)} className="text-md mb-4 px-4 py-0 bg-[#4D989D]">Back</button>
            <h1 className="text-3xl font-bold mb-4 mt-4">Task Status</h1>

            <div className="flex">
              <Section status="todo" />
              <Section status="inProgress" />
              <Section status="completed" />
            </div>
          </div>
        </div>
      </div>

      {contextMenu && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'absolute',
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
            backgroundColor: 'white',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
            padding: '3px',
            zIndex: 1000,
          }}
          onClick={handleDeleteClick}
        >
          <button style={{backgroundColor: 'white',}}>Delete</button>
        </div>
      )}

      <Modal open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2 className="font-semibold">Confirm Delete</h2>
          <p className="mt-2 mb-4">Are you sure you want to delete this task?</p>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={handleDeleteConfirmation} sx={{ mr: 2 }} color="secondary" variant="contained" style={{ backgroundColor: '#4D989D', color: 'white', fontWeight: 'bold' }}>
              Delete
            </Button>
            <Button onClick={() => setShowDeleteConfirmation(false)} color="primary" variant="contained" style={{ backgroundColor: 'white', color: '#4D989D', fontWeight: 'bold' }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </DndProvider>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export default Taskhub;
