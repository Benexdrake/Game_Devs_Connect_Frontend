import { getFullRequestById } from "@/services/request_services";
import type { NextApiRequest, NextApiResponse } from "next";
import { secureCheck } from "@/lib/api";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const id = req.query.id
    const userId= req.query.userId

    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    } 

    const result = await getFullRequestById(id as string, userId as string)
    
    res.status(200).json(result);
}
