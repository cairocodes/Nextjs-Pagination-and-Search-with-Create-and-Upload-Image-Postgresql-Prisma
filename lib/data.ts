import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 3;

export const getPosts = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const posts = await prisma.post.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};

export const getDataPages = async (query: string) => {
  try {
    const posts = await prisma.post.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    orderBy: { createdAt: "desc" },
    });
    const totalPages = Math.ceil(Number(posts) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};