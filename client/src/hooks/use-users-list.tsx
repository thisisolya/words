import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { useGetAllUsersQuery } from '../store/api';
import { setAllUsers } from '../store/slices/user-slice';
import { UserModelFromServer } from '../types';

const useUsersList = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllUsersQuery('/');
  const { allUsers } = useSelector((state: AppState) => state.user);

  React.useEffect(() => {
    if (data) {
      dispatch(
        setAllUsers(
          data.map((user: UserModelFromServer) => ({
            firstName: user.first_name,
            lastName: user.last_name,
            id: user._id,
          })),
        ),
      );
    }
  }, [data, dispatch]);

  return { allUsers };
};

export default useUsersList;
