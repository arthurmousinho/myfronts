import { Loading } from "@/components/Loading";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectProps, useProject } from "@/hooks/useProject";
import { User, useUsers } from "@/hooks/useUsers";
import { useEffect, useState } from "react";

interface ProjectsWithUsername extends ProjectProps {
    username: string;
}

export function TrendingProjects() {

    const [trendingProjects, setTrendingProjects] = useState<ProjectsWithUsername[]>();
    const [loading, setLoading] = useState(true);

    const { getTrendingProjects } = useProject();
    const { getUserInfosById } = useUsers();

    async function loadTrendingProjects() {
        const projects: ProjectProps[] = await getTrendingProjects();

        const projectsWithUsername = await Promise.all(
            projects.map(async (project) => {
                const username = await getProjectUsername(project.userId);
                return { ...project, username }; 
            })
        );
        
        setTrendingProjects(projectsWithUsername);
        setLoading(false);
    }

    async function getProjectUsername(userId: string) {
        const user: User = await getUserInfosById(userId)
        return user.username;
    }

    useEffect(() => {
        loadTrendingProjects();
    }, [])

    if (loading) {
        return (
            <Loading message="Buscando projetos em alta..." />
        )
    }

    return (
        <div className="w-full flex items-center justify-center mb-96">
            <div className="w-[1000px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <header>
                    <h1 className="text-3xl font-bold text-gray-300">
                        Em Alta
                    </h1>
                </header>
                <div className="w-[1000px] grid grid-cols-3 gap-4">
                    {
                        trendingProjects?.map(project => {
                            return (
                                <ProjectCard
                                    description={project.description}
                                    imageURL={project.imageURL}
                                    title={project.title}
                                    key={project.id}
                                    to={`/users/${project.username}/${project.id}`}
                                    targetBlank={true}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}