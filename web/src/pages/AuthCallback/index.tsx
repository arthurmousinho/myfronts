import axios from "axios";

import { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Loader, Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;

export function AuthCallback() {

    const [searchParams] = useSearchParams();
    const [cookies, setCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(true);

    async function getUserToken() {
        const code = searchParams.get("code");
        const response = await axios.post(`${API}/register`, { code }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const { token } = response.data;
       
        if (token) {
            setCookie("token", token, { 
                path: "/" ,
                maxAge: 864000 // 10 days
            });
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getUserToken();
    }, [])

    return (
        <div className="flex w-full justify-center items-center">
            {
                loading ? (
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <Loader2 size={30} className="text-gray-50 animate-spin" />
                        <span className="text-gray-50 text-2xl font-bold">
                            Autenticando...
                        </span>
                    </div>
                ) : (
                    <Navigate to={'/profile'} />
                )
            }
        </div>
    )

}