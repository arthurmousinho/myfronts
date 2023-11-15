import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { LandingPage } from "@/pages/LandingPage";
import { Feed } from "@/pages/Feed";
import { Profile } from "@/pages/Profile";
import { Project } from "@/pages/Project";
import { NewProject } from "@/pages/NewProject";
import { AuthCallback } from "@/pages/AuthCallback";

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
                path: "/users/:username",
                element: <Profile />
            },
            {
                path: "/users/:useraname/:projectId",
                element: <Project />
            },
            {
                path: "/projects/new",
                element: <NewProject />
            }
        ],
        element: <Layout />
    },
    {
        path: "/github/auth",
        element: <AuthCallback />
    }
])