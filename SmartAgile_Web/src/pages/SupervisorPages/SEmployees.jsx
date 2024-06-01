import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Employee from "../../components/SupervisorComponents/ProjectComponents/Employee";
import ArrowCircleRightOutlined from "@mui/icons-material/ArrowCircleRightOutlined";

const SEmployee = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  const handleEmployeeClick= ()=>{
    navigate("/ViewEmployeeList");
  }

  // Filtering users based on search term and filter value
  const filteredUsers = users.filter((user) => {
    if (filterValue && user.role_within_project !== filterValue) {
      return false;
    }
    if (
      searchTerm &&
      !user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="container">
      <div className="flex justify-between">
        {/* Right Section: View Employee */}
        <div className="flex items-center mt-[-10px] mr-[-870px] mb-4">
          <span className="font-bold cursor-pointer" onClick={handleEmployeeClick}> View All Employee</span>
          <ArrowCircleRightOutlined className="ml-2 cursor-pointer" onClick={handleEmployeeClick}/>
        </div>
      </div>

      {/* Display filtered employees */}
      <Employee users={filteredUsers} />
    </div>
  );
};

export default SEmployee;