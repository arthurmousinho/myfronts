import { ProjectCard } from "@/components/ProjectCard";

export function Trending() {
    return (
        <div className="w-full flex items-center justify-center mb-96">
            <div className="w-[1000px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <header>
                    <h1 className="text-3xl font-bold text-gray-300">
                        Em Alta
                    </h1>
                </header>
                <div className="w-[1000px] grid grid-cols-3 gap-4">
                    <ProjectCard 
                        description="lorem ipsum dolor sir ammet bla bla"
                        imageURL="https://github.com/arthurmousinho/dev-books/blob/main/public/preview1.png?raw=true"
                        title="Dev Books"
                        key={1}
                        to=""
                    />
                    <ProjectCard 
                        description="lorem ipsum dolor sir ammet bla bla"
                        imageURL="https://github.com/arthurmousinho/dev-books/blob/main/public/preview1.png?raw=true"
                        title="Dev Books"
                        key={1}
                        to=""
                    />
                    <ProjectCard 
                        description="lorem ipsum dolor sir ammet bla bla"
                        imageURL="https://github.com/arthurmousinho/dev-books/blob/main/public/preview1.png?raw=true"
                        title="Dev Books"
                        key={1}
                        to=""
                    />
                    <ProjectCard 
                        description="lorem ipsum dolor sir ammet bla bla"
                        imageURL="https://github.com/arthurmousinho/dev-books/blob/main/public/preview1.png?raw=true"
                        title="Dev Books"
                        key={1}
                        to=""
                    />
                    <ProjectCard 
                        description="lorem ipsum dolor sir ammet bla bla"
                        imageURL="https://github.com/arthurmousinho/dev-books/blob/main/public/preview1.png?raw=true"
                        title="Dev Books"
                        key={1}
                        to=""
                    />
                    <ProjectCard 
                        description="lorem ipsum dolor sir ammet bla bla"
                        imageURL="https://github.com/arthurmousinho/dev-books/blob/main/public/preview1.png?raw=true"
                        title="Dev Books"
                        key={1}
                        to=""
                    />
                </div>
            </div>
        </div>
    )
}