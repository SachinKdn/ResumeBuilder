// ThemeToggleButton.tsx
import React from "react";
import { Button } from "@mui/material";
import { useThemeContext } from "./ThemeContext";

const ThemeToggleButton: React.FC = () => {
  const { toggleTheme } = useThemeContext();

  return (
    <Button
    // onClick={toggleTheme}
    >
      Toggle Theme
    </Button>
  );
};

export default ThemeToggleButton;
