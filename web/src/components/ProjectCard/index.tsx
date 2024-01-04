import { Link } from "react-router-dom";
import { Edit2, LinkIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useToken } from "@/hooks/useToken";

interface ProjectCardProps {
    to: string;
    imageURL: string;
    title: string;
    description: string;
    controls?: boolean;
    id?: string;
    deleteProjectCallback?: () => void;
    targetBlank?: boolean;
}

export function ProjectCard(props: ProjectCardProps) {

    const { decodeToken, getSavedToken } = useToken();
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        const usernameFromToken = decodeToken(getSavedToken())?.username;
        if (usernameFromToken) {
            setUsername(usernameFromToken);
        }
    }, [])
    
    if (props.controls && props.id) {
        return (
            <div className="flex flex-col gap-4 bg-zinc-default rounded transition-transform h-[400px]">
                <img src={props.imageURL} alt="" 
                    className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between gap-4">
                    <h2 className="text-2xl font-bold text-gray-200 line-clamp-1">
                        {props.title}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground line-clamp-4 h-[100px]">
                        {props.description}
                    </p>
                    <div className="flex item-center gap-8">
                        <Link to={`/projects/edit/${props.id}`} className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-gray-100 transition-colors">
                            <Edit2 size={20} />
                            <span>Editar</span>
                        </Link>
                        <Link to={`/users/${username}/${props.id}`} target="_blank" className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-gray-100 transition-colors">
                            <LinkIcon size={20} />
                            <span>Link</span>
                        </Link>
                        <button className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-red-500 transition-colors" onClick={props.deleteProjectCallback}>
                            <Trash size={20} />
                            <span>Excluir</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link to={props.to} target={props.targetBlank ? "_blank" : "_parent"} className="flex flex-col gap-4 bg-zinc-default rounded transition-transform">
            <img src={props.imageURL} alt="" 
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-200 line-clamp-1">
                    {props.title}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground line-clamp-4">
                    {props.description}
                </p>
            </div>
        </Link>
    )
}