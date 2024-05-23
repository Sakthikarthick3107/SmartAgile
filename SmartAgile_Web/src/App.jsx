// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Organization from "./pages/Organization";
// import FirstPage from "./pages/FirstPage";
// import Navbar from "./components/EmployeeComponents/NavBar";
// import Sidebar from "./components/EmployeeComponents/Sidebar";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import Projects from "./pages/EmployeePages/Projects";
// import TaskHub from "./pages/EmployeePages/Taskhub";
// import Chat from "./pages/EmployeePages/Chat";
// import Settings from "./pages/EmployeePages/Settings";
// import Dashboard from "./pages/EmployeePages/Dashboard";
// import TeamDetails from "./pages/EmployeePages/TeamDetails";
// import SDashboard from "./pages/SupervisorPages/SDashboard";

// // Layout component with Navbar and Sidebar
// function LayoutWithSidebar({ children }) {
//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar />
//       <div className="flex flex-grow">
//         <Sidebar />
//         <main className="flex-grow p-4">{children}</main>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<FirstPage />} />
//       <Route path="/organization" element={<Organization />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard" element={<LayoutWithSidebar><Dashboard /></LayoutWithSidebar>} />
//       <Route path="/projects" element={<LayoutWithSidebar><Projects /></LayoutWithSidebar>} />
//       <Route path="/tasks" element={<LayoutWithSidebar><TaskHub /></LayoutWithSidebar>} />
//       <Route path="/chat" element={<LayoutWithSidebar><Chat /></LayoutWithSidebar>} />
//       <Route path="/chat/:teamId" element={<LayoutWithSidebar><TeamDetails /></LayoutWithSidebar>} />
//       <Route path="/settings" element={<LayoutWithSidebar><Settings /></LayoutWithSidebar>} />



//       <Route path="/sdashboard" element={<SDashboard />} />
//     </Routes>
//   );
// }

// export default App;



import React, {useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Organization from "./pages/Organization";
import FirstPage from "./pages/FirstPage";
import Navbar from "./components/EmployeeComponents/NavBar";
import Sidebar from "./components/EmployeeComponents/Sidebar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Projects from "./pages/EmployeePages/Projects";
import TaskHub from "./pages/EmployeePages/Taskhub";
import Chat from "./pages/EmployeePages/Chat";
import Settings from "./pages/EmployeePages/Settings";
import Dashboard from "./pages/EmployeePages/Dashboard";
import TeamDetails from "./pages/EmployeePages/TeamDetails";
import SDashboard from "./pages/SupervisorPages/SDashboard";
import Top from "./components/Supervisor/Top";
import Side from "./components/Supervisor/Side";
import SProjects from "./pages/SupervisorPages/SProjects";
import SEmployees from "./pages/SupervisorPages/SEmployees";
import SSettings from "./pages/SupervisorPages/SSettings";


// Layout component with Navbar and Sidebar
function LayoutWithSidebar({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
}

function LayoutWithTop({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Top />
      <div className="flex flex-grow">
        <Side />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
}


  function App() {
    const [isStaff, setIsStaff] = useState(null);
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsStaff(user.isStaff);
      }
    }, []);
  
    // if (isStaff === null) {
    //   return <div>Loading...</div>; // Or a spinner/loading component
    // }
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/organization" element={<Organization />} />
      <Route path="/login" element={<Login />} />
      
      {isStaff ? (
       
        <>
          <Route path="/sdashboard" element={<LayoutWithTop><SDashboard /></LayoutWithTop>} />
          <Route path="/sprojects" element={<LayoutWithTop><SProjects /></LayoutWithTop>} />
          <Route path="/employees" element={<LayoutWithTop><SEmployees /></LayoutWithTop>} />
          <Route path="/ssettings" element={<LayoutWithTop><SSettings /></LayoutWithTop>} />
          
        </>
      ) : (
        // Non-staff routes
        <>
          <Route path="/dashboard" element={<LayoutWithSidebar><Dashboard /></LayoutWithSidebar>} />
          <Route path="/projects" element={<LayoutWithSidebar><Projects /></LayoutWithSidebar>} />
          <Route path="/tasks" element={<LayoutWithSidebar><TaskHub /></LayoutWithSidebar>} />
          <Route path="/chat" element={<LayoutWithSidebar><Chat /></LayoutWithSidebar>} />
          <Route path="/chat/:teamId" element={<LayoutWithSidebar><TeamDetails /></LayoutWithSidebar>} />
          <Route path="/settings" element={<LayoutWithSidebar><Settings /></LayoutWithSidebar>} />
        </>
      )}

      
    </Routes>
  );
}

export default App;