import {React, useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, Link } from "react-router-dom";
import SProjectCard from '../../components/Supervisor/SProjectComponents/SProjectCard';


export default function SProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function  fetchProjects() {
      try{
        const response = await fetch('http://127.0.0.1:8000/projects/');
        const data = await response.json();
        setProjects(data);
      }catch(e){
        console.error('Error fetching projects', e);
      }
    }
    fetchProjects();
  },[]);

  const handleProjectClick = () => {
    navigate("/addproject");
  };

  return (
    <div className="">
      <div className="font-bold text-2xl pl-2 pt-4">Current Projects</div>
      <div className="flex gap-8">
        {projects.map((project) => (
          <Link to={`/sprojects/${project.proj_id}`} key={project.proj_id}>
            <SProjectCard project={project}/>
          </Link>
        ))}
        {/* <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md w-72 h-670">
          <div className="flex gap-2 items-center">
            <img
              loading="lazy"
              src="..." // Add your image source here
              className="shrink-0 shadow-sm w-16 h-16 rounded-full"
              alt="Project Logo"
            />
            <div className="flex flex-col ml-2">
              <div className="flex gap-2 items-center text-xl text-black">
                <div className="grow">SmartAgile</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf0b223602430c1fd0543315f12acee1566359379b9bd2e15d773fbf70576701?"
                  className="shrink-0 w-4 h-4 fill-yellow-400"
                  alt="Star Icon"
                />
              </div>
              <div className="text-xs text-black opacity-90">
                “AI Driven Tool for Optimal Workspace Productivity”
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-black opacity-50">
            SmartAgile, a comprehensive suite of software applications,
            transforms workplace productivity and Agile project management
            through innovative Al technology.
          </div>
          <div className="flex gap-5 justify-between mt-4 text-sm text-black">
            <div>
              <span className="text-black">No of Tasks:</span>
              <br /> 90
            </div>
            <div>
              <span className="text-black">Deadline</span>
              <br />
              05/07/2024
            </div>
          </div>
        </div> */}
      </div>
      <button
        onClick={handleProjectClick}
        className="flex items-center fixed bottom-4 right-4 justify-between bg-[#4d989d] text-white py-2 px-4 rounded-md mb-4 md:mb-0 outline-none focus:outline-none focus:border-none"
      >
        New Project
        <AddIcon className="text-white ml-2" />
      </button>
    </div>
  );
}