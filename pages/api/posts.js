// pages/api/posts.js
import { createPost, getAllPosts } from '../../repositories/postRepository';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      const post = await createPost({ title, content });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
  } else if (req.method === 'GET') {
    try {
      const posts = await getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
