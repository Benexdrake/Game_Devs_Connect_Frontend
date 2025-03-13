import { secureCheck } from "@/lib/api";
import { getUsers } from "@/services/user_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{   
        const secure = await secureCheck(req,res)
    
        if(!secure)
        {
            res.status(500).send('Go away!!!')
            return;
        } 

    const result = await getUsers()
    res.status(200).json(result);
}
