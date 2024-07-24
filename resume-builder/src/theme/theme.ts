// theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f7f7f7',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  customBackgroundImage: {
    main: 'url(/light.jpeg)',
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default:"black",
      // default: "linear-gradient(180deg, rgba(108,108,117,1) 0%, rgba(182,182,182,1) 25%, rgba(255,255,255,1) 100%)",
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  customBackgroundImage: {
    main: 'url(/dark.jpeg)',
  },
  
};
