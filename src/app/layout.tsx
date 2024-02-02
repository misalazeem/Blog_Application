import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar/NavBar";
import getCurrentUser from "./actions/getCurrentUser";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Blog App",
    template: '%s | Blog App'
  },
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();
  return (    
    <html lang="en">      
      <body className="min-h-[100vh] bg-body-background">
        <div>
          <NavBar currentUser={currentUser}/>        
          {children}
        </div>
      </body>      
    </html>
    
  );
}
