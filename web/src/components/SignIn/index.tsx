import { GithubIcon } from "lucide-react";

interface SignInProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>{}

export function SignIn(props: SignInProps) {
    return (
        <a href={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`} className="w-[150px] flex items-center justify-center gap-2 bg-zinc-800 transition-all py-2 rounded hover:bg-zinc-700 text-muted-foreground hover:text-muted"
        {...props}
        >
            <GithubIcon size={20} />
            Acessar
        </a>
    )
}