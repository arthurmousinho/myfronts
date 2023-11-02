import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export function Layout() {
    return (
        <main className="w-full h-full bg-black front-sans text-gray-50">
            <Header />
            <Outlet />
        </main>
    )
}