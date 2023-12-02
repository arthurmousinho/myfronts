import { Trash2 } from "lucide-react";


export function DeleteProjectCard({ name }: { name: string }) {
    return (
        <div className="bg-zinc-default rounded flex justify-between p-4 items-center ">
            <span className="text-lg text-muted-foreground">
                { name }
            </span>
            <Trash2 size={20} className="text-muted-foreground cursor-pointer hover:text-red-500 transition-colors" />
        </div>
    )
}