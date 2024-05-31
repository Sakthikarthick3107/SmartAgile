import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

const EmployeeList = () => {
  const [projectMembers, setProjectMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();
  const baseUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/employee/profile/1/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjectMembers(data);
      } catch (error) {
        console.error("Error fetching project members:", error);
      }
    };

    fetchProjectMembers();
  }, []);

  // Filter and search logic
  const filteredProjectMembers = projectMembers.filter((member) => {
    const matchesSearch = member.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Effect to load search term and filter value from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("employee_data");
    if (savedData) {
      const { searchTerm: savedSearchTerm, filterValue: savedFilterValue } =
        JSON.parse(savedData);
      setSearchTerm(savedSearchTerm);
      setFilterValue(savedFilterValue);
    }
  }, []);

  // Effect to save search term and filter value to local storage when they change
  useEffect(() => {
    const dataToStore = JSON.stringify({ searchTerm, filterValue });
    localStorage.setItem("employee_data", dataToStore);
  }, [searchTerm, filterValue]);

  // Handlers for search and filter changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleBackClick = () => {
    navigate("/employees");
  };

  const handleAddCandidateClick = ()=>{
    navigate("/addcandidate");
  }

  return (
    <div className="container mx-auto justify-between px-4 relative">
      <div className="flex items-center justify-between flex-wrap mb-9">
        <div className="flex items-center bg-gray-200 shadow-md rounded-full p-1 border border-[#4d989d] w-full md:w-[550px] relative mb-4 md:mb-0">
          <input
            className="bg-gray-200 m-1 ml-6 mt-2 outline-none focus:outline-none w-full"
            type="text"
            placeholder="Search employee"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchIcon className="absolute right-5 top-3 cursor-pointer" />
        </div>

        {/* Add Candidate Button */}
        <button
        onClick={handleAddCandidateClick} 
        className="flex items-center justify-between bg-[#4d989d] text-white py-2 px-4 rounded-md mb-4 md:mb-0 outline-none focus:outline-none focus:border-none">
          <AddIcon className="text-white mr-2" />
          Add Candidate
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProjectMembers.length > 0 ? (
          filteredProjectMembers.map((member, index) => (
            <div
              key={`${member.user}-${index}`}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex items-center justify-center">
                <img
                  src={`${baseUrl}/media/${member.image}`}
                  alt={member.username}
                  className="w-16 h-16 rounded-full mr-20"
                />
              </div>
              <div className="text-center mt-4">
                <p className="font-bold">{member.username}</p>
                <p className="text-gray-500 text-sm">{member.email}</p>
                <p className="text-sm text-black">{member.position}</p>
                <p className="text-sm text-black">{member.role}</p>
                <p className="text-sm text-black">{member.date_joined}</p>
                <p className="mb-2">{member.user}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            <p className="text-gray-500 py-4">No employees found.</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleBackClick}
          className="rounded-lg text-white bg-[#4d989d] border-[#4d989d] font-bold py-2 px-4 flex items-center focus:outline-none focus:border-none"
        >
          {/* ">" symbol */}
          <span className="bg-[#4d989d] rounded-full p-1">
            <span className="m-[3px] text-white">
              <ArrowCircleLeftOutlinedIcon />
            </span>
          </span>
          Back
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;