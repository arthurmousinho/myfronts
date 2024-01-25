import { ReactNode } from "react"

interface HeadingProps {
   children: ReactNode;
}

export function Heading(props: HeadingProps) {
    
    return (
        <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-gray-300 text-left">
            { props.children }
        </h1>
    )

}