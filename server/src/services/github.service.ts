import axios from "axios";
import { GithubUserType } from "./types/GithubUser.type";

export class GithubService {

    private async getAccessToken(code: string) {
        const REQUEST_URL = 'https://github.com/login/oauth/access_token'
        const response = await axios.post(
            REQUEST_URL,
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

}