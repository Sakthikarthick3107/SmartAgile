import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slogo from '../assets/slogo.png';
// import personal from '../assets/Personal.png';
// import org from '../assets/Org.png';

function Login() {
    const navigate = useNavigate(); // Initialize navigate function
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    

    // Regular expression for validating email or employee ID format
    const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^([a-zA-Z]{3})_([0-9]{3})$/;

    // Function to handle organizational option click
    const handleOrganizationalClick = () => {
        // Redirect to the dashboard
        navigate('dashboard');
    };

    // Function to handle form submission
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Reset errors
        setUsernameError('');
        setPasswordError('');
    
        // Validate username
        if (!username) {
            setUsernameError('Username is required');
            return;
        }
    
        // Validate password
        if (!password) {
            setPasswordError('Password is required');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8000/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    password: password
                })
            });
    
            const data = await response.json();
            console.log(data)
    
            if (response.ok) {
                // Authentication successful
                console.log('Login successful');
                navigate('/dashboard')
            } else {
                // Authentication failed
                console.error('Login failed:', data.error);
                // Update state to display error message to the user
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle network errors or other exceptions
        }
    };
    
    const handleRegisterClick = () => {
        // Navigate to the Register page
        navigate('/Organization');
    };
    return (
        <div className="flex justify-center items-center w-[100vw] h-screen bg-bgfirst bg-opacity-80">
            <div className="bg-white rounded-lg shadow-md p-8 w-96">
                <div className="flex justify-center mb-6">
                    <img src={slogo} alt="Logo" className="w-20" />
                </div>
                <div className="text-center text-lg mb-6">Welcome! Please sign in to continue.</div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-semibold ml-2 mb-2">User Name</label>
                        <input type="text" id="username" placeholder="Enter your user Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={username} onChange={(e) => setusername(e.target.value)} />
                        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
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


