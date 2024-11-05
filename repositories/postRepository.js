// lib/postRepository.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPost(data) {
  return await prisma.post.create({ data });
}

export async function getAllPosts() {
  return await prisma.post.findMany();
}

export async function deleteAllPosts(data) {
  return await prisma.post.deleteMany({ data });
}