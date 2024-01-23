"use client";

import { getAllBlogs, getCategories } from "@/lib/blogApi";
import React, { useEffect, useState } from "react";
import BlogPost from "./components/BlogPost/BlogPost";

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
  const [blogData, setBlogData] = useState<BlogData[] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        if (categoriesData && categoriesData.success) {
          setCategories(categoriesData.data);
        }

        const pagenumber: string = currentPage.toString();
        const data = await getAllBlogs(categoryFilter || '', pagenumber || '');
        console.log(data);
        if (data && data.data) {
          setBlogData(data.data);
          setHasMorePages(data.data.length >= 3);

          if (data.data.length === 0 && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryFilter, currentPage]);

  return (
    <>
      <div className="flex flex-col items-center w-[80vw] mx-auto py-8 gap-4">
        <select
          onChange={(e) => setCategoryFilter(e.target.value || null)}
          value={categoryFilter || ""}
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

        {blogData &&
          blogData.map((blog) => <BlogPost key={blog.id} blog={blog} />)}

        <div className="flex justify-between w-full mt-4">
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
      </div>
    </>
  );
};

export default Page;