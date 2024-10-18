
"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { authContext } from '../Context/auth';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLogin } = props; // Assuming setLogin is a prop for toggling the login state
  const [error, setError] = useState(''); // State to handle error messages
  const [loading, setLoading] = useState(false); // State to handle loading state

  const contextAuth=useContext(authContext);

  const handleSubmit = async (e) => {
    
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous error messages
    setLoading(true); // Set loading state to true
    try{
      const response=await axios.post('/api/login',{
        email,
        password
      });
      
      if(response.status === 200){
        localStorage.setItem('token',response.data.token); // Store the token in local storage
        console.log(localStorage.getItem('token'));
        contextAuth.setAuth(true);
      }

    }catch(e){
      console.error(e);
      setError('Failed to login. Please check your credentials.'); // Display error message
    }
    
  };

  function setScreenLogin() {
    setLogin(); // Call setLogin to switch to the signup screen (if applicable)
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Logging In...' : 'Login'} {/* Change button text based on loading state */}
          </button>
          <p className="text-sm text-center text-gray-500 mt-4">
            Don&lsquo; have an account?{' '}
            <button onClick={setScreenLogin} className="text-blue-500 hover:underline">
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
