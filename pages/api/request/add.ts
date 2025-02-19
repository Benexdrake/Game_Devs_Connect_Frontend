import { secureCheck } from "@/lib/api";
import { addRequest } from "@/services/backend/request_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)
    
    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }
    
        const {requestTags} = req.body;
    
    const result = await addRequest(requestTags)

    res.status(200).json(result);
}
