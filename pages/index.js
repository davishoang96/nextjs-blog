// pages/index.js

import { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

import ButtonAppBar from '../components/AppBar';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Container>
    <ButtonAppBar />
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
