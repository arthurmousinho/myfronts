import { Loading } from "@/components/Loading";
import { RepoCard } from "@/components/RepoCard";
import { GithubRepositoryData, useGithub } from "@/hooks/useGithub";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function SelectUserRepo() {

    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState<GithubRepositoryData[]>();

    const { getRepos } = useGithub();

    async function loadRepos() {
        const userRepos = await getRepos();
        if(userRepos) {
            setRepos(userRepos)
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRepos();
    }, [])

    if(loading) {
        return (
            <Loading  message="Buscando repositórios..." />
        )
    }

    return (
        <div className="w-full flex items-center justify-center mb-96">
             <div className="w-[650px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <header className="w-full flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-300">
                        Selecione um repositório
                    </h1>
                    <Link to={'/projects/new'} className="flex items-center gap-2 text-muted-foreground hover:text-gray-200 transition-colors">
                        Pular
                        <ArrowRight size={20} />
                    </Link>
                </header>
                <div className="w-full flex flex-col gap-2">
                   {
                        repos?.map(repo => {
                            return (
                                <RepoCard name={repo.name} key={repo.id} />
                            )
                        })
                   }
                </div>
            </div>
        </div>
    )
}