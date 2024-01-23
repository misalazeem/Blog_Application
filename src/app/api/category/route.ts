import prisma from "@/lib/prisma";

interface RequestBody {
  name: string;
}

export async function GET() {
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
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const data = await prisma.category.create ({
    data: {
      name: body.name,
    }
  })
}