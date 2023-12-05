import { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom";
import { useToken } from "@/hooks/useToken";
import { Loading } from "@/components/Loading";

export function AuthCallback() {

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    
    const { getUserToken } = useToken();

    async function handleAuth() {
        const code = searchParams.get("code");
        if (code) {
            await getUserToken(code);
            setLoading(false);
        }
    }

    useEffect(() => {
        handleAuth()
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