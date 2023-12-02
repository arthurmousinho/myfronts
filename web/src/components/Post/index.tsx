import { Github, LinkIcon, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

export function Post() {
    return (
        <article  className="w-[700px] bg-zinc-default flex flex-col gap-4 rounded p-4" >

            <Link to={'/users/arthurmousinho'} className="flex items-center gap-3">
                <img src="https://github.com/arthurmousinho.png" alt="" className="w-10 h-10 rounded-full"/>
                <div>
                     <span>Arthur Mousinho</span>
                     <p className="text-sm text-muted-foreground">
                         Front-End Developer and Software Engineering student
                     </p>
                </div>
            </Link>

            <Link to={'/users/arthurmousinho/adasdads1wgs'} className="flex flex-col gap-4">
                <p className="leading-relaxed text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <img src="https://raw.githubusercontent.com/arthurmousinho/twitter-ui-react/main/public/preview.png" alt="" 
                    className="rounded"
                />
            </Link>

            <footer className="flex items-center justify-between">
                <nav className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-muted hover:bg-transparent">
                        <ThumbsUp size={20} />
                        Gostei
                    </button>

                    <a href="https://github.com/arthurmousinho" className="flex items-center gap-2 text-muted-foreground hover:text-muted" target="_blank">
                        <Github size={20} />
                        Repositório
                    </a>

                    <a href="https://github.com/arthurmousinho" className=" w-full h-full flex items-center gap-2 text-muted-foreground hover:text-muted" target="_blank">
                        <LinkIcon size={20} />
                        Link do Projeto
                    </a>
                </nav>

                <span className="text-sm text-muted-foreground">
                    02/11/2023 - 12:31
                </span>

            </footer>

        </article>
    )
}