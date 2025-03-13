import { secureCheck } from "@/lib/api";
import { addUser } from "@/services/user_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    } 

    const user = req.body;
    
    const result = await addUser(user)

    res.status(200).json(result);
}
