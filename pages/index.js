// pages/index.js

import { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Blog Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <div key={post.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={post.title}
                secondary={post.content}
              />
            </ListItem>
            <Divider component="li" />
          </div>
        ))}
      </List>
    </Container>
  );
}
