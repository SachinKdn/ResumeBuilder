import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";

import { ApiProvider, useApi } from "./context/ApiContext";
import { router } from "./routes";
import { Box, Button } from "@mui/material";
import ThemeToggleButton from "./theme/ThemeToggleButton";
import { ThemeContextProvider } from "./theme/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/home";

import Error from "./pages/error";
import EditResume from "./resume/EditResume";
import ViewResume from "./resume/ViewResume";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import CreateResume from "./pages/CreateResume";
import styled from "styled-components";
// this is app.tsx
function App() {
  const HideScrollbarDiv = styled.div`
    overflow: hidden;

    ::-webkit-scrollbar {
      display: none;
    }

    ::-moz-scrollbar {
      display: none;
    }

    ::-ms-scrollbar {
      display: none;
    }

    scrollbar-width: none; /* For Firefox */
  `;
  return (
    <ApiProvider>
      {/* <Box>
       <Header/>
      </Box>
      <RouterProvider router={router} /> */}

      <Router>
        {/* <HideScrollbarDiv> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createResume" element={<CreateResume />} />
          <Route path="/resume/:resumeId/edit" element={<EditResume />} />
          <Route path="/resume/:resumeId/view" element={<ViewResume />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        {/* </HideScrollbarDiv> */}
      </Router>
    </ApiProvider>
  );
}

export default App;
