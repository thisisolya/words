import React from 'react';
import { AppBar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import palette from '../theme/palette';
import useLogout from '../hooks/use-logout';

const appBarStyle = {
  backgroundColor: palette.primary.dark,
};

function NavBar() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <AppBar style={appBarStyle}>
      <HomeIcon onClick={() => navigate('/')} />
      <LogoutIcon onClick={logout} />
    </AppBar>
  );
}

export default NavBar;
