import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Toaster } from "../ui/toaster";

export function Layout() {
    return (
        <main className="w-full h-full bg-black front-sans text-gray-50 mt-[100px]">
            <Header />
            <Outlet />
            <Toaster />
        </main>
    )
}