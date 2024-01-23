import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from "@/lib/prisma";

interface IParams {
    pid?:string
}

interface RequestBody {
  title: string;
  content: string;
  published: string;
  imageUrl: string;
  categories: string[];
}

export async function DELETE(
    request:Request, {
        params
    }: {params:IParams}
) {
  const { pid } = params;
  const user = await getCurrentUser();
  if (typeof pid === 'string') {
    
    const post = await prisma.post.findUnique({
      where: {
        id: pid,
      }
    });

    if(post?.authorId == user?.id) {
      const response = await prisma.post.delete({
        where: {
          id: pid,
        },
      });
      return new Response(JSON.stringify({ success: true, message: "Post Deleted" }));
    } else {
      return new Response(JSON.stringify({ success: false, message: "Invalid request body" }));
    }
  }
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const body = await request.json();
    const user = await getCurrentUser();

    let isPublished: boolean = body.published === "true";

    if (user && body.title && body.content && body.imageUrl && body.categories) {
      const existingPost = await prisma.post.findUnique({
        where: {
          id: params.pid,
        },
        include: {
          categories: true,
        },
      });

      if (!existingPost) {
        return new Response(JSON.stringify({ success: false, message: "Post not found" }));
      }

      // Extract existing category IDs from the fetched post
      const existingCategoryIds = existingPost.categories.map((category) => category.id);

      // Find or create categories based on the request
      const createdCategories = await Promise.all(
        body.categories.map(async (category: string) => {
          const existingCategory = await prisma.category.findFirst({
            where: {
              name: category,
            },
          });

          if (existingCategory) {
            return existingCategory;
          } else {
            return prisma.category.create({
              data: { name: category },
            });
          }
        })
      );

      // Filter out the IDs of newly added categories
      const newlyAddedCategoryIds = createdCategories
        .filter((category) => !existingCategoryIds.includes(category.id))
        .map((category) => category.id);

      // Update the post with the new data, including categories
      const updatedPost = await prisma.post.update({
        where: {
          id: params.pid,
        },
        data: {
          title: body.title,
          content: body.content,
          published: isPublished,
          imageUrl: body.imageUrl,
          authorId: user.id,
          categories: {
            connect: createdCategories.map((category) => ({ id: category.id })),
          },
        },
        include: {
          categories: true,
        },
      });

      return new Response(JSON.stringify({ success: true, message: "Successfully updated" }));
    } else {
      return new Response(JSON.stringify({ success: false, message: "Error Updating Post" }));
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Invalid request body" }));
  }
}

export async function GET(
    request:Request, {
        params
    }: {params:IParams}
) {
  const { pid } = params;
  try {
    const post = await prisma.post.findFirst({
        where: {
          id: pid,
        },
        include: {
        author: {
            select: {
            name: true,
            },
        },
        categories: {
            select: {
            name: true,
            },
        },
        },
    });

    if (post) {
        const postWithAuthorAndCategoryNames = {
        ...post,
        author: {
            name: post.author?.name || "Unknown Author",
        },
        categories: post.categories.map((category) => category.name),
        };
        return new Response(JSON.stringify({ success: true, data: postWithAuthorAndCategoryNames }));
    }

    return new Response(JSON.stringify({ success: false, message: "Post not found" }));
    } catch {
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }));
    }
}