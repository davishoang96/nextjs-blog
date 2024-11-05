// pages/add-post.tsx

import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

import ButtonAppBar from '../components/AppBar';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts/posts');
      const data: Post[] = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/posts/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      const newPost: Post = await response.json();
      setPosts([...posts, newPost]);
      setTitle('');
      setContent('');
    } else {
      alert('Failed to add post');
    }
  };

  return (
    <Container>
      <ButtonAppBar />

      <Typography variant="h4" component="h1" gutterBottom>
        Create a post
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>
        All posts
      </Typography>
      <List>
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id}>
              <ListItem alignItems="flex-start">
                <ListItemText 
                  primary={post.title} 
                  secondary={
                    <>
                      {post.content} <br />
                      <span style={{ fontSize: '0.8em', color: 'gray' }}>ID: {post.id}</span>
                    </>
                  } 
                />
              </ListItem>
              <Divider component="li" />
            </div>
          ))}
      </List>
    </Container>
  );
}