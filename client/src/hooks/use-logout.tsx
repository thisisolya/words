import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSelectedUser } from "../store/slice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("userId");
    dispatch(resetSelectedUser({}));
    navigate("/");
  };
};

export default useLogout;
