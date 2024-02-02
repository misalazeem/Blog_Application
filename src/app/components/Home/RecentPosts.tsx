'use client'

import React, { useState, useEffect } from 'react';
import { getAllBlogs, getCategories } from '@/lib/blogApi';
import Loading from '../Loading/Loading';
import BlogPost from '../BlogPost/BlogPost';

interface BlogData {
  id: string;
  title: string;
  categories: string[];
  content: string;
  imageUrl: string;
  author: { name: string };
  createdAt: Date;
}

const RecentPosts: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogData[] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const categoriesData = await getCategories();
        if (categoriesData && categoriesData.success) {
          setCategories(categoriesData.data);
        }

        const pagenumber: string = currentPage.toString();
        const data = await getAllBlogs(categoryFilter || '', pagenumber || '');

        if (data && data.data) {
          setBlogData(data.data);
          setHasMorePages(data.data.length >= 6);

          if (data.data.length === 0 && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryFilter, currentPage]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-between items-center">
          <Loading />
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-extrabold text-center my-8">Recent Posts</h2>
          <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
            <select
              className="py-2 px-4"
              onChange={(e) => setCategoryFilter(e.target.value || null)}
              value={categoryFilter || ''}
              style={{ outline: '1px solid gray', outlineColor: '#333' }}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="" onClick={() => setCategoryFilter(null)}>
                All Categories
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <div className='flex flex-wrap justify-center gap-4 mt-8'>
              {blogData &&
                blogData.map((blog) => <BlogPost key={blog.id} blog={blog} />)}
            </div>
            <div className="flex justify-around w-full my-8">
              <button
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(1, prevPage - 1))
                }
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    hasMorePages ? prevPage + 1 : prevPage
                  )
                }
                disabled={!hasMorePages}
              >
                Next
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default RecentPosts;
