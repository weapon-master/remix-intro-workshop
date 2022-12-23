import { prisma } from "~/db.server";

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } });
}

export async function findOnePostBySlug(slug: string) {
  return prisma.post.findUnique({
    select: { slug: true, title: true, markdown: true },
    where: { slug },
  });
}
// 🐨 create a new function here called "getPost"
// that takes a slug and returns a post
// 💰 use the prisma.post.findUnique function
// with the "where" option set to { slug }
