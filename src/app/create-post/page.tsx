import { Metadata } from "next";
import CreatePost from "./CreatePost";

export const metadata: Metadata = {
  title: 'Create a Post',
  description: 'Create your Blog post',
}

const Page = () => {
  return (
    <CreatePost />
  );
}

export default Page;