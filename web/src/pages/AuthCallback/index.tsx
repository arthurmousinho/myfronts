import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";

export function AuthCallback() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(() => {
        console.log(searchParams.get("code"))
    }, [])

    return (
        <h1 className="text-white text-center">
            AuthCallback
        </h1>
    )

}