import type { NextApiRequest, NextApiResponse } from "next";
import { secureCheck } from "@/lib/api";
import { getNotificationIds } from "@/services/backend/notification_service";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    } 

    const id = req.query.id;
    if(!id) return res.status(200).json({message:"Missing ID", status:false})

    const response = await getNotificationIds(id as string);
    res.status(200).json(response);
}