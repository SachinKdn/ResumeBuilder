import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home"

import Error from "./pages/error"
import EditResume from "./resume/EditResume";


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        errorElement:<Error/>
    },
    {
        path:"/resume/:resumeId/edit",
        element:<EditResume/>,
        errorElement:<Error/>
    },
    {
        path:"/*",
        element:<Error/>
    },

])