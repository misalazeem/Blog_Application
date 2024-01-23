import { Metadata } from "next";
import Auth from "./auth";

export const metadata: Metadata = {
  title: 'Login or Register',
  description: 'On This page you Login or Register',
}

const Page = () => {
  return (
    <Auth />
  );
}

export default Page;