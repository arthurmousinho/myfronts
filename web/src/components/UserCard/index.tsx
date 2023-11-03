import { Link } from "react-router-dom";

interface UserCardProps {
    date?: string;
}

export function UserCard({ date }: UserCardProps) {
    return (
        <Link to={'/users/arthurmousinho'}>
             <div className="flex items-center gap-2">
                 <img src="https://github.com/arthurmousinho.png" alt="" 
                     className="w-10 h-10 rounded-full"
                 />
                 <div className="flex flex-col">
                    <span className="text-base text-gray-200">
                        Arthur Mousinho
                    </span>
                    {
                        date ? (
                            <span className="text-sm text-muted-foreground">
                                { date }
                            </span>
                        ) : <></>
                    }
                 </div>
             </div>
             
        </Link>
    )
}