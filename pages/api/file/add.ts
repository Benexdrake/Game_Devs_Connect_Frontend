import { addFile } from "@/services/file_service";
import type { NextApiRequest, NextApiResponse } from "next";
import { secureCheck } from "@/lib/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const file = req.body;
    console.log('FILE:',req.body);

    const response = await addFile(file);

    res.status(200).json(response);
}