import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { LandingPage } from "@/pages/LandingPage";
import { Feed } from "@/pages/Feed";
import { Profile } from "@/pages/Profile";
import { Project } from "@/pages/Project";

export const ROUTES = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: "/feed",
                element: <Feed />
            },
            {
                path: "/users/:useraname",
                element: <Profile />
            },
            {
                path: "/users/:useraname/:projectId",
                element: <Project />
            }
        ],
        element: <Layout />
    }
])