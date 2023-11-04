import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Label } from "@/components/ui/label";
import { FileImage, PlusIcon, X } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

interface ProjectData {
    title: string;
    imageFile: File;     
    description: string;  
    repositoryURL: string;
    projectURL: string;  
    techs: string[];
}

export function NewProject() {

    const [title, setTitle] = useState("");
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [repoURL, setRepoURL] = useState("");
    const [projectURL, setProjectURL] = useState("");
    const [tech, setTech] = useState("");

    const [techs, setTechs] = useState<string[]>([]);

    const previewURL = useMemo(() => {
        if (!imgFile) {
          return "";
        }
        return URL.createObjectURL(imgFile)
    }, [imgFile])

    function validFields() {
        const fields = [title, previewURL, description, repoURL, projectURL];
        return fields.every(field => field.trim() !== "");
    }

    function resetFields() {
        setTitle("");
        setImgFile(null);
        setDescription("");
        setRepoURL("");
        setProjectURL("");
        setTech("");
        setTechs([]);
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
            setImgFile(img)
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!validFields || techs.length === 0) {
            alert("Preencha todos os campos");
            return;
        } 

        if (imgFile == null) {
            alert("Adicione uma imagem do projeto");
            return;
        }
        
        const data: ProjectData = {
            title: title,
            imageFile: imgFile,     
            description: description,  
            repositoryURL: repoURL,
            projectURL: projectURL,  
            techs: techs,
        }

        console.log(data);
        
        resetFields();
        alert("Projeto adicionado com sucesso");
    }


    return (
        <div className="w-full flex items-center justify-center mb-96">

            <div className="w-[650px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <h1 className="text-3xl font-bold text-gray-300">
                    Adicione um novo projeto
                </h1>

                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 text-base">
                        <Label htmlFor="title" className="text-muted-foreground text-base">
                            Título do projeto:
                        </Label>
                        <Input id="title" placeholder="ex: to-do list" required
                            onChange={event => setTitle(event.target.value)} value={title}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="text-muted-foreground text-base">
                            Descrição do projeto
                        </Label>
                        <Textarea id="description" placeholder="descreva seu projeto..." required
                            onChange={event => setDescription(event.target.value)} value={description}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="repo" className="text-muted-foreground text-base">
                            URL do repositório
                        </Label>
                        <Input id="repo" type="url" placeholder="https://..." required
                            onChange={event => setRepoURL(event.target.value)} value={repoURL}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="project" className="text-muted-foreground text-base">
                            URL do projeto
                        </Label>
                        <Input id="project" type="url" placeholder="https://..." required
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
                    <Button>
                        <PlusIcon size={20} />
                        Adicionar
                    </Button>
                </form>
            </div>

        </div>
    )
}