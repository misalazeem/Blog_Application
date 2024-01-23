"use client";

import { getMyPosts, deletePost } from "@/lib/blogApi";
import React, { useEffect, useState } from "react";
import BlogPost from "../components/BlogPost/BlogPost";
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

const Page = () => {
  let user:any = null;
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user") as string) || {};
  }
  const [blogData, setBlogData] = useState<BlogData[] | null>(null);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await getMyPosts();
          setBlogData(data.data);
        } else {
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const response = deletePost(id);
  };

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-2xl">
          <Link href="/auth">Login</Link> to view this page
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center w-[80vw] mx-auto py-8 gap-4">
        {blogData && blogData.map((blog) => (
          <div key={blog.id} className="relative">
            <button
              className="absolute top-5 right-3 px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => handleDelete(blog.id)}
            >
              Delete
            </button>
            <Link
              className="absolute top-5 right-20 px-2 py-1 bg-blue-500 text-white rounded"
              href={`/my-posts/update/${blog.id}`}
            >
              Update
            </Link>
            <BlogPost blog={blog} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;