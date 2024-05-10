
import React from "react";
// import BarChart from "../../components/SupervisorComponents/BarChart";
import ProjectBarchart from "../../components/EmployeeComponents/DashboardComponents/ProjectBarchart";
import Doughnet from "../../components/EmployeeComponents/DashboardComponents/Doughnet";


const Dashboard = () => {
  return (
    <div >
      Dashboard
    
      <ProjectBarchart/>
      <Doughnet/>

    </div>
  );
};

export default Dashboard;
