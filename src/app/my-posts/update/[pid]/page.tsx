"use client"

import CreateOrEditPost from "@/app/components/BlogPost/CreateOrEditPost";
import { getBlogById, updateBlog } from "@/lib/blogApi";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdateBlogPost({ params }: { params: { pid: string } }) {
  let user:any;
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user") as string) || null;
  }
  const [response, setResponse] = useState<any>(null);
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user /*|| user.id != response.authorId*/) {
          const data = await getBlogById(params.pid);
          setResponse(data.data);
          if(data.data.authorId != user.id) {
            router.push('/');
          }
        } else {
          router.push('/auth');
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (formData: any) => {
    try {
      if (user) {
        const response = await updateBlog(formData, params.pid);
        if (response.success) {
          setCustomMessage('Post Updated Successfully');
          setResponse(null);
          setTimeout(() => {
            router.push('/');
          }, 2500);
        } else {
          setCustomMessage('Something Went Wrong');
        }
      } else {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div>
      {customMessage && (
        <div className="custom-message-sticky p-4 bg-green-500 text-white sticky top-0 z-10">
          {customMessage}
        </div>
      )}
      {response && <CreateOrEditPost blog={response} onSubmit={handleUpdate} />}
    </div>
  );
}