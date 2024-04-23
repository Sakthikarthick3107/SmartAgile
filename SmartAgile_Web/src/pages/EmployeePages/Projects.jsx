import React from 'react';
import Smart_agile from '../../assets/Smart_agile.png';
import Eye_point from '../../assets/Eye_point.png';
import e_vision from '../../assets/e_Vision.png';
import Logishare from '../../assets/Logishare.png';
import Team_member from '../../assets/Team_members.png';

const Project = () => {
  return (
    <div className="flex justify-center top-5 h-screen">
      <div className="projects-grid flex-row gap-5 pl-9 pt-6">
     
        {/* Smart_agile project card */}
        <div className="card mb-3 project-card top-2 relative rounded-[19px] shadow-lg bg-gray-200 max-w-[300px]">
          <div className="absolute top-4 right-4 rounded-full pl-2 pr-2 text-[10px] text-white bg-[#4D989D]">
            Deadline: {"05/07/2024"}
          </div>
          <div className="flex items-center ">
          <img src={Smart_agile} alt="smart_agile" className="project-img mt-6" />
          <b className="text-20 font-serif pt-5 ml-[1px]">SMARTAGILE</b>
          </div>
          <p className="desc text-[14px] font-serif p-3 text-justify">“AI Driven Tool for Optimal workspace productivity”</p>
          <p className="project-desc text-[14px] font-serif p-3 text-justify  ">SmartAgile, a comprehensive suite of software applications, transforms workplace productivity and Agile project management through innovative AI technology.</p>
          <img src={Team_member} alt="Team_member" className="team1 p-3" />
        </div>
      </div>

      {/* Eye_point project card */}
      <div className="projects-grid flex-row gap-5 pl-9 pt-6">
        <div className="card mb-3 project-card top-2 relative rounded-[19px] shadow-lg bg-gray-200 max-w-[300px]">
          <div className="absolute top-4 right-4 rounded-full pl-2 pr-2 text-[10px] text-white bg-[#4D989D]">
            Deadline: {"05/07/2024"}
          </div>
           {/* Container for alignment */}
          <div className="flex items-center pt-11 pl-5">
             <img src={Eye_point} alt="Eye_point" className="project-img" />
             <b className="text-20 font-serif pl-3 ml-[1px]">EYEPOINT</b>
          </div>
          <p className="desc text-[14px] pt-5 pr-[100px] font-serif p-3 text-justify">“Vision Meets Interaction”</p>
          <p className="project-desc text-[14px] pt-5 font-serif  p-3 text-justify ">EyePoint is a revolutionary technology that unlocks the secrets of the human gaze, turning eye movements into powerful insights.</p>
          <img src={Team_member} alt="Team_member" className="team1 p-3" />
        </div>
      </div>

      {/* e_vision project card */}
      <div className="projects-grid flex-row gap-5 pl-9 pt-6">
        <div className="card mb-3 project-card top-2 relative rounded-[19px] shadow-lg bg-gray-200 max-w-[300px]">
          <div className="absolute top-4 right-4 rounded-full pl-2 pr-2 text-[10px] text-white bg-[#4D989D]">
            Deadline: {"05/07/2024"}
          </div>
          
        {/* Container for alignment */}
        <div className="flex items-center pt-11 pl-5">
          <img src={e_vision} alt="e_vision" className="project-img " />
          <b className="text-20 font-serif pl-3 ml-[1px]">EVISION</b>
          </div>
          <p className="desc text-[14px] font-serif p-3 pt-8 text-justify">“Just a glance for accuracy”</p>
          <p className="project-desc text-[14px] font-serif pt-8 p-3 text-justify">Attendance Tracker is more than just an attendance system; it's a gateway to a smarter, more efficient future.</p>
          <img src={Team_member} alt="Team_member" className="team1 p-3" />
        </div>
      </div>

      {/* Logishare project card */}
      <div className="projects-grid flex-row gap-5 pl-9 pt-6">
        <div className="card mb-3 project-card top-2 relative rounded-[19px] shadow-lg bg-gray-200 max-w-[300px]">
          <div className="absolute top-4 right-4 rounded-full pl-2 pr-2 text-[10px] text-white bg-[#4D989D]">
            Deadline: {"05/07/2024"}
          </div>
            {/* Container for alignment */}
        <div className="flex items-center pt-11 pl-5">
          <img src={Logishare} alt="Logishare" className="project-img" />
          <b className="text-20 font-serif ml-[1px] pl-2">LOGISHARE</b>
          </div>
          <p className="desc text-[14px] font-serif p-3 pt-4 text-justify">“Revolutionary system in transportation of goods”</p>
          <p className="project-desc text-[14px] font-serif p-3 text-justify">It's a collaborative network unlocking the hidden potential of unused space in vehicles by renting the space to others to transport their goods.</p>
          <img src={Team_member} alt="Team_member" className="team1 p-3" />
        </div>
      </div>
    </div>
  );
};

export default Project;
