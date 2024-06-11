import {React, useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';

const ProjectCard = ({ project, onClick }) => {
  const baseUrl = 'http://127.0.0.1:8000';
  const [projectMembers, setProjectMembers] = useState([]);

  const StyledAvatar = styled(Avatar)({
    marginLeft: -10,
    border: '2px solid white',
  });

  useEffect(() => {
    async function fetchProjectMembers() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${project.proj_id}/`);
        const data = await response.json();
        setProjectMembers(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjectMembers();
  }, [project.proj_id]);

  console.log(projectMembers);

  

  return (
    <div onClick={() => onClick(project)} className="cursor-pointer">
      <div className="card project-card mb-3 rounded-[19px] shadow-lg bg-gray-200 max-w-[350px] text-end p-3">
        <div className="inline rounded-full px-2 text-[10px] text-white bg-[#4D989D]">
          Deadline: {project.proj_deadline}
        </div>
        <div className="flex items-center justify-start">
          <img
            src={`${baseUrl}${project.icon}`}
            alt={`${project.proj_name} icon`}
            className="project-img mt-2 w-[50px] mr-4"
          />
          <b className="text-xl text-black font-serif">{project.proj_name}</b>
        </div>
        <p className="desc text-black text-md font-serif p-3 text-justify">
          {project.proj_desc}
        </p>
        <div className='flex mt-2 items-center'>
          {projectMembers.slice(0, 4).map((members, index) => (
            <StyledAvatar key={index} src={`http://127.0.0.1:8000/media/${members.image}`} alt={members.username}/>
          ))}
          {projectMembers.length > 4 && (
            <div className="additional-members text-sm text-gray-600">
              +{projectMembers.length - 4}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;