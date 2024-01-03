interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps) {
    return (
        <input {...props} 
        className={`w-full h-12 pl-2 bg-transparent border border-zinc-800 placeholder:text-muted-foreground focus:outline-none placeholder:text-sm rounded text-gray-400 ${props.disabled ? "cursor-not-allowed" : ""} `} 
        />
    )
}