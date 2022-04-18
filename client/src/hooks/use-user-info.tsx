import { useSelector } from 'react-redux';
import { useGetUserInfoQuery } from '../store/api';
import { selectedUserInfo } from '../store/selectors/user';

const useUserInfo = () => {
  const userId = localStorage.getItem('userId');
  useGetUserInfoQuery({ userId });
  const userInfo = useSelector(selectedUserInfo);
  return userInfo;
};

export default useUserInfo;
