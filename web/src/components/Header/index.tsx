import { Link } from "react-router-dom"
import { Separator } from "../ui/separator"
import { Home, LogOut, Plus, User } from "lucide-react"

export function Header() {
    return (
        <header className="bg-zinc-default flex items-center justify-between py-4 px-10">

            <nav className="flex items-center gap-10">
                <Link to={'/'} className="font-bold text-2xl text-gray-200">
                    myFronts.dev
                </Link>
                <Link to={'/'} className="text-base text-muted-foreground hover:text-gray-300 hover:underline transition-all flex items-center gap-2">
                    <Plus size={20} />
                    Novo Projeto
                </Link> 
                <Link to={'/'} className="text-base text-muted-foreground hover:text-gray-300 hover:underline transition-all flex items-center gap-2">
                    <User size={20} />
                    Meu Perfil
                </Link> 
                <Link to={'/'} className="text-base text-muted-foreground hover:text-gray-300 hover:underline transition-all flex items-center gap-2">
                    <Home size={20} />
                    Feed
                </Link> 
            </nav>

            <nav className="flex items-center gap-4">
                
                <div className="flex items-center gap-2">
                    <img src="https://github.com/arthurmousinho.png" alt="" 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="text-base text-gray-200">
                        Arthur Mousinho
                    </span>
                </div>

                <Separator orientation="vertical" className="h-10 bg-zinc-700" />
                <Link to={'/'} className="text-red-900 hover:text-red-700 transition-colors">
                    <LogOut size={20} />
                </Link>
            </nav>
        </header>
    )
}