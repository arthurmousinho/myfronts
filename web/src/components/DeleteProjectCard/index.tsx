import { Trash2 } from "lucide-react";

interface DeleteProjectCardProps {
    name: string;
    id: string;
    onClick: () => void;
}

export function DeleteProjectCard(props: DeleteProjectCardProps) {

    return (
        <div className="bg-zinc-default rounded flex justify-between p-4 items-center ">
            <span className="text-lg text-muted-foreground">
                { props.name }
            </span>
            <Trash2 size={20} className="text-muted-foreground cursor-pointer hover:text-red-500 transition-colors" 
                onClick={props.onClick}
            />
        </div>
    )
}