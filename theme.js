import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200EA',
      light: '#9D46FF',
      dark: '#3700B3',
    },
    secondary: {
      main: '#03DAC6',
      light: '#66FFF9',
      dark: '#00A896',
    },
    error: {
      main: '#CF6679',
      light: '#FF99AC',
      dark: '#9B3450',
    },
    warning: {
      main: '#FF9800',
      light: '#FFC947',
      dark: '#C66900',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#0B79D0',
    },
    success: {
      main: '#4CAF50',
      light: '#80E27E',
      dark: '#087F23',
    },
    background: {
      default: '#F8F9FD',
      paper: '#ffffff',
    },
    text: {
      primary: '#121212',
      secondary: '#4A4A4A',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0em',
      background: 'linear-gradient(90deg, #6200EA 0%, #03DAC6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
      color: '#4A4A4A',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          '&:hover': {
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            maxWidth: 1200,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          padding: '10px 24px',
          fontWeight: 600,
          boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #6200EA 30%, #9D46FF 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #03DAC6 30%, #66FFF9 90%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme; 