// src/mui.d.ts
import { ThemeOptions, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customBackgroundImage: {
      main: string;
    };
  }
  interface ThemeOptions {
    customBackgroundImage?: {
      main?: string;
    };
  }
}
