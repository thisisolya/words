import React from 'react';
import { AppBar as MuiAppBar } from '@mui/material';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import palette from '../theme/palette';
import useLogout from '../hooks/use-logout';

const AppBar = styled(MuiAppBar)`
  background-color: ${palette.primary.dark};
`;

function NavBar() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <AppBar>
      <HomeIcon onClick={() => navigate('/')} />
      <LogoutIcon onClick={logout} />
    </AppBar>
  );
}

export default NavBar;
