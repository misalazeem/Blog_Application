import prisma from "@/lib/prisma";
import * as bcrypt from 'bcrypt';

interface RequestBody {
  username: string;
  password: string;
}
export async function Post(request: Request) {
  const body:RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      username: body.username,      
    }
  })

  if (user && (await bcrypt.compare(user.hash, body.password))) {
    const {hash, ...userWithoutPassword} = user;
    return new Response(JSON.stringify(userWithoutPassword));
  } else {
    return new Response(JSON.stringify(null));
  }
}