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
      <h2 className='text-3xl font-bold mt-4'>Projects</h2>
      <div className="project-list flex gap-32">
        {projects.map(project => (
          <ProjectCard  key={project.proj_id} project={project} />
          
        ))}
      </div>
    </div>
  );
}
export default Projects



// import React, { useState, useEffect } from 'react';

// const Project = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectResponse = await fetch('http://127.0.0.1:8000/projects/');
//         if (!projectResponse.ok) {
//           throw new Error('Failed to fetch projects');
//         }
//         const projectData = await projectResponse.json();
//         setProjects(projectData);
//         console.log(projectData);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   return (
//     <div className="flex justify-center top-5 h-screen">
//       {projects.map((project, index) => (
//         <div key={index} className="projects-grid flex-row gap-5 pl-9 pt-6">
//           <div className="card mb-3 project-card top-2 relative rounded-[19px] shadow-lg bg-gray-200 max-w-[300px]">
//             <div className="absolute top-4 right-4 rounded-full pl-2 pr-2 text-[10px] text-white bg-[#4D989D]">
//               Deadline: {project.proj_deadline}
//             </div>
//             <div className="flex items-center ">
//               <img src={project.icon} alt="Project Icon" className="project-img mt-6" />
//               <b className="text-20 font-serif pt-5 ml-[1px]">{project.proj_name}</b>
//             </div>
//             <p className="desc text-[14px] font-serif p-3 text-justify">{project.proj_desc}</p>
//             <p className="status text-[14px] font-serif p-3">Status: {project.status}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Project;