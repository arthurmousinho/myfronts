import { Link } from "react-router-dom";

export function ProjectCard() {
    return (
        <Link to={''} className="flex flex-col gap-4 bg-zinc-default rounded hover:scale-105 transition-transform">
            <img src="https://raw.githubusercontent.com/arthurmousinho/twitter-ui-react/main/public/preview.png" alt="" 
                className="w-full h-50"
            />
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-200">
                    Dev Books
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                    Plataforma de livros desenvolvida com React + Typescript, consumindo a Google Books Api
                </p>
            </div>
        </Link>
    )
}