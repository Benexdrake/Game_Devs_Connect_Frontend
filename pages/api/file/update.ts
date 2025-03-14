import { secureCheck } from "@/lib/api";
import { updateFile } from "@/services/file_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> 
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const file = req.body;
    
    const response = await updateFile(file);

    res.status(200).json(response)
}