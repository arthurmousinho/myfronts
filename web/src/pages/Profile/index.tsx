import defaultUserBanner from "../../assets/default-user-banner.png";
import { useEffect, useState } from "react";
import { User, useUsers } from "@/hooks/useUsers";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { ProjectProps } from "@/hooks/useProject";
import { Button } from "@/components/Button";
import { Github } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";

export function Profile() {

    const [ isLoading, setIsLoading ] = useState(true);    
    const [ user, setUser ] = useState<User>();
    const [ projects, setProjects ] = useState<ProjectProps[]>()

    const navigate = useNavigate();

    const { getUserInfos } = useUsers();
    const username = useParams().username;

    async function loadUserInfos() {
        if (username) {
            const userInfos = await getUserInfos(username);
            setUser(userInfos);
            setProjects([...userInfos.projects,...userInfos.projects,...userInfos.projects]);
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
            
            <header className="w-[1000px] bg-zinc-default pb-4">
                <div className="w-full relative">
                    <img 
                        src={defaultUserBanner}
                        className="bg-zinc-default h-[200px] w-full rounded border-b
                        border-zinc-800"
                    />
                    <div 
                        className="bg-zinc-default p-2 rounded-full absolute bottom-[-50px] left-[40px]"
                    >
                        <img 
                            src={user?.avatarURL} 
                            alt={user?.username} 
                            className="rounded-full w-[100px]"
                        />
                    </div>
                    <nav className="absolute right-[40px] flex flex-col gap-2 mt-2">
                        <a className="w-[50px]" href={user?.githubURL} target="_blank">
                            <Button>
                                <Github />    
                            </Button>
                        </a>
                    </nav>
                </div>
                <div className="mt-12 pl-[40px]">
                    <h1 className="font-bold text-[2rem] text-gray-300 text-left">
                        { user?.name }
                    </h1>
                    <span className="text-base text-muted-foreground text-left max-w-[95%]">
                        { user?.bio }
                    </span>
                </div>
            </header>  

            <div className="w-[95vw] md:w-[1000px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    hasProject() ? (
                        projects?.map(project => {
                            return (
                                <ProjectCard 
                                    key={project.title} 
                                    title={project.title} 
                                    description={project.description} 
                                    imageURL={project.image.url} 
                                    to={project.id}
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