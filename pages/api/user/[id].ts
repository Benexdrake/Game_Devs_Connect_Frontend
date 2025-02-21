import { secureCheck } from "@/lib/api";
import { getUserById } from "@/services/backend/user_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    } 

    const id = req.query.id

    const result = await getUserById(id as string)

    if(result.data.avatar === '')
        result.data.avatar = '/discordblue.png';

    res.status(200).json(result);
}
