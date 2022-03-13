import { createTheme } from '@mui/material/styles';
import palette from './palette';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontSize: '25px',
      color: palette.primary.dark,
    },
    h2: {
      fontSize: '20px',
      color: palette.primary.main,
    },
    body1: {
      fontSize: '15px',
      color: palette.primary.main,
    }
  },
  palette,
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
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: palette.secondary.light,
            textTransform: 'none',
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: palette.primary.dark,
          },
        },
      ]
    },
  },
});

export default theme;
