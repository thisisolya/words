import { CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

function Loader() {
  const { isLoading } = useSelector((state: AppState) => state.utility);

  if (!isLoading) return null;

  return (
    <CircularProgress />
  );
}

export default Loader;
