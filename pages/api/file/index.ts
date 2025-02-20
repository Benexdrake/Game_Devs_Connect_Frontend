import { secureCheck } from "@/lib/api";
import { getFileIdsByOwnerId } from "@/services/backend/file_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> 
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const ownerId = req.query.ownerId

    if(!ownerId) return res.status(200).json({})
    const id = parseInt(ownerId as string)

    
}