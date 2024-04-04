import React, { useState } from 'react';
import LoginImage from '../Images/Login.png'; // Assuming Login.png is the image file for the login page


const Chat = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { Username, password };
    console.log("Credentials:", credentials);
  };

  const handleForgotPassword = () => {
    alert("Please check your registered email for a password reset link.");
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto flex">
        {/* First Column - Image */}
        <div className="flex-none w-1/2 p-4">
          
          <img src={LoginImage} alt="Login" className="h-[90%] bg-gradient-to-r from-pink-300 via-teal-500 to-pink-300 
           ml-[110px] rounded-lg w-full object-cover" />
            <h2 className="absolute font-Roboto top-[205PX] left-[590PX] transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold">SMARTAGILE</h2>
        </div>

        {/* Second Column - Login Form */}
        <div className="flex-grow p-4">
          <div className="flex-grow justify-center items-center px-16 py-20 w-full h-[90%] text-xl font-medium text-black bg-gray-200 rounded-[40px_0px_0px_40px] max-md:px-5 max-md:mt-2.5 max-md:max-w-full">
            <h2 className="text-3xl mt-[21px] font-Roboto font-bold text-gray-800 mb-6">Login</h2>
            <form className="">
                  <fieldset className="border border-black border-solid h-[88px] rounded-[33px] max-md:max-w-full mt-16 flex ">
                    <legend className="text-left mx-8">Username</legend>
                    <input 
                      type="text"
                      name="text"
                      className="w-95 rounded-[33px] bg-gray-200 border border-none outline-none flex-grow text-xl"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="border border-black border-solid h-[88px] rounded-[33px] max-md:max-w-full mt-16 flex  ">
                    <legend className="text-left mx-8">Password</legend>
                    <input 
                      type="password"
                      name="password"
                      className="w-95 rounded-[33px]  bg-gray-200 border border-none outline-none flex-grow text-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </fieldset>
                  <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                       <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#4d989d] focus:ring-[#4d989d] border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-black-900">Remember me</label>
                       </div>
                    <p className="text-[#4d989d] font-medium cursor-pointer" onClick={handleForgotPassword}>Forgot password?</p>
                     
                  </div>

                  <div className="flex flex-col">
                    <button className="justify-center items-center self-center px-16 py-5 mt-24 text-3xl text-white rounded-[33px] max-md:px-5 max-md:mt-10 max-md:max-w-full bg-[#4d989d] font-syne" onClick={handleSubmit}>Sign Up</button>
                  </div>
                  <div className="flex flex-col justify-end">
                    <p className="text-center mt-5 text-[#4d989d] font-medium cursor-pointer" onClick={handleForgotPassword}><span className="text-black">New User</span> Signup</p>
                  </div>
                </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
