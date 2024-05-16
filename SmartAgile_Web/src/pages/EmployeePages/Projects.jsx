import React, { useState, useEffect } from 'react';
import ProjectCard from '../../components/EmployeeComponents/ProjectComponents/ProjectCard';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('http://127.0.0.1:8000/projects/');
        const data = await response.json();
        setProjects(data);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="projects-container">
      <h2 className='text-3xl font-bold mt-4'>Current Projects</h2>
      <div className="project-list flex gap-32">
        {projects.map(project => (
          <ProjectCard  key={project.proj_id} project={project} />
          
        ))}
      </div>
       
    </div>
  );
}
export default Projects


