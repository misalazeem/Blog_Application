"use client";

import { getMyPosts, deletePost } from "@/lib/blogApi";
import React, { useEffect, useState } from "react";
import BlogPost from "../components/BlogPost/BlogPost";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BlogData {
  id: string;
  title: string;
  categories: string[];
  content: string;
  imageUrl: string;
  author: {name: string};
  createdAt: Date;
}

const MyPosts = () => {
  let user:any = null;
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user") as string) || {};
  }
  const [blogData, setBlogData] = useState<BlogData[] | null>(null);
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          router.push('/');
        }
        const data = await getMyPosts();
        setBlogData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if(!user) {
      router.push('/');
    }
    const response = deletePost(id).then((data) => {
      console.log(data);
      setCustomMessage(data.data.message);
      setTimeout(() => {
        location.reload();
      }, 2500);
    }).catch((error) => {
      setCustomMessage(error);
    });
  };

  return (
    <>
      {customMessage && 
        <div className="custom-message-sticky p-4 bg-green-500 text-white sticky top-0 z-10">
          {customMessage}
        </div>
      }

      <div className="flex flex-col items-center w-[80vw] mx-auto py-8 gap-4">
        {blogData && blogData.length > 0 ? (
          blogData.map((blog) => (
            <div key={blog.id} className="relative">
              {/* ... (existing code) */}
              <BlogPost blog={blog} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-4xl font-bold">
            You haven't posted anything
          </div>
        )}
      </div>
    </>
  );
};

export default MyPosts;