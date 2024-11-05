import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button href="/" color="inherit">
          Home
        </Button>
        <Button href="/add-post" color="inherit">
          Add
        </Button>
      </Toolbar>
    </AppBar>
  );
}