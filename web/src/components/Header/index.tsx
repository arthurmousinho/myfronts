import { Link } from "react-router-dom"
import { Separator } from "../ui/separator"
import { LogOut} from "lucide-react"
import { UserCard } from "../UserCard"
import { TokenInfos } from "@/hooks/useToken"
import { SignIn } from "../SignIn"
import { useEffect, useState } from "react"
import { useUsers } from "@/hooks/useUsers"

export function Header() {

    const [user, setUser] = useState<TokenInfos>();
    const [tokenExists, setTokenExists] = useState<boolean>();
    const { getUserTokenInfos } = useUsers();

    useEffect(() => {
        const user = getUserTokenInfos();
        if (user) {
            setTokenExists(true);
            setUser(user);
            return;
        }
        setTokenExists(false);
    }, [])


    return (
        <header className="fixed top-0 left-0 bg-zinc-default w-full flex items-center justify-between py-4 px-10 ">

            <nav className="flex items-center gap-10">
                <Link to={'/'} className="font-bold text-2xl text-gray-200">
                    myFronts.dev
                </Link> 
                {
                    tokenExists ? (
                        <nav className="flex items-center gap-10">
                            <Link to={'/projects/new'} className="text-base text-muted-foreground hover:text-gray-300 hover:underline transition-all">
                                Novo Projeto
                            </Link> 
                            <Link to={'/feed'} className="text-base text-muted-foreground hover:text-gray-300 hover:underline transition-all">
                                Novo Post
                            </Link> 
                            <Link to={'/feed'} className="text-base text-muted-foreground hover:text-gray-300 hover:underline transition-all">
                                Feed
                            </Link> 
                        </nav>
                    ) : (
                        <></>
                    )
                }
            </nav>

            {
                tokenExists ? (
                    <nav className="flex items-center gap-4">
                        <UserCard  name={user?.name} avatarURL={user?.avatarURL} to={`/users/${user?.username}`}/>
                        <Separator orientation="vertical" className="h-10 bg-zinc-800" />
                        <Link to={'/'} className="text-red-900 hover:text-red-700 transition-colors">
                            <LogOut size={20} />
                        </Link>
                    </nav>
                ) : (
                    <SignIn />
                )
            }
        </header>
    )
}