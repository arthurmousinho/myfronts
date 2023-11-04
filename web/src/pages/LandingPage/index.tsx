import { GithubIcon } from "lucide-react"

export function LandingPage() {

    return (
        <div className="w-full h-screen flex flex-col items-center pt-40 gap-6 select-none">
            <h1 className="font-bold text-[3.5rem] text-gray-200">
                Mostre seus projetos Front-end para o mundo
            </h1>
            <p className="text-muted-foreground text-lg">
                Crie seu portifolio online para seus principais projetos e compartilhe com quem quiser
            </p>
            <a href={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`} className="w-[150px] flex items-center justify-center gap-2 bg-zinc-800 transition-all py-2 rounded hover:bg-zinc-700 text-muted-foreground hover:text-muted">
                <GithubIcon size={20} />
                Vamos lá
            </a>
        </div>
    )
}