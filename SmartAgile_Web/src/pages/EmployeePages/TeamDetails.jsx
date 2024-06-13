import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane,faPaperclip, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import {Avatar, Modal, Box} from '@mui/material';

function TeamDetails() {
  const [messages, setMessages] = useState([]);

  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");
  const [projectDetails, setProjectDetails] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const websocket = useRef(null);
  const messagesEndRef = useRef(null);
  const [projectMemberId, setProjectMemberId] = useState(null);
  const [maxWidth, setMaxWidth] = useState(0); // State to hold max width
  // const [userProfile, setUserProfile] = useState({}); // State to hold user profile information
  const [selectedMessage, setSelectedMessage] = useState(null); // State to hold the selected message
  const [showOptions, setShowOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
 

  // Create a ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  const goBack = () => {
    window.location.href = '/chat';
  };
  const baseUrl = 'http://127.0.0.1:8000';

  const userId = JSON.parse(localStorage.getItem("user_id"));
  const projectId = JSON.parse(localStorage.getItem("project_id"));
  const chatroomId = JSON.parse(localStorage.getItem('chatroom_id'));

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({bottom:0, behavior: 'smooth'});
  };

  const handleFileChange = (e) => {
    const {files} = e.target;
    if(files.length > 0){
      setFile(files[0]);
      sendMessage(null, files[0]);
    }
  };


  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);

  //   const handleImageClick = (imageUrl) => {
  //     setSelectedImage(imageUrl);
  //   };
    
  //   const handleCloseImage = () => {
  //     setSelectedImage(null);
  //   };
  // };

  useEffect(() => {
    const fetchMessages = async () => {
      try{
        const response = await fetch(`${baseUrl}/chat/chatroom/${chatroomId}/messages/`);
        const data = await response.json();
        setMessages(data);
        scrollToBottom();

        const memberId = await fetch(`${baseUrl}/projects/user-details/${userId}/${projectId}/`);
        const memberIdData = await memberId.json();
        if(Array.isArray(memberIdData) && memberIdData.length > 0){
          const firstMemberData = memberIdData[0];
          const memberIdDetails = firstMemberData.id;
          setProjectMemberId(memberIdDetails);
        }else{
          console.log('Error getting project member id');
        }
      }catch(e){
        console.error('Error fetching messages', e);
      }
    };
    
    fetchMessages();
  }, [chatroomId]);

  useEffect(() => {
    scrollToBottom();
  });

  
  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chatroom/${chatroomId}/`);

    socket.onopen = () => {
      console.log('Websocket connection established');
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.onclose = (e) => {
      console.log('Websocket connection closed', e);
    }

    socket.onerror = (e) => {
      console.log('Websocket error', e)
    };

    websocket.current = socket;

    return () => {
      if(websocket.current){
        websocket.current.close();
      }
    };
  }, [messages]);

  const sendMessage = (e, selectedFile = null) => {
    if(e) e.preventDefault();
    
    const messageText = input.trim();
    const messageFile = selectedFile || file;

    if(messageText !== '' || messageFile){
      const messageData = {
        chatroom : chatroomId,
        sender : projectMemberId,
      };

      if(messageText){
        messageData.message = messageText;
        sendToWebSocket(messageData);
        setInput('');
      };

      if(messageFile){
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64File = event.target.result.split(',')[1];
          messageData.file = base64File;
          messageData.file_name = messageFile.name;
          sendToWebSocket(messageData);
        };
        reader.readAsDataURL(messageFile);
        setFile(null);
      };
    }
  };

  const sendToWebSocket = (messageData) => {
    if(websocket.current.readyState === WebSocket.OPEN){
      websocket.current.send(JSON.stringify(messageData));
      console.log('Message sent', messageData);
      setInput('');
      setFile(null);
    }else{
      console.error('Websocket is not open');
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectId = localStorage.getItem("project_id");
        if (projectId) {
          const response = await fetch(`${baseUrl}/projects/${projectId}`);
          const data = await response.json();
          if (data.icon) {
            data.icon = `${baseUrl}${data.icon}`;
          }
          setProjectDetails(data);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, []);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       if (userId) {
  //         const response = await fetch(`${baseUrl}/users/employees/${userId}`);
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setUserProfile(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error);
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);

  const fetchTeamMembers = async () => {
    try {
      if (projectId) {
        const response = await fetch(`${baseUrl}/projects/project-members/${projectId}`);
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

  const messageTime = (sentAt) => {
    const time = new Date(sentAt);
    const formattedTime = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
    return formattedTime;
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const modalStyle = {
    position : 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: '95%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
    border: '8px solid rgba(0,0,0,0.4)',
  };


  const handleRightClick = (message) => {
    setSelectedMessage(message);
    setShowOptions(true); // Show the delete option
  };
  
  // Function to delete the selected message
  const deleteMessage = async () => {
    try {
      // Perform deletion action (e.g., make API call to delete the message)
      await fetch(`${baseUrl}/chat/chatroom/${chatroomId}/message/${selectedMessage.id}`, {
        method: 'DELETE',
      });
      // Remove the deleted message from the UI
      setMessages(messages.filter(msg => msg.id !== selectedMessage.id));
      // Hide the delete confirmation modal
      setShowDeleteConfirmation(false);
      setSelectedMessage(null); // Reset the selected message
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  




  return (
    <div className="flex border flex-col pr-2 pl-2 rounded-md h-screen">
       <div className="flex items-center justify-between pt-4 pl-4">
        <div className="flex items-center">
          <FontAwesomeIcon onClick={goBack} className="hover:text-gray-500" icon={faArrowLeft} size="lg" />
          {projectDetails && (
            <div className="flex items-center ml-2">
              <img src={projectDetails.icon} alt="Project Logo" className="w-10 h-10 ml-1 mr-4" />
              <span className="text-xl font-bold">{projectDetails.proj_name}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 border-gray-300 bg-white">
        {messages.map((message, index) => (
          <div key={index} className="mb-4"  onContextMenu={(e) => {
            e.preventDefault();
            handleRightClick(message); // Handle right-click on the message
          }}>
            {message.user_id === userId
            ? <div className="flex items-center justify-end mb-1">
              <div className="flex items-center">
                <span className="text-sm font-bold mr-2 text-black">You</span>
                <Avatar src={`${baseUrl}/media/${message.user_image}`} alt={message.username} />
              </div>
            </div>
            : <div className="flex items-center justify-start mb-1">
            <div className="flex items-center">
              <Avatar src={`${baseUrl}/media/${message.user_image}`} alt={message.username} />
              <span className="text-sm font-bold ml-2 text-black">{message.username}</span>
            </div>
          </div>
            }
            <div className={` ${message.message ? 'p-2' : 'p-0'} rounded ${
                message.user_id === userId 
                  ? "bg-[#D9D9D9] ml-auto rounded-lg rounded-tr-none mr-8 self-message"
                  : "bg-[#4D989D] mr-auto rounded-lg rounded-tl-none ml-8 other-message"
              }`}
              style={{
                justifySelf: message.user_id === userId ? 'flex-end' : 'flex-start',
                minWidth: '50px', // Set a minimum width for the message bubble
                width: 'max-content', // Set a fixed width for all messages, adjust as needed
                maxWidth: `${maxWidth}px`,
                position: 'relative',
              }}><div className="mt-1">{message.message}</div>
              <div className={`text-xs ${message.message ? '' : 'hidden'} ${message.user_id === userId ? 'text-start' : 'text-end'}`}>{messageTime(message.sent_at)}</div>
            </div>
            <div className={`rounded ${
              message.user_id === userId
               ? 'ml-auto rounded-lg rounded-tr-none mr-8 self-message'
               : 'mr-auto rounded-lg rounded-tl-none ml-8 other-message'
              }`}
              style={{
                justifySelf: message.user_id === userId ? 'flex-end' : 'flex-start',
                minWidth: '50px',
                width: 'max-content',
                maxWidth: `${maxWidth}px`,
                position: 'relative',
              }}
            >
              <div className="mt-1">
                { message.file && (
                  message.file.endsWith('.png') ||
                  message.file.endsWith('.jpg') ||
                  message.file.endsWith('.jpeg') ? (
                    <img src={`${baseUrl}${message.file}`} alt={`${message.file.split('/').pop()}`} className="text-black rounded-lg border-8 border-gray-950 border-opacity-50 w-auto h-44" onClick={() => openModal(`${baseUrl}${message.file}`)} />
                  ) : (
                    <a target="blank" href={`${baseUrl}${message.file}`} download={`${message.file.split('/').pop()}`} className="text-black bg-red-400 py-1 px-2 rounded-lg">{message.file.split('/').pop()}</a>
                  ))
                }
              </div>
              <div className={`text-xs mt-1 text-black ${message.file ? '' : 'hidden'} ${message.user_id === userId ? 'text-start' : 'text-end'}`}>{messageTime(message.sent_at)}</div>
            </div>
            {/* {message.file && (
              <div>
                {message.file.startsWith('data:image/') ? (
                  <p>{`${message.file.split('/').pop()}`}</p>
                ) : (
                  message.file.endsWith('.png') ||
                  message.file.endsWith('.jpg') ||
                  message.file.endsWith('.jpeg') ||
                  message.file.endsWith('.gif') ? (
                    <img src={`${baseUrl}${message.file}`} alt={`${message.file.split('/').pop()}`} className="text-black rounded-lg border-8 border-gray-950 border-opacity-45 w-64 h-44"/>
                  ) : (
                    <a target="blank" href={`${baseUrl}${message.file}`} download={`${message.file.split('/').pop()}`} className="text-black rounded-md m-2 bg-red-400">{`${message.file.split('/').pop()}`}</a>
                  )
                )}
              </div>
              )} */}
            </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="flex items-center pl-8 pr-12 pb-32 relative" onSubmit={sendMessage}>
        <div className="relative flex-grow">
          <span
            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black-200"
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
            className="w-full p-3 pl-9 bg-[#DBDBDB] border-none rounded-full focus:outline-none"
          />
          
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <label htmlFor="fileInput">
              <FontAwesomeIcon icon={faPaperclip} size="lg" className="text-gray-700 hover:text-gray-900" />
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
            <div className="absolute bottom-14 bg-white border border-gray-300 rounded-lg mt-2 max-h-32 overflow-y-auto w-48 z-10 p-2">
              {teamMembers.map(member => (
                <div
                  key={member.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleTeamMemberClick(member.username)}
                >
                  <div className="flex items-center">
                    <Avatar src={`${baseUrl}/media/${member.image}`} alt={member.username} sx={{width: 26, height: 26}}/>
                    <span className="ml-3">{member.username}</span>
                  </div>
                </div>
              ))}
              
            </div>
          )}
        </div>
        <button
          type="submit"
          className="ml-2 bg-[#4D989D] hover:bg-[#4D999A] text-white rounded-full p-2"
          style={{ outline: 'none' }}
        >
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </form> 

      <Modal
        open = {showModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <img src={selectedImage} alt="Full Screen" className="w-full h-full object-contain" />
        </Box>
      </Modal>
      

      

    
      
      

    </div>

    
  );



}

export default TeamDetails;

