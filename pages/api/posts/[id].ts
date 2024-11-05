// pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Post } from '@prisma/client';
import { getPostById } from '../../../repositories/postRepository';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | { error: string }>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const postId = parseInt(id as string, 10);
      const post = await getPostById(postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
