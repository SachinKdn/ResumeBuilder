import React from "react";
import { Route, Routes, RouterProvider } from "react-router-dom";
import { ApiProvider, useApi } from "./context/ApiContext";
import { router } from "./routes";
import { Box , Button} from "@mui/material";
import ThemeToggleButton from "./theme/ThemeToggleButton";
import { ThemeContextProvider } from "./theme/ThemeContext";
import Header from "./components/Header";
// this is app.tsx
function App() {
  
  return (
    <ApiProvider>
      <Box>
       <Header/>
      </Box>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}

export default App;
