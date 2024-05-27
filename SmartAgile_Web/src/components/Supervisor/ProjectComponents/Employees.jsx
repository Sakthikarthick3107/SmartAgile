import React, { useState, useEffect } from 'react';

const Employees = () => {
  const [projectMembers, setProjectMembers] = useState([]);
  const baseUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const response = await fetch(`${baseUrl}/projects/project-members/`);
        const data = await response.json();
        setProjectMembers(data);
      } catch (error) {
        console.error('Error fetching project members:', error);
      }
    };

    fetchProjectMembers();
  }, []);

  return (
    <div className="overflow-x-auto ml-4">
      <table className="w-full sm:max-w-4xl md:max-w-6xl lg:max-w-full xl:max-w-8xl bg-white shadow-lg border-collapse">
        <thead>
          <tr className="w-full bg-[#4d989d] text-white text-left border-b-2 border-gray-300">
            <th className="py-2 px-3 font-semibold text-sm">Employee ID</th>
            <th className="py-2 px-3 font-semibold text-sm">Name</th>
            <th className="py-2 px-3 font-semibold text-sm">Designation</th>
            <th className="py-2 px-3 font-semibold text-sm">Employee Profile</th>
            <th className="py-2 px-3 font-semibold text-sm">Project ID</th>
          </tr>
        </thead>
        <tbody>
        {projectMembers.map((member, index) => (
        <tr key={`${member.user}-${index}`} className={`border-b border-gray-300`}>
           <td className="py-1 px-3">{member.user}</td>
           <td className="py-1 px-3">{member.username}</td>
           <td className="py-1 px-3">{member.role_within_project}</td>
           <td className="py-1 px-3">
          <img
             src={`${baseUrl}/media/${member.image}`}
             alt={member.name}
            className="w-16 h-16 rounded-full"
          />
    </td>
    <td className="py-1 px-3">{member.project}</td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;

