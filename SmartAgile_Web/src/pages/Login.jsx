import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import slogo from "../assets/slogo.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const res = await response.json();

      if (response.ok) {
        console.log("Login successful");
        const userData = {
          username: res.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
      } else {
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
        "http://127.0.0.1:8000/users/auth/password_reset/",
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
        console.log("OTP sent successfully");
        setOtpSent(true);
      } else {
        console.error("Failed to send OTP:", data.error);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/auth/password_reset/confirm/otp/${userId}/${otp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Empty body since OTP is in the URL
      });

      if (response.ok) {
        console.log('OTP verified successfully');
        setShowForgotPasswordModal(false);
      } else {
        const errorData = await response.json();
        console.error('Failed to verify OTP:', errorData.error);
        setOtpError('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Error verifying OTP');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      // Handle password mismatch error
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/users/auth/password_reset/reset/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Password reset successfully");
      } else {
        console.error("Failed to reset password:", data.error);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/Organization");
  };

  return (
    <div className="flex justify-center items-center w-[100vw] h-screen bg-bgfirst bg-opacity-80">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <div className="flex justify-center mb-6">
          <img src={slogo} alt="Logo" className="w-20" />
        </div>
        <div className="text-center text-lg mb-6">
          Welcome! Please sign in to continue.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold ml-2 mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your user Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <p className="text-red-500 text-sm">{usernameError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold ml-2 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
              <label htmlFor="rememberMe" className="text-sm">
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
            className="text-blue-700 ml-2 font-semibold hover:underline"
          >
            Register
          </button>
        </div>
      </div>
      {showForgotPasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            {otpSent ? (
              <>
                <form onSubmit={handleOtpSubmit}>
                  <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                  {otpError && (
                    <p className="text-red-500 text-sm">{otpError}</p>
                  )}
                  <button type="submit">Verify OTP</button>
                </form>
                <button onClick={() => setShowForgotPasswordModal(false)}>Cancel</button>
              </>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit}>
                <input type="email" placeholder="Enter your email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} />
                <button type="submit">Send OTP</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
