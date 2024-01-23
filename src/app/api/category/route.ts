import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface RequestBody {
  name: string;
}

export async function GET() {
  const user = await getCurrentUser();

  if (user) {
    try {
      const categories = await prisma.category.findMany({
        select: {
          name: true,
        },
      });

      const categoryNames = categories.map((category) => category.name);

      return new Response(JSON.stringify({ success: true, data: categoryNames }));
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }));
    }
  } else {
    return new Response(JSON.stringify({ success: false, message: "Sign in to access this endpoint" }));
  }
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const data = await prisma.category.create ({
    data: {
      name: body.name,
    }
  })
}