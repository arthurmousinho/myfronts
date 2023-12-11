import { Loading } from "@/components/Loading";
import { RepoCard } from "@/components/RepoCard";
import { GithubRepositoryData, useGithub } from "@/hooks/useGithub";
import { useEffect, useState } from "react";

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
                <h1 className="text-3xl font-bold text-gray-300">
                    Selecione um repositório
                </h1>
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