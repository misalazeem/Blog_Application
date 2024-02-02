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
      <div className="mx-[10%]">
        {customMessage && 
          <div className="custom-message-sticky p-4 bg-green-500 text-white sticky top-0 z-10">
            {customMessage}
          </div>
        }
        <div className="w-[100vw] mt-8 flex flex-col justify-center items-center">
          {blogData && blogData.map((blog) => (
            <div key={blog.id} className="w-full mx-auto mb-8">
              <div className="flex gap-4 items-center">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
                <Link
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                  href={`/my-posts/update/${blog.id}`}
                >
                  Update
                </Link>
              </div>
              <BlogPost blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPosts;