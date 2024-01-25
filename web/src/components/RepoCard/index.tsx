import { GithubIcon } from "lucide-react";
import { Button } from "../Button";
import { Link } from "react-router-dom";

interface RepoCardProps {
    name: string;
}

export function RepoCard(props: RepoCardProps) {

    return (
        <div className="w-full flex items-center md:gap-0 gap-4 justify-between px-4 py-2 bg-zinc-default rounded text-muted-foreground">
            <div className="flex items-center gap-4 w-full">
                <GithubIcon size={25} />
                <span>{props.name}</span>
            </div>
            <Link to={`${props.name}`} replace={true} className="w-[150px]">
                <Button>
                    Selecionar
                </Button>
            </Link>
        </div>
    )

}