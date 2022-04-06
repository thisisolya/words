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
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: palette.primary.dark,
            color: 'white',
            textTransform: 'none',
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10%',
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
          wrap: 'wrap',
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
    MuiRadio: {
      styleOverrides: {
        root: {
          color: palette.primary.main,
          padding: '5px',
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
