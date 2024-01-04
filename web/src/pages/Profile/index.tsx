import linkedinIcon from "../../assets/linkedin-icon.svg";
import githubIcon from "../../assets/github-icon.svg";
import { ProjectCard } from "@/components/ProjectCard";
import { useEffect, useState } from "react";
import { User, useUsers } from "@/hooks/useUsers";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { ProjectProps } from "@/hooks/useProject";

export function Profile() {

    const [isLoading, setIsLoading] = useState(true);    
    const [user, setUser] = useState<User>();
    const [projects, setProjects] = useState<ProjectProps[]>()

    const navigate = useNavigate();

    const { getUserInfos } = useUsers();
    const username = useParams().username;

    async function loadUserInfos() {
        if (username) {
            const userInfos = await getUserInfos(username);
            setUser(userInfos);
            setProjects(userInfos.projects);
            setIsLoading(false);
            return;
        }
        navigate('/');
    }

    function hasProject() {
        if (projects?.length! > 0) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        loadUserInfos();
    }, [])


    if(isLoading) {
        return (
            <Loading message="Buscando perfil..."/>
        )
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center mb-96">

            <header className="flex items-center justify-between gap-4 w-[1000px] bg-zinc-default py-6 px-10 rounded">
                <div className="flex items-center gap-4">
                    <img src={user?.avatarURL} className="w-[120px] rounded-full" />
                    <div className="flex flex-col items-start justify-start">
                        <h1 className="font-bold text-[2rem] text-gray-300 text-left">
                            { user?.name }
                        </h1>
                        <span className="text-base text-muted-foreground text-left max-w-[95%]">
                            { user?.bio }
                        </span>
                    </div>
                </div>

                <nav className="flex flex-col gap-4">
                    <a href={user?.githubURL} target="_blank" className="w-[150px] flex items-center justify-start pl-4 gap-2 bg-zinc-800 transition-colors py-2 rounded hover:bg-zinc-700 ">
                        <img src={githubIcon} alt="" className="w-5 h-5" />
                        GitHub
                    </a>
                    <a href={user?.linkedinURL} target="_blank" className="w-[150px] flex items-center justify-start pl-4 gap-2 bg-zinc-800 transition-colors py-2 rounded hover:bg-zinc-700">
                        <img src={linkedinIcon} alt="" className="w-5 h-5" />
                        LinkedIN
                    </a>
                </nav>
            </header>      

            <div className="w-[1000px] grid grid-cols-3 gap-4">
                {
                    hasProject() ? (
                        projects?.map(project => {
                            return (
                                <ProjectCard 
                                    key={project.title} title={project.title} description={project.description} 
                                    imageURL={project.imageURL} to={project.id}
                                />
                            )
                        })
                    ) : (
                        <span className="text-center w-[1000px] text-muted-foreground">
                            nenhum projeto publicado
                        </span>
                    )
                }

            </div>        

        </div>
    )
}