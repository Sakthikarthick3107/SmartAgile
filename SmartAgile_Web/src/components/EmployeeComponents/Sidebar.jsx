
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faBriefcase, faTasks, faComments, faCog } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: faChartBar, path: "/dashboard" },
    { name: "Projects", icon: faBriefcase, path: "/projects" },
    { name: "Task Hub", icon: faTasks, path: "/tasks" },
    { name: "Chat", icon: faComments, path: "/chat" },
    { name: "Settings", icon: faCog, path: "/settings" },
  ];

  return (
    <nav className="w-64 h-screen bg-[#4D989D] bg-opacity-20 font-regular text-white flex flex-col pt-10 pr-5">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center p-2 my-2 transition-colors duration-0 justify-start ${
              isActive ? "bg-[#4D989D] py-3 rounded-r-full text-white" : "text-black py-3"
            }`
          }>
          <FontAwesomeIcon icon={item.icon} className="ml-1 mr-3 text-lg" />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;