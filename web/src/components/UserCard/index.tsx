import format from "date-fns/format";
import { Link } from "react-router-dom";

interface UserCardProps {
    name: string | undefined;
    avatarURL: string | undefined;
    date?: string;
    to: string;
}

export function UserCard({ name, avatarURL, date, to }: UserCardProps) {

    let formattedDate;

    if(date) {
        formattedDate = format(new Date(date), 'dd/MM/yyyy');  
    }

    return (
        <Link to={to}>
            <div className="flex items-center gap-2">
                <img src={ avatarURL } alt="" 
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                    <span className="text-base text-gray-200">
                        { name }
                    </span>
                    {
                        date ? (
                            <span className="text-sm text-muted-foreground">
                                { formattedDate }
                            </span>
                        ) : <></>
                    }
                </div>
            </div>
        </Link>
    )
}