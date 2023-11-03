import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LandingPage } from "@/pages/LandingPage";
import { Feed } from "@/pages/Feed";
import { Profile } from "@/pages/Profile";

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
                path: "/users/:userId",
                element: <Profile />
            }
        ],
        element: <Layout />
    }
])