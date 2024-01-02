import axios from "axios";
import { ProjectProps, useProject } from "./useProject";
import { useToken } from "./useToken";

const GITHUB_API = import.meta.env.VITE_GITHUB_API_URL;

export interface GithubRepositoryData {
    id: number;
    full_name: string;
    name: string;
    html_url: string;
    description: string;
}

export function useGithub() {

    const { getAllProjects } = useProject();
    const { decodeToken, getSavedToken } = useToken()

    const username = decodeToken(getSavedToken())?.githubURL.split('/').pop();
    
    async function getRepos() {
        try {
            const userProjects: ProjectProps[] = await getAllProjects();
            const reposUrlAlreadyConnected = userProjects.map(project => project.repositoryURL);
            const response = await axios.get(`${GITHUB_API}/users/${username}/repos?sort=pushed`)
            const repos: GithubRepositoryData[] = response.data;
            return repos.filter(repo => !reposUrlAlreadyConnected.includes(repo.html_url));
        } catch (error) {
            console.error("Erro ao buscar os repositórios do usuário")
        }
    }

    async function getRepoInfos(name: string) {
        try {
            const response = await axios.get(`${GITHUB_API}/repos/${username}/${name}`);
            const repo: GithubRepositoryData = response.data;
            return repo;
        } catch (error) {
            console.error("Erro ao buscar os dados do repositório")
        }
    }


    return { getRepos, getRepoInfos }

}