import prisma from "@/lib/prisma";
import * as bcrypt from 'bcrypt';

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });
    if (user && (await bcrypt.compare(body.password, user.hash))) {
      const { hash, ...userWithoutPassword } = user;
      return new Response(JSON.stringify(userWithoutPassword));
    } else {
      return new Response(JSON.stringify(null));
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Authentication failed" }));
  }
}