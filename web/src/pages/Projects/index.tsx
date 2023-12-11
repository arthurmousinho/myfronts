import { Loading } from "@/components/Loading";
import { ProjectCard } from "@/components/ProjectCard";
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage";
import { ProjectProps, useProject } from "@/hooks/useProject"
import { Plus } from "lucide-react";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Projects() {

    const { getAllProjects } = useProject();
    const { deleteProject } = useProject();
    const { deleteImage } = useFirebaseStorage();

    const [projects, setProjects] = useState<ProjectProps[]>();
    const [loading, setLoading] = useState(true);


    async function getProjects() {
        const projects: ProjectProps[] = await getAllProjects(); 
        if (projects) {
            setProjects(projects);
            setLoading(false);
        }
    }

    async function handleDeleteProject(project: ProjectProps) {
        const wantToDelete = confirm(`Tem certeza que deseja excluir o projeto ${project.title}? Essa ação não pode ser desfeita`)
        if (wantToDelete) {
            await deleteProject(project.id);
            await deleteImage(project.imageUUID);
            const remainingProjects = projects?.filter(p => p.id != project.id);
            if (remainingProjects) {
                setProjects([...remainingProjects]);
            }
        }
    }

    useEffect(() => {
        getProjects();
    }, [])

    if(loading) {
        return (
            <Loading message="Carregando seus projetos..." />
        )
    }

    return (
        <div className="flex items-center justify-center mb-96">


            <div className="w-[1000px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <h1 className="text-3xl font-bold text-gray-300 text-left">
                    Meus Projetos
                </h1>

                <div className="w-full grid grid-cols-3 gap-4 min-h-[400px]">
                    <Link to={"/projects/repos"} 
                        className="bg-zinc-default text-gray-400 hover:text-muted transition-all flex items-center flex-col justify-center gap-2 rounded border border-zinc-800" 
                    >
                        <Plus size={40} />
                        Adicionar projeto
                    </Link>
                    {
                        projects?.map(project => {
                            return (
                                <ProjectCard  
                                    key={project.id}
                                    title={project.title} 
                                    description={project.description}
                                    imageURL={project.imageURL}
                                    id={project.id}
                                    to={""}
                                    controls={true}
                                    deleteProjectCallback={() => handleDeleteProject(project)}
                                />
                            )
                        })
                    }
                </div>

            </div>



        </div>
    )
}