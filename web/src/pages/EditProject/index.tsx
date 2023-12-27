import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Loading } from "@/components/Loading"
import { Textarea } from "@/components/Textarea"
import { Label } from "@/components/ui/label"
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage"
import { ProjectProps, newProjectData, useProject } from "@/hooks/useProject"
import { FileImage, PlusIcon, Save, X } from "lucide-react"
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export function EditProject() {

    const [project, setProject] = useState<ProjectProps>();

    const [loading, setLoading] = useState(true);
    const [previewURL, setPreviewURL] = useState("");

    const [title, setTitle] = useState("");
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [repoURL, setRepoURL] = useState("");
    const [projectURL, setProjectURL] = useState("");
    const [tech, setTech] = useState("");
    const [techs, setTechs] = useState<string[]>([]);

    const navigate = useNavigate();
    const { id } = useParams();
    const { getProjectById, editProject } = useProject();
    const { deleteImage, getNewUIID, saveImage } = useFirebaseStorage();


    useMemo(() => {
        if (imgFile) {
            setPreviewURL(URL.createObjectURL(imgFile));
        }
    }, [imgFile])


    async function loadProject() {
        if (id) {
            const projectInfos: ProjectProps = await getProjectById(id);
            if(projectInfos) {
                setProject(projectInfos);

                setTitle(projectInfos.title);
                setDescription(projectInfos.description);
                setRepoURL(projectInfos.repositoryURL);
                setProjectURL(projectInfos.projectURL);
                setTechs([...projectInfos.techs]);
                setPreviewURL(projectInfos.imageURL);
                setLoading(false);
            }
        }
    }

    function handleAddTech() {
        if (tech.trim() === "") {
            alert("Digite a tecnologia para adicionar");
            return;
        }
        setTechs([...techs, tech]);
        setTech("");
    }

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files != null) {
            const img = event.target.files[0];
            if(img.type !== "image/jpeg" && img.type !== "image/png") {
                alert("Envie apenas imagens .png ou .jpeg");
                return;
            }
            setImgFile(img);
        }
    }

    function handleRemoveTech(index: number) {
        const currentTechs = [...techs];
        currentTechs.splice(index, 1);
        setTechs(currentTechs);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (project && previewURL != project.imageURL && imgFile) {
            const newImageUUID = getNewUIID()
            const newImageURL = await saveImage(imgFile, project.title, newImageUUID);
            if (newImageURL) {
                const newProject: newProjectData = {
                    title: title,
                    description: description,
                    repositoryURL: repoURL,
                    projectURL: projectURL,
                    techs: techs,
                    imageURL: newImageURL,
                    imageUUID: newImageUUID,
                }
                editProject(project.id, newProject);
                deleteImage(project?.imageUUID, project.title);
            }
        } 
        else if (project) {
            const newProject: newProjectData  = {
                title: title,
                description: description,
                repositoryURL: repoURL,
                projectURL: projectURL,
                techs: techs,
                imageURL: project.imageURL,
                imageUUID: project.imageUUID,
            }
            editProject(project.id, newProject);
        }

        navigate("/projects");
    }

    useEffect(() => {
        loadProject();
    }, [])

    if(loading) {
        return <Loading message="Buscando projeto..." />
    }

    return (
        <div className="w-full flex items-center justify-center mb-96">

            <div className="w-[650px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <h1 className="text-3xl font-bold text-gray-300">
                    Editar Projeto
                </h1>

                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 text-base">
                        <Label htmlFor="title" className="text-muted-foreground text-base">
                            Título do projeto
                        </Label>
                        <Input id="title" placeholder="ex: to-do list" required
                            onChange={event => setTitle(event.target.value)}
                            defaultValue={ title }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="text-muted-foreground text-base">
                            Descrição do projeto
                        </Label>
                        <Textarea id="description" placeholder="descreva seu projeto..." required
                            onChange={event => setDescription(event.target.value)}
                            defaultValue={ description }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="repo" className="text-muted-foreground text-base">
                            URL do repositório
                        </Label>
                        <Input id="repo" type="url" placeholder="https://..." required
                            onChange={event => setRepoURL(event.target.value)}
                            defaultValue={ repoURL }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="project" className="text-muted-foreground text-base">
                            URL do projeto
                        </Label>
                        <Input id="project" type="url" placeholder="https://..." required
                            onChange={event => setProjectURL(event.target.value)} 
                            defaultValue={ projectURL }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tech" className="text-muted-foreground text-base">
                            Tecnologias usadas
                        </Label>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <Input id="tech" type="url" placeholder="ex: react"
                                    onChange={event => setTech(event.target.value)} value={tech}
                                />
                                <button type="button" 
                                    className="transition-colors flex items-center justify-center p-4 border border-zinc-800 rounded h-12 hover:bg-zinc-default" onClick={handleAddTech}
                                >
                                    <PlusIcon size={20} />
                                </button>
                            </div>
                            <div className="flex items-center flex-wrap gap-2">
                                {
                                    techs.map((tech, index) => {
                                        return (
                                            <Badge tech={tech} canRemove={true} removeFunction={() => handleRemoveTech(index)} key={tech} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-base">
                        {
                            previewURL != "" ? (
                                <>
                                    <div className="relative">
                                        <X size={30} className="absolute top-0 right-0 cursor-pointer text-orange-default" onClick={() => setPreviewURL("")} />
                                        <img src={previewURL} alt="" />
                                    </div>
                                </>
                            ) : (
                                <>                       
                                    <label htmlFor="image" className="cursor-pointer text-muted-foreground h-40 w-full  flex    items-center justify-center gap-2 border border-dashed rounded border-zinc-800">
                                        <FileImage size={20} />
                                        Imagem do Projeto
                                    </label>
                                    <input type="file" className="hidden" id="image" onChange={ handleFile } />
                                </>
                            )
                        }
                    </div>
                    <Button>
                        <Save size={20} />
                        Salvar Alterações
                    </Button>
                </form>
            </div>

        </div>
    )
}