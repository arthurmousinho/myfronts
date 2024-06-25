import axios, { AxiosResponse } from "axios";
import { GithubUserType } from "../types/user.type";
import { ProjectService } from "./project.service";
import { ProjectType } from "../types/project.type";

export class GithubService {

    private BASE_API_URL = 'https://api.github.com';
    private ACCESS_TOKEN_REQUEST_URL = 'https://github.com/login/oauth/access_token';

    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    private async getAccessToken(code: string) {
        const response = await axios.post(
            this.ACCESS_TOKEN_REQUEST_URL,
            null,
            {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    Accept: 'application/json'
                }
            },
        );
        return response as { data: { access_token: string } };
    }
    
    public async getGithubUser(code: string) {
        const response = await this.getAccessToken(code);
        const { access_token } = response.data;
        
        const userResponse = await axios.get(
            'https://api.github.com/user',
             {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        );

        const githubUser: GithubUserType = userResponse.data;
        return githubUser;
    }

    public async getReposByUsername(username: string) {
        try {
            const response = await axios.get(
                `${this.BASE_API_URL}/users/${username}/repos?sort=pushed`
            );

            const allUserRepos = response.data;

            const userProjects = await this.projectService.getProjectsByUsername(username);
            const reposUrlAlreadyConnected = userProjects.map(
                project => project.repositoryURL
            );

            return allUserRepos.filter(
                (repo: any) => !reposUrlAlreadyConnected.includes(repo.html_url)
            );
        } catch (error) {
            throw new Error('Error during get user repos fetching');
        }
    }

    public async getUserRepoInfos(params: { username: string, repoName: string }) {
        try {
            const [ repoInfoReponse, languagesResponse ] = await Promise.all([
                axios.get(
                    `${this.BASE_API_URL}/repos/${params.username}/${params.repoName}`
                ),
                axios.get(
                    `${this.BASE_API_URL}/repos/${params.username}/${params.repoName}/languages`
                )
            ]);
            const infos = repoInfoReponse.data;
            const languages = Object.keys(languagesResponse.data);
            return {...infos, languages};
        } catch (error) {
            throw new Error('Error during get user repo infos fetching');
        }
    }

}