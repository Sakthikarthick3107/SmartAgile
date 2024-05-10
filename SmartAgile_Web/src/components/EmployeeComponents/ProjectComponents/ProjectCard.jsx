

import React from "react";


// import Team_member from '../../../assets/Team_members.png';
// import Smart_agile from '../../../assets/Smart_agile.png'

const ProjectCard = ({project}) => {
    const baseUrl = 'http://127.0.0.1:8000';
  return (
    <div >
      <div className="card mb-3 project-card top-2 relative rounded-[19px] shadow-lg bg-gray-200 max-w-[350px] p-3">
        <div className="absolute top-4 right-4 rounded-full pl-2 pr-2 text-[10px] text-white bg-[#4D989D]">
          Deadline: {project.proj_deadline}
        </div>
        <div className="flex items-center ">
          <img
            src={`${baseUrl}/${project.icon}`}
            alt="smart_agile"
            className="project-img mt-6 w-[50px] mr-4"
          />
          <b className="text-xl font-serif pt-5 ml-[1px]">{project.proj_name}</b>
        </div>
        <p className="desc text-md font-serif p-3 text-justify">
         {project.proj_desc}
        </p>
        {/* <p className="project-desc text-[14px] font-serif p-3 text-justify  ">
          SmartAgile, a comprehensive suite of software applications, transforms
          workplace productivity and Agile project management through innovative
          AI technology.
        </p> */}
        {/* <img src={Team_member} alt="Team_member" className="team1 p-3" /> */}
      </div>
    </div>
  );
};

export default ProjectCard;
