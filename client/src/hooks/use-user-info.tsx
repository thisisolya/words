import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { useGetUserInfoQuery } from '../store/api';
import { setSelectedUser } from '../store/slices/user-slice';

const useUserInfo = () => {
  const userId = localStorage.getItem('userId');

  const dispatch = useDispatch();
  const { data } = useGetUserInfoQuery({ userId });
  const userInfo = useSelector((state: AppState) => state.user.selectedUser);

  React.useEffect(() => {
    if (data) {
      dispatch(
        setSelectedUser({
          firstName: data.first_name,
          lastName: data.last_name,
          id: data._id,
        }),
      );
    }
  }, [data, dispatch]);

  return userInfo;
};

export default useUserInfo;
