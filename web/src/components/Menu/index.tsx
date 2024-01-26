import { useToken } from "@/hooks/useToken";
import { Flame, Folder, LogOut, MenuIcon, User, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { UserCard } from "../UserCard";

export function Menu() {

    const { deleteToken, decodeToken, getSavedToken } = useToken();

    const avatarURL = decodeToken(getSavedToken())?.avatarURL;
    const username = decodeToken(getSavedToken())?.username;

    function handleSignOut() {
        const wantToSingOut = confirm("Deseja realmente sair?");
        if (wantToSingOut) {
            deleteToken();
        }
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div>
            {
                !isMenuOpen ? (
                    <MenuIcon 
                        size={30} 
                        onClick={toggleMenu}
                        className="md:hidden text-muted-foreground hover:text-gray-200 transition-colcursor-pointer" 
                    />
                ) : (
                    <XIcon 
                        size={30} 
                        onClick={toggleMenu}
                        className="md:hidden text-muted-foreground hover:text-gray-200 transition-colcursor-pointer" 
                    />
                )
            }
            
            <nav 
                className={`md:flex md:items-center md:gap-8 ${isMenuOpen ? "fixed top-0 right-0 flex flex-col items-center pt-20 -z-50 gap-12 bg-zinc-default h-full w-[40vw]" : "hidden"} `}
            >
                <Link  
                    to={'/trending'}
                    className="flex gap-1 items-center justify-center text-muted-foreground hover:text-gray-300 transition-colors"
                >
                    <Flame size={20} />
                    Em Alta
                </Link>
                <Link  
                    to={'/projects'}
                    className="flex gap-1 items-center justify-center text-muted-foreground hover:text-gray-300 transition-colors"
                >
                    <Folder size={20} />
                    Projetos
                </Link>
                <Link to={`/profile/edit`}
                    className="flex gap-1 items-center justify-center text-muted-foreground hover:text-gray-300 first-line:transition-colors"
                >
                    <User size={20} />
                    Conta 
                </Link>

                <button 
                    className="flex gap-1 items-center justify-center text-muted-foreground hover:text-red-500 transition-colors"
                    onClick={handleSignOut}
                >
                    <LogOut size={20} />
                    <span className="text-base cursor-pointer">
                        Sair
                    </span> 
                </button>
                <Separator orientation="vertical" className="h-10 bg-zinc-800 md:flex hidden" />
                <UserCard  avatarURL={avatarURL} to={`/users/${username}`}/>
            </nav>
        </div>
    )
}