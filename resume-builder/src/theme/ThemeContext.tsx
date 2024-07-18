// ThemedComponent.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme ,ThemeOptions} from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { light } from '@mui/material/styles/createPalette';
import { useApi } from '../context/ApiContext';

interface ThemeContextType {
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  const {  resumeInfo } = useApi();
  
  const theme = createTheme(isDarkMode ? lightTheme : darkTheme);

  const toggleTheme = () => {
    console.log(isDarkMode)
    setIsDarkMode(!isDarkMode);
  };
  useEffect(()=>{
    if(resumeInfo){
      console.log("Setting the theme from resumeInfo")
      setIsDarkMode(!resumeInfo.isLightMode);
    }
  },[resumeInfo])

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
      </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
