import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SProjectCard from '../../components/Supervisor/SProjectComponents/SProjectCard';

function SProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('http://127.0.0.1:8000/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="flex gap-8">
        {projects.map((project) => (
          <Link to={`/sprojects/${project.proj_id}`} key={project.proj_id}>
            <SProjectCard project={project} />
          </Link>
        ))}
      </div>
      
    </div>
  );
}

export default SProjects;
