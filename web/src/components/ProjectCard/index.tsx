import { Link } from "react-router-dom";

interface ProjectCardProps {
    to: string;
    imageURL: string;
    title: string;
    description: string;
}

export function ProjectCard(props: ProjectCardProps) {
    return (
        <Link to={props.to} className="flex flex-col gap-4 bg-zinc-default rounded transition-transform">
            <img src={props.imageURL} alt="" 
                className="w-full h-50"
            />
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-200">
                    {props.title}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                    {props.description}
                </p>
            </div>
        </Link>
    )
}