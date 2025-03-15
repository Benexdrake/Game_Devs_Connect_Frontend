import type { NextApiRequest, NextApiResponse } from "next";
import { secureCheck } from "@/lib/api";
import { updateSeenNotification } from "@/services/notification_service";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    if(req.method !== 'PUT') return;
    
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }
    const id = req.query.id;
    
    if(!id) return res.status(200).json({message:"Missing ID", status:false})

    const response = await updateSeenNotification(id as string)

    res.status(200).json(response)
}