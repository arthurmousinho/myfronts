import linkedinIcon from "../../assets/linkedin-icon.svg";
import githubIcon from "../../assets/github-icon.svg";
import { ProjectCard } from "@/components/ProjectCard";

export function Profile() {
    return (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center mb-96">

            <div className="flex items-center justify-between gap-4  w-[1000px] bg-zinc-default py-6 px-10 rounded">
                <div className="flex items-center gap-4">
                    <img src="https://github.com/arthurmousinho.png" alt="" className="w-[120px] rounded-full border-x-2 border-y-2 hover:scale-105 transition-transform " />
                    <div className="flex flex-col items-start justify-start">
                        <h1 className="font-bold text-[2rem] text-gray-300 text-left">
                            Arthur Mousinho
                        </h1>
                        <span className="text-base text-muted-foreground text-left">
                            Front-End Developer and Software Engineering student
                        </span>
                    </div>
                </div>

                <nav className="flex flex-col gap-4">
                    <a href="" target="_blank" className="w-[150px] flex items-center justify-start pl-4 gap-2 bg-zinc-800 transition-colors py-2 rounded hover:bg-zinc-700">
                        <img src={githubIcon} alt="" className="w-5 h-5" />
                        Github
                    </a>
                    <a href="" target="_blank" className="w-[150px] flex items-center justify-start pl-4 gap-2 bg-zinc-800 transition-colors py-2 rounded hover:bg-zinc-700">
                        <img src={linkedinIcon} alt="" className="w-5 h-5" />
                        LinkedIN
                    </a>
                </nav>
            </div>      

            <div className="w-[1000px] grid grid-cols-3 gap-4">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>        

        </div>
    )
}