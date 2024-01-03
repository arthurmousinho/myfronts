import { Cookies, useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export interface TokenInfos {
    name: string;
    avatarURL: string;
    githubURL: string;
    username: string;
    sub: string;
    iat: number;
    exp: number;
}

const API = import.meta.env.VITE_API_BASE_URL;

export function useToken() {

    const [, setCookie, removeCookie] = useCookies();

    async function getUserToken(code: string) {
        const response = await axios.post(`${API}/auth`, 
            { code }, 
            {
                headers: {
                "Content-Type": "application/json"
                }
            }
        );

        const { token } = response.data;
     
        if (token) {
            setNewToken({
                key: "token",
                token: token,
                maxAge: 864000, // 10 days in seconds
            });
        } 
    }

    function hasToken() {
        if (getSavedToken()) {
            return true;
        }
        return false;
    }

    function getSavedToken() {
        const cookies = new Cookies();
        const token: string = cookies.get('token');
        return token;
    }
    
    function setNewToken({key, token, maxAge } : { key: string, token: string, maxAge: number }) {
        setCookie(key, token, { 
            path: "/" ,
            maxAge: maxAge
        });
    }

    function decodeToken(token: string) {
        if (token) {
            const user: TokenInfos = jwtDecode(token);
            return user;            
        }
    }

    function deleteToken() {
        removeCookie('token', { path: '/' }); 
    }

    return { getSavedToken, hasToken, decodeToken, deleteToken, getUserToken };

}
