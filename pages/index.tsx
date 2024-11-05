// pages/index.tsx

import { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

import ButtonAppBar from '../components/AppBar';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts/posts');
      const data: Post[] = await res.json();
      setPosts(data);
    };
    
    fetchPosts();
  }, []);

  const handleDeleteAllPosts = async () => {
    const response = await fetch('/api/posts/posts', {
      method: 'DELETE',
    });

    if (response.ok) {
      setPosts([]); // Clear posts from state after successful deletion
    } else {
      console.error('Failed to delete posts');
      // Handle error response if needed
    }
  };

  return (
    <Container sx={{ padding: -1 }}>
      <ButtonAppBar />
      <Typography variant="h4" component="h1" gutterBottom>
        Blog Posts
      </Typography>
      <List sx={{ marginBottom: 2 }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
              <ListItem alignItems="flex-start">
                <ListItemText primary={post.title} secondary={post.content} />
              </ListItem>
              <Divider component="li" />
            </div>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No posts available" />
          </ListItem>
        )}
      </List>
      <Box display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDeleteAllPosts}
          sx={{ marginTop: 2 }}>
          Delete All
        </Button>
      </Box>
    </Container>
  );
}