// pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Post } from '@prisma/client';
import { deletePostById, getPostById } from '../../../repositories/postRepository';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | { error: string } | { id: Number }>
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
  } else if (req.method === 'DELETE') {
    try {
      const postId = parseInt(id as string, 10);
      await deletePostById(postId);
      res.status(200).json({id: postId}); // Return the deleted post
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
