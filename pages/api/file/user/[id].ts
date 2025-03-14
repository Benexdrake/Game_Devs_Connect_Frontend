import { secureCheck } from "@/lib/api";
import { getFileIdsByOwnerId } from "@/services/file_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> 
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const id = req.query.id as string
    
    const result = await getFileIdsByOwnerId(id)

    res.status(200).json(result);
}