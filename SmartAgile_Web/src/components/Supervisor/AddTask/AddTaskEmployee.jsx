
// // import React, { useState, useEffect } from "react";

// // const AddTaskEmployee = ({ projectId }) => {
// //   const [taskName, setTaskName] = useState("");
// //   const [taskDeadline, setTaskDeadline] = useState("");
// //   const [taskPriority, setTaskPriority] = useState("");
// //   const [taskDesc, setTaskDesc] = useState("");
// //   const [status, setStatus] = useState("Todo");
// //   const [assignedTo, setAssignedTo] = useState({
// //     id: 0,
// //     user: 0,
// //     username: "",
// //     image: "",
// //     role_within_project: "",
// //     project: projectId,
// //     profile: 0,
// //   });
// //   const [attachment, setAttachment] = useState(null);
// //   const [project, setProject] = useState(null);
// //   const [loading, setLoading] = useState(true); // Added loading state
// //   const [error, setError] = useState(null); // Added error state

// //   // Fetch project details on component mount
// //   useEffect(() => {
// //     async function fetchProjectDetails() {
// //       try {
// //         const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}`);
// //         if (!response.ok) {
// //           throw new Error(`Error: ${response.status}`);
// //         }
// //         const data = await response.json();
// //         setProject(data);
// //         setLoading(false); // Set loading to false when data is fetched
// //       } catch (error) {
// //         console.error("Error fetching project details:", error);
// //         setError(error.message);
// //         setLoading(false); // Set loading to false on error
// //       }
// //     }

// //     fetchProjectDetails();
// //   }, [projectId]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formData = new FormData();
// //     formData.append("task_name", taskName);
// //     formData.append("task_deadline", taskDeadline);
// //     formData.append("task_priority", taskPriority);
// //     formData.append("task_desc", taskDesc);
// //     formData.append("status", status);
// //     formData.append("assigned_to", JSON.stringify(assignedTo));
// //     formData.append("project", projectId);
// //     if (attachment) {
// //       formData.append("attachment", attachment);
// //     }

// //     try {
// //       const response = await fetch("http://127.0.0.1:8000/tasks/", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (response.ok) {
// //         console.log("Task created successfully!");
// //       } else {
// //         console.error("Failed to create task:", response.statusText);
// //       }
// //     } catch (error) {
// //       console.error("Error creating task:", error);
// //     }
// //   };

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     <div className="w-[100%] border mt-5 p-5">
// //       <div>
// //         <h1 className="text-2xl text-black font-bold mb-4">
// //           Add New Task - {project.proj_name}
// //         </h1>
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="taskName" className="text-xl text-black font-semibold">
// //             Task:
// //           </label>
// //           <textarea
// //             id="taskName"
// //             className="w-full border p-3 mb-3"
// //             rows={2}
// //             value={taskName}
// //             onChange={(e) => setTaskName(e.target.value)}
// //           ></textarea>

// //           <label className="text-xl text-black font-semibold" htmlFor="taskDeadline">
// //             Deadline:
// //           </label>
// //           <input
// //             type="date"
// //             id="taskDeadline"
// //             className="w-[70%] text-md font-normal border-none outline-none"
// //             value={taskDeadline}
// //             onChange={(e) => setTaskDeadline(e.target.value)}
// //           />
// //           <hr className="mb-3" />

// //           <label className="text-xl text-black font-semibold" htmlFor="taskPriority">
// //             Priority:
// //           </label>
// //           <input
// //             type="text"
// //             id="taskPriority"
// //             className="w-[70%] text-md font-normal border-none outline-none"
// //             value={taskPriority}
// //             onChange={(e) => setTaskPriority(e.target.value)}
// //           />
// //           <hr className="mb-3" />

// //           <label className="text-xl text-black font-semibold" htmlFor="status">
// //             Status:
// //           </label>
// //           <input
// //             type="text"
// //             id="status"
// //             className="w-[70%] text-md font-normal border-none outline-none"
// //             value={status}
// //             onChange={(e) => setStatus(e.target.value)}
// //           />
// //           <hr className="mb-3" />

// //           <label className="text-xl text-black font-semibold" htmlFor="assignedTo">
// //             Assigned to:
// //           </label>
// //           <input
// //             type="text"
// //             id="assignedTo"
// //             className="w-[70%] text-md font-normal border-none outline-none"
// //             value={assignedTo.username}
// //             onChange={(e) =>
// //               setAssignedTo({ ...assignedTo, username: e.target.value })
// //             }
// //           />
// //           <hr className="mb-3" />

// //           <h2 className="text-xl text-black font-semibold">Description:</h2>
// //           <textarea
// //             className="w-full border p-3 mb-3"
// //             rows={4}
// //             value={taskDesc}
// //             onChange={(e) => setTaskDesc(e.target.value)}
// //             placeholder="Write detailed information about the task"
// //           ></textarea>

// //           <h2 className="text-xl text-black font-semibold">Attachments:</h2>
// //           <input
// //             type="file"
// //             className="w-64 h-14 border p-3 mb-3"
// //             onChange={(e) => setAttachment(e.target.files[0])}
// //           />
// //         </div>
// //         <div className="text-center mt-7">
// //           <input
// //             className="bg-[#4D989D] text-white px-5 py-3 rounded-md"
// //             type="submit"
// //             value="Create"
// //           />
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddTaskEmployee;
// import React, { useState } from "react";

// const AddTaskEmployee = ({ projectId }) => {
//   const [taskName, setTaskName] = useState("");
//   const [taskDeadline, setTaskDeadline] = useState("");
//   const [taskPriority, setTaskPriority] = useState("");
//   const [taskDesc, setTaskDesc] = useState("");
//   const [status, setStatus] = useState("Todo");
//   const [formData, setFormData] = useState({
//     task_name: "",
//     task_deadline: "",
//     task_priority: "",
//     task_desc: "",
//     status: "",
//     project:parseInt(projectId),
//   });
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   console.log(formData)
//   try {
//         const response = await fetch("http://127.0.0.1:8000/tasks/", {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json'
//         },
//           body:JSON.stringify(formData)
//         });
  
//         if (response.ok) {
//           console.log("Task created successfully!");
//         } else {
//           console.error("Failed to create task:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error creating task:", error);
//       }
// }
//   // const [assignedTo, setAssignedTo] = useState({
//   //   id: 0,
//   //   user: 0,
//   //   username: "",
//   //   image: "",
//   //   role_within_project: "",
//   //   project: projectId,
//   //   profile: 0,
//   // });
//   // const [attachment, setAttachment] = useState(null);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const formData = new FormData();
//   //   formData.append("task_name", taskName);
//   //   formData.append("task_deadline", taskDeadline);
//   //   formData.append("task_priority", taskPriority);
//   //   formData.append("task_desc", taskDesc);
//   //   formData.append("status", status);
//   //   // formData.append("assigned_to", JSON.stringify(assignedTo));
//   //   formData.append("project", projectId);
//   //   // if (attachment) {
//   //   //   formData.append("attachment", attachment);
//   //   // }
//   //   try {
//   //     const response = await fetch("http://127.0.0.1:8000/tasks/", {
//   //       method: "POST",
//   //       body: formData,
//   //     });

//   //     if (response.ok) {
//   //       console.log("Task created successfully!");
//   //     } else {
//   //       console.error("Failed to create task:", response.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error creating task:", error);
//   //   }
//   // };

//   return (
//     <div className="w-[100%] border mt-5 p-5">
//       <div>
//         <h1 className="text-2xl text-black font-bold mb-4">
//           Add New Task - Smart Agile
//         </h1>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label
//             htmlFor="taskName"
//             className="text-xl text-black font-semibold"
//           >
//             Task:
//           </label>
//           <textarea
//             id="taskName"
//             className="w-full border p-3 mb-3"
//             rows={2}
//             name="task_name"
//             // value={taskName}
//             value={formData.task_name}
//             onChange={handleInputChange}
//             // onChange={(e) => setTaskName(e.target.value)}
            
//           ></textarea>

//           <label
//             className="text-xl text-black font-semibold"
//             htmlFor="taskDeadline"
//           >
//             Deadline:
//           </label>
//           <input
//             type="date"
//             id="taskDeadline"
//             className="w-[70%] text-md font-normal border-none outline-none"
//             name="task_deadline"
//             // value={taskDeadline}
//             // onChange={(e) => setTaskDeadline(e.target.value)}
//             value={formData.task_deadline}
//             onChange={handleInputChange}
//           />
//           <hr className="mb-3" />

//            <label
//             className="text-xl text-black font-semibold"
//             htmlFor="assignedTo"
//           >
//             Assigned to:
//           </label>
//           <input
//             type="text"
//             id="assignedTo"
//             className="w-[70%] text-md font-normal border-none outline-none"
         
//             // value={formData.status}
//             //onChange={handleInputChange}
            
//           /> 
//           <hr className="mb-3" />

//           <label
//             className="text-xl text-black font-semibold"
//             htmlFor="taskPriority"
//           >
//             Priority:
//           </label>
//           <input
//             type="text"
//             id="taskPriority"
//             className="w-[70%] text-md font-normal border-none outline-none"
//             name="task_priority"
//             // value={taskPriority}
//             // onChange={(e) => setTaskPriority(e.target.value)}
//             value={formData.task_priority}
//             onChange={handleInputChange}
//           />
//           <hr className="mb-3" />

//           <label className="text-xl text-black font-semibold" htmlFor="status">
//             Status:
//           </label>
//           <input
//             type="text"
//             id="status"
//             className="w-[70%] text-md font-normal border-none outline-none"
//             name="status"
//             // value={status}
//             // onChange={(e) => setStatus(e.target.value)}
//             value={formData.status}
//             onChange={handleInputChange}
//           />
//           <hr className="mb-3" />

     

//           <h2 className="text-xl text-black font-semibold">Description:</h2>
//           <textarea
//             className="w-full border p-3 mb-3"
//             rows={4}
//             name="task_desc"
//             // value={taskDesc}
//             // onChange={(e) => setTaskDesc(e.target.value)}
//             value={formData.task_desc}
//             onChange={handleInputChange}
//             placeholder="Write detailed information about the task"
//           ></textarea>
// {/* 
//           <h2 className="text-xl text-black font-semibold">Attachments:</h2>
//           <input
//             type="file"
//             className="w-64 h-14 border p-3 mb-3"
//             onChange={(e) => setAttachment(e.target.files[0])}
//           /> */}
//         </div>
//         <div className="text-center mt-7">
//           <input
//             className="bg-[#4D989D] text-white px-5 py-3 rounded-md"
//             type="submit"
//             value="Create"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTaskEmployee;
import React, { useState } from 'react';

const AddTaskEmployee = ({ projectId, assignedTo,assignedId }) => {

  const [formData, setFormData] = useState({
    task_name: '',
    task_deadline: '',
    task_priority: '',
    task_desc: '',
    status: '',
    assigned_to:assignedId,
    project: parseInt(projectId),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await fetch('http://127.0.0.1:8000/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log((response.json()))

      if (response.ok) {
        console.log('Task created successfully!');
        
        
      } else {
        console.error('Failed to create task:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="w-[100%] border mt-5 p-5">
      <div>
        <h1 className="text-2xl text-black font-bold mb-4">Add New Task - Smart Agile</h1>
      </div>
      <form onSubmit={handleSubmit}>
     
        <label
           htmlFor="taskName"
           className="text-xl text-black font-semibold"
         >
           Task:
         </label>
         <textarea
           id="taskName"
           className="w-full border p-3 mb-3"
           rows={2}
           name="task_name"
          
           value={formData.task_name}
           onChange={handleInputChange}
           
            
         ></textarea>

         <label
           className="text-xl text-black font-semibold pr-3"
           htmlFor="taskDeadline"
         >
           Deadline:
         </label>
         <input
           type="date"
           id="taskDeadline"
           className="w-[70%] text-md font-normal border-none outline-none"
           name="task_deadline"
          
           value={formData.task_deadline}
           onChange={handleInputChange}
         />
         <hr className="mb-3" />
        
          <label htmlFor="assignedTo" className="text-xl text-black font-semibold pr-3">
            Assign to:
          </label>
          <input
            type="text"
            id="assignedTo"
            // name='assigned_to'
            className="w-[70%] text-md font-normal border-none outline-none"
            value={assignedTo} // Assign the value of assignedTo prop
            disabled // Disable editing
          />
          <hr className="mb-3" />
          <label
             className="text-xl text-black font-semibold pr-3"
             htmlFor="taskPriority"
           >
             Priority:
           </label>
           <input
             type="text"
             id="taskPriority"
             className="w-[70%] text-md font-normal border-none outline-none"
             name="task_priority"
            
             value={formData.task_priority}
             onChange={handleInputChange}
           />
           <hr className="mb-3" />

           <label className="text-xl text-black font-semibold pr-3" htmlFor="status">
             Status:
           </label>
           <input
             type="text"
             id="status"
             className="w-[70%] text-md font-normal border-none outline-none"
             name="status"
            
             value={formData.status}
             onChange={handleInputChange}
           />
           <hr className="mb-3" />

     

           <h2 className="text-xl text-black font-semibold">Description:</h2>
           <textarea
             className="w-full border p-3 mb-3"
             rows={4}
             name="task_desc"
    
             value={formData.task_desc}
             onChange={handleInputChange}
             placeholder="Write detailed information about the task"
           ></textarea>
          
        
        <div className="text-center mt-7">
          <input className="bg-[#4D989D] text-white px-5 py-3 rounded-md" type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default AddTaskEmployee;