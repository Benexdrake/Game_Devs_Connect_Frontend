import { UserType } from "@/types/user";
import axios from "axios";
import { addUser, getUserById } from "./user_services";

export async function getDiscordUser(token:string)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const d = await axios.get('https://discord.com/api/users/@me', config).then(x => { return x.data})
    

    let avatar = '/discordblue.png'
    
    if(d.avatar)
        avatar = `https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}`;
    
    let username = d.global_name;
    if(!username)
        username = d.username;

    const user:UserType = {id:d.id, username, avatar, accountType:'discord', banner:"", discordUrl:'', xUrl:'', websiteUrl:'', email:'', projectId:''}
    
    const response = await addUser(user);
    
    const userDB= await getUserById(user.id)

    return userDB.data;
}