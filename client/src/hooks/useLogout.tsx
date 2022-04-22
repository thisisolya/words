import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetSelectedUser } from '../store/slices/user-slice';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userId');
    dispatch(resetSelectedUser());
    navigate('/');
  };

  return { logout };
};

export default useLogout;
