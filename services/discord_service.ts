import { UserType } from "../types/user";
import axios from "axios";
import { addUser, getUserById } from "./user_services";
import { AuthType } from "@/types/auth";

export async function getDiscordUser(token:any)
{
    try 
    {  
        const userDB= await getUserById(token.id)
    
        return userDB.data;
    } 
    catch (error) 
    {
        console.log(error);       
    }
}

export async function addDiscordUser(token:any)
{
    try 
    {
        const config = {
            headers: { Authorization: `Bearer ${token.accessToken}` }
        };
        const d = await axios.get('https://discord.com/api/users/@me', config).then(x => { return x.data})
        
        let avatar = '/discordblue.png'
        
        if(d.avatar)
            avatar = `https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}`;
        
        let username = d.global_name;
        if(!username)
            username = d.username;
    
        const user:UserType = {id:d.id, username, avatar, accountType:'discord'}
        
        const config2 = {
            headers: { 'APIKey': process.env.NEXTAUTH_SECRET }
        };
        
        const auth:AuthType = {userId:token.sub, token:token.accessToken, expires:token.expiresAt}

        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'/auth/add', auth, config2).then(x => x.data)
        console.log(response);
        
        await addUser(user, token.accessToken);
    } 
    catch (error) 
    {
        console.log(error);  
    }
}