'use client'

import React from "react";
import Link from "next/link";
import Head from "next/head";

interface BlogObject {
  title: string;
  categories: string[];
  content: string;
  imageUrl: string;
  author: { name: string };
  createdAt: Date;
}

interface BlogPostProps {
  blog: BlogObject;
}

const BlogPost: React.FC<BlogPostProps> = ({ blog }) => {
  if (!blog) {
    return null;
  }

  const { title, categories, content, imageUrl, author, createdAt } = blog;

  const generateSlug = (title: string, authorName: string) => {
    const baseSlug = title.replace(/\s+/g, '-');
    const authorSlug = authorName.replace(/\s+/g, '-');
    return `${baseSlug}_${authorSlug}`;
  };

  const slug = generateSlug(title, author.name);

  return (
    <div className="flex w-[60%] justify-stretch items-stretch p-4 border border-gray-300 rounded shadow-md h-auto transition-opacity duration-500 ease-in-out lg:w-[30%] sm:w-[40%]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={content?.slice(0, 150) + '...'} />
      </Head>
      <Link href={`/post/${encodeURIComponent(slug)}`}>
        <div className="flex flex-col w-full justify-betweentransition-transform duration-300 transform hover:scale-105">
          <div className="w-full mb-4">
            <img
              className="w-full h-48 object-cover rounded transition-transform duration-300 transform hover:scale-105"
              src={imageUrl}
              alt={title}
            />
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <div className="mb-2">
              <strong>Categories:</strong>{" "}
              {categories.map((category, index) => (
                <span key={index} className="mr-2 px-2 py-1 bg-green-100 rounded">
                  {category}
                </span>
              ))}
            </div>
            <Link
              className="text-blue-500 underline mt-2 cursor-pointer focus:outline-none transition-colors duration-300 hover:text-indigo-700"
              href={`/post/${encodeURIComponent(blog.title.replace(/\s+/g, '-'))}`}
            >
              Read Post
            </Link>
            <p className="flex text-gray-600 text-sm mt-2">
              <span>Written by {author.name}</span>
              <span className="mx-2">|</span>
              <span>Posted: {new Date(createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPost;