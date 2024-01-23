import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  title: string;
  content: string;
  published: string;
  imageUrl: string;
  categories: string[];
}

export async function POST(request: Request) {
  try {
    if (request.body) {
      const body = await request.json();

      if (body.request && body.request.title) {
        return getPostByTitle(body.request.title);
      } 

      if (body.request && body.request.authorId) {
        const user = await getCurrentUser();
        return getPostsByAuthor(user, body.request.authorId);
      } else {
        const user = await getCurrentUser();
        return createNewPost(user, body);
      }
    }

    return new Response(JSON.stringify({ success: false, message: "Invalid request body" }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }));
  }
}

async function getPostsByAuthor(user: any, AuthorId: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: user.id,
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
      orderBy: {
        createdAt: 'desc',
      }
    });  

    const postsWithAuthorAndCategoryNames = posts.map((post) => ({
      ...post,
      author: {
        name: post.author?.name || "Unknown Author",
      },
      categories: post.categories.map((category) => category.name),
    }));

    return new Response(JSON.stringify({ success: true, data: postsWithAuthorAndCategoryNames }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }));
  }
}

async function getPostByTitle(title: string) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        title: title,
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

async function createNewPost(user: any, body: any) {
  try {
    let isPublished: boolean = body.published === "true";

    if (user && body.title && body.content && body.imageUrl && body.categories) {
      const createdCategories = await Promise.all(
        body.categories.map(async (category: string) => {
          const existingCategory = await prisma.category.findFirst({
            where: {
              name: category,
            },
          });

          if (existingCategory) {
            return prisma.category.update({
              where: { id: existingCategory.id },
              data: {},
            });
          } else {
            return prisma.category.create({
              data: { name: category },
            });
          }
        })
      );

      const post = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          published: isPublished,
          imageUrl: body.imageUrl,
          authorId: user.id,
          categories: {
            connect: createdCategories.map((category: any) => ({ id: category.id })),
          },
        },
      });

      if (post) {
        return new Response(JSON.stringify({ success: true, message: "Post Created" }));
      } else {
        return new Response(JSON.stringify({ success: false, message: "Failed to create post" }));
      }
    } else {
      return new Response(JSON.stringify({ success: false, message: "User not found or invalid request body" }));
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }));
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const queryString = request.url.split('?')[1];
  const queryParams = new URLSearchParams(queryString);
  try {
    if (!queryParams.get("category")) {
      const page = queryParams.get('page');
      const skippost = page ? (+page - 1) * 3 : 0;
      const posts = await prisma.post.findMany({
        where: {
          published: true,
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
        orderBy: {
          createdAt: 'desc',
        },

        skip: skippost,
        take: 3,
      });

      const postsWithAuthorAndCategoryNames = posts.map((post) => ({
        ...post,
        author: {
          name: post.author?.name || "Unknown Author",
        },
        categories: post.categories.map((category) => category.name),
      }));

      return new Response(JSON.stringify({ success: true, data: postsWithAuthorAndCategoryNames }));
    } else {
      const category = queryParams.get('category')?.replace('+', '');
      const page = queryParams.get('page');
      if (category && page) {
        const skippost = (+page - 1) * 3;

        const posts = await prisma.post.findMany({
          where: {
            published: true,
            categories: {
              some: {
                name: category,
              },
            },
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

          orderBy: {
            createdAt: 'desc',
          },

          skip: skippost,
          take: 3,
        });

        const postsWithAuthorAndCategoryNames = posts.map((post) => ({
          ...post,
          author: {
            name: post.author?.name || "Unknown Author",
          },
          categories: post.categories.map((category) => category.name),
        }));

        return new Response(JSON.stringify({ success: true, data: postsWithAuthorAndCategoryNames }));
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }));
  }

  return new Response(JSON.stringify({ success: false, message: "Invalid Request" }));
}