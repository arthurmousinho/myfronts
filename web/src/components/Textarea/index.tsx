interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Textarea(props: TextareaProps) {
    return (
        <textarea {...props} className="w-full h-40 resize-y p-2 bg-transparent border border-zinc-800 rounded focus:outline-none placeholder:text-muted-foreground placeholder:text-sm text-gray-400"/>
    )
}