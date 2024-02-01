'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import formImage from '../../../public/images/formcomponent.jpg';

const Auth: React.FC = () => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState<'login' | 'register'>('login');
  if (typeof window !== 'undefined') {
    const storedUser = JSON.parse(localStorage.getItem("user") as string) || null;
    if ( storedUser ) {                
      router.push('/');
    }
  }

  return (
    <div className="min-h-screen w-[75%] flex items-center justify-center mx-auto">
      <div className="flex flex-row justify-between p-8 w-full bg-[#f4f4f4] rounded shadow-xl w-96">
        <div className='flex flex-col w-[100%] md:w-[50%]'>
          <div className="flex flex-row justify-around">
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

          {activeComponent === 'login' ? <Login key="login" /> : <Register key="register" />}
        </div>

        <div className='hidden sm:flex flex-col w-[50%] p-4 items-center text-[#fff] bg-[#000] rounded-sm gap-4'>
          <h2 className="text-xl">Welcome to the Blog Application</h2>
          <h3 className="text-lg">Join now to Post and Read countless blogs</h3>
          <div>
            <img className="object-cover w-full" src={formImage.src} alt="Blog Application Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
