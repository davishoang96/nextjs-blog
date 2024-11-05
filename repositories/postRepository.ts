import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

type NewPostData = {
  title: string;
  content: string;
}

export async function createPost(data: NewPostData): Promise<Post> {
  return await prisma.post.create({ data });
}

export async function getAllPosts(): Promise<Post[]> {
  return await prisma.post.findMany();
}

export async function deleteAllPosts(): Promise<{ count: number }> {
  return await prisma.post.deleteMany();
}