import { SignIn } from "@/components/SignIn";

export function LandingPage() {

    return (
        <div 
            className="w-[90vw] md:w-full md:h-screen flex flex-col items-left md:items-center pt-4 md:pt-40 gap-6 select-none px-3 md:px-0"
        >
            <h1 className="font-bold text-[2rem] md:text-[3.5rem] text-gray-200 text-left md:text-center">
                Mostre seus projetos Front-end para o mundo
            </h1>
            <p className="text-muted-foreground text-lg">
                Crie seu portifolio online para seus principais projetos e compartilhe com quem quiser
            </p>
            <div className="md:hidden visible">
                <SignIn />
            </div>
        </div>
    )
}