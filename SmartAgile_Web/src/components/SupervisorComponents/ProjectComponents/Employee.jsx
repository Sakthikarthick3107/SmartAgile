import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Employees = () => {
  const [projectMembers, setProjectMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const baseUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const response = await fetch(`${baseUrl}/projects/project-members/`);
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
    const matchesFilter = filterValue
      ? member.role_within_project === filterValue
      : true;
    return matchesSearch && matchesFilter;
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

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-200 shadow-md rounded-full p-1 border border-[#4d989d] w-[550px] relative">
          <input
            className="bg-gray-200 m-1 ml-6 mt-2 outline-none focus:outline-none w-full"
            type="text"
            placeholder="Search employee"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchIcon className="absolute right-5 top-3 cursor-pointer" />
        </div>

        {/* Filter Dropdown */}
        <div className="flex">
          <select
            className="bg-[#4d989d] p-2 rounded-md text-white outline-none focus:outline-none focus:border-none"
            value={filterValue}
            onChange={handleFilterChange}
          >
            <option value="">All Designations</option>
            <option value="Frontend">Frontend</option>
            <option value="backend">backend</option>
            <option value="Java Developer">Java Developer</option>
            <option value="Desktop">Desktop</option>
            <option value="AI Developer">AI Developer</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto ml-4">
        <table className="w-full sm:max-w-4xl md:max-w-6xl lg:max-w-full xl:max-w-8xl bg-white shadow-lg border-collapse">
          <thead>
            <tr className="w-full bg-[#4d989d] text-white text-left border-b-2 border-gray-300">
              <th className="py-2 px-3 font-semibold text-sm">Employee ID</th>
              <th className="py-2 px-3 font-semibold text-sm">
                Employee Profile
              </th>
              <th className="py-2 px-3 font-semibold text-sm">Name</th>
              <th className="py-2 px-3 font-semibold text-sm">Designation</th>

              <th className="py-2 px-3 font-semibold text-sm">Project ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjectMembers.length > 0 ? (
              filteredProjectMembers.map((member, index) => (
                <tr
                  key={`${member.user}-${index}`}
                  className="border-b border-gray-300"
                >
                  <td className="py-1 px-3">{member.user}</td>
                  <td className="py-1 px-3">
                    <img
                      src={`${baseUrl}/media/${member.image}`}
                      alt={member.name}
                      className="w-16 h-16 rounded-full"
                    />
                  </td>
                  <td className="py-1 px-3">{member.username}</td>
                  <td className="py-1 px-3">{member.role_within_project}</td>
                  <td className="py-1 px-3">{member.project}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-1 px-3" colSpan="5">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;