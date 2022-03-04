import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '25px',
    },
    body1: {
      fontSize: '15px',
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          width: 300,
        },
      },
    },
  },
});

export default theme;
