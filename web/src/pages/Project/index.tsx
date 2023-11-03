import { Badge } from "@/components/Badge";
import { UserCard } from "@/components/UserCard";
import { Github, LinkIcon } from "lucide-react";

export function Project() {
    return (
        <div className="flex items-center justify-center mb-96">
            <div className="w-[800px] flex flex-col gap-8">
                <header className="w-full flex items-center justify-between">
                    <h1 className="text-[2.5rem] font-bold text-gray-200">
                        Dev Books
                    </h1>
                    <UserCard date="02/11/2023" />
                </header>
                <img src="https://raw.githubusercontent.com/arthurmousinho/twitter-ui-react/main/public/preview.png" alt="" 
                    className="w-full rounded"
                />
                <section className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-300">
                        Descrição do Projeto
                    </h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-300">
                        Tecnologias Usadas
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge tech="JavaScript"/>
                        <Badge tech="HTML"/>
                        <Badge tech="CSS"/>
                    </div>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-300">
                        Links Úteis
                    </h2>
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/arthurmousinho" className="flex items-center gap-2 text-muted-foreground hover:text-muted" target="_blank">
                            <Github size={20} />
                            Repositório
                        </a>

                        <a href="https://github.com/arthurmousinho" className=" w-full h-full flex items-center gap-2 text-muted-foreground hover:text-muted" target="_blank">
                            <LinkIcon size={20} />
                            Link do Projeto
                        </a>
                    </div>
                </section>
            </div>
        </div>
    )
}