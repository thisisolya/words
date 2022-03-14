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
    MuiCard: {
      styleOverrides: {
        root: {
          width: 300,
          height: 200,
          margin: '50px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: "15px",
          boxShadow: `5px 5x 5px ${palette.secondary.main}`,
        },
      },
    },
  },
});

export default theme;
