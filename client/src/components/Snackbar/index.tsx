import React from 'react';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';

interface SnackbarProps {
  isOpen: boolean;
  toggleAlert: () => void;
  text: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

function Snackbar({
  isOpen, toggleAlert, text, severity,
}: SnackbarProps) {
  return (
    <MuiSnackbar open={isOpen} autoHideDuration={2000} onClose={toggleAlert}>
      <Alert severity={severity} onClose={toggleAlert}>
        {text}
      </Alert>
    </MuiSnackbar>
  );
}

export default Snackbar;
