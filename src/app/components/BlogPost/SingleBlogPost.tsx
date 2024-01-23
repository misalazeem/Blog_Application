import React from "react";
import Head from "next/head";

interface SingularBlogPostProps {
  blog: {
    title: string;
    categories: string[];
    content: string;
    imageUrl: string;
    author: { name: string };
    createdAt: Date;
  };
}

const SingleBlogPost: React.FC<SingularBlogPostProps> = ({ blog }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }

  const { title, categories, content, imageUrl, author, createdAt } = blog;

  return (
    <div className="max-w-[75%] mx-auto mt-8">
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 150) + '...'} />
      </Head>
      <img className="w-full h-96 object-cover object-center rounded" src={imageUrl} alt={title} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="text-gray-600 text-sm mt-2">
          <span>Written by {author.name}</span>
          <span className="mx-2">|</span>
          <span>Posted: {new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <div className="mt-4">
          <strong>Categories:</strong>{" "}
          {categories.map((category, index) => (
            <span key={index} className="mr-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
              {category}
            </span>
          ))}
        </div>
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default SingleBlogPost;
