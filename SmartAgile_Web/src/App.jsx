import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Employee/Dashboard";
import Projects from "./pages/Employee/Projects";
import TaskHub from "./pages/Employee/Taskhub";
import Chat from "./pages/Employee/Chat";
import Settings from "./pages/Employee/Settings";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <main className="flex-grow overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<TaskHub />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            {/* Define more routes as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
