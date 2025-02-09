import { User } from "@/types/user";
import axios from "axios";
import { addUser } from "./user_services";

export async function getDiscordUser(token:string)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const d = await axios.get('https://discord.com/api/users/@me', config).then(x => { return x.data})

    const user:User = {id:d.id, username:d.global_name, avatar:`https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}`, accountType:'discord', banner:"", discordUrl:'', xUrl:'', websiteUrl:'', email:'', projectId:''}
    
    await addUser(user);
}