// pages/api/posts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createPost, getAllPosts, deleteAllPosts } from '../../repositories/postRepository';

interface Post {
  id: number;
  title: string;
  content: string;
}

type PostResponse = Post | { error: string };
type PostsResponse = Post[] | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse | PostsResponse>
) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      const post: Post = await createPost({ title, content });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
  } else if (req.method === 'GET') {
    try {
      const posts: Post[] = await getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteAllPosts();
      res.status(200).json({ error: 'All posts deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting posts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}