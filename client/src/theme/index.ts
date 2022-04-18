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
          padding: '15px',
          '& .MuiSvgIcon-root': {
            fontSize: '25px',
            transition: '1s',
            '&: hover': {
              color: palette.primary.light,
              transform: 'scale(1.2)',
              transition: '0.5s',
            },
          },
        },

      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: palette.primary.dark,
            color: 'white',
            textTransform: 'none',
            padding: '5px 10px',
            boxShadow: `3px 3px 1px 0.1px ${palette.primary.light}`,
          },
        },
        {
          props: { variant: 'text' },
          style: {
            textTransform: 'none',
            color: palette.primary.contrastText,
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: palette.primary.main,
          color: palette.primary.contrastText,
          fontSize: '12px',
          height: '25px',
          '& .MuiChip-label': {
            padding: '5px',
          },
        },
        filled: {
          backgroundColor: palette.primary.dark,
          color: palette.primary.light,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          marginTop: '30%',
          color: palette.primary.dark,

        },
        svg: {
          width: '60px',
          height: '60px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.primary.main,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&::before': {
            borderBottom: `1px solid ${palette.primary.dark}`,
          },
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          color: palette.primary.contrastText,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: `0.5px solid ${palette.primary.dark}`,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            minWidth: '300px',
            width: '60vw',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        track: {
          backgroundColor: palette.primary.dark,
        },
        thumb: {
          backgroundColor: palette.primary.dark,
        },
      },
    },
  },
});

export default theme;
