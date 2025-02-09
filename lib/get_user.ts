import axios from "axios";

export default async function getUser(token:string)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get('https://discord.com/api/users/@me', config).then(x => { return x.data})
}