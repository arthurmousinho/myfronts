import { Link } from "react-router-dom"
import { useToken } from "@/hooks/useToken"
import { SignIn } from "../SignIn"
import { Menu } from "../Menu";

export function Header() {

    const {  hasToken } = useToken();

    return (
        <header className="fixed top-0 left-0 bg-zinc-default w-full flex items-center justify-between py-4 px-4 sm:px-10 z-50">
                <Link to={'/'} className="font-bold text-xl md:text-2xl text-gray-200">
                    myFronts.dev
                </Link> 

                {
                    hasToken() ? (
                        <Menu />
                    ) : (
                        <SignIn />
                    )
                }
            </header>
    )
}