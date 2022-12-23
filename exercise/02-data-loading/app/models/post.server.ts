import { prisma } from '~/db.server'

export const getPostListItems = () => prisma.post.findMany({ select: { slug: true, title: true }});