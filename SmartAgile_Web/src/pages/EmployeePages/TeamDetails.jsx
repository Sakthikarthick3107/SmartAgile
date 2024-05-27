// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// function TeamDetails() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [projectDetails, setProjectDetails] = useState({});
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [showTeamMembers, setShowTeamMembers] = useState(false);

//   const goBack = () => {
//     window.location.href = '/chat';
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages([...messages, { text: input, user: "self" }]);
//       setInput("");
//     }
//   };

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const projectId = localStorage.getItem("project_id");
//         if (projectId) {
//           const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}`);
//           const data = await response.json();
//           if (data.icon) {
//             data.icon = `http://127.0.0.1:8000${data.icon}`;
//           }
//           setProjectDetails(data);
//         }
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       }
//     };

//     fetchProjectDetails();
//   }, []);

//   const fetchTeamMembers = async () => {
//     try {
//       const projectId = localStorage.getItem("project_id");
//       if (projectId) {
//         const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${projectId}`);
//         const data = await response.json();
//         setTeamMembers(data);
//         setShowTeamMembers(true);
//       }
//     } catch (error) {
//       console.error("Error fetching team members:", error);
//     }
//   };

//   const handleTeamMemberClick = (username) => {
//     setInput(`${input}@${username} `);
//     setShowTeamMembers(false);
//   };

//   return (
//     <div className="flex border flex-col pr-2 pl-2 rounded-md h-screen">
//        <div className="flex items-center justify-between pt-4 pl-4">
//         <div className="flex items-center">
//           <FontAwesomeIcon onClick={goBack} className="hover:text-gray-500" icon={faArrowLeft} size="md" />
//           {projectDetails && (
//             <div className="flex items-center ml-2">
//               <img src={projectDetails.icon} alt="Project Logo" className="w-10 h-10 ml-1 mr-4" />
//               <span className="text-xl font-bold">{projectDetails.proj_name}</span>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto p-4 border-gray-300 bg-white">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`rounded p-2 my-2 max-w-xs ${
//               message.user === "self"
//                 ? "bg-blue-300 ml-auto"
//                 : "bg-gray-200 mr-auto"
//             }`}
//           >
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <form className="flex items-center pl-8 pr-12 pb-32 relative" onSubmit={sendMessage}>
//         <div className="relative flex-grow">
//           <span
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black-200"
//             style={{ fontSize: '20px', fontWeight: 'bold' }}
//             onClick={fetchTeamMembers}
//           >
//             @
//           </span>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message..."
//             className="w-full p-3 pl-9 bg-[#DBDBDB] border-none rounded-full focus:outline-none"
//           />
//           {showTeamMembers && (
//             <div className="absolute bottom-14 bg-white border border-gray-300 rounded-lg mt-2 max-h-32 overflow-y-auto w-48 z-10 p-2">
//               {teamMembers.map(member => (
//                 <div
//                   key={member.id}
//                   className="p-2 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleTeamMemberClick(member.username)}
//                 >
//                   {member.username}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="ml-2 bg-[#4D989D] hover:bg-blue-700 text-white rounded-full p-2"
//           style={{ outline: 'none' }}
//         >
//           <FontAwesomeIcon icon={faPaperPlane} size="lg" />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default TeamDetails;



// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import '../../App.css';

// function TeamDetails() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [projectDetails, setProjectDetails] = useState({});
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [showTeamMembers, setShowTeamMembers] = useState(false);
//   const [maxWidth, setMaxWidth] = useState(0); // State to hold max width
  
//   // Create a ref to detect clicks outside the dropdown
//   const dropdownRef = useRef(null);

//   const goBack = () => {
//     window.location.href = '/chat';
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages([...messages, { text: input, user: "self" }]);
//       setInput("");
//     }
//   };

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const projectId = localStorage.getItem("project_id");
//         if (projectId) {
//           const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}`);
//           const data = await response.json();
//           if (data.icon) {
//             data.icon = `http://127.0.0.1:8000${data.icon}`;
//           }
//           setProjectDetails(data);
//         }
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       }
//     };

//     fetchProjectDetails();
//   }, []);

//   const fetchTeamMembers = async () => {
//     try {
//       const projectId = localStorage.getItem("project_id");
//       if (projectId) {
//         const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${projectId}`);
//         const data = await response.json();
//         setTeamMembers(data);
//         setShowTeamMembers(true);
//       }
//     } catch (error) {
//       console.error("Error fetching team members:", error);
//     }
//   };

//   const handleTeamMemberClick = (username) => {
//     setInput(`${input}@${username} `);
//     setShowTeamMembers(false);
//   };

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowTeamMembers(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownRef]);

//   useEffect(() => {
//     setMaxWidth(Math.min(window.innerWidth * 0.5, 500)); // Adjust 500 as desired max width
//   }, []);

//   return (
//     <div className="flex flex-col h-screen border rounded-md p-2">
//       <div className="flex items-center justify-between pt-4 pl-4">
//         <div className="flex items-center">
//           <FontAwesomeIcon onClick={goBack} className="hover:text-gray-500 cursor-pointer" icon={faArrowLeft} size="md" />
//           {projectDetails && (
//             <div className="flex items-center ml-2">
//               <img src={projectDetails.icon} alt="Project Logo" className="w-10 h-10 ml-1 mr-4" />
//               <span className="text-xl font-bold">{projectDetails.proj_name}</span>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto p-4 bg-white border-gray-300">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`rounded p-2 my-2 max-w-xs ${
//               message.user === "self"
//                 ? "bg-[#D9D9D9] ml-auto rounded-l rounded-tr-none self-message"
//                 : "bg-[#4D989D] mr-auto other-message"
//             }`}
//             style={{
//               justifySelf: 'flex-end',
//               maxWidth: '50%', // Set the maximum width to 50% of the screen width
//               width: `${Math.min(message.text.length * 12, window.innerWidth * 0.5)}px` // Limit width to 50% of screen width or message length, whichever is smaller
//             }}
//           >
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <form className="flex items-center pl-8 pr-12 pb-32 relative" onSubmit={sendMessage}>
//         <div className="relative flex-grow">
//           <span
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
//             style={{ fontSize: '20px', fontWeight: 'bold' }}
//             onClick={fetchTeamMembers}
//           >
//             @
//           </span>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message..."
//             className="w-full p-3 pl-9 bg-gray-200 border-none rounded-full focus:outline-none"
//           />
//           {showTeamMembers && (
//             <div ref={dropdownRef} className="absolute bottom-14 bg-white border border-gray-300 rounded-lg mt-2 max-h-32 overflow-y-auto w-48 z-10 p-2">
//               {teamMembers.map(member => (
//                 <div
//                   key={member.id}
//                   className="p-2 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleTeamMemberClick(member.username)}
//                 >
//                   {member.username}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="ml-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2"
//         >
//           <FontAwesomeIcon icon={faPaperPlane} size="lg" />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default TeamDetails;



// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import '../../App.css';

// function TeamDetails() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [projectDetails, setProjectDetails] = useState({});
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [showTeamMembers, setShowTeamMembers] = useState(false);
//   const [maxWidth, setMaxWidth] = useState(0); // State to hold max width

//   // Create a ref to detect clicks outside the dropdown
//   const dropdownRef = useRef(null);

//   const goBack = () => {
//     window.location.href = '/chat';
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages([...messages, { text: input, user: "self" }]);
//       setInput("");
//     }
//   };

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const projectId = localStorage.getItem("project_id");
//         if (projectId) {
//           const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}`);
//           const data = await response.json();
//           if (data.icon) {
//             data.icon = `http://127.0.0.1:8000${data.icon}`;
//           }
//           setProjectDetails(data);
//         }
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       }
//     };

//     fetchProjectDetails();
//   }, []);

//   const fetchTeamMembers = async () => {
//     try {
//       const projectId = localStorage.getItem("project_id");
//       if (projectId) {
//         const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${projectId}`);
//         const data = await response.json();
//         setTeamMembers(data);
//         setShowTeamMembers(true);
//       }
//     } catch (error) {
//       console.error("Error fetching team members:", error);
//     }
//   };

//   const handleTeamMemberClick = (username) => {
//     setInput(`${input}@${username} `);
//     setShowTeamMembers(false);
//   };

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowTeamMembers(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownRef]);

//   // Calculate max width with slight delay to allow re-rendering
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setMaxWidth(Math.min(window.innerWidth * 0.5, 500)); // Adjust 500 as desired max width
//     }, 100); // Adjust delay as needed
//     return () => clearTimeout(timer);
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen border rounded-md p-2">
//       <div className="flex items-center justify-between pt-4 pl-4">
//         <div className="flex items-center">
//           <FontAwesomeIcon onClick={goBack} className="hover:text-gray-500 cursor-pointer" icon={faArrowLeft} size="md" />
//           {projectDetails && (
//             <div className="flex items-center ml-2">
//               <img src={projectDetails.icon} alt="Project Logo" className="w-10 h-10 ml-1 mr-4" />
//               <span className="text-xl font-bold">{projectDetails.proj_name}</span>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto p-4 bg-white border-gray-300">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`rounded p-2 my-2 max-w-xs ${
//               message.user === "self"
//                 ? "bg-[#D9D9D9] ml-auto rounded-l rounded-tr-none self-message"
//                 : "bg-[#4D989D] mr-auto rounded-l rounded-tl-none other-message"
//             }`}
//             style={{
//               justifySelf: message.user === "self" ? 'flex-end' : 'flex-start',
//               minWidth: '50px', // Set a minimum width for the message bubble
//               width: 'max-content', // Set a fixed width for all messages, adjust as needed
//               maxWidth: `${maxWidth}px`
//             }}
//           >
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <form className="flex items-center pl-8 pr-12 pb-32 relative" onSubmit={sendMessage}>
//         <div className="relative flex-grow">
//           <span
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
//             style={{ fontSize: '20px', fontWeight: 'bold' }}
//             onClick={fetchTeamMembers}
//           >
//             @
//           </span>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message..."
//             className="w-full p-3 pl-9 bg-gray-200 border-none rounded-full focus:outline-none"
//           />
//           {showTeamMembers && (
//             <div ref={dropdownRef} className="absolute bottom-14 bg-white border border-gray-300 rounded-lg mt-2 max-h-32 overflow-y-auto w-48 z-10 p-2">
//               {teamMembers.map(member => (
//                 <div
//                   key={member.id}
//                   className="p-2 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleTeamMemberClick(member.username)}
//                 >
//                   {member.username}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="ml-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2"
//         >
//           <FontAwesomeIcon icon={faPaperPlane} size="lg" />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default TeamDetails;



import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

function TeamDetails() {
  const [messages, setMessages] = useState([
    { text: "Hello!", user: "other" },
    { text: "How are you?", user: "other" },
    { text: "I'm fine, thank you!", user: "self" },
    { text: "Great! Let's catch up later.", user: "other" },
  ]);
  const [input, setInput] = useState("");
  const [projectDetails, setProjectDetails] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0); // State to hold max width

  // Create a ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  const goBack = () => {
    window.location.href = '/chat';
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, user: "self" }]);
      setInput("");
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectId = localStorage.getItem("project_id");
        if (projectId) {
          const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}`);
          const data = await response.json();
          if (data.icon) {
            data.icon = `http://127.0.0.1:8000${data.icon}`;
          }
          setProjectDetails(data);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const projectId = localStorage.getItem("project_id");
      if (projectId) {
        const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${projectId}`);
        const data = await response.json();
        setTeamMembers(data);
        setShowTeamMembers(true);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleTeamMemberClick = (username) => {
    setInput(`${input}@${username} `);
    setShowTeamMembers(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTeamMembers(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Calculate max width with slight delay to allow re-rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setMaxWidth(Math.min(window.innerWidth * 0.5, 500)); // Adjust 500 as desired max width
    }, 100); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className="flex flex-col h-screen border rounded-md p-2">
      <div className="flex items-center justify-between pt-4 pl-4">
        <div className="flex items-center">
          <FontAwesomeIcon onClick={goBack} className="hover:text-gray-500 cursor-pointer" icon={faArrowLeft} size="md" />
          {projectDetails && (
            <div className="flex items-center ml-2">
              <img src={projectDetails.icon} alt="Project Logo" className="w-10 h-10 ml-1 mr-4" />
              <span className="text-xl font-bold">{projectDetails.proj_name}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-white border-gray-300">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded p-2 my-2 ${
              message.user === "self"
                ? "bg-[#D9D9D9] ml-auto rounded-lg rounded-tr-none self-message"
                : "bg-[#4D989D] mr-auto rounded-lg rounded-tl-none other-message"
            }`}
            style={{
              justifySelf: message.user === "self" ? 'flex-end' : 'flex-start',
              minWidth: '50px', // Set a minimum width for the message bubble
              width: 'max-content', // Set a fixed width for all messages, adjust as needed
              maxWidth: `${maxWidth}px`
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="flex items-center pl-8 pr-12 pb-32 relative" onSubmit={sendMessage}>
        <div className="relative flex-grow">
          <span
            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
            style={{ fontSize: '20px', fontWeight: 'bold' }}
            onClick={fetchTeamMembers}
          >
            @
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-3 pl-9 bg-gray-200 border-none rounded-full focus:outline-none"
          />
          {showTeamMembers && (
            <div ref={dropdownRef} className="absolute bottom-14 bg-white border border-gray-300 rounded-lg mt-2 max-h-32 overflow-y-auto w-48 z-10 p-2">
              {teamMembers.map(member => (
                <div
                  key={member.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleTeamMemberClick(member.username)}
                >
                  {member.username}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="ml-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2"
        >
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </form>
    </div>
  );
}

export default TeamDetails;