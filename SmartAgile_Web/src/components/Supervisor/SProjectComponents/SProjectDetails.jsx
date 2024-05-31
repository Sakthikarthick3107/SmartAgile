
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleInfo, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import SAbstractPopup from '../../Supervisor/SProjectComponents/SAbstractPopup'; // Import the SAbstractPopup component
// import AddTaskEmployee from '../AddTask/AddTaskEmployee'; // Import the AddTaskEmployee component

// const SProjectDetails = () => {
//   const { proj_id } = useParams();
//   const [project, setProject] = useState(null);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [showAbstractPopup, setShowAbstractPopup] = useState(false); // State to control the visibility of the abstract popup
//   const [showAddTaskPopup, setShowAddTaskPopup] = useState(false); // State to control the visibility of the add task popup
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchProjectDetails() {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/projects/${proj_id}`);
//         const data = await response.json();
//         setProject(data);
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//       }
//     }

//     async function fetchTeamMembers() {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${proj_id}`);
//         const data = await response.json();
//         setTeamMembers(data);
       
//       } catch (error) {
//         console.error('Error fetching team members:', error);
//       }
//     }

//     fetchProjectDetails();
//     fetchTeamMembers();
//   }, [proj_id]);

//   if (!project) {
//     return <div>Loading...</div>;
//   }

  

//   return (
//     <div className="p-6 shadow-lg w-full border border-3 rounded-xl overflow-y-auto max-h-[90%]">
//       <button onClick={() => navigate(-1)} className="text-md mb-4 px-4 py-0 bg-[#4D989D]">Back</button>
//       <div className="flex justify-between items-center">
//         <h1 className="font-semibold text-3xl mb-5">Project Details</h1>
//         <div className="flex items-center">
//           {/* Button to open the abstract popup */}
//           <button className="bg-gray-300 mb-5" onClick={() => setShowAbstractPopup(true)}>
//             <FontAwesomeIcon className="pr-2" icon={faCircleInfo} />About Project
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <div className="flex flex-col gap-3">
//           <h2 className="text-xl text-black font-semibold">
//             Project Name: <span className="text-md font-normal">{project.proj_name}</span>
//           </h2>
//           <h2 className="text-xl text-black font-semibold">
//             Project Lead: <span className="text-md font-normal">{project.project_lead}</span>
//           </h2>
//         </div>
//         <div className="flex flex-col gap-2">
//           <h2 className="text-xl text-black font-semibold">
//             Start Date: <span className="text-md font-normal">{project.created_at}</span>
//           </h2>
//           <h2 className="text-xl text-black font-semibold">
//             End Date: <span className="text-md font-normal">{project.proj_deadline}</span>
//           </h2>
//           <h2 className="text-xl text-black font-semibold">
//             Duration: <span className="text-md font-normal">{project.duration}</span>
//           </h2>
//         </div>
//       </div>
//       <div>
//         <h2 className="text-xl text-black font-semibold">
//           Description: <span className="text-md font-normal">{project.proj_desc}</span>
//         </h2>
//       </div>
//       <div>
//         <h2 className="text-xl text-black font-semibold mb-4 mt-4">Team's Details</h2>
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3">S.No</th>
//               <th className="px-6 py-3">Team Members</th>
//               <th className="px-6 py-3">Team Member Roles</th>
//               <th className="px-6 py-3">Progress</th>
//               <th className="px-6 py-3">Actions</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {teamMembers.map((member, index) => (
              
//               <tr key={index} className="bg-white border-b">
//                 <td className="px-6 py-4">{index + 1}</td>
//                 <td className="px-6 py-4">{member.username}</td>
//                 <td className="px-6 py-4">{member.role_within_project}</td>
//                 <td className="px-6 py-4">-</td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-6 align-center mt-1">
//                     <button className="bg-[#4D989D] text-white">View Task</button>
//                     <button className="bg-[#4D989D] text-white" onClick={() => setShowAddTaskPopup(true)}>Add Task</button>
                 
                    
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="text-right">
//           <button className="bg-[#4D989D] text-white mt-6">Manage Tasks</button>
//         </div>
//       </div>

//       {/* Render the abstract popup */}
//       {showAbstractPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 shadow-lg w-[50%] border border-3 rounded-xl overflow-y-auto max-h-[90%]">
//             <div className="text-right">
//               <FontAwesomeIcon className="pr-2 text-xl" icon={faCircleXmark} onClick={() => setShowAbstractPopup(false)} />
//             </div>
//            <SAbstractPopup/>
//           </div>
//         </div>
//       )}

//       {/* Render the add task popup */}
//       {showAddTaskPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 shadow-lg w-[40%] border border-3 rounded-xl overflow-y-auto max-h-[90%]">
//             <div className="text-right">
//               <FontAwesomeIcon className="pr-2 text-xl" icon={faCircleXmark} onClick={() => setShowAddTaskPopup(false)} />
//             </div>
//             <AddTaskEmployee projectId={proj_id} /> {/* Pass projectId as a prop */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SProjectDetails;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import SAbstractPopup from '../../Supervisor/SProjectComponents/SAbstractPopup';
import AddTaskEmployee from '../AddTask/AddTaskEmployee';

const SProjectDetails = () => {
  const { proj_id } = useParams();
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showAbstractPopup, setShowAbstractPopup] = useState(false);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null); // State to store selected team member
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/projects/${proj_id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }

    async function fetchTeamMembers() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${proj_id}`);
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }

    fetchProjectDetails();
    fetchTeamMembers();
  }, [proj_id]);

  const handleAddTaskClick = (member) => {
    setSelectedMember(member); // Set the selected member
    console.log(member)
    setShowAddTaskPopup(true);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 shadow-lg w-full border border-3 rounded-xl overflow-y-auto max-h-[90%]">
      <button onClick={() => navigate(-1)} className="text-md mb-4 px-4 py-0 bg-[#4D989D]">Back</button>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl mb-5">Project Details</h1>
        <div className="flex items-center">
          <button className="bg-gray-300 mb-5" onClick={() => setShowAbstractPopup(true)}>
            <FontAwesomeIcon className="pr-2" icon={faCircleInfo} />About Project
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl text-black font-semibold">
            Project Name: <span className="text-md font-normal">{project.proj_name}</span>
          </h2>
          <h2 className="text-xl text-black font-semibold">
            Project Lead: <span className="text-md font-normal">{project.project_lead}</span>
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl text-black font-semibold">
            Start Date: <span className="text-md font-normal">{project.created_at}</span>
          </h2>
          <h2 className="text-xl text-black font-semibold">
            End Date: <span className="text-md font-normal">{project.proj_deadline}</span>
          </h2>
          <h2 className="text-xl text-black font-semibold">
            Duration: <span className="text-md font-normal">{project.duration}</span>
          </h2>
        </div>
      </div>
      <div>
        <h2 className="text-xl text-black font-semibold">
          Description: <span className="text-md font-normal">{project.proj_desc}</span>
        </h2>
      </div>
      <div>
        <h2 className="text-xl text-black font-semibold mb-4 mt-4">Team's Details</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Team Members</th>
              <th className="px-6 py-3">Team Member Roles</th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{member.username}</td>
                <td className="px-6 py-4">{member.role_within_project}</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">
                  <div className="flex gap-6 align-center mt-1">
                    <button className="bg-[#4D989D] text-white">View Task</button>
                    <button className="bg-[#4D989D] text-white" onClick={() => handleAddTaskClick(member)}>
                      Add Task
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right">
          <button className="bg-[#4D989D] text-white mt-6">Manage Tasks</button>
        </div>
      </div>

      {showAbstractPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 shadow-lg w-[50%] border border-3 rounded-xl overflow-y-auto max-h-[90%]">
            <div className="text-right">
              <FontAwesomeIcon className="pr-2 text-xl" icon={faCircleXmark} onClick={() => setShowAbstractPopup(false)} />
            </div>
            <SAbstractPopup />
          </div>
        </div>
      )}

      {showAddTaskPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 shadow-lg w-[40%] border border-3 rounded-xl overflow-y-auto max-h-[90%]">
            <div className="text-right">
              <FontAwesomeIcon className="pr-2 text-xl" icon={faCircleXmark} onClick={() => setShowAddTaskPopup(false)} />
            </div>
            <AddTaskEmployee projectId={proj_id} assignedTo={selectedMember ? selectedMember.username : ''} assignedId ={selectedMember.id}  />
          </div>
        </div>
      )}
    </div>
  );
};

export default SProjectDetails
