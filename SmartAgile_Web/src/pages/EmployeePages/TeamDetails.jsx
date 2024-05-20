import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function TeamDetails() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, user: "self" }]);
      setInput("");
    }
  };

  return (
    <div className="mx-auto p-6 shadow-md bg-gray-100 max-w-2xl">
      <div className="h-80 overflow-y-auto p-4 border border-gray-300 mb-4 bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded p-2 my-2 max-w-xs ${
              message.user === "self"
                ? "bg-blue-300 ml-auto"
                : "bg-gray-200 mr-auto"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="flex items-center" onSubmit={sendMessage}>
        <div className="relative flex-grow">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-200"  style={{ fontSize: '20px', fontWeight: 'bold' }}>@</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 pl-9 bg-[#DBDBDB] border border-gray-300 rounded-full focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="ml-2 bg-[#4D989D] hover:bg-blue-700 text-white"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            outline: 'none'
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </form>
    </div>
  );
}

export default TeamDetails;