import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#388e3c', // green
      light: '#66bb6a',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#43a047', // lighter green
      light: '#76d275',
      dark: '#00701a',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#fff',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#fff',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
    divider: '#bdbdbd',
    action: {
      active: '#388e3c',
      hover: '#e8f5e9',
      selected: '#a5d6a7',
      disabled: '#bdbdbd',
      disabledBackground: '#e0e0e0',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '6rem', fontWeight: 300, letterSpacing: '-0.01562em' },
    h2: { fontSize: '3.75rem', fontWeight: 300, letterSpacing: '-0.00833em' },
    h3: { fontSize: '3rem', fontWeight: 400, letterSpacing: '0em' },
    h4: { fontSize: '2.125rem', fontWeight: 400, letterSpacing: '0.00735em' },
    h5: { fontSize: '1.5rem', fontWeight: 400, letterSpacing: '0em' },
    h6: { fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.0075em' },
    subtitle1: { fontSize: '1rem', fontWeight: 400, letterSpacing: '0.00938em' },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.00714em' },
    body1: { fontSize: '1rem', fontWeight: 400, letterSpacing: '0.03125em' },
    body2: { fontSize: '0.875rem', fontWeight: 400, letterSpacing: '0.01786em' },
    button: { fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.08929em', textTransform: 'uppercase' },
    caption: { fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.03333em' },
    overline: { fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.16667em', textTransform: 'uppercase' },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    // Add more component overrides as needed
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

export default theme;
