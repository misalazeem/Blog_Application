import prisma from "@/lib/prisma";
import * as bcrypt from 'bcrypt';

interface RequestBody {
  username: string;
  password: string;
  name: string;
  email: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        name: body.name,
        hash: hashedPassword
      }
    })

    const {hash, ...responsewithoutpassword} = user;
    if (user) {
      return new Response(JSON.stringify(responsewithoutpassword));
    } else {
      return new Response(JSON.stringify({success: false, message: "username/email already taken"}));
    }
  } catch {

  }
}