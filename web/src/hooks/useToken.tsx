import { Cookies, useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export interface TokenInfos {
    name: string;
    username: string;
    avatarURL: string;
}

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
        removeCookie('token');
    }

    return { getSavedToken, setNewToken, hasToken, decodeToken, deleteToken };

}
