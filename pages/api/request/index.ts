import { secureCheck } from "@/lib/api";
import { getRequests } from "@/services/request_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    
    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }
    
    const result = await getRequests()
    res.status(200).json(result);
}
