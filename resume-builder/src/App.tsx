import React from "react";
import { Route, Routes, RouterProvider } from "react-router-dom";
import { ApiProvider } from "./context/ApiContext";
import { router } from "./routes";
import { Box } from "@mui/material";
import ThemeToggleButton from "./theme/ThemeToggleButton";
import { ThemeContextProvider } from "./theme/ThemeContext";
// this is app.tsx
function App() {
  return (
    <ApiProvider>
      <Box
        id="no-print"
        sx={{
          border: "1ps solid black",
          height: "25px",
          width: "100%",

          backgroundColor: "bisque",
        }}
      >
        Header
      </Box>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}

export default App;
