// ThemedComponent.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  ThemeProvider,
  createTheme,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { light } from "@mui/material/styles/createPalette";
import { useApi } from "../context/ApiContext";

interface ThemeContextType {
  toggleTheme: (v: boolean) => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const { resumeInfo } = useApi();
  // isDarkMode ? lightTheme :
  const theme = createTheme(isDarkMode ? darkTheme : lightTheme);

  const toggleTheme = (v: boolean) => {
    if (v) {
      console.log("Dark Mode -> False");
      setIsDarkMode(false);
    } else {
      console.log("Dark Mode -> TRUE");
      setIsDarkMode(true);
    }
    // setIsDarkMode(!isDarkMode);
    // console.log("tgglr called");
    console.log(isDarkMode);
  };
  useEffect(() => {
    console.log(theme);
    if (resumeInfo) {
      console.log("Setting the theme from resumeInfo");
      console.log(resumeInfo.isLightMode);
      setIsDarkMode(!resumeInfo.isLightMode);
    }
  }, [resumeInfo]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};
