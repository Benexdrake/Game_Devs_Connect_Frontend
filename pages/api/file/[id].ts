import { getFileById } from "@/services/backend/file_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> 
{
    const id = parseInt(req.query.id as string)

    console.log(req.query);
    
    if(!id || id == 0) res.status(200).send(0)

    const result = await getFileById(id);

    res.status(200).json(result);

}