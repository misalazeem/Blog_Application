'use client'

import React, { useEffect, useState } from 'react';
import { getAllBlogs, getCategories } from '@/lib/blogApi';
import Loading from './components/Loading/Loading';
import FeaturedPost from './components/Home/FeaturedPost';
import RecentPosts from './components/Home/RecentPosts';

interface BlogData {
  id: string;
  title: string;
  categories: string[];
  content: string;
  imageUrl: string;
  author: { name: string };
  createdAt: Date;
}

const Page = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogData | null>(null);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const data = await getAllBlogs('', '1');

        if (data && data.data && data.data.length > 0) {
          setFeaturedPost(data.data[0]);
        }
      } catch (error) {
        
      }
    };

    fetchFeaturedPost();
  }, []);

  return (
    <div className="mt-4">
      {featuredPost ? (
        <FeaturedPost blogs={[featuredPost]} title={''} categories={[]} content={''} imageUrl={''} author={{
          name: ''
        }} />
      ) : (
        <Loading />
      )}
      <RecentPosts />
    </div>
  );
};

export default Page;
