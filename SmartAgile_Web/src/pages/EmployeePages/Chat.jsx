// import React from "react";

// function Chat() {
//   return (
//     <div className="flex flex-col  w-[100%] h-[100%] max-md:ml-0 max-md:w-full pt-5 pl-3 pr-3 pb-5 shadow-[0px_0px_4px_rgba(0.35,0.35,0.35,0.35)]">

//       <div className="flex flex-1 flex-col   max-md:w-full flex flex-col  pt-6 pr-5 pl-2   rounded-xl bg-slate-50 shadow-[0px_0px_4px_rgba(0.35,0.35,0.35,0.35)]  ">
//         <div className="flex gap-5 w-full max-md:flex-wrap max-md:pr-9 max-md:max-w-full">
//           <div className="flex-auto pl-4 text-3xl font-semibold text-black">
//             Groups
//           </div>
//           <div className="flex gap-5 justify-between self-start">
//             <img
//               loading="lazy"
//               srcSet="..."
//               className="shrink-0 self-start aspect-square w-[31px]"
//             />
//             <img
//               loading="lazy"
//               srcSet="..."
//               className="shrink-0 aspect-square w-[34px]"
//             />
//           </div>
//         </div>
//         <div className="shrink-0 mt-3.5 h-px bg-black border border-black border-solid max-md:max-w-full" />
//         <div className="flex gap-5 items-start px-6 pt-4 pb-3 mt-5 ml-3 text-2xl font-semibold text-black rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)] max-md:flex-wrap max-md:px-5">
//           <img
//             loading="lazy"
//             srcSet="..."
//             className="shrink-0 self-start w-14 aspect-[1.05] fill-red-300 fill-opacity-60"
//           />
//           <div className="flex-auto my-auto max-md:max-w-full">Team A</div>
//         </div>
//         <div className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)] max-md:flex-wrap max-md:px-5">
//           <img
//             loading="lazy"
//             srcSet="..."
//             className="shrink-0 self-start w-14 aspect-[1.05] fill-green-200"
//           />
//           <div className="flex-auto my-auto max-md:max-w-full">Team B</div>
//         </div>

//         <div className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)] max-md:flex-wrap max-md:px-5">
//           <img
//             loading="lazy"
//             srcSet="..."
//             className="shrink-0 self-start w-14 aspect-[1.05] fill-orange-300"
//           />
//           <div className="flex-auto my-auto max-md:max-w-full">Team C</div>
//         </div>
//         <div className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)] max-md:flex-wrap max-md:px-5">
//           <img
//             loading="lazy"
//             srcSet="..."
//             className="shrink-0 self-start w-14 aspect-[1.05] fill-orange-300"
//           />
//           <div className="flex-auto my-auto max-md:max-w-full">Team D</div>
//         </div>
//         <div className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)] max-md:flex-wrap max-md:px-5">
//           <img
//             loading="lazy"
//             srcSet="..."
//             className="shrink-0 self-start w-14 aspect-[1.05] fill-orange-300"
//           />
//           <div className="flex-auto my-auto max-md:max-w-full">Team E</div>
//         </div>
//         <div className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)] max-md:flex-wrap max-md:px-5">
//           <img
//             loading="lazy"
//             srcSet="..."
//             className="shrink-0 self-start w-14 aspect-[1.05] fill-orange-300"
//           />
//           <div className="flex-auto my-auto max-md:max-w-full">Team F</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chat;

// import React from "react";
// import { Link } from "react-router-dom"; // Assuming future routing for team selection

// function Chat() {
//   const teams = [
//     { id: "SmartAgile", color: "red-300" },
//     { id: "E-Vision", color: "green-200" },
//     { id: "Eye Point", color: "orange-300" },
//     { id: "LogiShare", color: "blue-300" },
//   ];

//   return (
//     <div className="flex flex-col w-full h-full pt-5 pl-3 pr-3 pb-5 shadow-[0px_0px_4px_rgba(0,0,0,0.35)]">
//       <div className="flex flex-1 flex-col pt-6 pr-5 pl-2 rounded-xl bg-slate-50 shadow-[0px_0px_4px_rgba(0,0,0,0.35)]">
//         <div className="flex gap-5 w-full">
//           <div className="flex-auto pl-4 text-3xl font-semibold text-black">
//             Teams
//           </div>
//           {/* Placeholder for future buttons or icons */}
//           <div className="flex gap-5 justify-between">
//             {/* Icons or additional navigation options */}
//           </div>
//         </div>
//         <div className="mt-3.5 h-px bg-black" />

//         {/* List of teams */}
//         {teams.map((team) => (
//           <div
//             key={team.id}
//             className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)]"
//           >
//             <div
//               style={{ backgroundColor: 'rgba(77, 152, 157, 0.5)', width: '50px', height: '50px', borderRadius: '50%' ,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'}}
//               className="shrink-0 self-start"
//             ></div>
//             <div className="flex-auto my-auto">Team {team.id}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Chat;

// import React from "react";
// import smartAgileIcon from '../../assets/Smart_agile.png';
// import eVisionIcon from '../../assets/Eye_point.png';
// import eyePointIcon from '../../assets/e_Vision.png';
// import logiShareIcon from '../../assets/Logishare.png';

// function Chat() {
//   const teams = [
//     { id: "SmartAgile", color: "red-300", icon: smartAgileIcon },
//     { id: "E-Vision", color: "green-200", icon:eVisionIcon },
//     { id: "Eye Point", color: "orange-300", icon: eyePointIcon },
//     { id: "LogiShare", color: "blue-300", icon: logiShareIcon },
//   ];

//   return (
//     <div className="flex flex-col w-full h-full pt-5 pl-3 pr-3 pb-5 shadow-[0px_0px_4px_rgba(0,0,0,0.35)]">
//       <div className="flex flex-1 flex-col pt-6 pr-5 pl-2 rounded-xl bg-slate-50 shadow-[0px_0px_4px_rgba(0,0,0,0.35)]">
//         <div className="flex gap-5 w-full">
//           <div className="flex-auto pl-4 text-3xl font-semibold text-black">
//             Teams
//           </div>
//         </div>
//         <div className="mt-3.5 h-px bg-black" />
//         {teams.map((team) => (
//           <div
//             key={team.id}
//             className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)]"
//           >
//             <div
//               className="shrink-0 self-start w-14 h-14 rounded-full flex justify-center items-center"
//               style={{ backgroundColor: 'rgba(77, 152, 157, 0.5)', width: '50px', height: '50px', borderRadius: '50%' ,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
//             >
//               <img src={team.icon} alt={`${team.id} Logo`} className="w-10 h-10" />
//             </div>
//             <div className="flex-auto my-auto">Team {team.id}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Chat;





import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Chat() {
  const navigate = useNavigate();
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem("user_id");

        // Fetch user's projects data
        const response = await fetch(`http://127.0.0.1:8000/projects/user-projects/${userId}`);
        const data = await response.json();

        const projectsWithFullIconPaths = data.map(project => {
          return {
            ...project,
            icon: `http://127.0.0.1:8000${project.icon}` // Assuming the server serves static files at this URL
          };
        });

        setUserProjects(projectsWithFullIconPaths);
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };

    fetchUserProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    // Navigating to the project details page
    navigate(`/chat/${projectId}`);
  };

  return (
    <div className="flex flex-col w-full h-full pt-5 pl-3 pr-3 pb-5 shadow-[0px_0px_4px_rgba(0,0,0,0.35)]">
      <div className="flex flex-1 flex-col pt-6 pr-5 pl-2 rounded-xl bg-slate-50 shadow-[0px_0px_4px_rgba(0,0,0,0.35)]">
        <div className="flex gap-5 w-full">
          <div className="flex-auto pl-4 text-3xl font-semibold text-black">
            Teams
          </div>
        </div>
        <div className="mt-3.5 h-px bg-black" />
        {userProjects.map(project => (
          <div
            key={project.proj_id}
            className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black text-xl rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)]"
            onClick={() => handleProjectClick(project.proj_id)}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="shrink-0 self-start w-10 h-10 rounded-full flex justify-center items-center overflow-hidden "
              // style={{ backgroundColor: `rgba(77, 152, 157, 0.5)` }}
            >
              <img
                src={project.icon}
                alt={`${project.proj_name} Logo`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="flex-auto my-auto">{project.proj_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
