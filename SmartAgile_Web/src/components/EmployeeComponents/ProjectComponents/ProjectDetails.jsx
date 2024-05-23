
import React, { useState, useEffect } from "react";

const ProjectDetails = ({ project, onClose }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/projects/project-members/${project.proj_id}`);
        const data = await response.json();
        setTeamMembers(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }

    fetchTeamMembers();
  }, [project.proj_id]);

  return (
    <div className="bg-white p-6  shadow-lg w-[50%] border border-3 rounded-xl ">
      <button
        onClick={onClose}
        className=" text-md mb-4 px-4  py-0 bg-[#4D989D]"
      >
        <span className=" w-[10px] h-[10px] rounded bg-[#4D989D] "></span>Back
      </button>
      <div className="flex justify-between">
        <div className="leading-7 mb-4">
          <h2 className="text-xl text-black font-bold	mb-3">
            Project: {project.proj_name}
          </h2>
          <h4 className="text-[#4D989D]">
            Assigned by: <span className="font-medium text-black	">Admin</span>
          </h4>
          <h4 className="text-[#4D989D]">
            Role:
            <span className="font-medium text-black	"> Frontend Developer</span>{" "}
          </h4>
        </div>
        <div className="flex gap-[40px] align-center mt-4">
          <div>
            <p className="text-[#4D989D]">Start date</p>
            <p className="font-semibold">10/02/2024</p>
          </div>
          <div>
            <p className="text-[#4D989D]">End date</p>
            <p className="font-semibold">{project.proj_deadline}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl text-black font-semibold	mb-4">Team Members</h2>

        <div className="relative overflow-x-auto">
          <table className="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th className="px-6 py-3">Names</th>
                <th className="px-6 py-3">Roles</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4">{member.username}</td>
                  <td className="px-6 py-4">{member.role_within_project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-xl text-black font-semibold	mb-4 mt-4">
          Product Abstract
        </h2>
        <p className="text-justify leading-6">{project.proj_desc}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;