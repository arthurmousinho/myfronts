import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { Textarea } from "@/components/Textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { GithubRepositoryData, useGithub } from "@/hooks/useGithub";
import { newProjectData, useProject } from "@/hooks/useProject";
import { useStorage } from "@/hooks/useStorage";
import { ArrowLeft, ArrowRight, FileImage, Loader2, PlusIcon, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function NewProject() {

    const [title, setTitle] = useState("");
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [repoURL, setRepoURL] = useState("");
    const [projectURL, setProjectURL] = useState("");
    const [tech, setTech] = useState("");
    const [techs, setTechs] = useState<string[]>([]);

    const [loading, setLoading] = useState(true);
    const [canSubmit, setCanSubmit] = useState<boolean>(true);

    const [repo, setRepo] = useState<GithubRepositoryData>();

    const { saveProject } = useProject();
    const { getRepoInfos } = useGithub();
    const { repoName } = useParams();
    const { toast } = useToast();

    const { uploadImage, getNewUIID } = useStorage()

    const previewURL = useMemo(() => {
        if (!imgFile) {
          return "";
        };
        return URL.createObjectURL(imgFile);
    }, [imgFile])

    function validFields() {
        const fields = [title, previewURL, description, repoURL];
        return fields.every(field => field.trim() !== "");
    }

    function handleAddTech() {
        if (tech.trim() === "") {
            alert("Digite a tecnologia para adicionar");
            return;
        }
        setTechs([...techs, tech]);
        setTech("");
    }

    function handleRemoveTech(index: number) {
        const currentTechs = [...techs];
        currentTechs.splice(index, 1);
        setTechs(currentTechs);
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

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!validFields || techs.length === 0) {
            toast({
                variant: "destructive",
                description: "Preencha todos os campos",        
            })
            return;
        } 

        if (imgFile == null) {
            toast({
                variant: "destructive",
                description: "Adicione uma imagem do projeto",        
            })
            return;
        }
        
        if (canSubmit) {
            setCanSubmit(false);
            const newUUID = getNewUIID();
            const imageURL = await uploadImage(imgFile, newUUID);

            if (!imageURL) {
                return;
            }

            const data: newProjectData = {
                title,
                imageURL,     
                description, 
                repositoryURL: repoURL,
                imageUUID: newUUID,
                projectURL,  
                techs,
            }
            await saveProject(data);
        }

    }

    async function loadRepoInfos() {
        if (repoName) {
            const repoInfos = await getRepoInfos(repoName); 
            setRepo(repoInfos);
            
            if (repoInfos) {
                setTitle(repoInfos.name);
                setDescription(repoInfos.description)
                setRepoURL(repoInfos.html_url);
                repoInfos.languages && setTechs(repoInfos.languages);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRepoInfos();
    }, [])

    
    if (loading) {
        return (
            <Loading message="Buscando dados do repositório..." />
        )
    }

    return (
        <div className="w-full flex items-center justify-center mb-96">

            <div className="w-[650px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <header className="w-full flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-300">
                        Adicionar Projeto
                    </h1>
                    <Link to={'/projects/repos'} className="flex items-center gap-2 text-muted-foreground hover:text-gray-200   transition-colors">
                        <ArrowLeft size={20} />
                        Conectar repositório
                    </Link>
                </header>

                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 text-base">
                        <Label htmlFor="title" className="text-muted-foreground text-base">
                            Título do projeto
                        </Label>
                        <Input id="title" placeholder="ex: to-do list" required
                            onChange={event => setTitle(event.target.value)}
                            defaultValue={ repo?.name }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="text-muted-foreground text-base">
                            Descrição do projeto
                        </Label>
                        <Textarea id="description" placeholder="descreva seu projeto..." required
                            onChange={event => setDescription(event.target.value)}
                            defaultValue={ repo?.description }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="repo" className="text-muted-foreground text-base">
                            URL do repositório
                        </Label>
                        <Input id="repo" type="url" placeholder="https://..." required
                            onChange={event => setRepoURL(event.target.value)}
                            defaultValue={ repo?.html_url }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="project" className="text-muted-foreground text-base">
                            URL do projeto
                        </Label>
                        <Input id="project" type="url" placeholder="https://..." 
                            onChange={event => setProjectURL(event.target.value)} value={projectURL}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tech" className="text-muted-foreground text-base">
                            Tecnologias usadas
                        </Label>
                        <div className={`flex flex-col ${techs.length > 0 ? 'gap-4' : 'gap-0'} `}>
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
                            previewURL === "" ? (
                                <>
                                    <label htmlFor="image" 
                                        className="cursor-pointer text-muted-foreground h-40 w-full  flex items-center justify-center gap-2 border border-dashed rounded border-zinc-800"
                                    >
                                        <FileImage size={20} />
                                        Imagem do Projeto
                                    </label>
                                    <input type="file" className="hidden" id="image" onChange={handleFile}/>
                                </>
                            ) : (
                                <div className="relative">
                                    <X size={30} className="absolute top-0 right-0 cursor-pointer text-orange-default" onClick={() => setImgFile(null)}/>
                                    <img src={previewURL} alt="" />
                                </div>
                            )
                        }
                    </div>
                    <Button >
                        {
                            canSubmit ? 
                            <>
                                <PlusIcon size={20} />
                                Adicionar
                            </> :
                            <>
                                <Loader2 size={20} className="text-gray-400 animate-spin" />
                                Salvando...
                            </>
                        }
                    </Button>
                </form>
            </div>

        </div>
    )
}