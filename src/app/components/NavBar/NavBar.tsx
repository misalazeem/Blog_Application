"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (typeof window !== 'undefined' && currentUser) {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }

  const handleSignout = () => {
    localStorage.clear();
    signOut();
  };

  return (
    <header className="sticky top-0 py-4 z-50 bg-gradient-to-r from-slate-100 via-fuchsia-100 to-teal-100 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="text-xl font-bold">{currentUser?.name || "Guest"}</div>
        <div className="lg:flex hidden gap-6">
          <Link className="text-gray-700 hover:text-indigo-500 transition duration-300" href="/">
            Home
          </Link>
          {currentUser ? (
            <>
              <Link className="text-gray-700 hover:text-indigo-500 transition duration-300" href="/create-post">
                Create
              </Link>
              <Link className="text-gray-700 hover:text-indigo-500 transition duration-300" href="/my-posts">
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
            <Link className="text-gray-700 hover:text-indigo-500 transition duration-300" href="/auth">
              Login/Register
            </Link>
          )}
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-indigo-500 transition duration-300 focus:outline-none"
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
