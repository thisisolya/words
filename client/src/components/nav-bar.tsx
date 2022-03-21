import { AppBar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import palette from "../theme/palette";
import { setSelectedUser } from "../store/slice";

const appBarStyle = {
  backgroundColor: palette.primary.main,
};

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    dispatch(setSelectedUser({}));
    navigate("/");
  };

  return (
    <AppBar style={appBarStyle}>
      <HomeIcon onClick={() => navigate("/")} />
      <LogoutIcon onClick={handleLogOut} />
    </AppBar>
  );
};

export default NavBar;
