"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser: {
    id: string;
    name: string | null;
    email: string | null;
    username: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

const NavBar = ({ currentUser }: UserMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserMenuProps['currentUser'] | null>(currentUser);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  console.log(currentUser);
  if (typeof window !== 'undefined' && currentUser) {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }

  if (typeof window !== 'undefined' && currentUser) {
    if (!currentUser) {
      localStorage.clear();
    }
  }

  useEffect(() => {
    if (currentUser) {
      setLoggedInUser(currentUser);
    } else {
      setLoggedInUser(null);
    }
  }, [currentUser]);

  const handleSignout = () => {
    localStorage.clear();
    signOut();   
  };

  return (
    <header className="sticky top-0 py-4 z-50 bg-gradient-to-r from-indigo-300 via-cyan-500 to-blue-500 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-24">
        <div className="text-xl font-bold text-white">{currentUser?.name || "Guest"}</div>
        <div className="lg:flex hidden gap-6">
          <Link className="text-white hover:text-indigo-200 transition duration-300" href="/">
            Home
          </Link>
          {currentUser ? (
            <>
              <Link className="text-white hover:text-indigo-200 transition duration-300" href="/create-post">
                Create
              </Link>
              <Link className="text-white hover:text-indigo-200 transition duration-300" href="/my-posts">
                My Posts
              </Link>
              <button
                onClick={handleSignout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link className="text-white hover:text-indigo-200 transition duration-300" href="/auth">
              Login/Register
            </Link>
          )}
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-indigo-200 transition duration-300 focus:outline-none"
          >
            ☰
          </button>
          {menuOpen && (
            <div className="absolute top-16 right-4 bg-white border rounded-md shadow-md p-4">
              <div className="flex flex-col gap-2">
                <Link onClick={toggleMenu} className="text-gray-700 hover:text-indigo-500 transition duration-300" href="/" passHref>
                  Home
                </Link>
                {currentUser ? (
                  <>
                    <Link onClick={toggleMenu} className="text-gray-700 hover:text-indigo-500 transition duration-300" href="/create-post" passHref>
                      Create
                    </Link>
                    <Link onClick={toggleMenu} className="text-gray-700 hover:text-indigo-500 transition duration-300" href="/my-posts" passHref>
                      My Posts
                    </Link>
                    <button
                      onClick={handleSignout}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link onClick={toggleMenu} className="text-gray-700 hover:text-indigo-500 transition duration-300" href="/auth" passHref>
                    Login/Register
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
