"use client"
import { useEffect, useState } from 'react';
import Login from '../Component/Login';
import Signup from '../Component/Signup';
import { useContext } from 'react';
import { authContext } from '../Context/auth';
export default function Home() {
  // show the login and signup screen
  const [isLogin, setLoginSignup] = useState(true);

  const contextAuth = useContext(authContext);

  useEffect(() => {
    let token = localStorage.getItem('token');
    console.log(contextAuth);
    console.log(token);
    if (token !== null) {
      contextAuth.setAuth(true);
    }
  })
  //set Login and signup  screen 
  function setScreen() {
    setLoginSignup(!isLogin);

  }
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="bg-teal-600 w-64 p-4">
        <div className="text-white text-3xl font-bold mb-6">
          <span className="block">reifai</span>
        </div>
        <nav className="text-white space-y-4">
          <a href="#" className="block text-white hover:bg-teal-700 p-2 rounded">Dashboard</a>
          <a href="#" className="block text-white hover:bg-teal-700 p-2 rounded">Client Mortgage Data</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-teal-500 p-4 flex justify-between items-center">
          <div>
            <a href="#" className="text-white text-sm">Video Tutorial</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white text-sm">Admin</a>
            <span className="text-white text-sm">Marcus Jovanovich</span>
          </div>
        </nav>

        {/* Login Form */}
        <div>
          {contextAuth.isAuth ? <h1 className='text-3xl font-bold'>You are in Dashboard</h1> : !isLogin ? <Login setLogin={setScreen} /> : <Signup setSignup={setScreen} />}

        </div>
      </div>
    </div>
  );
}
