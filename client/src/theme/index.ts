import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';

const theme = createTheme({
  typography,
  palette,
  components: {
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
      defaultProps: {
        size: "small",
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: palette.primary.contrast,
            color: palette.primary.light,
            textTransform: 'none',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: palette.primary.contrast,

          },
        },
        {
          props: { variant: 'text' },
          style: {
            textTransform: 'none',
            color: palette.primary.contrast,
          },
        },
      ]
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          color: palette.primary.contrast,
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
    MuiSwitch: {
      styleOverrides: {
        track: {
          backgroundColor: palette.primary.dark,
        },
        thumb: {
          backgroundColor: palette.primary.contrast,
        }
      }
    }
  },
});

export default theme;
