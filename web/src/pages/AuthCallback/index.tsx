import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

const API = import.meta.env.VITE_API_BASE_URL;

export function AuthCallback() {

    const [searchParams] = useSearchParams();
    const [cookies, setCookie] = useCookies(["token"]);
    const [dateToExpires, setDateToExpires] = useState<Date>();

    const navigate = useNavigate();

    async function getUser() {
        const code = searchParams.get("code");
        console.log(API)
        const response = await axios.post(`${API}/register`, { code }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const today = new Date();
        const future = new Date(today);

        future.setDate(today.getDate() + 30);
        setDateToExpires(future);
      
        const { token } = response.data;

        setCookie("token", token, { 
            path: "/" ,
            expires: dateToExpires,
        });

        navigate('/feed');
    }
    
    useEffect(() => {
        getUser()
    }, [])

    return (
        <h1 className="text-white text-center">
            AuthCallback
        </h1>
    )

}