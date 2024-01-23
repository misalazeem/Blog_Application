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

  return (
    <div className="max-w-[80%]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={content?.slice(0, 150) + '...'} />
      </Head>
      <Link href={`/post/${encodeURIComponent(blog.title.replace(/\s+/g, '-'))}`}>
        <div className="flex flex-col w-auto max-w-[100vw] lg:flex-row justify-between p-4 border border-gray-300 rounded shadow-md">
          <div className="lg:w-1/2 mb-4 lg:mb-0 lg:mr-4">
            <img className="w-full h-auto object-cover rounded" src={imageUrl} alt={title} />
          </div>
          <div className="lg:w-1/2">
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <div className="mb-2">
              <strong>Categories:</strong>{" "}
              {categories.map((category, index) => (
                <span key={index} className="mr-2 px-2 py-1 bg-green-100 rounded">
                  {category}
                </span>
              ))}
            </div>
            <div className="mt-2" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
              <div dangerouslySetInnerHTML={{ __html: content?.slice(0, 350) + '...' }} />
            </div>
            <Link
              className="text-blue-500 underline mt-2 cursor-pointer focus:outline-none"
              href={`/post/${encodeURIComponent(blog.title.replace(/\s+/g, '-'))}`}
            >
              Read More
            </Link>
            <p className="text-gray-600 text-sm mt-2">
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