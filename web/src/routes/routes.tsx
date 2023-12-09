import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { LandingPage } from "@/pages/LandingPage";
import { Profile } from "@/pages/Profile";
import { Project } from "@/pages/Project";
import { NewProject } from "@/pages/NewProject";
import { AuthCallback } from "@/pages/AuthCallback";
import { Guard } from "./guard";
import { EditProfile } from "@/pages/EditProfile";
import { Projects } from "@/pages/Projects";

export const ROUTES = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: "/projects",
                element: <Guard> <Projects/> </Guard>
            },
            {
                path: "/profile/edit",
                element: <Guard> <EditProfile /> </Guard>
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
                element: <Guard>  <NewProject/> </Guard>
            }
        ],
        element: <Layout />
    },
    {
        path: "/github/auth",
        element: <AuthCallback />
    }
])