import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Loading } from "@/components/Loading"
import { Textarea } from "@/components/Textarea"
import { Label } from "@/components/ui/label"
import { useToken } from "@/hooks/useToken"
import { EditUserData, User, useUsers } from "@/hooks/useUsers"
import { Frown, Save } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"

export function EditProfile() {

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    const { getUserInfos, editUser, deleteUser } = useUsers();
    const { getSavedToken, decodeToken, deleteToken, hasToken } = useToken();
    
    const [newName, setNewName] = useState<string | undefined>();
    const [newUsername, setNewUsername] = useState<string | undefined>();
    const [newGithubURL, setNewGithubURL] = useState<string | undefined>();
    const [newLinkedinURL, setNewLinkedinURL] = useState<string | undefined>();
    const [newBio, setNewBio] = useState<string | undefined>();

    async function getUserData() {
        if (hasToken()) {
            const username = decodeToken(getSavedToken())?.username;
            
            if (username) {
                const userInfos = await getUserInfos(username);
                setUser(userInfos);
                setNewName(userInfos.name);
                setNewUsername(userInfos.username);
                setNewGithubURL(userInfos.githubURL);
                setNewLinkedinURL(userInfos.linkedinURL);
                setNewBio(userInfos.bio);
                setLoading(false);
            }

        }
    }

    useEffect(() => {
        getUserData();
    }, [])


    if(loading) {
        return (
            <Loading message="Buscando dados do perfil..."/>
        )
    }

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        const newUserInfos: EditUserData = {
            name: newName,
            username: newUsername,
            githubURL: newGithubURL,
            linkedinURL: newLinkedinURL,
            bio: newBio
        };
    
       const editedUser =  await editUser(newUserInfos);

        if (editedUser) {
            alert("Usuário editado com sucesso")
        }

        if (user?.name != newName || user?.username != newUsername) {
            alert("Faca login novamente")
            deleteToken();
        }

    }

    async function handleDeleteUser() {
        const wantToDelete = confirm("Tem certeza que deseja excluir sua conta?")
        if (wantToDelete) {
            await deleteUser();
            alert("Usuário deletado com sucesso");
            deleteToken();
        }
    }

    return (
        <div className="w-full flex flex-col gap-12 items-center justify-center mb-96">
            <div className="w-[650px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <h1 className="text-3xl font-bold text-gray-300">
                    Meus Dados
                </h1>

                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 text-base">
                        <Label htmlFor="title" className="text-muted-foreground text-base">
                            Nome
                        </Label>
                        <Input id="title" placeholder="Username" required
                            defaultValue={user?.name}
                            onChange={event => setNewName(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="text-muted-foreground text-base">
                            Username
                        </Label>
                        <Input id="repo" type="text" placeholder="Username" required
                           defaultValue={user?.username}
                           onChange={event => setNewUsername(event.target.value)}
                        />
                        
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="repo" className="text-muted-foreground text-base">
                            URL do Github
                        </Label>
                        <Input id="repo" type="url" placeholder="https://..." 
                           defaultValue={user?.githubURL} 
                           onChange={event => setNewGithubURL(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="project" className="text-muted-foreground text-base">
                            URL do Linkedin
                        </Label>
                        <Input id="project" type="url" placeholder="https://..."
                            defaultValue={user?.linkedinURL}
                            onChange={event => setNewLinkedinURL(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="text-muted-foreground text-base">
                            Bio
                        </Label>
                        <Textarea id="description" placeholder="Bio" required
                            defaultValue={user?.bio}
                            onChange={event => setNewBio(event.target.value)}
                        />
                    </div>

                    <Button>
                        <Save size={20} />
                        Salvar Alterações
                    </Button>
                </form>
            </div>
            <div className="w-[650px] flex flex-col gap-4 items-start justify-center rounded p-4">
                <h1 className="text-3xl font-bold text-gray-300">
                    Excluir Conta
                </h1>

                <Button onClick={handleDeleteUser}>
                    <Frown size={20} className="text-red-500"/>
                    <span className="text-red-500">
                        Deletar Conta
                    </span>
                </Button>
            </div>
        </div>
    )
}