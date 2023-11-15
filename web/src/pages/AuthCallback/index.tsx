import axios from "axios";

import { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom";
import { useToken } from "@/hooks/useToken";
import { Loading } from "@/components/Loading";

const API = import.meta.env.VITE_API_BASE_URL;

export function AuthCallback() {

    const [searchParams] = useSearchParams();
    const { setNewToken } = useToken();
    const [loading, setLoading] = useState(true);
   
    async function getUserToken() {
        const code = searchParams.get("code");
        const response = await axios.post(`${API}/register`, { code }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const { token } = response.data;
     
        if (token) {
            setNewToken({
                key: "token",
                token: token,
                maxAge: 864000, // 10 days
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
                    <Loading message="Autenticando..."/>
                ) : (
                    <Navigate to={'/'} />
                )
            }
        </div>
    )

}