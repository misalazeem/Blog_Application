"use client"

import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

// Define the AuthPage component
const AuthPage: React.FC = () => {
  // State to manage the current active component (login or register)
  const [activeComponent, setActiveComponent] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md w-96">
        {/* Toggle button to switch between login and register */}
        <div className="flex justify-between mb-4">
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeComponent === 'login' ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveComponent('login')}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeComponent === 'register' ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveComponent('register')}
          >
            Register
          </button>
        </div>

        {/* Render the active component with fade-in/out transition */}
        {activeComponent === 'login' ? (
          <Login key="login" />
        ) : (
          <Register key="register" />
        )}
      </div>
    </div>
  );
};

export default AuthPage;