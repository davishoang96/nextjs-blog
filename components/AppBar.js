import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';

export default function ButtonAppBar() {
  return (
    <AppBar position="static">
        <Toolbar>
          <Button href='/' color="inherit">Home</Button>
          <Button href='/add-post' color="inherit">Add</Button>
        </Toolbar>
      </AppBar>
  );
}
