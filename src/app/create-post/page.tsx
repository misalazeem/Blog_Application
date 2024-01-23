"use client"

import { useState } from 'react';
import CreateOrEditPost from "@/app/components/BlogPost/CreateOrEditPost";
import { createBlog } from "@/lib/blogApi";
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  let user:any;

  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user") as string);
  }
  const router = useRouter();
  if (!user) {
    router.push('/');
  }

  const [customMessage, setCustomMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    try {
      if (user) {
        const response = await createBlog(formData);
        if (response.success) {
          setCustomMessage('Post Created Successfully');
          setTimeout(() => {
            router.push('/');
          }, 2500);
        } else {
          setCustomMessage('Something Went Wrong');
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      setCustomMessage('Error creating blog');
    }
  };

  return (
    <div>
      {customMessage && (
        <div className="custom-message-sticky p-4 bg-green-500 text-white sticky top-0 z-10">
          {customMessage}
        </div>
      )}
      {!customMessage && <CreateOrEditPost onSubmit={handleSubmit} />}
    </div>
  );
}