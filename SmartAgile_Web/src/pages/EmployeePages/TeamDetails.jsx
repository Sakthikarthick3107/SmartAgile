import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane, faPaperclip, faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faFileAlt, faImage } from '@fortawesome/free-solid-svg-icons'; // Add other icons as needed
import '../../App.css';
import { Avatar, Modal, Box, Button, Menu, MenuItem } from '@mui/material';

function TeamDetails() {
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState('');
  const [projectDetails, setProjectDetails] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const websocket = useRef(null);
  const messagesEndRef = useRef(null);
  const [projectMemberId, setProjectMemberId] = useState(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  
  const dropdownRef = useRef(null);

  const goBack = () => {
    window.location.href = '/chat';
  };
  const baseUrl = 'http://127.0.0.1:8000';
  const userId = JSON.parse(localStorage.getItem('user_id'));
  const projectId = JSON.parse(localStorage.getItem('project_id'));
  const chatroomId = JSON.parse(localStorage.getItem('chatroom_id'));

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ bottom: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setFile(files[0]);
      sendMessage(null, files[0]);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${baseUrl}/chat/chatroom/${chatroomId}/messages/`);
        const data = await response.json();
        setMessages(data);
        scrollToBottom();

        const memberId = await fetch(`${baseUrl}/projects/user-details/${userId}/${projectId}/`);
        const memberIdData = await memberId.json();
        if (Array.isArray(memberIdData) && memberIdData.length > 0) {
          const firstMemberData = memberIdData[0];
          const memberIdDetails = firstMemberData.id;
          setProjectMemberId(memberIdDetails);
        } else {
          console.log('Error getting project member id');
        }
      } catch (e) {
        console.error('Error fetching messages', e);
      }
    };

    fetchMessages();
  }, [chatroomId]);

  // useEffect(() => {
  //   scrollToBottom();
  // });

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chatroom/${chatroomId}/`);

    socket.onopen = () => {
      console.log('Websocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.onclose = (e) => {
      console.log('Websocket connection closed', e);
    };

    socket.onerror = (e) => {
      console.log('Websocket error', e);
    };

    websocket.current = socket;

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, [messages]);

  const sendMessage = (e, selectedFile = null) => {
    if (e) e.preventDefault();

    const messageText = input.trim();
    const messageFile = selectedFile || file;

    if (messageText !== '' || messageFile) {
      const messageData = {
        chatroom: chatroomId,
        sender: projectMemberId,
        message: messageText,
      };

      if (replyMessage) {
        messageData.reply_to = replyMessage.id;
        setReplyMessage(null); // Clear reply message after sending
        sendToWebSocket(messageData);
        setInput('');
      }

      if (messageText) {
        messageData.message = messageText;
        sendToWebSocket(messageData);
        setInput('');
      }

      if (messageFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64File = event.target.result.split(',')[1];
          messageData.file = base64File;
          messageData.file_name = messageFile.name;
          sendToWebSocket(messageData);
        };
        reader.readAsDataURL(messageFile);
        setFile(null);
      }
    }
  };

  const sendToWebSocket = (messageData) => {
    if (websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify(messageData));
      console.log('Message sent', messageData);
      setInput('');
      setFile(null);
    } else {
      console.error('Websocket is not open');
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectId = localStorage.getItem('project_id');
        if (projectId) {
          const response = await fetch(`${baseUrl}/projects/${projectId}`);
          const data = await response.json();
          if (data.icon) {
            data.icon = `${baseUrl}${data.icon}`;
          }
          setProjectDetails(data);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, []);

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
      console.error('Error fetching team members:', error);
    }
  };

  const handleTeamMemberClick = (username) => {
    setInput(`${input}@${username} `);
    setShowTeamMembers(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTeamMembers(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMaxWidth(Math.min(window.innerWidth * 0.5, 500));
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const messageTime = (sentAt) => {
    const time = new Date(sentAt);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  // const handleRightClick = (e, message) => {
  //   e.preventDefault();
  //   setMessageToDelete(message);
  //   setShowDeleteConfirmation(true);
  // };

  // const deleteMessage = async () => {
  //   try {
  //     if (messageToDelete) {
  //       await fetch(`${baseUrl}/chat/chatroom/${chatroomId}/message/${messageToDelete.id}`, {
  //         method: 'DELETE',
  //       });
  //       setMessages(messages.filter((msg) => msg.id !== messageToDelete.id));
  //       setShowDeleteConfirmation(false);
  //       setMessageToDelete(null);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting message:', error);
  //   }
  // };

  const handleRightClick = (e, message) => {
    e.preventDefault();
    setMessageToDelete(message);
    setContextMenu(
      contextMenu === null
        ? { mouseX: e.clientX - 3, mouseY: e.clientY - 8 }
        : null,
    );
  };

  const deleteMessage = async () => {
    try {
      if (messageToDelete) {
        await fetch(`${baseUrl}/chat/chatroom/${chatroomId}/message/${messageToDelete.id}`, {
          method: 'DELETE',
        });
        setMessages(messages.filter((msg) => msg.id !== messageToDelete.id));
        setShowDeleteConfirmation(false);
        setMessageToDelete(null);
        setContextMenu(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const replyToMessage = () => {
    if (messageToDelete) {
      setInput(`${input}@${messageToDelete.username} `);
      setMessageToDelete(null);
      setContextMenu(null);
    }
  };

  const contextMenuOptions = [
    { label: 'Delete', action: () => setShowDeleteConfirmation(true) },
    { label: 'Reply', action: replyToMessage },
  ];

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
    
    
  };

  const modalsStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: '16px',
    outline: 'none'
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return faFilePdf;
      case 'doc':
      case 'docx':
        return faFileWord;
      case 'xls':
      case 'xlsx':
        return faFileExcel;
      case 'ppt':
      case 'pptx':
        return faFilePowerpoint;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return null; // No icon for images
      default:
        return faFileAlt; // generic file icon for unknown types
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
        <div key={index} className="mb-4">
          {message.user_id === userId ? (
            <div className="flex items-center justify-end mb-1">
              <div className="flex items-center">
                <span className="text-sm font-bold mr-2 text-black">You</span>
                <Avatar src={`${baseUrl}/media/${message.user_image}`} alt={message.username} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-start mb-1">
              <div className="flex items-center">
                <Avatar src={`${baseUrl}/media/${message.user_image}`} alt={message.username} />
                <span className="text-sm font-bold ml-2 text-black">{message.username}</span>
              </div>
            </div>
          )}
          <div
            className={`p-2 rounded-lg ${
              message.file && (message.file.endsWith('.png') || message.file.endsWith('.jpg') || message.file.endsWith('.jpeg'))
                ? 'bg-[#D9D9D9]'
                : 'bg-[#4D989D]'
            } ${message.user_id === userId ? 'ml-auto rounded-tr-none mr-8 self-message' : 'mr-auto rounded-tl-none ml-8 other-message'}`}
            style={{
              maxWidth: '80%', // Adjusted max-width to prevent messages from taking up the entire row
              width: 'fit-content',
              position: 'relative',
            }}
            onContextMenu={(e) => handleRightClick(e, message)}
          >
            <div className="mt-1">{message.message}</div>
            {message.file && (
              <div className="mt-2 flex items-center">
                {!message.file.endsWith('.png') && !message.file.endsWith('.jpg') && !message.file.endsWith('.jpeg') && (
                  <FontAwesomeIcon icon={getFileIcon(message.file)} className="mr-2 text-gray-700" />
                )}
                {message.file.endsWith('.png') || message.file.endsWith('.jpg') || message.file.endsWith('.jpeg') ? (
                  <img
                    src={`${baseUrl}${message.file}`}
                    alt={`${message.file.split('/').pop()}`}
                    className="text-black border-opacity-50 w-auto h-44"
                    onClick={() => openModal(`${baseUrl}${message.file}`)}
                  />
                ) : (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${baseUrl}${message.file}`}
                    download={`${message.file.split('/').pop()}`}
                    className="text-black underline rounded-lg inline-block"
                  >
                    {message.file.split('/').pop()}
                  </a>
                )}
              </div>
            )}
            <div className={`text-xs mt-1 ${message.user_id === userId ? 'text-start' : 'text-end'}`}>
              {messageTime(message.sent_at)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
    <form className="flex items-center pl-8 pr-12 pb-8 relative" onSubmit={sendMessage}>
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
          <div className="absolute bottom-14 bg-white border border-gray-300 rounded-lg mt-2 max-h-32 overflow-y-auto w-48 z-10 p-2" ref={dropdownRef}>
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleTeamMemberClick(member.username)}
              >
                <div className="flex items-center">
                  <Avatar src={`${baseUrl}/media/${member.image}`} alt={member.username} sx={{ width: 26, height: 26 }} />
                  <span className="ml-3">{member.username}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="submit" className="ml-2 bg-[#4D989D] hover:bg-[#4D999A] text-white rounded-full p-2" style={{ outline: 'none' }}>
        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
      </button>
    </form>
    <Modal open={showModal} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <img src={selectedImage} alt="Full Screen" className="w-full h-full object-contain" />
      </Box>
    </Modal>
    <Modal open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
      <Box sx={modalsStyle}>
        <h2 className='font-semibold'>Confirm Delete</h2>
        <p className='mt-2 mb-4'>Are you sure you want to delete this message?</p>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button onClick={deleteMessage} sx={{ mr: 2 }} color="secondary" variant="contained" style={{ backgroundColor: '#4D989D', color: 'white', fontWeight: 'bold' }}>
            Delete
          </Button>
          <Button onClick={() => setShowDeleteConfirmation(false)} color="primary" variant="contained" style={{ backgroundColor: 'white', color: '#4D989D', fontWeight: 'bold' }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>


    <Menu
        open={contextMenu !== null}
        onClick={() => setContextMenu(null)}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        {contextMenuOptions.map((option, index) => (
          <MenuItem key={index} onClick={option.action}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
  </div>
);
}

export default TeamDetails;