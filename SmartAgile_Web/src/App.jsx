
import React from "react";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/organization" element={<Organization />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<LayoutWithSidebar><Dashboard /></LayoutWithSidebar>} />
      <Route path="/projects" element={<LayoutWithSidebar><Projects /></LayoutWithSidebar>} />
      <Route path="/tasks" element={<LayoutWithSidebar><TaskHub /></LayoutWithSidebar>} />
      <Route path="/chat" element={<LayoutWithSidebar><Chat /></LayoutWithSidebar>} />
      <Route path="/settings" element={<LayoutWithSidebar><Settings /></LayoutWithSidebar>} />
    </Routes>
  );
}

export default App;
