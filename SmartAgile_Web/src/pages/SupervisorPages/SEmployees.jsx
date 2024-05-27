import React, { useState, useEffect } from 'react';
import Employee from '../../components/SupervisorComponents/ProjectComponents/Employee';
import ArrowCircleRightOutlined from '@mui/icons-material/ArrowCircleRightOutlined';
import SearchIcon from '@mui/icons-material/Search';

const SEmployee = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // Fetch users from API on component mount
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

  // Effect to load search term and filter value from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('employee_data');
    if (savedData) {
      const { searchTerm: savedSearchTerm, filterValue: savedFilterValue } = JSON.parse(savedData);
      setSearchTerm(savedSearchTerm);
      setFilterValue(savedFilterValue);
    }
  }, []);

  // Effect to save search term and filter value to local storage when they change
  useEffect(() => {
    const dataToStore = JSON.stringify({ searchTerm, filterValue });
    localStorage.setItem('employee_data', dataToStore);
  }, [searchTerm, filterValue]);

  // Filtering users based on search term and filter value
  const filteredUsers = users.filter(user => {
    if (filterValue && user.role_within_project !== filterValue) {
      return false;
    }
    if (searchTerm && !user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handler for filter dropdown change
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="container">
      <div className="flex justify-between">
        {/* Left Section: Search Bar */}
        <div className="flex items-center">
          <div className="bg-gray-200 shadow-md rounded-full p-1 border border-[#4d989d] w-[550px] m-4 mb-10 relative">
            <input
              className="bg-gray-200 m-1 ml-6 mt-2 outline-none focus:outline-none"
              type="text"
              placeholder="Search employee"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchIcon className="absolute right-5 top-3 cursor-pointer" />
          </div>
        </div>

        {/* Right Section: View Employee */}
        <div className="flex items-center mt-[-10px] mr-[-870px] mb-4">
          <span className="font-bold">View All Employee</span>
          <ArrowCircleRightOutlined className="ml-2" />
        </div>

        {/* Filter Dropdown */}
        <div className="flex m-4">
          <select
            className="bg-[#4d989d] p-2 rounded-md text-white mt-20 mb-3 mr-4"
            value={filterValue}
            onChange={handleFilterChange}
          >
            <option value="">All Designations</option>
            <option value="Software Engineer">Frontend Developer</option>
            <option value="Cloud Engineer">Backend Developer</option>
            <option value="UI/UX Designer">Java Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="AI Developer">AI Developer</option>
            <option value="Mobile Developer">Mobile Developer</option>
          </select>
        </div>
      </div>

      {/* Table Component */}
      <Employee users={filteredUsers} />
    </div>
  );
};

export default SEmployee;