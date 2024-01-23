import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }    

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });


    if (!currentUser) {
      return null;
    }

    const { hash, ...currentUserWithoutPassword } = currentUser;

    return currentUserWithoutPassword;
  } catch {
    // Handle errors
    return null;
  }
}