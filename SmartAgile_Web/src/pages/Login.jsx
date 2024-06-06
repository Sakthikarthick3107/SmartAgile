import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slogo from "../assets/slogo.png";
// import personal from '../assets/Personal.png';
// import org from '../assets/Org.png';

function Login() {
  const navigate = useNavigate(); // Initialize navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);

  // Regular expression for validating email or employee ID format
  // const usernameRegex =
  //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^([a-zA-Z]{3})_([0-9]{3})$/;

  const backendUrl = 'http://127.0.0.1:8000';

  // Function to handle organizational option click
  const handleOrganizationalClick = () => {
    // Redirect to the dashboard
    navigate("dashboard");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate username
    if (!email) {
      setEmailError("Username is required");
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const res = await response.json();
      console.log(res);

      if (response.ok) {
        // Authentication successful
        console.log("Login successful");
        localStorage.setItem('user_id',JSON.stringify(res.user_id));
        const userData = {
          username: res.email,
          isStaff : res.is_staff
        };
        localStorage.setItem('org_id', JSON.stringify(res.organization));
        localStorage.setItem("user", JSON.stringify(userData));
        setTimeout(() => {
          if(res.is_staff){
            navigate('/sdashboard');
          }else{
            navigate('/dashboard');
          }
          window.location.reload();
        }, 2000);
      } else {
        // Authentication failed
        setEmailError('Invalid Email or Password');
        setPasswordError('Invalid Email or Password');
        console.error("Login failed:", res.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${backendUrl}/users/auth/password_reset/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("OTP sent successfully");
        setId(data.id);
        setCode(data.unique_token);
        setForgotPasswordEmail('')
        setOtpSent(true);
      } else {
        console.error("Failed to send OTP:", data.error);
        alert("Enter proper Email Address");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${backendUrl}/users/auth/password_reset/confirm/otp/${id}/${code}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("OTP verified successfully");
        alert("OTP verified successfully");
        setOtpSent(false);
        setShowForgotPasswordModal(false);
        setPasswordChange(true);
      } else {
        console.error("Failed to verify OTP:", data.error);
        alert("Failed to verify OTP");
        setOtp("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtp("Error verifying OTP");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      console.log('Passwords should match');
      return;
    }
    try {
      const response = await fetch(
        `${backendUrl}/users/auth/password_reset/confirm/password/${id}/${code}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("Password reset successfully");
        alert("Password reset successfully");
        setShowForgotPasswordModal(false);
        setOtp('')
        setNewPassword('')
        setConfirmPassword('')
        setPasswordChange(false);
        // Redirect user to login page or show a success message
      } else {
        console.error("Failed to reset password:", data.error);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleRegisterClick = () => {
    // Navigate to the Register page
    navigate("/Organization");
  };

return (
   <div className="flex justify-center items-center w-[100vw] h-screen bg-bgfirst bg-opacity-80">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <div className="flex justify-center mb-6">
          <img src={slogo} alt="Logo" className="w-20" />
        </div>
        <div className="text-center text-lg mb-6 text-black">
          Welcome! Please sign in to continue.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-md font-semibold ml-2 mb-2 text-black"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 bg-gray-950 bg-opacity-25 rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm">{emailError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-md font-semibold ml-2 mb-2 text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 bg-gray-950 bg-opacity-25 rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-sm text-black">
                Remember Me
              </label>
            </div>
            <a
              href="#"
              className="text-blue-700 text-sm"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#4D989D] text-white px-4 py-2 rounded-md mt-3 "
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          New Organization?
          <button
            onClick={handleRegisterClick}
            className="text-blue-700 border-gray-300 bg-gray-100 ml-2 font-semibold hover:underline"
          >
            Register
          </button>
        </div>
      </div>
      {showForgotPasswordModal && (
        <div className="fixed top-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8  rounded-md  w-[350px]">
            {otpSent ? (
              <>
                <form className="text-right  bg-white rounded-md  w-full">
                  <input
                    className="w-full m-auto border border-gray-500 rounded-md bg-gray-950 bg-opacity-25 p-2 mb-[20px]"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className="flex justify-between gap-[75px]">
                    <button
                      className="bg-[#4D989D] text-white "
                      onClick={() => setShowForgotPasswordModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-[#4D989D] text-white "
                      onClick={handleOtpSubmit}
                    >
                      Verify OTP
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <form
                className="text-center"
                onSubmit={handleForgotPasswordSubmit}
              >
                <input
                  className="w-full border border-gray-500 rounded-md bg-gray-950 bg-opacity-25 p-2 mb-[20px]"
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
                <button className="bg-[#4D989D] text-white" type="submit">
                  Send OTP
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {passwordChange && (
        <div className="fixed top-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8  rounded-md  w-[350px]">
            <div className={`${passwordChange ? "inline" : "hidden"}`}>
              <form
                className=" bg-white rounded-md  w-full"
                onSubmit={handlePasswordChange}
              >
                <input
                  className="w-full border border-gray-500 rounded-md bg-gray-950 bg-opacity-25 p-2 mb-[20px]"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  className="w-full border border-gray-500 rounded-md bg-gray-950 bg-opacity-25 p-2 mb-[20px]"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="bg-[#4D989D] text-white" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;