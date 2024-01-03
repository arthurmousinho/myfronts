import { Link } from "react-router-dom"
import { Separator } from "../ui/separator"
import { Folder, LogOut, User } from "lucide-react"
import { UserCard } from "../UserCard"
import { useToken } from "@/hooks/useToken"
import { SignIn } from "../SignIn"

export function Header() {

    const { deleteToken, decodeToken, getSavedToken, hasToken } = useToken();

    function handleSignOut() {
        const wantToSingOut = confirm("Deseja realmente sair?");
        if (wantToSingOut) {
            deleteToken();
        }
    }

    return (
        <header className="fixed top-0 left-0 bg-zinc-default w-full flex items-center justify-between py-4 px-10 z-50">

            <Link to={'/'} className="font-bold text-2xl text-gray-200">
                myFronts.dev
            </Link> 

            {
                hasToken() ? (
                    <nav className="flex items-center gap-8">
                        <div 
                                className="flex gap-2 items-center justify-center text-muted-foreground hover:text-gray-300 transition-colors"
                        >
                            <Folder size={20} />
                            <Link to={'/projects'} className="text-base">
                                Projetos
                            </Link> 
                        </div>
                        <Link to={`/profile/edit`}
                            className="flex gap-2 items-center justify-center text-muted-foreground hover:text-gray-300 first-line:transition-colors"
                        >
                            <User size={20} />
                            Conta 
                        </Link>
                        <button onClick={handleSignOut} 
                            className="flex gap-2 items-center justify-center text-muted-foreground hover:text-red-500 transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="text-base cursor-pointer">
                                Sair
                            </span> 
                        </button>
                        <Separator orientation="vertical" className="h-10 bg-zinc-800" />
                        <UserCard  avatarURL={decodeToken(getSavedToken())?.avatarURL} to={`/users/${decodeToken(getSavedToken())?.username}`}/>
                    </nav>
                ) : (
                    <SignIn />
                )
            }
        </header>
    )
}