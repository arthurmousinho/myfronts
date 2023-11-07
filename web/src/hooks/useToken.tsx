import { Cookies, useCookies } from "react-cookie";

export function useToken() {
    
    const [cookies, setCookie] = useCookies();

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

    return { getSavedToken, setNewToken, hasToken };

}
