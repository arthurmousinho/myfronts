import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/pages/Home";
import { Layout } from "@/components/Layout";
import { LandingPage } from "@/pages/LandingPage";

export const ROUTES = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: "/home",
                element: <Home />
            }
        ],
        element: <Layout />
    }
])