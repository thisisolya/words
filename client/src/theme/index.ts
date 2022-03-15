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
    h3: {
      fontSize: '15px',
      fontWeight: 'bold',
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
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.main,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px 15px',
          textAlign: 'center',
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
          props: { variant: 'outlined' },
          style: {
            color: palette.primary.dark,
            textTransform: 'none',
          },
        },
      ]
    },
    MuiCard: {
      styleOverrides: {
        root: {
          minWidth: "60vw",
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: "15px",
          boxShadow: `5px 5x 5px ${palette.secondary.main}`,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        }
      }
    },
  },
});

export default theme;
