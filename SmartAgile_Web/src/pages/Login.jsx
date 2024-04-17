import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slogo from '../assets/slogo.png';
// import personal from '../assets/Personal.png';
// import org from '../assets/Org.png';

function Login() {
    const navigate = useNavigate(); // Initialize navigate function
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    

    // Regular expression for validating email or employee ID format
    const userIdRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^([a-zA-Z]{3})_([0-9]{3})$/;

    // Function to handle organizational option click
    const handleOrganizationalClick = () => {
        // Redirect to the dashboard
        navigate('dashboard');
    };

    // Function to handle form submission
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setUserIdError('');
        setPasswordError('');

        // Validate user ID
        if (!userId) {
            setUserIdError('User ID is required');
        } else if (!userId.match(userIdRegex)) {
            setUserIdError('Invalid email or employee ID format');
        }

        // Validate password
        if (!password) {
            setPasswordError('Password is required');
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        }

        // Check if both fields meet the correct specifications
        if (userId && password && !userIdError && !passwordError) {
            // Perform sign in
            handleOrganizationalClick();
        }
    };

    const handleRegisterClick = () => {
        // Navigate to the Register page
        navigate('/Organization');
    };
    return (
        <div className="flex justify-center items-center w-[100vw] h-screen bg-[#46B2B8] bg-opacity-40">
            <div className="bg-white rounded-lg shadow-md p-8 w-96">
                <div className="flex justify-center mb-6">
                    <img src={slogo} alt="Logo" className="w-20" />
                </div>
                <div className="text-center text-lg mb-6">Welcome! Please sign in to continue.</div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-sm font-semibold ml-2 mb-2">User ID</label>
                        <input type="text" id="userId" placeholder="Enter your user ID" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={userId} onChange={(e) => setUserId(e.target.value)} />
                        {userIdError && <p className="text-red-500 text-sm">{userIdError}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold ml-2 mb-2">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        {/* Remember Me Checkbox */}
                        <div className="flex items-center">
                        <input type="checkbox" id="rememberMe" className="mr-2" />
                            <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
                        </div>
                        {/* Forgot Password Link */}
                        <a href="#" className="text-blue-700 text-sm">Forgot Password?</a>
                    </div>
                    <button type="submit" className="w-full bg-[#4D989D] text-white px-4 py-2 rounded-md mt-3 ">Sign In</button>
                </form>
                <div className="text-center mt-4">New Organization?
                <button onClick={handleRegisterClick} className="text-blue-700 ml-2 font-semibold hover:underline">Register</button>
                </div>
            </div>
        </div>
    );
}

export default Login;

