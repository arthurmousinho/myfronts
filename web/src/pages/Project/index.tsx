import { Badge } from "@/components/Badge";
import { Loading } from "@/components/Loading";
import { UserCard } from "@/components/UserCard";
import { ProjectProps, useProject } from "@/hooks/useProject";
import { useToken } from "@/hooks/useToken";
import { useUsers } from "@/hooks/useUsers";
import { Github, LinkIcon, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface SimpleUserProps {
    name: string;
    username: string;
    avatarURL: string;
}

export function Project() {

    const [isLoading, setIsLoading] = useState(true);
    const [ownerUser, setOwnerUser] = useState<SimpleUserProps>();
    const [project, setProject] = useState<ProjectProps>();
    const [canLike, setCanLike] = useState<boolean>();
    
    const navigate = useNavigate();

    const { getProjectById, likeProject } = useProject();
    const { getUserInfosById } = useUsers();
    const { decodeToken, getSavedToken } = useToken();

    const projectId = useParams().projectId;
  
    async function handleLike() {
        if(canLike) {
            projectId && await likeProject(projectId);
            setCanLike(false);
            project && setProject({ ...project, likes: project.likes + 1 });
        }
    }

    async function loadProject() {
        const userId = decodeToken(getSavedToken())?.sub;

        if (projectId && userId) {
            const projectFound: ProjectProps = await getProjectById(projectId);
            setProject(projectFound);

            const ownerUser = await getUserInfosById(projectFound.userId);
            setOwnerUser(ownerUser);

            setCanLike(!projectFound.likedBy.includes(userId));

            setIsLoading(false);
        }
        navigate('')
    }
  
    useEffect(() => {
        loadProject();
    }, [])

    if(isLoading) {
        return (
            <Loading message="Buscando projeto..."/>
        )
    }

    return (
        <div className="flex items-center justify-center mb-96">
            <div className="w-[95vw] md:w-[800px] flex flex-col gap-8">
                <header className="w-full flex flex-col gap-2 md:gap-0 md:flex-row items-start md:items-center justify-between">
                    <h1 className="text-[2.5rem] font-bold text-gray-200">
                        {project?.title}
                    </h1>
                    <UserCard date={project?.createdAt} avatarURL={ownerUser?.avatarURL}
                        name={ownerUser?.name} to={`/users/${ownerUser?.username}`}
                    />
                </header>
                <img src={project?.imageURL} alt="" 
                    className="w-full rounded"
                />
                <section className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-300">
                        Descrição do Projeto
                    </h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        {project?.description}
                    </p>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-300">
                        Tecnologias Usadas
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                        {
                            project?.techs.map(tech => {
                                return (
                                    <Badge tech={tech} key={tech}/>
                                )
                            })
                        }
                    </div>
                </section>
                <section className="flex flex-col gap-2">
                    <div className="flex items-center gap-6">
                        <button 
                            className={`flex items-center gap-2 ${canLike && "text-muted-foreground hover:text-gray-200"} transition-colors ${!canLike && "cursor-not-allowed text-gray-200"} `} 
                            onClick={handleLike} 
                            disabled={!canLike}
                        >
                            <ThumbsUp size={20} />
                            <span>{project?.likes}</span>
                        </button>
                        <a href={project?.repositoryURL} className="flex items-center gap-2 text-muted-foreground hover:text-gray-200 transition-colors" target="_blank">
                            <Github size={20} />
                            Repositório
                        </a>
                        {
                            project?.projectURL && (
                                <a href={project.projectURL} className="flex items-center gap-2 text-muted-foreground hover:text-gray-200 transition-colors" target="_blank">
                                    <LinkIcon size={20} />
                                    Link do Projeto
                                </a>
                            )
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}