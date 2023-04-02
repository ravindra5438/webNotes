import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Modal from './Modal';
import { Logout } from '@mui/icons-material';

const Navbar = ({logOut,user}) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          webNote
        </Typography>
        {/* <Button color="inherit">Create</Button> */}
        <Modal thisUser={user}/>
        <Button sx={{marginInline:2}} startIcon={<Logout/>} variant="contained" onClick={() => logOut()}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
