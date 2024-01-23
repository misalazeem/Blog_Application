'use client'

import SingleBlogPost from "@/app/components/BlogPost/SingleBlogPost";
import { getBlogBySlug } from "@/lib/blogApi";
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogBySlug(params.slug);
        setResponse(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, [params.slug]);

  console.log(response);

  return (
    <div className="py-8">
      <SingleBlogPost blog={response} />
    </div>
  );
}