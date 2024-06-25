
// import React from "react";
// // import BarChart from "../../components/SupervisorComponents/BarChart";
// import ProjectBarchart from "../../components/EmployeeComponents/DashboardComponents/ProjectBarchart";
// import Doughnet from "../../components/EmployeeComponents/DashboardComponents/Doughnet";
// import Calender from "../../components/SupervisorComponents/DashboardComponents/Calender";


// const Dashboard = () => {
//   return (
//     <div >
//       Dashboard
    
//       <ProjectBarchart/>
//       <Doughnet/>
//       <Calender/>

//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import ProjectBarchart from "../../components/EmployeeComponents/DashboardComponents/ProjectBarchart";
import Doughnut from "../../components/EmployeeComponents/DashboardComponents/Doughnet";
import Calender from "../../components/SupervisorComponents/DashboardComponents/Calender";

const Dashboard = () => {
  return (
    <div className="relative">
      Dashboard

      <ProjectBarchart />
      <Doughnut />

      {/* Positioning Calendar in the top right corner */}
      <div className="absolute top-2 right-2">
        <div className="rounded-lg p-4">
          <Calender />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
