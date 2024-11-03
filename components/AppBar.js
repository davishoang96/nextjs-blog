import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <AppBar position="static">
        <Toolbar>
          <IconButton
            href='/'
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button href='/add-post' color="inherit">Add</Button>
        </Toolbar>
      </AppBar>
  );
}
