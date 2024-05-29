import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane,faPaperclip, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

function TeamDetails() {
  const [messages, setMessages] = useState([
    { text: "Hello!", user: "other" },
    { text: "How are you?", user: "other" },
    { text: "I'm fine, thank you!", user: "self" },
    { text: "Great! Let's catch up later.", user: "other" },
  ]);

  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");
  const [projectDetails, setProjectDetails] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0); // State to hold max width
  const [userProfile, setUserProfile] = useState({}); // State to hold user profile information
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null); // State to hold the selected message
  const [showOptions, setShowOptions] = useState(false);


  // Create a ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  const goBack = () => {
    window.location.href = '/chat';
  };

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (input.trim()) {
  //     setMessages([...messages, { text: input, user: "self" }]);
  //     setInput("");
  //   }
  // };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const handleImageClick = (imageUrl) => {
      setSelectedImage(imageUrl);
    };
    
    const handleCloseImage = () => {
      setSelectedImage(null);
    };
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()|| file) {
      const newMessage = {
        text: input,
        user: "self",
        timestamp: new Date().toISOString(), // Add timestamp when the message is sent
        file: file ? URL.createObjectURL(file) : null, // Create a URL for the file if it exists
        fileName: file ? file.name : null, // Store the file name
        fileType: file ? file.type : null // Store the file type
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setFile(null);
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId) {
          const response = await fetch(`http://127.0.0.1:8000/users/employees/${userId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const projectId = localStorage.getItem("project_id");
      if (projectId) {
        const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${projectId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeamMembers(data);
        setShowTeamMembers(true);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleTeamMemberClick = (username) => {
    setInput(`${input}<span style="font-weight: bold;">@${username}</span> `);
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
          <div key={index} className="mb-4">
            {message.user === "self" && userProfile && (
              <div className="flex items-center justify-end mb-1">
                <div className="flex items-center">
                <span className="text-sm font-bold mr-2">You</span>
                  {userProfile.image && (
                    <img src={userProfile.image} alt="Profile" className="w-7 h-7 rounded-full " />
                  )}
                  {/* <span className="text-sm font-bold">You</span> */}
                </div>
              </div>
            )}
            <div
              className={`rounded p-2 ${
                message.user === "self"
                  ? "bg-[#D9D9D9] ml-auto rounded-lg rounded-tr-none mr-8 self-message"
                  : "bg-[#4D989D] mr-auto rounded-lg rounded-tl-none ml-8 other-message"
              }`}
              style={{
                justifySelf: message.user === "self" ? 'flex-end' : 'flex-start',
                minWidth: '50px', // Set a minimum width for the message bubble
                width: 'max-content', // Set a fixed width for all messages, adjust as needed
                maxWidth: `${maxWidth}px`,
                position: 'relative',
              }}
              onClick={() => {
                setSelectedMessage(message);
                setShowOptions(true);
              }}
            >
              {/* {message.text} */}
              <div className="mt-1">{message.text}</div>

                {/* Sending file to the chat */}

                {message.file && (
                    <div className="mt-2 flex items-center">
                        {message.fileType.startsWith("image/") ? (
                            <img src={message.file} alt={message.fileName} className="max-w-xs rounded" onClick={() => handleImageClick(message.file)} />
                        ) : (
                            <a href={message.file} target="_blank" rel="noopener noreferrer" className="flex items-center">                               
                                <span className="text-blue-500 hover:underline">{message.fileName}</span>
                            </a>
                        )}
                    </div>
                )}

                

              <div className={`text-xs text-gray-500 font-semibold mt-3 absolute  ${message.user === "self" ? 'left-0' : 'right-0'} `}>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              
            </div>
            
            
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
            className="w-full p-3 pl-9 bg-gray-200  border-none rounded-full focus:outline-none"
          />

{file && (
      <div className="flex items-center ml-4 mt-2 absolute bottom-12  ">
        <span className="text-sm font-semibold mr-2">{file.name}</span>
        <button
          type="button"
          onClick={() => setFile(null)}
          className="text-red-500 p-1 pb-1 hover:underline bg-white focus:outline-none"
        >
          Remove
        </button>
      </div>
    )}
          

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer">
      {/* Add your attachment symbol/icon here */}
      {/* Example: */}
      <label htmlFor="fileInput">
        <FontAwesomeIcon icon={faPaperclip} size="lg" className="text-gray-700 hover:text-gray-900" />
        {/* Hide input element */}
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept=".docx,.doc,.pdf,.xls,.ppt,image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
    
          {showTeamMembers && (
            <div ref={dropdownRef} className="absolute bottom-14 bg-white border border-gray-300 rounded-lg mt-2 max-h-32 overflow-y-auto w-48 z-10 p-2">
            {teamMembers.map(member => (
              <div
                key={member.user}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleTeamMemberClick(member.username)}
              >
                <div className="flex items-center">
                  {/* {member.image && (
                    <img src={member.image} alt={member.username} className="w-6 h-6 rounded-full mr-2" />
                  )} */}
                  <span>{member.username}</span>
                </div>
              </div>
            ))}
            
 
          </div>
        )}
      </div>
      <button
        type="submit"
        className="ml-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-3 button"
      >
        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
      </button>
    </form>
  </div>
);
}

export default TeamDetails;



