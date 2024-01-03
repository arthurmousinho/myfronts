import { X } from "lucide-react";

interface BadgeProps {
    tech: string;
    canRemove?: boolean;
    removeFunction?: () => void;
}

export function Badge({ tech, canRemove, removeFunction }: BadgeProps) {
    if (canRemove && removeFunction) {
        return (
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-base font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 gap-2">
                { tech }
                <X size={20} onClick={removeFunction} className="cursor-pointer" />
            </span>
        )
    } else {
        return (
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-base font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                { tech }
            </span>
        )
    }
}