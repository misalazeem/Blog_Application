import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface FeaturedPostProps {
    blogs?: FeaturedPostProps[] ;
  }

interface FeaturedPostProps {
    title: string;
    categories: string[];
    content: string;
    imageUrl: string;
    author: { name: string };
  }

  const FeaturedPost: React.FC<FeaturedPostProps> = ({ blogs }) => {
    if (!blogs || blogs.length === 0) {    
        return <div>No blogs to display</div>;
    }

    const blog = blogs[0];

    const { title, categories, content, imageUrl, author} = blog;

    const generateSlug = (title: string, authorName: string) => {
      const baseSlug = title.replace(/\s+/g, '-');
      const authorSlug = authorName.replace(/\s+/g, '-');
      return `${baseSlug}_${authorSlug}`;
    };
  
    const slug = generateSlug(title, author.name);

  return (
    <>
    <h2 className="text-4xl font-extrabold text-center mb-4">Featured Post</h2>
        <div className='w-full inline-block text-white'>
            <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
                <div className='absolute top-0 left-0 bottom-0 right-0 h-full
                bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
                ' />
            <Image src={blog.imageUrl}
            alt={blog.title}
            fill
            className='w-full h-full object-center object-cover rounded-3xl -z-10'
            sizes='100vw'
            priority
            />

            <div className='w-full lg:w-3/4 p-6 sm:p-8 md:p-12  lg:p-16 flex flex-col items-start justify-center z-0 text-light'>
                <Link href={`/post/${encodeURIComponent(slug)}`} className='mt-6'>
                <h1 className='font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'>
                    <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                    dark:to-accentDark/50 bg-[length:0px_6px]
                    hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                    {blog.title}
                    </span>
                </h1>
                
                <p className='hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in'>
                <div dangerouslySetInnerHTML={{ __html: content?.slice(0, 350) + '...' }} />
                </p>
                </Link>
            </div>
        </article>
        </div>
    </>
  )
}

export default FeaturedPost;