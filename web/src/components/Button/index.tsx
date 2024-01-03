interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export function Button(props: ButtonProps) {
    return (
        <button {...props} className="w-full h-12 text-base bg-zinc-default text-gray-400 hover:text-muted transition-all flex items-center justify-center gap-2 rounded border border-zinc-800">
            {props.children}
        </button>
    )
}