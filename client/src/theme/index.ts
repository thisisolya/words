import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';

const theme = createTheme({
  typography,
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
          color: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px 15px',
        },

      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: palette.primary.contrast,
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
          flexDirection: 'column',
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
