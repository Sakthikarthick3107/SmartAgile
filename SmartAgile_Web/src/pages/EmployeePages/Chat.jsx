
import React from "react";
import smartAgileIcon from "../../assets/Smart_agile.png";
import eVisionIcon from "../../assets/Eye_point.png";
import eyePointIcon from "../../assets/e_Vision.png";
import logiShareIcon from "../../assets/Logishare.png";
import { useNavigate } from 'react-router-dom';

function Chat() {
   
  const navigate = useNavigate();

  const teams = [
    { id: "SmartAgile", icon: smartAgileIcon },
    { id: "E-Vision", icon: eVisionIcon },
    { id: "Eye Point", icon: eyePointIcon },
    { id: "LogiShare", icon: logiShareIcon },
  ];

  const handleTeamClick = (teamId) => {
    // Navigating to the team details page
    navigate(`/chat/${teamId}`);
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
        {teams.map((team) => (
          <div
            key={team.id}
            className="flex gap-5 items-start px-6 pt-4 pb-3 mt-2 ml-3 text-2xl font-semibold text-black text-xl rounded-md bg-slate-50 shadow-[0px_4px_4px_rgba(0,0,0,0.35)]"
            onClick={() => handleTeamClick(team.id)}  
            style={{ cursor: 'pointer' }}       
          >
            <div
              className="shrink-0 self-start w-10 h-10 rounded-full flex justify-center items-center overflow-hidden "
              style={{ backgroundColor: `rgba(77, 152, 157, 0.5)` }}
            >
              <img
                src={team.icon}
                alt={`${team.id} Logo`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="flex-auto my-auto"> {team.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;