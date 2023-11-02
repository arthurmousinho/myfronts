import { GithubIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <div className="w-full h-screen flex flex-col items-center pt-40 gap-6 select-none">
            <h1 className="font-bold text-[3.5rem] text-gray-200">
                Mostre seus projetos Front-end para o mundo
            </h1>
            <p className="text-muted-foreground text-lg">
                Crie seu portifolio online para seus principais projetos e compartilhe com quem quiser
            </p>
            <Link to={''} 
                className="bg-zinc-default text-md text-muted-foreground hover:text-muted flex justify-center rounded items-center gap-2 h-12 w-[150px]
                    hover:bg-zinc-900 transition-colors
                "
            >
                <GithubIcon size={20}/>
                Vamos lá
            </Link>
        </div>
    )
}