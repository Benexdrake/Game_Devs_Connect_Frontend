import { secureCheck } from "@/lib/api";
import { likedRequest } from "@/services/request_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)
    
    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }
    
    const {requestId, userId, liked} = req.query;

    if(!userId || !requestId) return res.status(200).json({message:"", status:false, data:req.body})
    
    const result = await likedRequest(requestId as string, userId as string, (liked as string) == 'true')

    res.status(200).json(result);
}
