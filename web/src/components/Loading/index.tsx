import { Loader2 } from "lucide-react";

export function Loading({ message }: {message: string}) {
    return (
        <div className="flex items-center justify-center gap-4 mt-10">
            <Loader2 size={30} className="text-gray-50 animate-spin" />
            <span className="text-gray-50 text-2xl font-bold">
                { message }
            </span>
        </div>
    )
}