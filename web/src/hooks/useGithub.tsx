import axios from "axios";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

export interface GithubRepositoryData {
    id: number;
    full_name: string;
    name: string;
    html_url: string;
    description: string;
    languages?: string[];
}

export function useGithub() {

    const { getSavedToken } = useToken();

    const token = getSavedToken();
    const navigate = useNavigate();

    async function getRepos() {
        try {
            const response = await axios.get(
                `${API}/github/repos`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }    
            );
            return response.data as GithubRepositoryData[];
        } catch (error) {
            navigate('/projects/new')
            console.error("Erro ao buscar os repositórios do usuário");
        }
    }

    async function getRepoInfos(repoName: string) {
        try {
            const response = await axios.get(
                `${API}/github/repos/${repoName}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }    
            );
            return response.data as GithubRepositoryData;
        } catch (error) {
            console.error("Erro ao buscar os dados do repositório")
        }
    }

  
    return { getRepos, getRepoInfos }

}