import axios from "axios";
import { z } from "zod";
import { GithubUser } from "../interfaces/GithubUser.interface";

export async function  getGithubUserByCode(code: string) {

    const response = await axios.post(
        'https://github.com/login/oauth/access_token',
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

    const { access_token } = response.data;

    const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    const githubUserSchema = z.object({
        id: z.number(),
        login: z.string(),
        bio: z.string(),
        name: z.string(),
        avatar_url: z.string().url(),
        html_url: z.string().url()
    });

    const githubUser: GithubUser = githubUserSchema.parse(userResponse.data);

    return githubUser;

}