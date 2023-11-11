import { Cookies, useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export interface User {
    name: string;
    avatarURL: string;
}

export function useToken() {
    
    const [, setCookie] = useCookies();

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
        const user: User = jwtDecode(token);
        return user;
    }

    return { getSavedToken, setNewToken, hasToken, decodeToken };

}
