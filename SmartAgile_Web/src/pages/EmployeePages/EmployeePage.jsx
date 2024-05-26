import React, { useState, useEffect } from 'react';
import view from '../../assets/View.png'
import SearchIcon from '../../assets/Search Icon.png'

const EmployeePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/projects/project-members/');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      {/* <h1 className="text-2xl font-bold mb-4">User List</h1> */}
      <div className="flex justify-between">
      {/* Left Section: Search Bar */}
      <div className="flex items-center">
        <div className="bg-gray-200 shadow-md rounded-full p-1 border border-[#4d989d] w-[550px] m-4 mb-10 relative">
          <input
            className="bg-gray-200 m-1 ml-6 mt-2"
            type="text"
            placeholder="Search employee"
          />
          <img src={SearchIcon} alt="searchIcon" className="absolute right-5 top-3 cursor-pointer" />
        </div>
      </div>

      {/* Right Section: View Employee */}
      <div className="flex items-center mt-[-10px] mr-[-870px] mb-4">
        <span className="font-bold">View All Employee</span>
        <img src={view} alt="view" className="ml-2" />
      </div>
      <div className='flex m-4'>
        <select className='bg-[#4d989d] p-2 rounded-md text-white mt-20 mb-3 mr-4'>
        <option value="1">Designation</option>
        <option value="1">Software Engineer</option>
        <option value="1">Cloud Engineer</option>
        <option value="1">UI/UX Designer</option>
        <option value="1">Fullstack Developer</option>
        <option value="1">AI Developer</option>
        </select>
      </div>
      
      </div>
   

      <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg border-collapse">
        <thead>
          <tr className="w-full bg-[#4d989d] text-white text-left border-b-2 border-gray-300">
            <th className="py-2 px-4 font-semibold text-md">Employee ID</th>
            <th className="py-2 px-4 font-semibold text-md">Name</th>
            <th className="py-2 px-4 font-semibold text-md">Designation</th>
            <th className="py-2 px-4 font-semibold text-md">Employee Profile</th>
            <th className="py-2 px-4 font-semibold text-md">Project</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="py-1 px-4">{user.id}</td>
              <td className="py-1 px-4">{user.username}</td>
              <td className="py-1 px-4">{user.role_within_project}</td>
              <td className="py-1 px-4">
                <img
                  src={`http://127.0.0.1:8000/${user.image}`}
                  alt={user.username}
                  className="w-20 h-20 rounded-full"
                />
              </td>
              <td className="py-1 px-4">{user.project}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
};

export default EmployeePage;
