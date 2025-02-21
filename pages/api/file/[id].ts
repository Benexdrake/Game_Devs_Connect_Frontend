import { secureCheck } from "@/lib/api";
import { getFileById } from "@/services/backend/file_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> 
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const id = parseInt(req.query.id as string)
    // console.log(req.query.id);
    
    
    if(!id || id == 0) return res.status(200).json({message:"", status:false})

    const result = await getFileById(id);

    console.log(result);
    

    res.status(200).json(result);

}