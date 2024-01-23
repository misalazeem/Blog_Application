'use client';

import SingleBlogPost from "@/app/components/BlogPost/SingleBlogPost";
import { getBlogBySlug } from "@/lib/blogApi";
import { useEffect, useState } from 'react';
import Loading from "@/app/components/Loading/Loading";

export default function Page({ params }: { params: { slug: string } }) {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getBlogBySlug(params.slug);
        setResponse(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-between items-center">
          <Loading />
        </div>
      ) : (
        <div className="py-8">
          <SingleBlogPost blog={response} />
        </div>
      )}
    </>
  );
}
