// import React from "react";
// import User from "../../assets/user.png";
// import Profile from "../../assets/Profile.png";
// import update from "../../assets/update.png";

// const Settings = () => {
//   return (
//     <div className="flex mt-[-60px]">
//       <div className="flex flex-col flex-1 ml-6  mt-0">
//         <div className=" p-4 overflow-auto h-full">
//           <div className="flex items-center mt-14 ml-[-20px]">
//             <img src={User} alt="user" className="mr-2" />
//             <h2 className="font-medium  text-[20px]">My Profile</h2>
//           </div>

//           <div className="p-6 max-w-screen h-screen m-10 bg-gray-100 rounded-xl shadow-lg space-y-4">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={Profile}
//                 alt="Profile"
//                 className="m-5 flex items-center space-x-4"
//               />
//               <div className="flex flex-col items-start">
//                 <div className="text-xl font-medium text-black">
//                   Krishna Kumar M
//                 </div>
//                 <p className="text-gray-500 mt-1">DS_051</p>
//               </div>

//               <div className="fixed bottom-[440px] right-[90px] rounded-lg m-3 p-[0px] text-[25px] text-white bg-[#4D989D] flex items-center">
//                 <img src={update} alt="update" className="m-2 mb-0 ml-3" />
//                 <span className="m-1 mr-2 text-[14px]">Update</span>
//               </div>
//             </div>
//             <div className="p-6 h-[600px] bg-white mt-12 rounded-xl shadow-md space-y-4">
//               <div className="flex flex-col mt-10 ml-9 mr-9 space-y-4">
//                 <div className="flex items-center">
//                   <label htmlFor="name" className="w-32 font-medium">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="flex-1 bg-[#d2e6e7] p-2 ml-[60px] rounded-md"
//                     placeholder="Enter your name"
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <label htmlFor="email" className="w-32 mt-10 font-medium">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="flex-1 bg-[#d2e6e7] p-2 mt-10 ml-[60px] rounded-md"
//                     placeholder="Enter the mail id"
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <label htmlFor="phone" className="w-32 mt-10 font-medium">
//                     Phone Number
//                   </label>
//                   <input
//                     type="phone"
//                     name="phone"
//                     className="flex-1 bg-[#d2e6e7] p-2 mt-10 ml-[60px] rounded-md"
//                     placeholder="Enter the Phone number"
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <label htmlFor="role" className="w-32 mt-10 font-medium">
//                     Role
//                   </label>
//                   <input
//                     type="text"
//                     name="role"
//                     className="flex-1 bg-[#d2e6e7] p-2 mt-10 ml-[60px] rounded-md"
//                     placeholder="Enter the role"
//                   />
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;
// import React from "react";
// import User from "../../assets/user.png";
// import Profile from "../../assets/Profile.png";
// import update from "../../assets/update.png";

// const Settings = () => {
//   return (
//     <div>
//       <h2>Personal Information</h2>
//       <div className="flex items-center mt-14 ml-[-20px]">
//         <img
//           src={Profile}
//           alt="Profile"
//           className="m-5 flex items-center space-x-4"
//         />
//       </div>
//       <div>
//         <div className=" ml-[160px] rounded-xl">
//           <h3 className="text-2xl font-medium text-black">
//             Name: <span className="text-xl font-light text-black">Krishna Kumar</span>
//           </h3>

//           <h3 className="text-2xl font-medium text-black mt-[15px]" >
//             Employee Id: <span className="text-xl font-light text-black">DS_051</span>
//           </h3>
//           <h3 className="text-2xl font-medium text-black mt-[15px]">
//             Designation: <span className="text-xl font-light text-black">Senior Software Engineer</span>
//           </h3>
//           <h3 className="text-2xl font-medium text-black mt-[15px]">
//             Email: <span className="text-xl font-light text-black">krishnakumar@tmachine.in</span>
//           </h3>
//           <h3 className="text-2xl font-medium text-black mt-[15px]">
//             Mobile No: <span className="text-xl font-light text-black">1234567890</span>
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

import React, { useEffect, useState } from "react";

const Settings = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    image: "",
    id: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/users/employees/${userId}/`
        );
        console.log(response);
        const data = await response.json();
        console.log(data);
        setUser({
          username: data.username,
          email: data.email,
          image: data.image,
          id: data.id,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // if (userId) {
    //   fetchUserData();
    // }
    fetchUserData();
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold text-black mb-[5%]">Personal Information</h2>
      <div className="border   rounded-xl shadow-xl py-[20px] w-[60%] m-auto">
        <div className="flex items-center  ml-[20px] ">
          <img
            src={user.image || "default-profile-image.png"} // Use a default image if user.image is empty
            alt="Profile"
            className="m-5 flex items-center space-x-4 w-[20%]"
          />
        </div>

        <div className=" ml-[20%] rounded-xl">
          <h3 className="text-2xl font-medium text-black">
            Name:{" "}
            <span className="text-xl font-light text-black">
              {user.username}
            </span>
          </h3>

          <h3 className="text-2xl font-medium text-black mt-[15px]">
            Employee Id:{" "}
            <span className="text-xl font-light text-black">{user.id}</span>
          </h3>
          <h3 className="text-2xl font-medium text-black mt-[15px]">
            Designation:{" "}
            <span className="text-xl font-light text-black">
              Senior Software Engineer
            </span>
          </h3>
          <h3 className="text-2xl font-medium text-black mt-[15px]">
            Email:{" "}
            <span className="text-xl font-light text-black">{user.email}</span>
          </h3>
          <h3 className="text-2xl font-medium text-black mt-[15px]">
            Mobile No:{" "}
            <span className="text-xl font-light text-black">1234567890</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Settings;
