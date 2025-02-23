import { secureCheck } from "@/lib/api";
import { addRequest, likedRequest } from "@/services/backend/request_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)
    
    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }
    
    const {requestId, userId, liked} = req.body;

    if(!userId || !requestId) return res.status(200).json({message:"", status:false})
    
    const result = await likedRequest(requestId, userId, liked)

    res.status(200).json(result);
}
