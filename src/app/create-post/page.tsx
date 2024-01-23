"use client"

import { useState, useEffect } from 'react';
import CreateOrEditPost from "@/app/components/BlogPost/CreateOrEditPost";
import { createBlog } from "@/lib/blogApi";
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [customMessage, setCustomMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem("user") as string) || null;
      setUser(storedUser);
      setLoading(false);
      if ( !storedUser ) {                
        router.push('/');
      }
    }
  }, []);

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
      setCustomMessage('Error creating blog');
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && customMessage && (
        <div className="custom-message-sticky p-4 bg-green-500 text-white sticky top-0 z-10">
          {customMessage}
        </div>
      )}
      {!loading && !customMessage && <CreateOrEditPost onSubmit={handleSubmit} />}
    </div>
  );
}