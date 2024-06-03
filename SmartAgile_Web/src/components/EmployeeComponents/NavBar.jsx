// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import logo from "../../assets/logo.png"

// const Navbar = () => {
//   const [userData, setUserData] = useState({});
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       // Replace with the actual backend endpoint that provides user data
//       const response = await fetch("/api/user");
//       const data = await response.json();
//       setUserData(data);

//       // Assuming the user data includes a 'notificationCount' property
//       setNotificationCount(data.notificationCount);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   return (
//     <div className="bg-[#4D989D] w-[99.2vw] text-white flex justify-between items-center p-5 px-10">
//       <div className="flex items-center">
//         <div className="w-40 h-auto">
//           {/* Your logo component or image */}
//           <img src={logo} alt="Logo" />
//         </div>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center ">
//           {/* Your user profile area */}
//           <span className="mr-2.5">{userData.username}</span>
//           <img
//             className="max-w-[30px] h-auto cursor-pointer ml-2.5 w-10 h-10 rounded-full object-cover mx-3.5"
//             src={userData.profilePicture}
//             alt="Profile"
//           />
//         </div>
//         <div className="ml-3">
//           {/* FontAwesome Bell Icon with notification count */}
//           <span className="relative top-[-7.5px] right-[-23.5px] bg-red-500 text-white text-xs p-[0px] px-[4px] rounded-full">
//             {notificationCount}
//           </span>
//           <FontAwesomeIcon icon={faBell} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
  const [userData, setUserData] = useState({});
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const id = localStorage.getItem('user_id');

  const fetchUserData = async () => {
    try {
      // Replace with the actual backend endpoint that provides user data
      const response = await fetch(`http://127.0.0.1:8000/users/employees/${id}/`);
      const data = await response.json();
      setUserData(data);

      // Assuming the user data includes a 'notificationCount' property
      setNotificationCount(data.notificationCount);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="bg-[#4D989D] w-[99.2vw] text-white flex justify-between items-center p-5 px-10">
      <div className="flex items-center">
        <div className="w-40 h-auto">
          {/* Your logo component or image */}
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center ">
          {/* Your user profile area */}
          <span className="mr-2.5">{userData.username}</span>
          {/* <img
            className="max-w-[30px] h-auto cursor-pointer ml-2.5 w-10 h-10 rounded-full object-cover mx-3.5"
            src={userData.profilePicture}
            alt="Profile"
          /> */}
          <Avatar src={userData.image} alt="Profile"/>
        </div>
        <div className="ml-3">
          {/* FontAwesome Bell Icon with notification count */}
          <span className="relative top-[-7.5px] right-[-23.5px] bg-red-500 text-white text-xs p-[0px] px-[4px] rounded-full">
          {notificationCount}  
          </span>
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;