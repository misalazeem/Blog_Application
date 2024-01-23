import { Metadata } from "next";
import MyPosts from "./MyPost";

export const metadata: Metadata = {
  title: 'My Posts',
  description: 'You can view your own posts on this page',
}

const Page = () => {
  return (
    <MyPosts />
  );
}

export default Page;