import React from 'react';
import { Route, Routes,RouterProvider } from "react-router-dom";
import { router } from "./routes";
// this is app.tsx
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
