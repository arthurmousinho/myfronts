import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LandingPage } from "@/pages/LandingPage";
import { Feed } from "@/pages/Feed";

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
            }
        ],
        element: <Layout />
    }
])