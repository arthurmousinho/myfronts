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
import { SelectUserRepo } from "@/pages/SelectUserRepo";
import { EditProject } from "@/pages/EditProject";

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
                path: "/projects/repos",
                element: <Guard> <SelectUserRepo/> </Guard>
            },
            {
                path: "/projects/repos/:repoName",
                element: <Guard>  <NewProject/> </Guard>
            },
            {
                path: "/projects/edit/:id",
                element: <Guard>  <EditProject/> </Guard>
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
        ],
        element: <Layout />
    },
    {
        path: "/github/auth",
        element: <AuthCallback />
    }
])