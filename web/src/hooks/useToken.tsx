import { Cookies, useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export interface TokenInfos {
    name: string;
    avatarURL: string;
    username: string;
    sub: string;
    iat: number;
    exp: number;
}

const API = import.meta.env.VITE_API_BASE_URL;

export function useToken() {

    const [cookies, setCookie, removeCookie] = useCookies();


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
        if (!token) {
            throw new Error('Unauthenticated.')
        }
        const user: TokenInfos = jwtDecode(token);
        return user;
    }

    function deleteToken() {
        removeCookie('token', { path: '/' }); 
    }

  
    async function refreshToken() {

        const userId = decodeToken(getSavedToken()).sub

        try {
            const response = await axios.post(`${API}/refresh-token`, 
                { userId: userId }
            )

            const refreshedToken = response.data.token;
            console.log(refreshedToken)

            setNewToken({
                key: "token",
                token: response.data.token,
                maxAge: 864000, // 10 days
            })

        } catch(error) {
            alert("Erro durante o refresh token")
        }
    }

    return { getSavedToken, setNewToken, hasToken, decodeToken, deleteToken, refreshToken };

}
