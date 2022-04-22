import React from 'react';
import { AppBar as MuiAppBar } from '@mui/material';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import palette from '../../theme/palette';

interface NavBarProps {
  handleLogout: () => void,
  handleHomeClick: () => void,
}

const AppBar = styled(MuiAppBar)`
  background-color: ${palette.primary.dark};
`;

function NavBar({ handleLogout, handleHomeClick }: NavBarProps) {
//   const navigate = useNavigate();
//   const { logout } = useLogout();

  return (
    <AppBar>
      <HomeIcon onClick={handleHomeClick} />
      <LogoutIcon onClick={handleLogout} />
    </AppBar>
  );
}

export default NavBar;
