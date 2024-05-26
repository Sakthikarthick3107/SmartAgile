import React from "react";
import User from "../../assets/user.png";
import Profile from "../../assets/Profile.png";
import update from "../../assets/update.png";

const Settings = () => {
  return (
    <div className="flex mt-[-60px]">
      <div className="flex flex-col flex-1 ml-6  mt-0">
        <div className=" p-4 overflow-auto h-full">
          <div className="flex items-center mt-14 ml-[-20px]">
            <img src={User} alt="user" className="mr-2" />
            <h2 className="font-medium  text-[20px]">My Profile</h2>
          </div>

          <div className="p-6 max-w-screen h-screen m-10 bg-gray-100 rounded-xl shadow-lg space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={Profile}
                alt="Profile"
                className="m-5 flex items-center space-x-4"
              />
              <div className="flex flex-col items-start">
                <div className="text-xl font-medium text-black">
                  Krishna Kumar M
                </div>
                <p className="text-gray-500 mt-1">DS_051</p>
              </div>

              <div className="fixed bottom-[440px] right-[90px] rounded-lg m-3 p-[0px] text-[25px] text-white bg-[#4D989D] flex items-center">
                <img src={update} alt="update" className="m-2 mb-0 ml-3" />
                <span className="m-1 mr-2 text-[14px]">Update</span>
              </div>
            </div>
            <div className="p-6 h-[600px] bg-white mt-12 rounded-xl shadow-md space-y-4">
              <div className="flex flex-col mt-10 ml-9 mr-9 space-y-4">
                <div className="flex items-center">
                  <label htmlFor="name" className="w-32 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="flex-1 bg-[#d2e6e7] p-2 ml-[60px] rounded-md"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="email" className="w-32 mt-10 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="flex-1 bg-[#d2e6e7] p-2 mt-10 ml-[60px] rounded-md"
                    placeholder="Enter the mail id"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="phone" className="w-32 mt-10 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    className="flex-1 bg-[#d2e6e7] p-2 mt-10 ml-[60px] rounded-md"
                    placeholder="Enter the Phone number"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="role" className="w-32 mt-10 font-medium">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    className="flex-1 bg-[#d2e6e7] p-2 mt-10 ml-[60px] rounded-md"
                    placeholder="Enter the role"
                  />
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
