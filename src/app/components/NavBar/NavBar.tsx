import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Button from "../Button/Button";

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

const NavBar = ({currentUser}:UserMenuProps) => {
  const signOut = () => {

  }

  return(
    <header>
      <nav className="flex justify-between px-4 py-4 shadow-xl">
        <div>{currentUser?.username}</div>
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/blog-post">Post</Link>
          
          {currentUser ? <button type="button">Signout</button> : <Link href="/login">Login</Link>}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;