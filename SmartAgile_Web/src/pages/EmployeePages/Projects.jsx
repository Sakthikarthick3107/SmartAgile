




// import React, { useState, useEffect } from 'react';
// import ProjectCard from '../../components/EmployeeComponents/ProjectComponents/ProjectCard';

// function Projects() {
//   const [projects, setProjects] = useState([]);
  
//   const userId = localStorage.getItem("user_id");

//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/projects/user-projects/${userId}`);
//         const data = await response.json();
//         setProjects(data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     }

//     fetchProjects();
//   }, [userId]); // Trigger effect when userId changes

//   return (
//     <div className="projects-container">
//       <h1>Projects</h1>
//       <div className="project-list flex gap-32">
//         {projects.map(project => (
//           <ProjectCard  key={project.proj_id} project={project} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Projects;



import React, { useState, useEffect } from 'react';
import ProjectCard from '../../components/EmployeeComponents/ProjectComponents/ProjectCard';
import ProjectDetails from '../../components/EmployeeComponents/ProjectComponents/ProjectDetails';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);


  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/projects/user-projects/${userId}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, [userId]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
   
  };

  return (
    <>
      <div>
        <h1>Projects</h1>
        <div className="flex gap-32">
          {projects.map((project) => (
            <ProjectCard key={project.proj_id} project={project} onClick={handleCardClick} />
          ))}
        </div>
      </div>
      {selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ProjectDetails project={selectedProject}  onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
}

export default Projects;